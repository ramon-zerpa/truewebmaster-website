# True Webmaster

Sitio bilingüe EN/ES en Astro para managed digital operations.

**Repositorio definitivo:** [True-Webmaster/truewebmaster-site](https://github.com/True-Webmaster/truewebmaster-site).

Si lees este archivo en `ramon-zerpa/truewebmaster-website`, ese repositorio es el snapshot anterior: continúa el trabajo en el repositorio definitivo.

Antes de trabajar, leer `AGENTS.md`, las fases SDD y `PROJECT-HANDOFF.md`. Estado de hosting en `docs/cloudflare-pages.md`; traslado de Git en `docs/repository-migration.md`.

## Desarrollo

Node `24.21.0`. Instalar con `npm ci`, desarrollar con `npm run dev` y validar con `npm run validate`. Build estático en `dist/`.

Cloudflare Pages es el proveedor de hosting. No desplegar en Vercel. La integración HighLevel y el lanzamiento del dominio final siguen pendientes.
