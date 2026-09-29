import fs from "node:fs/promises";
import sharp from "sharp";
import { heroFlowConfig as c } from "../src/lib/hero-flow/config.ts";
const w = 1440,
  h = 900,
  samples = 72;
const shapes = [],
  gradients = [];
for (let i = 0; i < 7; i++) {
  const upper = [],
    lower = [],
    thick = h * (0.07 + c.bandSoftness * 0.065);
  for (let s = 0; s <= samples; s++) {
    const x = s / samples,
      y =
        (0.09 +
          i * 0.135 -
          x * 0.38 +
          Math.sin(x * 5 * c.animationScale + i * 0.58) *
            0.14 *
            c.warpStrength +
          Math.sin(x * 8.2 + i * 0.31) * 0.055 * c.warpStrength) *
        h;
    upper.push(`${(x * w).toFixed(2)},${y.toFixed(2)}`);
    lower.unshift(
      `${(x * w).toFixed(2)},${(y + thick * (0.55 + 0.45 * Math.sin(x * 3 + i))).toFixed(2)}`,
    );
  }
  gradients.push(
    `<linearGradient id="r${i}" x1="0" y1="0" x2=".12" y2="1"><stop stop-color="${c.palette.shadow}"/><stop offset=".4" stop-color="${c.palette.teal}"/><stop offset=".52" stop-color="${c.palette.cyan}"/><stop offset=".58" stop-color="${c.palette.highlight}"/><stop offset=".76" stop-color="${c.palette.teal}"/><stop offset="1" stop-color="${c.palette.shadow}"/></linearGradient>`,
  );
  shapes.push(
    `<polygon points="${upper.concat(lower).join(" ")}" fill="url(#r${i})" opacity=".58"/>`,
  );
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${gradients.join("")}<linearGradient id="calm"><stop stop-color="${c.palette.base}" stop-opacity=".96"/><stop offset=".5" stop-color="${c.palette.base}" stop-opacity=".65"/><stop offset="1" stop-color="${c.palette.base}" stop-opacity=".08"/></linearGradient></defs><rect width="100%" height="100%" fill="${c.palette.base}"/>${shapes.join("")}<rect width="100%" height="100%" fill="url(#calm)"/></svg>`;
await fs.writeFile("docs/hero-flow-static.svg", svg);
await sharp(Buffer.from(svg))
  .blur(0.8)
  .webp({ quality: 82 })
  .toFile("public/images/hero-flow-poster.webp");
console.log("Authored static ribbon poster generated.");
