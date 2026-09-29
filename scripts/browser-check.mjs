import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  channel: process.env.TEST_BROWSER || "chrome",
  headless: true,
});
const base = process.env.TEST_URL || "http://127.0.0.1:4322";
const isolatedTransport = process.env.TEST_ISOLATE_TRANSPORT === "true";
// Optional functional QA transport: Node retrieves the exact deployed responses
// when browser network middleware injects unrelated scripts. Not a timing test.
const responses = new Map();
const isolate = async (context) => {
  if (!isolatedTransport) return;
  await context.route(`${new URL(base).origin}/**`, async (route) => {
    const url = route.request().url();
    if (!responses.has(url)) {
      const response = await fetch(url);
      const headers = Object.fromEntries(response.headers);
      delete headers["content-encoding"];
      delete headers["content-length"];
      responses.set(url, {
        status: response.status,
        headers,
        body: Buffer.from(await response.arrayBuffer()),
      });
    }
    await route.fulfill(responses.get(url));
  });
};
const results = [];
await fs.mkdir("artifacts", { recursive: true });
for (const width of [320, 390, 768, 1440]) {
  for (const pathname of [
    "/",
    "/es/",
    "/solutions/",
    "/es/soluciones/",
    "/contact/",
    "/es/contacto/",
  ]) {
    const context = await browser.newContext({
      viewport: { width, height: width < 768 ? 844 : 1000 },
      isMobile: width < 768,
      hasTouch: width < 768,
    });
    const page = await context.newPage();
    await isolate(context);
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(`${base}${pathname}`, {
      waitUntil: "load",
    });
    await page.evaluate(() => document.fonts.ready);
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      lang: document.documentElement.lang,
    }));
    const axe =
      [390, 1440].includes(width) &&
      ["/", "/es/", "/contact/", "/es/contacto/"].includes(pathname)
        ? await new AxeBuilder({ page })
            .withRules([
              "color-contrast",
              "label",
              "button-name",
              "image-alt",
              "link-name",
              "html-has-lang",
              "heading-order",
              "duplicate-id-aria",
            ])
            .analyze()
        : { violations: [] };
    results.push({
      width,
      pathname,
      status: response.status(),
      ...layout,
      errors,
      violations: axe.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        targets: v.nodes.map((n) => n.target),
      })),
    });
    console.log(`${width} ${pathname}: ${JSON.stringify(results.at(-1))}`);
    await fs.writeFile(
      "artifacts/browser-report.json",
      JSON.stringify({ base, isolatedTransport, results }, null, 2),
    );
    if (["/", "/es/"].includes(pathname) && [390, 1440].includes(width)) {
      await page.locator("#selected-work").scrollIntoViewIfNeeded();
      await page.locator("#palm-wellness").scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: `artifacts/home-${pathname === "/" ? "en" : "es"}-${width}.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `artifacts/hero-${pathname === "/" ? "en" : "es"}-${width}.png`,
      });
    }
    await context.close();
  }
}
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
await isolate(context);
await page.goto(`${base}/`);
const controls = page.locator(".preview-controls").first();
await controls.getByRole("button", { name: /Play preview/ }).click();
await page.waitForTimeout(1000);
await controls.getByRole("button", { name: /Pause preview/ }).click();
const paused = await page
  .locator(".preview-viewport img")
  .first()
  .evaluate((img) => img.getAnimations()[0]?.playState);
await page.emulateMedia({ reducedMotion: "reduce" });
const reducedControls = await controls.isVisible();
const reducedTransform = await page
  .locator(".preview-viewport img")
  .first()
  .evaluate((img) => getComputedStyle(img).transform);
await page.setViewportSize({ width: 390, height: 844 });
await page.getByText("Menu", { exact: true }).click();
await page.keyboard.press("Escape");
const menuClosed = await page
  .locator(".mobile-menu")
  .evaluate((menu) => !menu.open);
await context.close();
const nojs = await browser.newContext({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
});
const nojsPage = await nojs.newPage();
await isolate(nojs);
await nojsPage.goto(`${base}/es/`);
await nojsPage.getByText("Menú", { exact: true }).click();
const noJsMenu = await nojsPage.locator(".mobile-menu nav").isVisible();
await nojs.close();
await browser.close();
const interactions = {
  paused,
  reducedControls,
  reducedTransform,
  menuClosed,
  noJsMenu,
};
await fs.writeFile(
  "artifacts/browser-report.json",
  JSON.stringify({ base, isolatedTransport, results, interactions }, null, 2),
);
const failed = results.filter(
  (r) =>
    r.overflow || r.errors.length || r.violations.length || r.status !== 200,
);
console.log(
  JSON.stringify({ tested: results.length, failed, interactions }, null, 2),
);
if (
  failed.length ||
  paused !== "paused" ||
  reducedControls ||
  reducedTransform !== "none" ||
  !menuClosed ||
  !noJsMenu
)
  process.exitCode = 1;
