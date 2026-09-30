# True Webmaster

**Definitive working repository:** https://github.com/True-Webmaster/truewebmaster-site (`main`, private). The former `ramon-zerpa/truewebmaster-website` repository is retained as a migration snapshot. Use `origin` for ongoing work; `legacy` identifies the old repository. See `docs/repository-migration.md`.

Astro public website, English at `/` and Spanish at `/es/`. Based on approved SDD Phase 05 and Pencil Home/brand board. Current build is a design/content preview; contact reception, booking and the final privacy notice are not connected.

## Local development

Node 22.12+; this implementation was built with Node 24.21.0 and Astro 7.3.5.

```sh
npm ci
npm run dev
npm run validate
npm run preview -- --port 4322
node scripts/browser-check.mjs
```

`npm run validate` checks Astro/TypeScript, builds all 22 paired routes plus 404, checks local links and reports compressed assets. `scripts/browser-check.mjs` tests the production build on port 4322, unless `TEST_URL` points to another origin.

Browser QA uses installed Chrome by default (`TEST_BROWSER` can select another Playwright channel). If browser network middleware injects unrelated code, `TEST_ISOLATE_TRANSPORT=true` retrieves exact origin responses with Node and supplies them to the browser for functional/layout checks. The report records this mode; it is not a network or performance measurement. It does not change the user's browser or security settings.

## Preview and deployment

Cloudflare Pages is the hosting provider. The previously verified project is `truewebmaster-website.pages.dev`; its Git connection still points to the former repository. The owner indicates that the new repository will have Cloudflare connected; verify that new project before declaring deployment from the new repository. See `docs/cloudflare-pages.md` and `docs/repository-migration.md`. `public/_headers` protects Pages previews from indexing and applies security/cache headers. Page metadata defaults to noindex until the final release is approved. Vercel is disconnected and paused; do not deploy there.

The owner approved publishing the two clients' names and screenshots and requested Palm's final domain link. The captured Palm design is the upcoming version; the owner reports that it has not replaced the current live site yet. Verify the actual version before final release. No measured project outcomes or specific delivery scope are claimed.

Production DNS, legacy content and CRM remain unchanged. Cloudflare hosting was configured on September 30, 2026; the final domain launch remains pending. Public legacy URL inventory is in `docs/legacy-url-inventory.json`; rankings, backlinks and GSC data have not been audited. No redirects have been approved or applied.

## Release dependencies

- Final conversion service, server-side receipt, bilingual routing and end-to-end testing.
- Booking owner, duration, availability and provider.
- Business-approved privacy and legal content; decision on legacy terms and fulfillment pages.
- Client scope/evidence for deeper case descriptions and accurate team/about information.
- Approved migration mapping and deployment/rollback plan.
- Final responsive/content approval and field performance data after launch.

Environment names are in `.env.example`. `npm run release:check` deliberately fails until release configuration is provided; passing it does not replace the business gates. Secrets belong to a server-side receiver, never `PUBLIC_*` variables.

## Assets

Hero art direction, tunable parameters and renderer safeguards are documented in [docs/hero-animation.md](docs/hero-animation.md). `node scripts/hero-flow-check.mjs` checks the effect and forced fallback paths. Regenerate its static poster with `node scripts/prepare-hero-poster.mjs` using Node 24 after changing the preset.

The five hero stages use a coordinated active sequence documented in [docs/hero-cards.md](docs/hero-cards.md). `node scripts/hero-journey-check.mjs` covers autoplay order, pointer/focus priority, touch, offscreen suspension and reduced motion. All other journeys remain static.

`scripts/prepare-assets.mjs` copies the immutable logo, self-hosts licensed Outfit 700 and DM Sans, and creates WebP crops and desktop preview excerpts. Provenance is in `docs/asset-provenance.json`. Only `public/` and built assets ship. `pencil-design/` and the temporary browser profile do not ship; the profile is excluded from Git.
