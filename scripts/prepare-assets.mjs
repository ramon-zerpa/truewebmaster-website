import fs from "node:fs/promises";
import sharp from "sharp";
import { createHash } from "node:crypto";

await fs.mkdir("public/fonts", { recursive: true });
await fs.mkdir("public/images", { recursive: true });
await fs.mkdir("src/assets", { recursive: true });
const logo = await fs.readFile("pencil-design/true-webmaster-logo.webp");
await fs.writeFile("public/images/true-webmaster-logo.webp", logo);
await fs.copyFile(
  "node_modules/@fontsource/outfit/files/outfit-latin-700-normal.woff2",
  "public/fonts/outfit-latin-700.woff2",
);
await fs.copyFile(
  "node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  "public/fonts/dm-sans-latin-variable.woff2",
);
await fs.copyFile(
  "node_modules/@fontsource/outfit/LICENSE",
  "public/fonts/outfit-LICENSE.txt",
);
await fs.copyFile(
  "node_modules/@fontsource-variable/dm-sans/LICENSE",
  "public/fonts/dm-sans-LICENSE.txt",
);
const assets = [
  {
    file: "public/images/true-webmaster-logo.webp",
    source: "pencil-design/true-webmaster-logo.webp",
    hash: createHash("sha256").update(logo).digest("hex"),
    ...(await sharp(logo).metadata()),
  },
];
for (const name of ["affordable-roofing", "palm-wellness"]) {
  const source = `pencil-design/assets/${name}-full.png`;
  const meta = await sharp(source).metadata();
  const height = Math.min(meta.height, Math.round(meta.width * 1.8));
  const long = sharp(source).extract({
    left: 0,
    top: 0,
    width: meta.width,
    height,
  });
  await long
    .clone()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(`public/images/${name}-preview.webp`);
  await sharp(source)
    .extract({
      left: 0,
      top: 0,
      width: meta.width,
      height: Math.min(meta.height, Math.round(meta.width * 0.52)),
    })
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(`public/images/${name}-static.webp`);
  assets.push({
    source,
    project: name,
    derivatives: [`${name}-preview.webp`, `${name}-static.webp`],
    permission: "client-approval-confirmed-by-owner-in-chat-2026-09-29",
  });
}
await fs.mkdir("docs", { recursive: true });
await fs.writeFile(
  "docs/asset-provenance.json",
  JSON.stringify(
    assets,
    (key, value) => (key === "exif" || key === "icc" ? undefined : value),
    2,
  ),
);
console.log(
  "Prepared approved logo, local fonts and optimized project previews.",
);
