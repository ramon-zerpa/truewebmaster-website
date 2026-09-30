# True Webmaster — hand-off para continuar el SDD

**Estado al 29 de septiembre de 2026:** Fases 01–05 completas y aprobadas. El propietario autorizó implementar el primer preview bilingüe de Astro. Ya existen 22 rutas EN/ES y una página 404. La dirección aprobada de Pencil se conserva. Consultar `docs/implementation-status.md` para las decisiones posteriores y las dependencias de release.

- Preview temporal: https://truewebmaster-website.vercel.app/ y https://truewebmaster-website.vercel.app/es/.
- Repositorio privado: https://github.com/ramon-zerpa/truewebmaster-website.
- Vercel en la cuenta personal para revisión; Cloudflare de la empresa solo tras aprobación final. El dominio legacy sigue sin cambios.
- Contacto y calendario de HighLevel todavía no existen: interfaz preparada, sin envío ni reservas simuladas.
- Permiso de clientes para publicar nombres y capturas confirmado. Palm enlaza al dominio final por instrucción del propietario, aunque el nuevo sitio todavía no está allí.
- Consultas abiertas: la lista de espera legacy no se conserva.

## 1. Cómo retomar en un chat nuevo

Trabajar en `C:\Users\raymo\Downloads\truewebmaster-website`. Leer `AGENTS.md`, después las fases 01, 02, 03 y 04 en orden, este archivo y las dos notas de `pencil-design/`. Inspeccionar el lienzo mediante Pencil MCP y las previsualizaciones actuales antes de proponer cambios visuales. No reabrir decisiones ya aprobadas sin una petición del propietario. Respetar las correcciones posteriores cuando un documento anterior describa una hipótesis superada.

**Encargo vigente para el nuevo chat:** leer también la Fase 05 aprobada y `docs/implementation-status.md`, revisar el preview y continuar con las correcciones del propietario. Resolver contenido e integración comercial pendientes antes del release. Las secciones siguientes conservan el briefing original de Pencil; el estado vigente y las correcciones posteriores de este encabezado prevalecen.

## 2. Dirección de negocio que gobierna el proyecto

- True Webmaster es un **managed digital operations partner for service businesses**. Construye, conecta y administra la operación digital entre website, SEO, consultas, CRM, seguimiento, reservas, reputación, automatización y uso responsable de IA.
- El valor se cuenta como sistema gestionado y resultados que se pretenden facilitar, no como un catálogo de software ni un SaaS white-label. Websites y SEO siguen siendo fortalezas visibles.
- No se enfoca en un nicho único. Roofing y atención clínica demuestran amplitud; no implican que la empresa domine todos los sectores o requisitos regulatorios.
- El sitio público será **Astro** y tendrá recorridos completos y equivalentes en **inglés y español**. El responsable comercial atiende en ambos idiomas. Español incluye navegación, páginas, prueba, contacto, reserva, confirmación y seguimiento.
- La conversión principal provisional es **Book a Strategy Call / Agenda una llamada estratégica**. Su proceso real todavía necesita definición. No prometer una auditoría gratis, métricas o resultados no acreditados.
- Para la ciudad usar **Tampa, FL**. Usar **Tampa Bay** para la región atendida cuando la afirmación sea precisa.

## 3. Decisiones visuales aprobadas

