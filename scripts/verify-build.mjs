import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
const root = path.resolve("dist");
const walk = async (dir) =>
  (
    await Promise.all(
      await fs
        .readdir(dir, { withFileTypes: true })
        .then((entries) =>
          entries.map((entry) =>
            entry.isDirectory()
              ? walk(path.join(dir, entry.name))
              : path.join(dir, entry.name),
          ),
        ),
    )
  ).flat();
const files = await walk(root);
const pages = files.filter((f) => f.endsWith(".html"));
const issues = [];
for (const file of pages) {
  const html = await fs.readFile(file, "utf8");
  const name = path.relative(root, file);
  const lang = name.startsWith(`es${path.sep}`) ? "es" : "en";
  if (!html.includes(`lang="${lang}"`))
    issues.push(`${name}: incorrect language`);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1)
    issues.push(`${name}: expected one H1`);
  if (!html.includes("noindex"))
    issues.push(`${name}: preview must be noindex`);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[^"\s]*)"/g)) {
    const target = match[1];
    const resolved = path.join(
      root,
      target,
      target.endsWith("/") ? "index.html" : "",
    );
    try {
      await fs.access(resolved);
    } catch {
      issues.push(`${name}: missing ${target}`);
    }
  }
}
if (pages.length !== 23)
  issues.push(`Expected 22 localized routes + 404, received ${pages.length}`);
const bundles = [];
for (const file of files.filter((f) => /\.(css|js)$/.test(f))) {
  const bytes = gzipSync(await fs.readFile(file)).length;
  bundles.push({ file: path.relative(root, file), gzipBytes: bytes });
}
await fs.mkdir("artifacts", { recursive: true });
await fs.writeFile(
  "artifacts/build-report.json",
  JSON.stringify({ pages: pages.length, issues, bundles }, null, 2),
);
if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}
console.log(
  `Verified ${pages.length} HTML pages, language, H1, preview indexing protection and internal paths.`,
);
console.log(JSON.stringify(bundles));
