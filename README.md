# True Webmaster

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

## Preview and deployment

Vercel is the temporary preview host in the owner's account. Final hosting will be the company's Cloudflare account after approval. `vercel.json` adds a noindex header to every response; page metadata also defaults to noindex. This Vercel configuration is deliberately preview-only, and must not be copied unchanged into the final deployment.

The owner approved publishing the two clients' names and screenshots and requested Palm's final domain link. The captured Palm design is the upcoming version; the owner reports that it has not replaced the current live site yet. Verify the actual version before final release. No measured project outcomes or specific delivery scope are claimed.

No production DNS, legacy content, CRM, or Cloudflare configuration has been changed. Public legacy URL inventory is in `docs/legacy-url-inventory.json`; rankings, backlinks and GSC data have not been audited. No redirects have been approved or applied.

## Release dependencies

- Final conversion service, server-side receipt, bilingual routing and end-to-end testing.
- Booking owner, duration, availability and provider.
- Business-approved privacy and legal content; decision on legacy terms and fulfillment pages.
- Client scope/evidence for deeper case descriptions and accurate team/about information.
- Approved migration mapping and deployment/rollback plan.
- Final responsive/content approval and field performance data after launch.

Environment names are in `.env.example`. `npm run release:check` deliberately fails until release configuration is provided; passing it does not replace the business gates. Secrets belong to a server-side receiver, never `PUBLIC_*` variables.

## Assets

`scripts/prepare-assets.mjs` copies the immutable logo, self-hosts licensed Outfit 700 and DM Sans, and creates WebP crops and desktop preview excerpts. Provenance is in `docs/asset-provenance.json`. Only `public/` and built assets ship. `pencil-design/` and the temporary browser profile do not ship; the profile is excluded from Git.
