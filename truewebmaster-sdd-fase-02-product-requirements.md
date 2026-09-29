# True Webmaster — SDD Fase 02: Product Requirements y arquitectura inicial del sitio

## Objetivo de esta fase

Traducir la dirección estratégica aprobada en una especificación clara para que Codex pueda planificar correctamente la experiencia, la arquitectura del sitio y la futura implementación en Astro.

Esta fase no entra todavía en diseño visual detallado. Su propósito es definir qué debe comunicar el sitio, cómo debe organizarse, qué páginas necesita, qué narrativa debe seguir y qué acciones debe provocar.

## Product statement

True Webmaster será un website corporativo de nueva generación orientado a posicionar la empresa como un **managed digital systems partner** para service businesses de Tampa Bay, combinando website de alto rendimiento, SEO, CRM, automatización, follow-up, reputación y AI-enabled operations en una sola experiencia clara y creíble.[cite:18][cite:22][cite:25][cite:32]

## Problema principal que resuelve el sitio

Hoy muchos negocios locales tienen herramientas desconectadas, websites débiles, seguimiento inconsistente, llamadas perdidas, reputación poco trabajada y poca claridad sobre cómo usar IA en operaciones reales.[cite:22][cite:24][cite:25][cite:41]

El nuevo sitio debe hacer evidente que True Webmaster resuelve ese caos unificando presencia, captación, respuesta y operación en un sistema gestionado.

## Job to be done del visitante

Cuando un dueño o decision-maker visite el sitio, debe poder responder rápidamente estas preguntas:

- ¿Qué hace exactamente True Webmaster ahora?
- ¿Es una agencia, una consultora o un partner técnico?
- ¿Qué parte del negocio digital puede manejar?
- ¿Sirve para mi tipo de empresa?
- ¿Cómo sería trabajar con ellos?
- ¿Por qué confiar en ellos frente a otras agencias o automatizadores?
- ¿Cuál es el siguiente paso?

## Requisitos principales del producto

### R1. Reposicionar la categoría

El sitio debe explicar que True Webmaster no es solamente una agencia de marketing. Debe presentarla como una empresa que diseña y administra operaciones digitales: website, search, CRM, follow-up, booking, reviews y automation en un sistema continuo.[cite:37][cite:47][cite:49]

### R2. Mantener continuidad con la marca existente

El sitio no debe parecer una empresa completamente nueva sin conexión con el legado. Debe conservar la autoridad previa en websites, SEO, mantenimiento y acompañamiento continuo, ahora dentro de una capa más moderna.[cite:40][cite:43][cite:44]

### R3. Hacer visible el sistema

El visitante debe entender visualmente cómo se conectan los componentes del servicio. El sitio debe incluir al menos una explicación de flujo o framework donde se vea:

- Search or discovery.
- Website or landing page.
- Conversation or inquiry.
- CRM capture.
- Follow-up automation.
- Booking or sales process.
- Review, retention or reactivation.

### R4. Comercializar soluciones, no herramientas

En vez de vender una lista larga de features, el sitio debe organizar su oferta alrededor de sistemas o paquetes de resultado.

### R5. Facilitar futura escalabilidad

La arquitectura debe permitir crecer hacia:

- Casos de estudio.
- Industry pages.
- Service detail pages.
- SEO landing pages locales.
- Recursos o playbooks.
- Páginas de comparación estratégica.

### R6. Generar conversaciones de alto valor

El principal CTA no debe empujar a “buy now”, sino a una acción de confianza alta como:

- Book a strategy call.
- Request a systems audit.
- Schedule a discovery session.

### R7. Ofrecer una experiencia bilingüe completa

El sitio debe comunicar la propuesta de True Webmaster en **inglés y español**. Cada idioma debe permitir entender el posicionamiento, explorar las páginas principales, evaluar pruebas y proceso, y completar el recorrido de contacto. El contenido en español debe adaptarse al lenguaje natural del público, preservando la misma oferta, alcance y nivel de evidencia que en inglés. La selección de idioma debe ser clara y mantener al visitante en la página equivalente cuando exista. Esta decisión fue incorporada posteriormente por el propietario del proyecto.