- **Logo:** el archivo existente `pencil-design/true-webmaster-logo.webp` es inmutable.
- **Color:** base azul profundo y turquesa, con metáfora abstracta de corriente. MIST `#A8DDE3` solo en la franja bajo el hero. Las secciones claras de sistema y proyectos usan `#F3F6F8`. Sin beige ni lima dominante; CTA final azul profundo.
- **Tipografía:** Outfit **700** para títulos; DM Sans para párrafos y texto de interfaz. Las alternativas Space Grotesk y Manrope se probaron y descartaron para esta dirección.
- **Home:** en inglés y desktop, con la secuencia posición → problema → sistema → soluciones → diferenciación → prueba → proceso → conversión. El hero plantea “Your business has enough tools. What it needs is one system.”
- **Movimiento:** la última corrección del propietario sustituye las ondas SVG por un campo satinado WebGL con deformación de dominio, fallback Canvas 2D y composición estática; los dos botones de pausa del hero fueron retirados por solicitud posterior del propietario. Ver `docs/hero-animation.md` y `docs/implementation-status.md`. Conexiones/handoffs adicionales siguen sujetos a revisión; no ocultar información en reposo.
- **Cards del hero:** secuencia activa de las cinco etapas, spotlight hover/focus y micro-tilt mínimo en desktop, según el segundo briefing del propietario. Ver `docs/hero-cards.md`. Las cinco etapas permanecen visibles; hover/foco suspenden autoplay y reduced motion preserva el contenido.
- **Proyectos en Home:** dos casos editoriales apilados, con una captura real grande junto a contexto breve. No mostrar etiquetas que sugieran servicios consumidos por el cliente como “Website + Search”. La captura recortada debe desplazarse al hacer hover en desktop, siguiendo como referencia la Home legacy. Pencil solo representa el estado inicial.

- **H1 del hero:** estático EN/ES. Copy actual EN aprobado posteriormente: “Your next customer is already looking. Make sure your business is ready to respond.” El párrafo conecta website, search presence, conversations y follow-up. Dos frases en dos líneas desde 768 px y adaptación natural móvil. La animación de reveal fue rechazada y retirada el 29/09/2026. Ver `docs/hero-headline.md`.
- **Última corrección del hero:** segunda frase de mayor tamaño, en dos líneas desde 768 px; primera frase menor. Home EN usa exactamente el title “Websites, SEO & Automation in Tampa | True Webmaster” y description “True Webmaster builds and manages websites, SEO, CRM, follow-up, and automation systems for Tampa Bay service businesses.” ES adapta ambos metadatos. Esta corrección prevalece sobre la composición anterior de dos líneas totales.
- **Continuidad:** esperar la siguiente solicitud del propietario; los briefs de animación anteriores no deben reintroducir reveal del H1 ni controles de pausa.

## 4. Artefactos y URLs

| Propósito | Ruta o URL |
| --- | --- |
| Lienzo Pencil editable | `pencil-design/design-TWM.pen` |
| Home aprobada, vista exportada | `pencil-design/previews/true-webmaster-home-desktop.png` |
| Brand board aprobado, vista exportada | `pencil-design/previews/true-webmaster-brand-board.png` |
| Bloque de proyectos, vista exportada | `pencil-design/previews/selected-work-showcase.png` |
| Notas de tipografía | `pencil-design/typography-trial.md` |
| Notas de showcase y movimiento | `pencil-design/project-showcase-notes.md` |
| Affordable Roofing Systems, sitio actual/captura | `https://www.affordableroofingflorida.com/` / `pencil-design/assets/affordable-roofing-full.png` |
| Palm Wellness Center, nueva versión para captura | `https://palmwellnesscenter-site-v2.vercel.app/` / `pencil-design/assets/palm-wellness-full.png` |
| Palm, dominio final previsto | `https://www.palmwellness.center/` (confirmar lanzamiento antes de enlazar como sitio nuevo) |

Los PNG de página completa son fuentes para Pencil, no assets optimizados para la web pública. Las exportaciones y comparativas están en `pencil-design/previews/`. Comprobar que el `.pen` haya guardado la última edición al abrirlo; los PNG sirven de referencia independiente.

## 5. Fase 05: contenido que debe especificar

