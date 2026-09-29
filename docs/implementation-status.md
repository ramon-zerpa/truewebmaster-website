# True Webmaster — implementación inicial

Fecha: 29 de septiembre de 2026. Fase 05 revisada y aceptada; el propietario autorizó continuar con implementación y preguntas durante el trabajo.

## Decisiones confirmadas en este chat

- Legacy y dominio de continuidad: https://www.truewebmaster.com/.
- Crear Git local y GitHub privado `ramon-zerpa/truewebmaster-website`.
- Vercel en la cuenta personal del propietario para construcción/preview; Cloudflare de la empresa al aprobar y completar el sitio.
- Abrir consultas y reservas en el nuevo sitio; no conservar lista de espera como conversión principal.
- Calendario/formulario de HighLevel todavía inexistentes: dejar la interfaz preparada y conectar después.
- Clientes autorizan publicar nombres y capturas de Affordable Roofing Systems y Palm Wellness Center.
- Usar enlace final de Palm https://www.palmwellness.center/ y presentar el diseño como destino futuro. El propietario informa que el sitio nuevo todavía no reemplaza al anterior: verificar al lanzar, sin cambiar el enlace aprobado de la preview.

## Implementado para revisión

- Astro estático, TypeScript estricto, rutas EN/ES equivalentes, Home y ocho interiores por idioma, privacidad y confirmación provisionales y 404.
- Logo original conservado byte a byte; paleta aprobada, Outfit 700 y DM Sans autoalojadas con licencia.
- Journey completo, filas editoriales, showcase alternado con hover/play/pause/reset, crop estático táctil y movimiento reducido.
- Contacto de demostración desactivado y sin recepción de datos; no existe booking ni éxito simulado.
- Canonical al dominio final, alternates recíprocos, sitemap y protección noindex en HTML y headers de Vercel.
- Primer crawl público del legacy: 26 URLs registradas. Sin datos orgánicos ni redirects aplicados.

## Validación y límites

- Astro check y build inicial: sin errores, 23 documentos HTML (18 comerciales, 4 utilitarios, 404).
- Verificador de idioma, H1 y enlaces locales pasa. CSS inicial aproximadamente 5 KiB gzip.
- Impeccable detector no informó hallazgos mecánicos; se conserva la composición aprobada aunque difiera de preferencias generales de la skill.
- Primer chequeo de contraste encontró texto pequeño sobre turquoise por debajo de 4,5:1; corregido con Night, conservando el turquoise.
- Navegador local incorpora un script externo AdBlock360 de ~237 KB y errores de fetch, ausentes en `src/` y `dist/`. Las pruebas locales de navegador se consideran contaminadas por ese entorno. Verificar en HTTPS sin alterar la configuración del usuario.
- No declarar WCAG ni Core Web Vitals de campo aprobados por estos checks. Falta QA final de preview e integración comercial.

## Pendientes para release

Detalles de oferta y responsabilidades; equipo/historia de About; alcance de trabajo y evidencia para fichas profundas; privacidad y tratamiento de datos; recepción y routing EN/ES; calendario real; decisión sobre URLs legacy de términos, fulfillment, jobs y servicios; mapa de migración aprobado; validación de responsive y contenido por el propietario; pruebas end-to-end y aprobación de publicación final.
