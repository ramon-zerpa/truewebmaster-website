# Repositorio definitivo — 30/09/2026

Por instrucción del propietario, el repositorio de trabajo pasa a **https://github.com/True-Webmaster/truewebmaster-site**, privado, rama `main`.

El destino estaba vacío al iniciar el traslado. Se conserva el historial completo de `ramon-zerpa/truewebmaster-website`, los SDD, Pencil, assets, código, validaciones y documentación de hosting. También se incorpora el documento de posicionamiento local que estaba sin seguimiento. No se incluyen dependencias, builds, secretos, artefactos de QA ni el perfil temporal de Chrome, conforme a `.gitignore`.

## Checkout y remotes

Se conserva el checkout local en `C:\Users\raymo\Downloads\truewebmaster-website`, con sus archivos locales y dependencias. No es necesario duplicar la carpeta ni cambiar su nombre para trabajar con el repo nuevo.

- `origin`: `https://github.com/True-Webmaster/truewebmaster-site.git`.
- `legacy`: `https://github.com/ramon-zerpa/truewebmaster-website.git`.
- `main` sigue `origin/main`.

El repo anterior recibe la actualización final y queda como referencia histórica; el trabajo posterior se publica únicamente en `origin`. No se borra ni se archiva el repositorio anterior.

## Cloudflare

El proyecto comprobado en la cuenta accesible (`e647ec8fc06db97c1deb3d61c290ab38`) es `truewebmaster-website`, conectado al repo anterior. El propietario informa que el nuevo repo tendrá conexión Cloudflare. Antes de declarar el deploy definitivo, identificar el proyecto nuevo y verificar `True-Webmaster/truewebmaster-site`, rama `main`, build `npm run validate`, output `dist`, Node `24.21.0`, `SITE_URL=https://www.truewebmaster.com` y `PUBLIC_RELEASE_READY=false` en ambos entornos.

Conservar `_headers`, noindex de preview, assets, comportamiento EN/ES y configuración estática. Vercel permanece retirado. No cambiar DNS ni el dominio legacy como parte del traslado de Git.