1. **Alcance del primer release y mapa de páginas.** Partir de las nueve páginas de Fases 02–04; decidir si todas entran en el primer release sin dejar una versión lingüística incompleta.
2. **Arquitectura bilingüe.** Rutas EN/ES, equivalencias, selector de idioma, metadata localizada, `hreflang`, sitemap y manejo de páginas aún no publicadas.
3. **Modelo de contenido.** Copy EN/ES por página, claims aprobables, responsabilidades y límites de cada solución, casos de estudio y contenido que aún requiere datos del negocio.
4. **Conversión.** Definir llamada estratégica, duración, responsable, calendario/formulario, intake mínimo, privacidad y consentimiento, alternativa escrita, estados de error/confirmación y continuidad del idioma hasta el seguimiento.
5. **Interacciones y responsive.** Traducir la Home aprobada a móvil y español sin necesitar otra ronda extensa de Pencil salvo que una decisión visual lo exija. Especificar hero, navegación, proyecto con hover/focus/táctil, movimiento reducido y estados.
6. **Assets y rendimiento.** Política de imágenes y fuentes optimizadas, carga diferida de capturas, presupuestos de JavaScript/animación y objetivos medibles de Core Web Vitals. Astro debe usarse con hidratación mínima y HTML semántico.
7. **SEO y migración.** Inventariar URLs, contenido, metadatos y rendimiento orgánico del legacy antes de decidir redirects o retirar páginas. Preservar autoridad de websites/SEO sin llevar lenguaje de agencia genérica al nuevo sitio.
8. **Criterios de aceptación.** Definir cómo verificar paridad bilingüe, contenido real, enlaces, formularios, accesibilidad, responsive, SEO técnico, velocidad y comportamiento con movimiento reducido.

## 6. Datos aún pendientes del negocio

- Alcance exacto, responsables y límites de website, SEO, CRM, seguimiento, automatización, reputación e IA; qué se gestiona directamente y qué depende de terceros.
- Detalles operativos y destino real de “Book a Strategy Call”, incluida la atención EN/ES y el seguimiento.
- Evidencia y permisos de Affordable Roofing y Palm: qué hizo True Webmaster, fechas, capturas autorizadas, testimonios, resultados verificables y atribución. Palm aún está por publicarse en su dominio final.
- Copy y terminología española revisados por el negocio; políticas de privacidad, consentimiento y comunicaciones aplicables.
- Inventario de URLs y contenido legacy, lista de fuentes detrás de los marcadores `[cite:…]` de las primeras fases, y alcance geográfico aprobado.

## 7. Herramientas y límites de trabajo

Seguir `AGENTS.md` y la skill global `astro-frontend-master`. Usar `ui-ux-pro-max` para dirección UX/UI, Pencil MCP para el `.pen`, `perf-astro` para orientación de rendimiento Astro y `seo` para auditoría SEO profunda. Las skills aportan métodos; las fases SDD y las decisiones del propietario mandan. No escribir código Astro en el encargo de Fase 05.

Existe una carpeta temporal de perfil de Chrome `pencil-design/capture-profile-roofing` creada durante la captura de sitios. No forma parte del diseño ni debe incluirse en futuros entregables. Una revisión automática bloqueó su eliminación recursiva con el motivo “blocked by policy”; queda pendiente limpieza autorizada por el entorno o manual. Las capturas útiles están separadas en `pencil-design/assets/`.

## 8. Prompt sugerido para el nuevo chat

> Continuemos el proyecto True Webmaster en `C:\Users\raymo\Downloads\truewebmaster-website`. Lee `AGENTS.md`, las fases SDD 01–04 en orden y `PROJECT-HANDOFF.md`; revisa también las notas y vistas actuales de `pencil-design/`. La dirección visual acotada está aprobada. Redacta la **Fase 05: especificación de Astro y contenido bilingüe** como un nuevo Markdown en el proyecto, con decisiones de arquitectura, rutas EN/ES, páginas y contenido del primer release, interacciones/responsive, conversión, SEO/migración, rendimiento, accesibilidad, dependencias y criterios de aceptación. Conserva el posicionamiento de managed digital operations, el logo, la paleta y Outfit 700/DM Sans aprobados. No crees código Astro todavía. Distingue lo confirmado de lo pendiente y detente tras entregar la Fase 05 para mi revisión.
