import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const base = process.env.TEST_URL || "http://127.0.0.1:4322",
  browser = await chromium.launch({ channel: "chrome" }),
  cache = new Map(),
  results = [];
const names = {
  en: "Your business has enough tools. What it needs is one system.",
  es: "Tu negocio ya tiene suficientes herramientas. Lo que necesita es un sistema conectado.",
};
async function setup(options = {}) {
  const c = await browser.newContext(options);
  await c.route(`${new URL(base).origin}/**`, async (route) => {
    const url = route.request().url();
    if (!cache.has(url)) {
      const r = await fetch(url),
        headers = Object.fromEntries(r.headers);
      delete headers["content-length"];
      delete headers["content-encoding"];
      cache.set(url, {
        status: r.status,
        headers,
        body: Buffer.from(await r.arrayBuffer()),
      });
    }
    await route.fulfill(cache.get(url));
  });
  return c;
}
await fs.mkdir("artifacts", { recursive: true });
for (const [width, locale] of [
  [1440, "en"],
  [390, "es"],
]) {
  const c = await setup({ viewport: { width, height: 1000 } });
  await c.addInitScript(() => {
    new MutationObserver(() => {
      const h = document.querySelector("[data-hero-headline][data-revealing]");
      if (!h || window.headlineCaptured) return;
      const animations = h.getAnimations({ subtree: true });
      if (!animations.length) return;
      window.headlineCaptured = true;
      window.headlineBefore = h.getBoundingClientRect().toJSON();
      window.headlineLines = [...h.querySelectorAll("[data-reveal-line]")].map(
        (e) => e.textContent,
      );
      animations.forEach((a) => {
        a.pause();
        a.currentTime = 250;
      });
    }).observe(document, { subtree: true, attributes: true, childList: true });
  });
  const p = await c.newPage(),
    errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto(base + (locale === "en" ? "/" : "/es/"));
  await p.waitForFunction(() => window.headlineCaptured, { timeout: 5000 });
  const h = p.getByRole("heading", {
    level: 1,
    name: names[locale],
    exact: true,
  });
  const accessible = (await h.count()) === 1;
  const visual = await p.evaluate(() => window.headlineLines.join(" "));
  await p.screenshot({ path: `artifacts/h1-reveal-${locale}-${width}.png` });
  await p.evaluate(() =>
    document
      .querySelector("[data-hero-headline]")
      .getAnimations({ subtree: true })
      .forEach((a) => a.play()),
  );
  await p.locator('[data-reveal-state="settled"]').waitFor();
  const final = await h.boundingBox(),
    before = await p.evaluate(() => window.headlineBefore);
  const geometryStable =
    Math.abs(final.height - before.height) < 1 &&
    Math.abs(final.width - before.width) < 1;
  const restored =
    (await h.locator("[data-headline-layer]").count()) === 0 &&
    (await h
      .locator("[data-headline-source]")
      .evaluate((e) => getComputedStyle(e).opacity === "1"));
  const otherSystems =
    (await p.locator("[data-hero-flow]").count()) === 1 &&
    (await p.locator("[data-hero-journey]").count()) === 1;
  const overflow = await p.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  results.push({
    width,
    locale,
    accessible,
    copyExact: visual === names[locale],
    geometryStable,
    restored,
    otherSystems,
    overflow,
    errors,
  });
  await c.close();
}
for (const options of [
  { reducedMotion: "reduce" },
  { javaScriptEnabled: false },
]) {
  const c = await setup({ viewport: { width: 390, height: 1000 }, ...options }),
    p = await c.newPage();
  await p.goto(base + "/es/");
  const h = p.getByRole("heading", { level: 1, name: names.es, exact: true });
  results.push({
    options,
    accessible: (await h.count()) === 1,
    static: (await h.locator("[data-headline-layer]").count()) === 0,
    visible: await h
      .locator("[data-headline-source]")
      .evaluate((e) => getComputedStyle(e).opacity === "1"),
  });
  await c.close();
}
const slow = await setup({ viewport: { width:390, height:1000 } });
await slow.addInitScript(() => Object.defineProperty(document.fonts,"ready",{value:new Promise(()=>{})}));
const slowPage = await slow.newPage();
await slowPage.goto(base+"/es/");
await slowPage.waitForTimeout(1700);
const slowHeading = slowPage.getByRole("heading",{level:1,name:names.es,exact:true});
results.push({slowFontsVisible:await slowHeading.locator("[data-headline-source]").evaluate(e=>getComputedStyle(e).opacity==="1"),noStaleMask:await slowHeading.locator("[data-headline-layer]").count()===0});
await slow.close();
await browser.close();
await fs.writeFile(
  "artifacts/hero-headline-report.json",
  JSON.stringify({ base, isolatedTransport: true, results }, null, 2),
);
console.log(JSON.stringify(results, null, 2));
if (
  results.some(
    (r) =>
      Object.entries(r).some(
        ([k, v]) => typeof v === "boolean" && (k === "overflow" ? v : !v),
      ) || r.errors?.length,
  )
)
  process.exitCode = 1;
