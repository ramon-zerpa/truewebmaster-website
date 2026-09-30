# Cloudflare Pages — hosting actual

Decisión del propietario del 30/09/2026: usar Cloudflare Pages desde ahora y retirar Vercel del flujo de trabajo. Esta decisión sustituye la planificación anterior de mantener Vercel hasta el lanzamiento.

## Proyecto y flujo

- Cuenta: `e647ec8fc06db97c1deb3d61c290ab38`.
- Proyecto existente: `truewebmaster-website`.
- Dashboard: https://dash.cloudflare.com/e647ec8fc06db97c1deb3d61c290ab38/pages/view/truewebmaster-website.
- EN: https://truewebmaster-website.pages.dev/.
- ES: https://truewebmaster-website.pages.dev/es/.
- GitHub privado: `ramon-zerpa/truewebmaster-website`. Rama principal: `main`.
- Push a `main` inicia el build/deploy de Pages; las demás ramas mantienen previews automáticos. Confirmar el commit y `latest_stage.status=success` mediante API/dashboard antes de declarar publicado. Comprobar después rutas y assets en el alias estable, no solo en la URL del deployment.

## Build verificado en la cuenta

| Opción | Valor |
| --- | --- |
| Root directory | Raíz del repositorio |
| Build command | `npm run validate` |
| Build output directory | `dist` |
| Build image | v3 |
| Node | `24.21.0`, también en `.node-version` |
| Build caching | Activado |
| Production branch | `main` |
| `SITE_URL`, ambos entornos | `https://www.truewebmaster.com` |
| `PUBLIC_RELEASE_READY`, ambos entornos | `false` |

`npm run validate` ejecuta Astro check, build estático y verificación de 23 páginas, idioma, H1, links/assets y protección de indexación. Pages instala las dependencias del lockfile antes del comando. No se necesita adapter Cloudflare, SSR, Functions ni Wrangler para este sitio Astro estático y su despliegue Git. La conexión inicial tenía comando y output vacíos; se corrigieron antes de publicar el build nuevo.

## Headers y release

`public/_headers` pasa a `dist/_headers` y Pages aplica headers de seguridad a assets estáticos. Los hosts `pages.dev` y previews de versión reciben `X-Robots-Tag: noindex, nofollow`. Los assets con hash bajo `/_astro/` tienen caché de un año e `immutable`; HTML e imágenes/font files sin hash conservan la revalidación de Pages.

Las páginas siguen con `meta robots noindex` mientras `PUBLIC_RELEASE_READY=false`. Canonical/hreflang conservan el dominio final aprobado. No conectar dominio legacy, cambiar DNS ni habilitar indexación como parte de esta transición: siguen pendientes la aprobación final, la conversión HighLevel, privacidad y mapa de migración. `scripts/release-check.mjs` conserva ese gate.

`vercel.json` queda como protección de retirada: `git.deploymentEnabled=false` evita nuevos despliegues automáticos en Vercel. No usar `vercel deploy` para este proyecto. La desconexión del repositorio y el estado del antiguo proyecto se registran en el cierre de esta migración.

## Fuentes técnicas

- [Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/).
- [Build image y Node](https://developers.cloudflare.com/pages/configuration/build-image/).
- [Headers de Pages](https://developers.cloudflare.com/pages/configuration/headers/).
- [Astro estático en Cloudflare](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/).
- [Desactivar despliegues Git de Vercel](https://vercel.com/docs/project-configuration/git-configuration).

Estas fuentes no cambian la decisión explícita de mantener el proyecto existente en Pages.
