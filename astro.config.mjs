import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = process.env.SITE_URL || "https://www.truewebmaster.com";
export default defineConfig({
  site,
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/(privacy|thank-you|privacidad|gracias)\/$/.test(page),
    }),
  ],
  output: "static",
  trailingSlash: "always",
  devToolbar: { enabled: false },
  build: { inlineStylesheets: "auto" },
});
