import fs from "node:fs/promises";
const origin = "https://www.truewebmaster.com";
const pending = ["/", "/robots.txt", "/sitemap.xml"];
const seen = new Set();
const pages = [];
while (pending.length && seen.size < 35) {
  const pathname = pending.shift();
  if (seen.has(pathname)) continue;
  seen.add(pathname);
  try {
    const response = await fetch(origin + pathname, {
      signal: AbortSignal.timeout(20000),
    });
    const content = await response.text();
    const html = response.headers.get("content-type")?.includes("text/html");
    const record = {
      url: origin + pathname,
      finalUrl: response.url,
      status: response.status,
      contentType: response.headers.get("content-type"),
      capturedAt: new Date().toISOString(),
      title: content.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || null,
      h1:
        content
          .match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
          ?.replace(/<[^>]*>/g, " ")
          .trim() || null,
      canonical:
        content.match(
          /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i,
        )?.[1] || null,
      language: content.match(/<html[^>]*lang=["']([^"']+)/i)?.[1] || null,
      action: "pending-content-and-organic-review",
      organicData: "GSC/analytics/backlinks not supplied",
    };
    pages.push(record);
    if (html)
      for (const match of content.matchAll(/href=["']([^"'#]+)["']/g)) {
        const url = new URL(match[1], response.url);
        if (
          url.origin === origin &&
          !/\.(png|svg|webp|jpg|css|js|pdf|ico|woff2?)$/i.test(url.pathname) &&
          !url.search &&
          !seen.has(url.pathname)
        )
          pending.push(url.pathname);
      }
    if (pathname.endsWith(".txt") && response.ok)
      for (const match of content.matchAll(/^Sitemap:\s*(.+)$/gim)) {
        const url = new URL(match[1].trim());
        if (url.origin === origin) pending.push(url.pathname);
      }
    if (pathname.endsWith(".xml") && response.ok)
      for (const match of content.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        const url = new URL(match[1]);
        if (url.origin === origin) pending.push(url.pathname);
      }
  } catch (error) {
    pages.push({
      url: origin + pathname,
      error: String(error),
      action: "pending-verification",
    });
  }
}
await fs.mkdir("docs", { recursive: true });
await fs.writeFile(
  "docs/legacy-url-inventory.json",
  JSON.stringify(
    {
      origin,
      pages,
      remaining: [...new Set(pending)].filter((item) => !seen.has(item)),
      note: "Initial public crawl only. No organic-value conclusions or redirects approved.",
    },
    null,
    2,
  ),
);
console.log(`Inventoried ${pages.length} legacy URLs. No production changes.`);