## Audiencia

### Audiencia primaria

Dueños y responsables de crecimiento u operaciones en service businesses que:

- Dependen de leads locales o regionales.
- Necesitan responder rápido.
- Tienen procesos manuales o fragmentados.
- No quieren coordinar múltiples proveedores.
- Valoran claridad técnica y ejecución confiable.

### Audiencia secundaria

- Clientes que ya conocen la marca por websites o SEO y ahora necesitan más.
- Negocios que ya usan herramientas tipo CRM/automation, pero están mal implementadas.
- Leads que comparan agencias contra soluciones más operativas.

## Oferta a estructurar en el sitio

### Arquitectura recomendada de soluciones

| Solución | Propósito | Componentes típicos |
|---|---|---|
| Digital Foundation | Base pública y técnica | Astro website, analytics, tracking, SEO técnico, schema, hosting, GBP |
| Lead Response System | Responder y capturar más rápido | Forms, inbox, call routing, AI chat, calendar, missed-call recovery |
| Sales Follow-Up System | Mover oportunidades | CRM, pipelines, reminders, automations, SMS, email nurturing |
| Reputation & Retention | Mejorar reviews y reactivar clientes | Review requests, reactivation, referral and retention workflows |
| Managed Digital Operations | Operar y optimizar todo el sistema | Reporting, monitoring, support, integrations, iteration roadmap |

Estas soluciones se derivan del mercado actual y del set de capacidades visibles en HighLevel y en competidores locales que venden una lógica de sistema unificado.[cite:7][cite:8][cite:10][cite:18][cite:22][cite:25][cite:26][cite:32]

## Arquitectura de información inicial

### Sitemap mínimo recomendado

El sitemap se aplica a ambos idiomas. Las nueve páginas principales necesitan versiones equivalentes en inglés y español; las páginas futuras también deberán planificarse por idioma antes de publicarse.

1. Home
2. Solutions
3. How It Works
4. Websites & SEO
5. AI & Automation
6. CRM & Follow-Up
7. About
8. Case Studies or Results
9. Contact / Strategy Call

### Posible expansión futura

- Industry pages: med spas, legal, contractors, clinics, etc.
- Tampa / Brandon / St. Pete local pages.
- Comparison pages.
- Resource hub.
- FAQ por sistema.

## Requisitos por página

### Home

Debe resolver posicionamiento, diferenciación y CTA principal.

#### Secciones mínimas

- Hero con nueva categoría.
- Trusted/credibility strip.
- Explicación breve del problema actual del mercado.
- Visual del sistema o journey.
- Bloque de soluciones principales.
- Diferenciadores.
- Proof or case studies preview.
- Process overview.
- CTA final.

### Solutions

Debe mostrar la oferta como un conjunto de sistemas conectados, no como servicios aislados.

### How It Works

Debe explicar el modelo operativo tipo partner:

1. Audit.
2. Architect.
3. Build.
4. Operate.
5. Improve.

### Websites & SEO

Debe preservar y elevar el legado técnico de True Webmaster. Tiene que dejar claro que websites y SEO siguen siendo pilares del sistema, no extras heredados.[cite:43][cite:44]

### AI & Automation

Debe presentar la capa moderna sin sonar hype-driven. Debe explicar automatización, chat, inbox, routing, workflows y uso responsable de IA. Debe evitar promesas vagas y contemplar supervisión humana.[cite:8][cite:54]

### CRM & Follow-Up

Debe explicar que la empresa también administra la capa operativa de ventas y seguimiento, que es donde muchos negocios pierden oportunidades.

### About

Debe reforzar cercanía, expertise técnico, foco Tampa Bay y continuidad de relación.

### Results / Case Studies

Debe mostrar evidencia concreta. Aunque los casos completos no existan al inicio, la arquitectura debe prever espacio para:

- Situation.
- System installed.
- Before / after.
- Metrics.
- Scope.

### Contact / Strategy Call

Debe reducir fricción, aumentar confianza y preparar la conversión principal del sitio.

## CTA strategy

### CTA primario

- Book a Strategy Call
- Request a Systems Audit
- Schedule Discovery

### CTA secundarios

