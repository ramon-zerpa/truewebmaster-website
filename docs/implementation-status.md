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
- Preview listo en https://truewebmaster-website.vercel.app/ (EN) y `/es/` (ES), con GitHub privado conectado. Vercel clasifica el alias principal de este proyecto temporal como Production; su finalidad sigue siendo revisión y no tiene el dominio final conectado.
- QA funcional del preview: 24 combinaciones de ruta/ancho (320, 390, 768 y 1440), sin overflow horizontal ni errores del código del sitio. Ocho chequeos automatizados específicos de accesibilidad en Home/contacto EN/ES sin infracciones de las reglas examinadas. Play/pause, movimiento reducido, menú con Escape y menú sin JavaScript pasan. Evidencia local en `artifacts/browser-report.json` y capturas EN/ES.
- El navegador incorpora código AdBlock360, errores de fetch y CSS ajenos al proyecto, incluso por HTTPS. La respuesta de Vercel obtenida con Node no contiene esa inyección. Para QA funcional se suministraron al navegador las respuestas originales mediante `TEST_ISOLATE_TRANSPORT=true`; no se desactivó ni modificó ninguna configuración del usuario. Este método no mide latencia real.
- Lighthouse móvil en el navegador habitual produjo rendimiento 47, accesibilidad 100, best practices 96 y SEO 66. El documento del navegador creció hasta ~909 KB por la inyección externa, frente a ~19,5 KB de HTML original. Ese resultado de rendimiento no valida ni representa la entrega normal del sitio. SEO incluye el bloqueo noindex intencional del preview. No usar esos scores como aprobación final.
- No declarar WCAG ni Core Web Vitals de campo aprobados por estos checks. Faltan medición de rendimiento en entorno limpio, revisión manual completa de accesibilidad, aprobación visual/contenido e integración comercial.

## Pendientes para release

Detalles de oferta y responsabilidades; equipo/historia de About; alcance de trabajo y evidencia para fichas profundas; privacidad y tratamiento de datos; recepción y routing EN/ES; calendario real; decisión sobre URLs legacy de términos, fulfillment, jobs y servicios; mapa de migración aprobado; validación de responsive y contenido por el propietario; pruebas end-to-end y aprobación de publicación final.
