import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const base = process.env.TEST_URL || "http://127.0.0.1:4322";
const browser = await chromium.launch({ channel: "chrome" });
const results = [],
  cache = new Map();
async function setup(options = {}) {
  const context = await browser.newContext(options);
  await context.route(`${new URL(base).origin}/**`, async (route) => {
    const url = route.request().url();
    if (!cache.has(url)) {
      const r = await fetch(url),
        headers = Object.fromEntries(r.headers);
      delete headers["content-encoding"];
      delete headers["content-length"];
      cache.set(url, {
        status: r.status,
        headers,
        body: Buffer.from(await r.arrayBuffer()),
      });
    }
    await route.fulfill(cache.get(url));
  });
  return context;
}
await fs.mkdir("artifacts", { recursive: true });
const ctx = await setup({ viewport: { width: 1440, height: 1100 } }),
  page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(base + "/");
const root = page.locator("[data-hero-journey]"),
  cards = root.locator("[data-stage]"),
  buttons = root.locator("[data-stage-control]");
await root.locator("[data-active]").waitFor();
const order = [await root.getAttribute("data-active-stage")];
for (const expected of [1, 2, 3, 4, 0]) {
  await page.waitForFunction(
    (i) =>
      document.querySelector("[data-hero-journey]").dataset.activeStage ===
      String(i),
    expected,
    { timeout: 5000 },
  );
  order.push(await root.getAttribute("data-active-stage"));
}
await cards.nth(3).hover();
const hover = (await root.getAttribute("data-active-stage")) === "3";
await page.waitForTimeout(3900);
const hoverHolds = (await root.getAttribute("data-active-stage")) === "3";
await buttons.nth(0).focus();
const focusWins = (await root.getAttribute("data-active-stage")) === "0";
await page.waitForTimeout(3900);
const focusHolds = (await root.getAttribute("data-active-stage")) === "0";
await page.locator("h1").click();
await page.waitForFunction(
  () =>
    document.querySelector("[data-hero-journey]").dataset.activeStage === "1",
  null,
  { timeout: 4500 },
);
const resume = true;
const controlsRemoved =
  (await page.locator("[data-sequence-toggle], [data-flow-toggle]").count()) ===
  0;
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({ path: "artifacts/journey-en-desktop.png" });
const axe = await new AxeBuilder({ page })
  .include("[data-hero-journey]")
  .withRules(["color-contrast", "button-name", "heading-order"])
  .analyze();
await page.locator("#selected-work").scrollIntoViewIfNeeded();
await page.waitForTimeout(150);
const offscreen = !(await root.evaluate((e) => e.hasAttribute("data-running")));
results.push({
  order,
  hover,
  hoverHolds,
  focusWins,
  focusHolds,
  resume,
  controlsRemoved,
  offscreen,
  errors,
  violations: axe.violations.map((v) => v.id),
});
await ctx.close();
for (const options of [
  { viewport: { width: 390, height: 1000 }, isMobile: true, hasTouch: true },
  { viewport: { width: 390, height: 1000 }, reducedMotion: "reduce" },
  { viewport: { width: 390, height: 1000 }, javaScriptEnabled: false },
]) {
  const c = await setup(options),
    p = await c.newPage();
  await p.goto(base + "/es/");
  const group = p.locator("[data-hero-journey]");
  if (options.javaScriptEnabled === false) {
    results.push({
      noJs: !(await group.getAttribute("data-enhanced")),
      allFive: (await group.locator("li").count()) === 5,
    });
  } else {
    await group.locator("[data-active]").waitFor();
    if (options.reducedMotion) {
      const previous = await group.getAttribute("data-active-stage");
      await p.waitForTimeout(3900);
      const staticMode =
        previous === (await group.getAttribute("data-active-stage")) &&
        !(await group.evaluate((e) => e.hasAttribute("data-running")));
      await group.locator("[data-stage-control]").nth(4).focus();
      results.push({
        staticMode,
        manualReduced: (await group.getAttribute("data-active-stage")) === "4",
        pulseStopped: await group
          .locator(".handoff-rail span")
          .evaluate((e) => getComputedStyle(e).animationName === "none"),
      });
    } else {
      await group.locator("[data-stage-control]").nth(2).tap();
      const touch = (await group.getAttribute("data-active-stage")) === "2";
      await p.waitForTimeout(700);
      await p.evaluate(() => scrollTo(0, 0));
      await group.screenshot({ path: "artifacts/journey-es-mobile.png" });
      const overflow = await p.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      results.push({
        touch,
        autoplayTouch: await group.evaluate((e) =>
          e.hasAttribute("data-running"),
        ),
        overflow,
      });
    }
  }
  await c.close();
}
await browser.close();
await fs.writeFile(
  "artifacts/hero-journey-report.json",
  JSON.stringify({ base, isolatedTransport: true, results }, null, 2),
);
console.log(JSON.stringify(results, null, 2));
if (
  results.some(
    (r) =>
      Object.entries(r).some(
        ([k, v]) => typeof v === "boolean" && (k === "overflow" ? v : !v),
      ) ||
      r.errors?.length ||
      r.violations?.length,
  ) ||
  results[0].order.join(",") !== "0,1,2,3,4,0"
)
  process.exitCode = 1;
