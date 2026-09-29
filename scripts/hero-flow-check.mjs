import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const base = process.env.TEST_URL || "http://127.0.0.1:4322";
const browser = await chromium.launch({ channel: "chrome" });
const results = [];
const cache = new Map();
async function context(options = {}, mode) {
  const ctx = await browser.newContext(options);
  // Exact build/origin responses; bypass known browser-only network injection.
  await ctx.route(`${new URL(base).origin}/**`, async (route) => {
    const url = route.request().url();
    if (!cache.has(url)) {
      const r = await fetch(url);
      const headers = Object.fromEntries(r.headers);
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
  if (mode)
    await ctx.addInitScript((mode) => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        if (type === "webgl" || type === "webgl2" || mode === "static")
          return null;
        return original.call(this, type, ...args);
      };
    }, mode);
  return ctx;
}
await fs.mkdir("artifacts", { recursive: true });
for (const [width, locale] of [
  [1440, "en"],
  [390, "es"],
]) {
  const ctx = await context({
    viewport: { width, height: 1000 },
    hasTouch: width < 768,
    isMobile: width < 768,
  });
  const page = await ctx.newPage(),
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + (locale === "en" ? "/" : "/es/"));
  await page.locator("[data-hero-flow][data-ready]").waitFor();
  await page.waitForTimeout(800);
  const root = page.locator("[data-hero-flow]"),
    canvas = root.locator("canvas");
  const mode = await root.getAttribute("data-renderer");
  const pixels = await canvas.evaluate((c) => c.width * c.height);
  const before = await canvas.screenshot();
  await page.waitForTimeout(600);
  const after = await canvas.screenshot();
  const moving = !before.equals(after);
  const controlsRemoved =
    (await page
      .locator("[data-flow-toggle], [data-sequence-toggle]")
      .count()) === 0;
  const staticH1 = await page
    .locator("h1")
    .evaluate(
      (e) =>
        getComputedStyle(e).opacity === "1" &&
        e.getAnimations({ subtree: true }).length === 0,
    );
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: `artifacts/flow-hero-${locale}-${width}.png` });
  const axe = await new AxeBuilder({ page })
    .include(".hero")
    .withRules(["color-contrast", "button-name", "heading-order"])
    .analyze();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  let contextRecovery = true;
  if (mode === "webgl" && width === 1440) {
    await canvas.evaluate((c) =>
      c.getContext("webgl").getExtension("WEBGL_lose_context").loseContext(),
    );
    await page.locator('[data-renderer="canvas2d"]').waitFor();
    contextRecovery = await root.evaluate((e) =>
      e.hasAttribute("data-running"),
    );
  }
  await page.locator("#selected-work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  const offscreen = !(await root.evaluate((e) =>
    e.hasAttribute("data-running"),
  ));
  await page.emulateMedia({ reducedMotion: "reduce" });
  const reduced =
    !(await root.evaluate((e) => e.hasAttribute("data-running"))) &&
    (await page.locator("[data-flow-toggle]").count()) === 0;
  results.push({
    width,
    locale,
    mode,
    pixels,
    pixelBudget: pixels <= 730000,
    contextRecovery,
    moving,
    controlsRemoved,
    staticH1,
    offscreen,
    reduced,
    overflow,
    errors,
    violations: axe.violations.map((v) => v.id),
  });
  await ctx.close();
}
for (const mode of ["canvas2d", "static"]) {
  const ctx = await context({ viewport: { width: 1440, height: 1000 } }, mode),
    page = await ctx.newPage();
  await page.goto(base + "/");
  await page.waitForTimeout(1600);
  const root = page.locator("[data-hero-flow]");
  const actual = await root.getAttribute("data-renderer");
  const fillsHero = await root.evaluate(
    (e) =>
      Math.abs(
        e.querySelector("canvas").getBoundingClientRect().width -
          e.getBoundingClientRect().width,
      ) < 2,
  );
  await page.screenshot({ path: `artifacts/flow-${mode}.png` });
  results.push({
    requested: mode,
    actual,
    correct: mode === actual,
    fillsHero,
  });
  await ctx.close();
}
for (const options of [
  { reducedMotion: "reduce" },
  { javaScriptEnabled: false },
]) {
  const ctx = await context({
      viewport: { width: 390, height: 844 },
      ...options,
    }),
    page = await ctx.newPage();
  await page.goto(base + "/es/");
  await page.waitForTimeout(200);
  const root = page.locator("[data-hero-flow]");
  results.push({
    options,
    static: !(await root.getAttribute("data-renderer")),
    poster: await root.evaluate((e) =>
      getComputedStyle(e).backgroundImage.includes("hero-flow-poster"),
    ),
    controlsRemoved: (await page.locator("[data-flow-toggle]").count()) === 0,
  });
  await ctx.close();
}
await browser.close();
await fs.writeFile(
  "artifacts/hero-flow-report.json",
  JSON.stringify({ base, isolatedTransport: true, results }, null, 2),
);
console.log(JSON.stringify(results, null, 2));
if (
  results.some(
    (r) =>
      r.correct === false ||
      r.fillsHero === false ||
      r.contextRecovery === false ||
      r.pixelBudget === false ||
      r.static === false ||
      r.poster === false ||
      r.controlsRemoved === false ||
      r.staticH1 === false ||
      r.moving === false ||
      r.offscreen === false ||
      r.reduced === false ||
      r.overflow ||
      r.errors?.length ||
      r.violations?.length,
  )
)
  process.exitCode = 1;