- See How It Works
- Explore Solutions
- View Results

### CTA a evitar

- Get More Leads
- Buy Now
- Start Free Trial

Esos CTAs desplazan la percepción hacia agencia de marketing o SaaS, no hacia socio técnico.

## Proof requirements

El nuevo sitio debe contemplar pruebas que refuercen la promesa de ingeniería operativa:

- Casos de estudio.
- Logos o marcas si existen permisos.
- Resultados de SEO o performance donde sean demostrables.
- Flujo del sistema explicado visualmente.
- Screenshots o mockups de operación si son útiles.
- Métricas de response time, booked calls, recovered opportunities o reviews si más adelante están disponibles.

## Content requirements

Codex debe asumir que el proyecto necesitará después contenido específico para:

- Hero copy.
- Category explanation.
- Solution pages.
- Process narrative.
- FAQs.
- Microcopy de CTAs.
- About story.
- Placeholder structure para casos y resultados.

## Functional requirements del front-end

### Navegación

- Header claro con IA mínima en el top level.
- Priorización de Solutions, Process, Results y Contact.
- Sticky header usable.
- Mobile navigation bien jerarquizada.
- Selector visible y accesible de inglés/español que preserve el contexto de la página cuando exista una versión equivalente.

### Conversión

- CTA persistente pero no agresivo.
- Múltiples puntos naturales de contacto.
- Formularios o puentes hacia booking system.
- Tracking de eventos clave.
- Formularios, confirmaciones, mensajes de error y experiencia de booking disponibles en el idioma elegido; definir cómo se atenderán las consultas recibidas en español.

### Performance

- Mantener estándar alto de performance por el posicionamiento técnico de la marca.[cite:43][cite:44]
- Arquitectura apta para Core Web Vitals exigentes.
- Evitar site-builder aesthetics y sobrecarga visual innecesaria.

### SEO

- Arquitectura semántica fuerte.
- Capacidad de escalar contenido local y vertical.
- Metadata, schema y enlaces internos bien pensados.
- Slugs limpios y estructura apta para crecimiento.
- URLs diferenciadas por idioma, enlaces recíprocos entre versiones equivalentes, metadata localizada y señales de idioma para buscadores. Evitar páginas de un idioma con contenido principal o CTAs del otro.

## Requisitos de tono

El tono del sitio debe sentirse:

- Técnico pero claro.
- Moderno pero sobrio.
- Premium pero accesible.
- Con confianza operativa, no hype.
- Humano, local y experto.

Estos atributos deben mantenerse en inglés y español. La redacción española debe ser natural y clara para negocios de servicios, sin depender de traducción literal de términos comerciales en inglés.

## Requisitos de diseño a trasladar a la fase visual

La fase de diseño debe explorar una estética que comunique:

- Sistema.
- Conectividad.
- Operación.
- Claridad.
- Performance.
- Confianza premium.

Debe evitar la estética SaaS genérica basada en gradientes púrpura, íconos en circulitos, grids repetitivos y clichés de IA.[cite:32]

## Riesgos que la arquitectura debe prevenir

- Parecer otra agencia local genérica.
- Parecer un SaaS white-label disfrazado.
- Comunicar demasiadas capacidades a la vez.
- Borrar demasiado la herencia de websites y SEO.
- Hacer promesas demasiado amplias respecto a IA y automatización.

## Open questions para la siguiente fase

Estas preguntas deben resolverse en la fase de planificación detallada o visual:

- ¿Cuál será el nicho inicial más prioritario?
- ¿Cuál será el CTA principal definitivo?
- ¿Qué pruebas reales hay disponibles hoy?
- ¿Qué nombre tendrá cada solución comercial?
- ¿Qué nivel de protagonismo tendrán AI, CRM y websites en el home?
- ¿Qué estilo visual representa mejor la nueva categoría?

## Entregable esperado de la siguiente fase

La siguiente fase debe convertir este PRD en un plan de experiencia y contenido más aterrizado, incluyendo:

- Narrative architecture.
- Secciones exactas por página.
- Prioridad de mensajes.
- User journeys.
- Wireframe strategy.
- Design direction briefing para Pencil.
