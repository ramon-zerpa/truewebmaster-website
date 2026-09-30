# True Webmaster — SDD Fase 05: Especificación de Astro y contenido bilingüe

**Fecha:** 29 de septiembre de 2026.  
**Estado:** especificación aprobada por el propietario en este chat; implementación autorizada posteriormente con «Ok, continuemos! Me vas preguntando...». Los permisos, claims y datos comerciales pendientes siguen sujetos a verificación.  
**Entregable:** especificación de contenido, arquitectura y comportamiento del primer release. No incluye código Astro, instalaciones, cambios del diseño ni publicación.

## 1. Autoridad, alcance y estados de decisión

Se leyeron `AGENTS.md`, las fases SDD 01–04 en orden, `PROJECT-HANDOFF.md`, `pencil-design/typography-trial.md` y `pencil-design/project-showcase-notes.md`. Se revisaron las tres previsualizaciones actuales: brand board, Home desktop y Selected work. Pencil MCP confirmó el lienzo activo `pencil-design/design-TWM.pen`, sus dos vistas principales, variables y títulos Outfit 700. No se reinterpretó el archivo `.pen` por fuera de Pencil.

Las correcciones posteriores de Fase 04 y el handoff prevalecen sobre recomendaciones anteriores. La aprobación cubre **brand board y Home en inglés para desktop** como punto de partida visual. No acredita aprobación de móvil, español, interiores, claims, formularios o calendario.

Esta especificación usa tres estados:

| Estado | Significado |
| --- | --- |
| **Confirmado** | Decisión explícita del propietario o requisito vinculante de fases anteriores. |
| **Propuesto F05** | Decisión concreta presentada aquí para aprobación; no se considera aprobada por estar documentada. |
| **Pendiente** | Requiere información, permiso, evidencia o elección operativa antes de construir o publicar la parte afectada. |

**Confirmado:** managed digital operations para negocios de servicios; website y SEO como fundamento visible; CRM, seguimiento, reservas, reputación, automatización e IA supervisada dentro del sistema; relación continua; Astro público; recorridos completos EN/ES; ausencia de nicho único; responsable comercial bilingüe; ciudad “Tampa, FL”. “Tampa Bay” se reserva para la región y requiere precisión sobre cobertura.

**Confirmado visual:** logo inmutable, Outfit 700/DM Sans, paleta aprobada, corriente abstracta, CTA final azul profundo y dos proyectos editoriales apilados. No introducir paquetes, precios, estadísticas, testimonios, experiencia regulatoria, disponibilidad 24/7 ni garantías por inferencia.

**Propuesto F05:** alcance de release, rutas, contratos de contenido, textos candidatos, responsive, interacción, presupuestos técnicos y pruebas descritos abajo. Aprobar F05 habilitará la implementación futura conforme a las dependencias; no aprobará automáticamente claims que aún carezcan de evidencia.

## 2. Primer release y límites

**Propuesto F05:** publicar las nueve páginas principales en ambos idiomas en el mismo release: **18 páginas comerciales**. Incluir privacidad y confirmación en ambos idiomas: **cuatro rutas auxiliares**, más respuesta 404 localizada. La confirmación queda fuera del índice y del sitemap. El release debe ser completo en los dos idiomas, no EN primero y ES después.

Results se presentará inicialmente como **Selected work / Proyectos seleccionados**, con ejemplos y alcance verificable. Su propósito de evidencia se conserva sin llamarlo una colección de resultados medidos cuando todavía no existen esos datos.

La Home mantiene los dos proyectos aprobados. Permisos y descripciones son una dependencia de publicación: si alguno no puede publicarse, se solicita una decisión expresa sobre el release o su sustitución. No se elimina, reemplaza ni presenta un caso ficticio para llenar el espacio.

Fuera del release: páginas individuales de las cinco soluciones, casos extensos con métricas, blog, recursos, páginas por ciudad o industria, comparaciones, precios, portal de cliente, chatbot público y campañas de auditoría gratuita. Se podrán añadir después con contenido y alcance propios. La migración puede necesitar conservar páginas legacy adicionales con valor orgánico; el inventario determinará cuáles, sin limitarse artificialmente a las 18 páginas comerciales.

## 3. Arquitectura de Astro

### 3.1 Renderizado y responsabilidades

**Propuesto F05:** generar HTML estático en build para las páginas públicas. Astro será responsable de layouts, contenido, metadatos y assets optimizados. CSS resolverá layout y la mayor parte del movimiento. Scripts pequeños atenderán menú, controles de preview y mejora del formulario. No se necesita un framework de cliente para esas funciones; una isla se añadirá únicamente si una necesidad comprobada lo justifica. Astro permite aislar la interactividad sin convertir toda la página en una aplicación de cliente. [Referencia: arquitectura de islas](https://docs.astro.build/en/concepts/islands/).

Separar tres responsabilidades:

| Capa | Responsabilidad propuesta | Límite |
| --- | --- | --- |
| Sitio estático | Explicar, orientar y permitir contacto; HTML usable desde la primera respuesta. | No depende del CRM para renderizar contenido público. |
| Recepción de consultas | Endpoint propio o proveedor aprobado con validación, control de abuso y confirmación de recepción. | Credenciales y llamadas privadas al CRM solo del lado servidor. |
| Operación comercial | Registro, asignación bilingüe, calendario y seguimiento. | Su proveedor, SLA y reglas requieren confirmación del negocio. |

La recepción puede vivir en una función del hosting o un servicio externo compatible. No exige renderizar todo el sitio bajo demanda. Si se elige un endpoint dentro de Astro, se revisarán adaptador y despliegue antes de fijar esa arquitectura. No se selecciona hosting ni se presume que HighLevel ya tiene cuentas, calendarios o workflows preparados.

### 3.2 Organización futura, sin crear archivos ahora

| Área lógica | Contenido y responsabilidad |
| --- | --- |
| Layout público | Idioma, head SEO, skip link, header, main y footer compartidos. |
| Registro de rutas | Identidad estable de página, URL EN/ES, estado publicado y equivalencias de anclas. |
| Contenido por idioma | Texto editorial separado de componentes; cada página tiene versión revisada EN y ES. |
| Componentes Astro | Hero, journey, filas de soluciones, pilares, showcase, proceso, FAQ, CTA y contacto. |
| Evidencia de proyectos | Datos compartidos de cliente, fuente, permisos, estado y alcance; narrativas localizadas. |
| Assets | Logo aprobado, fuentes, screenshots derivados y gráficos de corriente. |
| Integraciones | Adaptadores pequeños para consulta, calendario y medición; sin lógica comercial mezclada en el layout. |

TypeScript estricto propuesto para los contratos. Contenido corto estructurado en datos locales; narrativas largas y futuras fichas en colecciones de contenido con esquema validado en build. Las colecciones de Astro ofrecen validación de datos y organización del contenido. [Referencia: content collections](https://docs.astro.build/en/guides/content-collections/).

Un solo template por propósito de página, alimentado por contenido localizado, evita duplicar comportamiento entre EN/ES. La composición puede variar donde el texto lo necesite; no se obliga a igualar altura ni número de líneas. Formularios y metadatos se generan desde contratos compartidos, sin textos EN como fallback silencioso en ES.

## 4. Rutas y navegación EN/ES

### 4.1 Convención propuesta

**Propuesto F05:** inglés sin prefijo, español bajo `/es/`, slugs españoles adaptados, minúsculas y barra final. Mantener `/` como Home inglesa conserva la URL de entrada potencial del legacy sin introducir una pantalla de selección. Es una propuesta de continuidad, no una conclusión de una auditoría del sitio vigente. Los slugs interiores se ratificarán tras el inventario legacy.

Astro admite un idioma predeterminado sin prefijo y otros idiomas con prefijo. Las rutas físicas deberán corresponder a la estrategia elegida. [Referencia: i18n routing](https://docs.astro.build/en/guides/internationalization/).

| ID estable | Página / navegación EN | Ruta EN | Página / navegación ES | Ruta ES |
| --- | --- | --- | --- | --- |
| home | Home | `/` | Inicio | `/es/` |
| solutions | Solutions | `/solutions/` | Soluciones | `/es/soluciones/` |
| process | How it works | `/how-it-works/` | Cómo trabajamos | `/es/como-trabajamos/` |
| websites | Websites & SEO | `/websites-seo/` | Sitios web y SEO | `/es/sitios-web-seo/` |
| automation | AI & Automation | `/ai-automation/` | IA y automatización | `/es/ia-automatizacion/` |
| crm | CRM & Follow-Up | `/crm-follow-up/` | CRM y seguimiento | `/es/crm-seguimiento/` |
| work | Selected work | `/results/` | Proyectos seleccionados | `/es/proyectos/` |
| about | About | `/about/` | Sobre nosotros | `/es/sobre-nosotros/` |
| contact | Contact / Strategy call | `/contact/` | Contacto / Llamada estratégica | `/es/contacto/` |
| privacy | Privacy | `/privacy/` | Privacidad | `/es/privacidad/` |
| confirmation | Inquiry received | `/thank-you/` | Consulta recibida | `/es/gracias/` |

No publicar duplicados `/en/`. Si el inventario encuentra URLs existentes con ese prefijo, resolverlas en el mapa de migración. Las rutas auxiliares de confirmación solo comunican recepción; una reserva confirmada corresponde al estado real del calendario.

**404:** estado HTTP 404 real, texto ES para rutas desconocidas bajo `/es/`, EN para las demás; enlaces a Home y contacto de ese idioma. El hosting debe soportar esa selección sin una redirección a Home con HTTP 200. Si no puede hacerlo, resolver el mecanismo antes de publicar.

### 4.2 Navegación y selector

Header conserva la dirección aprobada: logo, Solutions, How it works, Selected work, About, selector y CTA. En ES: Soluciones, Cómo trabajamos, Proyectos, Sobre nosotros. Las tres páginas especialistas se enlazan desde Solutions y desde el footer; todas las páginas comerciales deben recibir enlaces HTML rastreables.

Logo enlaza a la Home del idioma actual. CTA principal enlaza a contacto en el mismo idioma; nunca directamente a un calendario inglés global. CTA secundario del hero conduce a la página de proceso; un enlace específico puede llevar al journey de Home.

Selector visible **English / Español**, sin depender de banderas. Dos enlaces reales, idioma actual identificado, nombre accesible completo. Resuelve equivalencias por ID estable, no por sustitución de palabras en la URL. Conserva fragmento si la sección existe en ambos idiomas; en otro caso abre la página equivalente desde arriba. No copia datos personales ni contenido del formulario a la URL. No transmite campos ya escritos al cambiar idioma.

No redirigir por IP, idioma del navegador ni almacenamiento local. El idioma de la URL manda. Para una futura página sin equivalente, mostrar disponibilidad explícita y un enlace voluntario al otro idioma; no incluir una equivalencia falsa en `hreflang`. En el release inicial, todas las páginas principales deben tener su pareja.

## 5. Contrato de contenido y aprobación editorial

### 5.1 Campos requeridos

Cada página tendrá: ID, locale, slug, estado editorial, H1, introducción, bloques ordenados, CTA, enlaces relacionados, título SEO, descripción, imagen social, equivalencia y responsable/revisión. Diferenciar `draft`, `reviewed` y `publishable`; solo contenido publicable entra al build de producción.

Cada claim tendrá: ID, texto EN/ES, tipo (posicionamiento, capacidad, proyecto o resultado), fuente, responsable de verificación y permiso cuando corresponda. Una capacidad pendiente no se publica en indicativo como servicio disponible. Los escenarios ilustrativos se etiquetan como ejemplos y no como implementación de un cliente.

Cada proyecto tendrá: cliente, sector, estado del sitio, captura y fecha, destino público verificado, trabajo exacto de True Webmaster, fechas, permiso por activo, descripción EN/ES y limitaciones. Una métrica opcional requiere baseline, resultado, unidad, período, método, fuente y atribución; sin esos datos se omite.

**Pendiente:** aprobación editorial del negocio en ambos idiomas y confirmación de capacidades. El responsable comercial bilingüe puede revisar, pero el propietario debe confirmar quién aprueba definitivamente copy y traducciones.

### 5.2 Terminología propuesta

| EN | ES propuesto | Regla |
| --- | --- | --- |
| Managed digital operations | Operaciones digitales administradas | Explicar inmediatamente qué se conecta y quién lo gestiona. |
| Managed digital operations partner | Socio que construye y administra tu operación digital | Expresión natural para titulares o introducciones. |
| Service businesses | Negocios de servicios | Sin restringirlo a roofing o atención clínica. |
| Inquiry | Consulta | Distinguir de una oportunidad calificada. |
| Follow-up | Seguimiento | Evitar usar el anglicismo en el texto español. |
| Booking | Reserva / cita | Elegir según la acción real; la llamada es una cita. |
| Human oversight | Supervisión humana | Explicar responsabilidad y punto de intervención. |
| Selected work | Proyectos seleccionados | No equivale a resultados medidos. |

Tono técnico, humano, sobrio y comprensible. No presentar HighLevel como protagonista. No reutilizar `[cite:…]` como evidencia pública: falta la bibliografía original. No trasladar investigación competitiva a promesas de conversión del sitio.

## 6. Home: secuencia y texto candidato EN/ES

Todos los textos nuevos de esta sección son **Propuesto F05**. El headline inglés central y la composición vienen de la dirección aprobada; el copy final debe revisarse. Mantener la secuencia visual actual, sin agregar una sección vacía de logos ni estadísticas sin respaldo.

| Bloque | EN candidato | ES candidato | Comportamiento / destino |
| --- | --- | --- | --- |
| Hero: categoría | Managed digital operations / Tampa, FL | Operaciones digitales administradas / Tampa, FL | Descriptor con explicación inmediata. |
| Hero: H1 | Your business has enough tools. What it needs is one system. | Tu negocio ya tiene suficientes herramientas. Lo que necesita es un sistema conectado. | Outfit 700; saltos de línea adaptados por idioma. |
| Hero: apoyo | We build and manage the digital journey behind your service business — from being found online to responding, following up, booking, and staying connected. | Construimos y administramos el recorrido digital de tu negocio de servicios: desde que te encuentran en internet hasta la respuesta, el seguimiento, las citas y la relación con tus clientes. | No prometer resultados garantizados. |
| Hero: acciones | Book a Strategy Call / See How the System Works | Agenda una llamada estratégica / Conoce cómo funciona el sistema | Contacto y proceso, respectivamente. CTA principal provisional. |
| Journey compacto | Get found → Start the conversation → Keep it moving → Turn interest into action → Stay connected | Que te encuentren → Inicia la conversación → Mantén el seguimiento → Avanza al siguiente paso → Mantén la relación | Cinco etapas visibles y legibles sin animación. |
| Franja MIST | Built for service businesses with real handoffs to manage. / Based in Tampa, FL / English + Spanish service / Ongoing partnership | Para negocios de servicios que necesitan coordinar cada paso. / En Tampa, FL / Atención en inglés y español / Acompañamiento continuo | Señal de encaje y continuidad; no una estadística de confianza. |
| Problema | A missed handoff can undo a great first impression. | Un paso sin atender puede debilitar una buena primera impresión. | Tres fallos: consulta sin respuesta, siguiente paso incierto, seguimiento que depende de la memoria. |
| Sistema | From first search to lasting relationship. | Desde la primera búsqueda hasta una relación duradera. | Website y búsqueda → consulta y respuesta → CRM y seguimiento → cita y traspaso → reputación y relación. |
| Soluciones | Start with the bottleneck. Build the connected system. | Empieza por el punto de fricción. Construye el sistema conectado. | Cinco filas editoriales; enlazan a Solutions y sus secciones. |
| Diferenciación | Built for the work after launch. | Preparados para el trabajo que continúa después del lanzamiento. | Base técnica, conexión operativa y gestión continua. Alcance sujeto a contrato. |
| Proyectos | Real businesses. Specific work. Clear context. | Negocios reales. Trabajo concreto. Contexto claro. | Dos filas aprobadas; ver reglas de publicación en sección 9. |
| Proceso | A partner who stays with the system. | Un socio que sigue al frente del sistema. | Audit → Architect → Build → Operate → Improve; enlace a proceso. |
| CTA final | Let's find the handoff that's holding your business back. | Identifiquemos el paso que está frenando a tu negocio. | Apoyo: cuéntanos cómo llegan las consultas, dónde se frenan y qué quieres mejorar. |
| Alternativa escrita | Prefer to write? Send an inquiry. | ¿Prefieres escribir? Envía una consulta. | Contacto, ancla del formulario; no segundo funnel. |

Texto candidato del bloque problema:

- **EN:** “Calls, forms, and messages arrive in different places. Without a clear owner and next step, an inquiry can stall. We start by understanding those handoffs and connecting the work around them.”
- **ES:** “Las llamadas, los formularios y los mensajes llegan por canales distintos. Sin un responsable y un siguiente paso claro, una consulta puede quedarse pendiente. Empezamos por entender esos traspasos y conectar el trabajo que los rodea.”

Texto candidato de diferenciación:

- **EN:** “Our foundation is websites and search. The broader operation connects inquiries, response, CRM, and follow-up around an agreed process. Ongoing management keeps responsibilities visible and improvements focused.”
- **ES:** “Nuestra base son los sitios web y la presencia en buscadores. La operación conecta consultas, respuesta, CRM y seguimiento según un proceso acordado. La gestión continua mantiene claras las responsabilidades y las prioridades de mejora.”

Footer: logo existente, descriptor localizado, enlaces a las nueve páginas, privacidad, idioma y “Tampa, FL”. Teléfono, correo, perfiles sociales, entidad legal y dirección postal solo con datos aprobados. No inventar año de fundación ni dirección física.

## 7. Páginas interiores y contenido del release

Cada página tendrá un H1, introducción propia, contenido suficiente para responder su intención, relaciones con el sistema y un CTA contextual a contacto. Los textos siguientes son borradores revisables; no constituyen servicios ni alcances comerciales confirmados.

### 7.1 Solutions / Soluciones

**H1 EN:** Connected solutions for the way your business works.  
**H1 ES:** Soluciones conectadas para la forma en que trabaja tu negocio.

**Introducción EN:** “Start with the gap that matters most. We look at how customers find you, make contact, receive a response, and move to the next step. The scope is built around that journey and the people responsible for it.”  
**Introducción ES:** “Empieza por la brecha más importante. Revisamos cómo te encuentran los clientes, cómo consultan, cómo reciben respuesta y cómo avanzan. El alcance se define alrededor de ese recorrido y de las personas responsables.”

Orden: introducción → journey breve → cinco categorías → cómo elegir el punto de partida → alcance y responsabilidades → proyectos relacionados → contacto. Las categorías son grupos de contenido; no tiers ni paquetes obligatorios.

| Categoría EN / ES | Problema y mejora propuesta | Trabajo típico sujeto a confirmación | Límite que debe quedar visible |
| --- | --- | --- | --- |
| Digital foundation / Base digital | Una presencia confusa o lenta dificulta encontrar y contactar al negocio. Base clara, rápida y medible. | Website, SEO técnico/local, medición y mantenimiento. | Ranking, tráfico y ventas no garantizados; permisos de hosting/GBP por definir. |
| Lead response / Respuesta a consultas | Las consultas llegan sin dueño o siguiente paso. Hacer visible quién responde y cómo. | Formularios, inbox, routing y conexión a calendario. | No prometer atención 24/7 ni tiempos de respuesta sin operación confirmada. |
| Sales follow-up / Seguimiento comercial | Oportunidades dispersas y recordatorios manuales. Mantener próximos pasos visibles. | CRM, pipeline, recordatorios y workflows acordados. | El cliente conserva las decisiones de venta; canales e integraciones se evalúan. |
| Reputation & retention / Reputación y relación con clientes | La relación pierde continuidad tras el servicio. Facilitar seguimiento apropiado. | Solicitudes de reseña, recordatorios y reactivación permitida. | Sin reseñas garantizadas ni comunicaciones sin política y permisos. |
| Managed operations / Operación administrada | Herramientas y proveedores evolucionan por separado. Coordinar soporte y mejora. | Monitoreo, mantenimiento, reporting e iteración acordada. | Definir horario, responsable, frecuencia y tareas incluidas; no administrar todo el negocio. |

Cada categoría enlaza a la página especialista pertinente; reputación y gestión se desarrollan aquí y en proceso, sin páginas vacías. Antes de publicar, el negocio confirma para cada fila: qué entrega hoy, qué mantiene, qué depende del cliente/proveedor y qué se cotiza aparte.

### 7.2 How It Works / Cómo trabajamos

**H1 EN:** A clear process. An ongoing partnership.  
**H1 ES:** Un proceso claro. Una relación continua.

**Introducción EN:** “We begin with the current operation, agree on priorities, and build the connections that matter. After launch, the work continues through monitoring, maintenance, and improvements within the agreed scope.”  
**Introducción ES:** “Empezamos por la operación actual, acordamos prioridades y construimos las conexiones necesarias. Después del lanzamiento, el trabajo continúa con monitoreo, mantenimiento y mejoras dentro del alcance acordado.”

| Etapa EN / ES | Contenido del primer release | Datos pendientes |
| --- | --- | --- |
| Audit / Evaluar | Objetivos, herramientas, flujo de consultas, baseline y restricciones. | Accesos, profundidad del diagnóstico y entregable. No llamarlo auditoría gratuita. |
| Architect / Diseñar | Prioridades, recorrido, responsabilidades e integraciones propuestas. | Responsable y mecanismo de aprobación del cliente. |
| Build / Implementar | Entregar y probar website y conexiones acordadas. | Alcance, dependencias, hitos y aceptación contractual. |
| Operate / Administrar | Mantener y supervisar el sistema con responsabilidades visibles. | Soporte, horarios, alertas y frecuencia de reporting. |
| Improve / Mejorar | Revisar evidencia y priorizar el siguiente cambio. | Ritmo y quién decide las prioridades. |

Añadir colaboración requerida del cliente, supervisión de automatizaciones, límites de proveedores y CTA. No anunciar plazos de entrega, onboarding inmediato ni reportes semanales sin confirmación.

### 7.3 Websites & SEO / Sitios web y SEO

**H1 EN:** A stronger foundation for discovery and contact.  
**H1 ES:** Una base sólida para que te encuentren y contacten.

**Introducción EN:** “A clear, fast website and a sound search presence help people understand your business and take the next step. We connect that public foundation with the way your team receives and follows up on inquiries.”  
**Introducción ES:** “Un sitio web claro y rápido, junto con una presencia bien trabajada en buscadores, ayuda a las personas a entender tu negocio y dar el siguiente paso. Conectamos esa base con la forma en que tu equipo recibe y sigue las consultas.”

Orden: experiencia y claridad → rendimiento y accesibilidad → SEO técnico/local y contenido → traspaso de formularios y llamadas → mantenimiento → ejemplos autorizados → CTA “Let's discuss your website and search presence / Hablemos de tu sitio y su presencia en buscadores”. Explicar Astro solo cuando ayude a entender velocidad o mantenimiento. No atribuir métricas a los proyectos sin medición, ni prometer posicionamiento en IA o Google.

### 7.4 AI & Automation / IA y automatización

**H1 EN:** Practical automation, with people in control.  
**H1 ES:** Automatización útil, con supervisión humana.

**Introducción EN:** “Automation works best when the task, inputs, and next owner are clear. We evaluate where workflows or AI assistance can reduce repetitive work, and where a person needs to review, decide, or take over.”  
**Introducción ES:** “La automatización funciona mejor cuando la tarea, la información y el siguiente responsable están claros. Evaluamos dónde los flujos o la asistencia de IA pueden reducir trabajo repetitivo y dónde una persona debe revisar, decidir o intervenir.”

Orden: principio → escenarios ilustrativos → condiciones y límites → revisión humana → monitoreo → privacidad/canales → CTA. Escenarios candidatos: asignar una consulta según reglas, recordar un próximo paso, preparar un borrador para revisión. Cada uno indica disparador, datos, acción y responsable humano. No mostrar un dashboard inventado ni un escenario como caso real. Chat, voz, SMS y outreach solo se describen como capacidad ofrecida después de confirmar alcance, proveedores y revisión aplicable.

### 7.5 CRM & Follow-Up / CRM y seguimiento

**H1 EN:** Keep every inquiry's next step visible.  
**H1 ES:** Mantén visible el siguiente paso de cada consulta.

**Introducción EN:** “Receiving an inquiry is only the beginning. A usable CRM helps the team see who owns it, what has happened, and what needs to happen next. Follow-up should support that process and keep people accountable.”  
**Introducción ES:** “Recibir una consulta es solo el comienzo. Un CRM útil permite ver quién la atiende, qué ha ocurrido y cuál es el siguiente paso. El seguimiento debe apoyar ese proceso y mantener claras las responsabilidades.”

Orden: problema → capturar/asignar/responder/seguir/agendar/revisitar → pipeline y ownership → recordatorios e integraciones → gestión continua → ejemplo ilustrativo o evidencia real → CTA. No suponer migración universal entre CRMs ni recuperación automática de todas las llamadas perdidas.

### 7.6 About / Sobre nosotros

**H1 EN:** A technical partner for the work behind your website.  
**H1 ES:** Un socio técnico para el trabajo que hay detrás de tu sitio web.

**Introducción EN:** “True Webmaster brings websites and search together with the operational steps that follow a customer inquiry. Based in Tampa, FL, our direction is a connected, managed partnership for service businesses, with conversations in English and Spanish.”  
**Introducción ES:** “True Webmaster conecta los sitios web y la presencia en buscadores con el trabajo que continúa después de una consulta. Desde Tampa, FL, proponemos una relación de gestión continua para negocios de servicios, con atención en inglés y español.”

Orden: evolución real de la oferta → filosofía técnica y humana → ubicación → personas y roles responsables → forma de colaborar → proyectos/contacto. **Pendiente:** historia exacta, identidad del equipo, fotos autorizadas y responsabilidad operativa. No publicar una historia ficticia, años de experiencia ni retratos generados como equipo real. La aprobación de About requiere al menos información verificada sobre quién responde comercialmente y cómo se define la responsabilidad de entrega.

### 7.7 Selected work / Proyectos seleccionados

**H1 EN:** Selected work, with clear context.  
**H1 ES:** Proyectos seleccionados, con contexto claro.

**Introducción EN:** “Explore selected projects and the work behind them. Each example will identify the scope delivered and the status of the site. Measured outcomes will be included only when their source, period, and attribution can be verified.”  
**Introducción ES:** “Conoce proyectos seleccionados y el trabajo que hay detrás. Cada ejemplo identificará el alcance realizado y el estado del sitio. Los resultados medidos se incluirán cuando puedan verificarse su fuente, período y atribución.”

Adaptar esa introducción a presente antes de publicar: no anunciar evidencia futura como contenido disponible. Orden: explicación breve de evidencia → Affordable Roofing → Palm → relación con base digital/proceso → CTA. Fichas dentro de la página; no rutas individuales hasta disponer de contenido suficiente. Alcance, estado y permisos rigen según sección 9.

### 7.8 Contact / Contacto

**H1 EN:** Let's understand where your digital operation needs attention.  
**H1 ES:** Entendamos qué necesita mejorar en tu operación digital.

**Introducción EN:** “Tell us how inquiries reach your business, where the next step becomes unclear, and what you want to improve. The first conversation helps us understand your priorities and whether there is a fit.”  
**Introducción ES:** “Cuéntanos cómo llegan las consultas a tu negocio, dónde se pierde claridad y qué quieres mejorar. La primera conversación nos ayuda a entender tus prioridades y si podemos trabajar juntos.”

Orden: encaje → propósito de conversación → reserva si está habilitada → alternativa escrita → siguiente paso → privacidad y medios aprobados. Reglas detalladas en sección 11. No mostrar duración, gratuidad, entregable o respuesta “en 24 horas” sin confirmación.

## 8. FAQs, CTAs y metadatos candidatos

### 8.1 FAQ editorial reutilizable

Seleccionar preguntas según intención; evitar repetir el bloque completo en cada página. Respuestas propuestas, pendientes de confirmar alcance:

| Pregunta EN / ES | Respuesta EN candidata | Respuesta ES candidata |
| --- | --- | --- |
| Can we start with one part of the system? / ¿Podemos empezar por una parte del sistema? | Yes. The starting point and scope are agreed around the gap that matters most and its connections to the rest of the operation. | Sí. El punto de partida y el alcance se acuerdan según la brecha más importante y su relación con el resto de la operación. |
| Do we need to replace all our tools? / ¿Tenemos que reemplazar todas las herramientas? | We review the current setup first. What can stay, what needs to connect, and what may need to change depends on the tools and the agreed scope. | Primero revisamos lo que ya utilizan. Qué puede conservarse, qué debe conectarse y qué conviene cambiar depende de las herramientas y del alcance acordado. |
| Does AI make decisions on its own? / ¿La IA toma decisiones por su cuenta? | Its role depends on the use case. Responsibilities, review, and human handoff must be defined before a workflow goes live. | Su función depende del caso de uso. Las responsabilidades, la revisión y la intervención humana deben definirse antes de activar un flujo. |
| Can we speak in Spanish? / ¿Podemos hablar en español? | Yes. Commercial conversations are available in English and Spanish. Your language preference should continue through contact and follow-up. | Sí. Las conversaciones comerciales pueden ser en inglés o español. Tu preferencia de idioma se conservará durante el contacto y el seguimiento. |
| What happens after I contact you? / ¿Qué ocurre después de contactar? | We review your inquiry and agree on the next step. Sending a message does not reserve a call unless the booking system confirms a time. | Revisamos tu consulta y acordamos el siguiente paso. Enviar un mensaje no reserva una llamada; la cita debe confirmarse en el calendario. |

### 8.2 CTA y destino

| Rol | EN | ES | Destino propuesto |
| --- | --- | --- | --- |
| Principal provisional | Book a Strategy Call | Agenda una llamada estratégica | Contacto del idioma; reserva habilitada si existe operación validada. |
| Si solo existe consulta escrita | Start a Conversation | Inicia una conversación | Formulario localizado; sustituir el CTA principal en todo el sitio con aprobación. |
| Exploración | Explore Solutions | Explora las soluciones | Página Solutions. |
| Proceso | See How the System Works | Conoce cómo funciona el sistema | Página How It Works. |
| Evidencia | View Selected Work | Ver proyectos seleccionados | Página Results. |
| Alternativa escrita | Send an Inquiry | Envía una consulta | Contacto, sección del formulario. |

No publicar “Book” si no puede completarse la reserva. La etiqueta definitiva depende del proceso real y queda **pendiente**, sin reabrir el posicionamiento.

### 8.3 Títulos y descripciones SEO

**Propuesto F05:** candidatos con intención propia por página; revisar terminología y snippet después del inventario y la revisión comercial. No son una investigación de keywords ni garantía de visibilidad. No forzar un límite fijo de caracteres a costa de claridad.

| Página | Title EN / ES | Description EN / ES |
| --- | --- | --- |
| Home | Managed Digital Operations — True Webmaster / Operaciones digitales administradas — True Webmaster | A connected approach to websites, SEO, CRM, and follow-up for service businesses. Based in Tampa, FL. / Sitios web, SEO, CRM y seguimiento como parte de una operación conectada para negocios de servicios. En Tampa, FL. |
| Solutions | Connected Digital Solutions — True Webmaster / Soluciones digitales conectadas — True Webmaster | Explore ways to strengthen your digital foundation, inquiry response, follow-up, and ongoing operation. / Explora cómo fortalecer tu base digital, la respuesta a consultas, el seguimiento y la gestión continua. |
| Process | How We Work — True Webmaster / Cómo trabajamos — True Webmaster | Understand the process from assessing your current setup to building, operating, and improving the agreed system. / Conoce el proceso para evaluar, diseñar, implementar, administrar y mejorar el sistema acordado. |
| Websites | Websites & SEO for Service Businesses — True Webmaster / Sitios web y SEO para negocios de servicios — True Webmaster | A clear, fast public foundation connected to inquiry handling and follow-up. Explore our website and search approach. / Una base pública clara y rápida, conectada con la atención de consultas y el seguimiento. Conoce nuestro enfoque web y SEO. |
| Automation | AI & Automation with Human Oversight — True Webmaster / IA y automatización con supervisión humana — True Webmaster | Explore practical workflows, human responsibility, and the conditions needed for useful automation. / Conoce flujos útiles, responsabilidades humanas y condiciones necesarias para una automatización bien definida. |
| CRM | CRM & Follow-Up — True Webmaster / CRM y seguimiento — True Webmaster | Make inquiry ownership and next steps visible across your customer journey. Explore the CRM and follow-up approach. / Mantén visibles los responsables y próximos pasos de cada consulta. Conoce nuestro enfoque de CRM y seguimiento. |
| Work | Selected Work — True Webmaster / Proyectos seleccionados — True Webmaster | Explore selected projects with clear scope, site status, and verified context. / Conoce proyectos seleccionados con alcance claro, estado del sitio y contexto verificado. |
| About | About True Webmaster — Tampa, FL / Sobre True Webmaster — Tampa, FL | Learn about our direction as a technical partner connecting public websites with ongoing digital operations. / Conoce nuestro enfoque como socio técnico que conecta sitios web con operaciones digitales administradas. |
| Contact | Start a Conversation — True Webmaster / Inicia una conversación — True Webmaster | Tell us about your business and the digital handoff you want to improve. Contact us in English or Spanish. / Cuéntanos sobre tu negocio y el paso digital que quieres mejorar. Contáctanos en inglés o español. |

Privacidad: título localizado descriptivo y texto aprobado. Confirmación: título “Inquiry received / Consulta recibida”, `noindex`. OG/Twitter localizados con marca existente; imagen social propia por idioma, sin cifras ni sellos inventados.

## 9. Proyectos y assets

### 9.1 Dos proyectos confirmados visualmente

| Proyecto | Presentación EN / ES propuesta | Fuente de captura y estado documentado | Regla de enlace |
| --- | --- | --- | --- |
| Affordable Roofing Systems | Roofing Services / Servicios de techado. “Clear paths from urgent repairs to roofing services and estimate requests.” / “Un recorrido claro desde reparaciones urgentes hasta servicios de techado y solicitudes de presupuesto.” | `pencil-design/assets/affordable-roofing-full.png`; fuente documentada: `https://www.affordableroofingflorida.com/`. | “Visit the live site / Visita el sitio publicado” solo después de verificar destino y permiso al publicar. |
| Palm Wellness Center | Primary Care & Physical Rehabilitation / Atención primaria y rehabilitación física. “Primary care and physical rehabilitation brought together in one clear experience.” / “Atención primaria y rehabilitación física reunidas en una experiencia clara.” | `pencil-design/assets/palm-wellness-full.png`; captura de `https://palmwellnesscenter-site-v2.vercel.app/`. El handoff la registra como nueva versión aún no publicada en dominio final. No se ha revalidado aquí ese estado en vivo. | Dominio previsto `https://www.palmwellness.center/` solo cuando se verifique que sirve la nueva versión. Mientras tanto, preview pública únicamente con autorización y etiqueta “Upcoming version / Próxima versión”. |

Los textos de contexto describen el sitio, no el alcance realizado por True Webmaster. Requieren revisión editorial y permiso. En Home se conserva la alternancia de filas y **no** se agregan etiquetas “Website + Search” ni equivalentes. Results sí debe explicar el alcance acreditado en texto normal. No equiparar Palm con un proyecto de clinical trials; son contextos distintos.

Si una preview no está autorizada para visitantes, conservar su captura solo si está permitida y enlazar al contexto autorizado dentro de Results. No exponer una URL de staging como sitio live. No confundir la etiqueta decorativa de dominio en el marco de browser con el estado real de publicación: acompañar Palm con estado explícito hasta verificar el lanzamiento.

### 9.2 Política de assets

Logo `pencil-design/true-webmaster-logo.webp`: conservar contenido visual, proporción y colores; no redibujar, vectorizar, recolorear ni sustituir tipografía. Registrar dimensiones y hash al incorporar el original. Usar sobre fondo apropiado para su contraste.

Capturas PNG: fuentes de diseño, no archivos de producción. Generar derivados locales WebP/AVIF y crops estáticos de tamaño adecuado; preservar originales. No incrustar sitios externos en iframes para el showcase. No publicar `pencil-design/`, comparativas, lienzo `.pen` ni `capture-profile-roofing` como carpeta web.

Imágenes con dimensiones explícitas y variantes según tamaño renderizado; lazy loading para proyectos bajo el primer viewport, prioridad de carga solo para el elemento LCP real. Astro ofrece procesamiento local y generación de imágenes responsive. [Referencia: imágenes de Astro](https://docs.astro.build/en/guides/images/).

La captura larga tiene costo de descarga y memoria decodificada: recortar un tramo útil para el movimiento, limitar dimensiones y medir memoria/jank. El crop estático móvil no debe descargar automáticamente la versión larga de desktop. Si la captura pierde legibilidad o incumple presupuesto, ajustar el tramo y compresión antes de cambiar la interacción aprobada. Alt localizado describe el sitio mostrado; el texto esencial del caso existe fuera de la captura, también en ES aunque la interfaz fotografiada esté en EN.

## 10. Identidad, responsive e interacciones

### 10.1 Tokens confirmados y adaptación propuesta

| Token observado en Pencil | Valor | Uso |
| --- | --- | --- |
| Night / ink | `#111A27` | Header, superficies oscuras, footer. |
| Depth / coastalBlue | `#125C74` | Profundidad azul y composición del CTA final. |
| Turquoise / signal | `#17A2B8` | Señal, acciones y etapa activa. |
| Mist / seaMist | `#A8DDE3` | Solo franja inmediata bajo hero. |
| Neutral / paper | `#F3F6F8` | Connected system y Selected work. |
| White | `#FFFFFF` | Superficies claras y texto según contraste. |
| Texto / secundario | `#21313A` / `#46595F` | Lectura en superficies claras. |
| Teal / tealDeep | `#086B83` / `#075B73` | Acentos secundarios observados; no sustituyen signal. |

Pencil registra otros detalles de borde y superficies; consultar el lienzo en implementación para reproducirlos. Evitar beige, lima dominante y CTA final verde sólido. Conservar los roles de superficie sin redistribuir Mist por el sitio.

Outfit **700** para títulos; DM Sans para lectura e interfaz. Escala fluida propuesta: H1 36–73 px, H2 28–43 px, cuerpo 16–20 px; ajustar según texto, no copiar posiciones absolutas de Pencil. Lectura de párrafos alrededor de 60–70 caracteres por línea. No usar fuentes descartadas ni pesos sintéticos.

### 10.2 Responsive propuesto, pendiente de validación visual

Mobile first, con puntos iniciales de cambio a 48 rem y 64 rem. Son umbrales de prueba; se ajustarán si los textos reales no caben. Ancho máximo inicial de contenido 1280 px, gutters 20 px móvil, 32 px tablet y hasta 68–80 px desktop. No fijar alturas de secciones según la exportación.

| Elemento | Desktop | Tablet / móvil |
| --- | --- | --- |
| Header | Navegación completa cuando cabe; sticky estable. | Menú disclosure; selector de idioma visible sin abrirlo; CTA dentro del menú y del hero si no cabe en header. |
| Hero | Headline dominante y corriente sin competir con el texto. | Texto y acciones apilados; corriente reposicionada; sin recorte de H1 ni altura de pantalla obligatoria. |
| Journey | Cinco etapas relacionadas horizontalmente. | Lista vertical numerada con conectores; incluye todas las etapas, sin carrusel obligatorio ni scroll horizontal de información. |
| Soluciones y proceso | Filas editoriales, detalle alineado. | Una columna por fila, detalle junto a su título; enlaces claros. |
| Showcase | Dos filas alternadas, gran viewport recortado. | En ambos casos contexto → preview → enlace, con orden DOM lógico; crop útil y sin scroll animado táctil. |
| CTA final | Invitación y acciones con azul profundo/corriente. | Texto y botones completos, sin panel fijo que cubra contenido. |
| Interiores / contacto | Texto con medida cómoda; dos columnas solo si ayudan. | Una columna, formulario íntegro y mensajes legibles. |

Revisar 320, 375, 390, 768, 1024 y 1440 px, orientación horizontal, zoom 200% y reflow a 400%. El español puede expandirse: permitir envolver navegación, botones y textos sin reducir la fuente para forzar la composición inglesa. Desktop a 1440 px debe conservar identidad y jerarquía de la Home aprobada; móvil e interiores necesitan aprobación de su resultado, sin una nueva ronda extensa de Pencil salvo una decisión visual que lo justifique.

### 10.3 Estados e interacción

| Interacción | Comportamiento propuesto | Teclado, táctil y movimiento reducido |
| --- | --- | --- |
| Menú | Botón con nombre localizado, estado expandido y vínculo al panel. Abrir/cerrar sin mover inesperadamente el contenido. | Enter/Space; Escape cierra y devuelve foco al botón; fuera del panel cierra si corresponde. Disclosure en flujo, sin focus trap. Sin JS, mostrar navegación usable. |
| Hero | **Última corrección del propietario, 29/09/2026:** campo satinado WebGL con deformación de dominio, fallback Canvas 2D de cintas y poster estático. Sustituye las ondas SVG y la propuesta inicial de una sola entrada. Última corrección posterior: sin botones de pausa manual; suspensión fuera de pantalla/pestaña oculta y límites adaptativos. H1 estático, sin reveal. Detalle en `docs/hero-animation.md`. | Contenido visible desde el inicio; reduced motion y ausencia de JS muestran atmósfera estática. Cards accesibles por teclado; sin controles de pausa del hero por decisión del propietario. Sin video ni librería de animación. |
| Handoffs | Un énfasis breve al entrar la etapa en viewport, sin fijar scroll ni esconder texto. | Secuencia completa disponible como lista semántica; sin animación se entiende igual. |
| Enlaces y botones | Transiciones breves 120–180 ms de estado; sin cambiar tamaño ni mover el layout. | Foco visible equivalente; no depender de color o hover. |
| Preview de proyecto | En puntero preciso con hover, desplazar la captura dentro del recorte; restituir inicio al salir. Tiempo inicial 4–8 s según tramo, ajustable al inspeccionar. | Control separado “Play preview / Reproduce la vista previa”, “Pause / Pausa” y “Reset / Volver al inicio”. Focus por sí solo no dispara scroll largo; Enter/Space activa control. |
| Preview pausada | Al pausar permanece el tramo visible; reset vuelve al inicio. Detener animación fuera de viewport y cuando la pestaña no está visible. | Táctil: crop estático, enlace claro, sin interceptar scroll vertical. Reduced motion: crop estático y enlace; no iniciar barrido. |
| FAQ | HTML nativo expandible si ayuda a lectura; no esconder términos materiales. | Activación de teclado nativa; estados visibles. |

El enlace del proyecto es independiente del objetivo hover y de los controles: no obliga a reproducir para abrir el sitio o el contexto. Las instrucciones se muestran según modalidad, “Hover to scroll / Pasa el cursor para recorrer” solo donde existe hover. Con movimiento reducido, “Website preview / Vista previa del sitio”. Duraciones son propuestas de implementación, no parte de la aprobación previa de Pencil.

## 11. Conversión, datos y estados

### 11.1 Decisión de proceso pendiente

La intención confirmada es una conversación calificada y atención bilingüe. **Pendiente:** aprobación de CTA final, responsable concreto, duración, horarios, calendario, si existe costo, entregable posterior, reglas de asignación y expectativa real de respuesta.

**Propuesto F05:** contacto es la puerta estable. Presenta una reserva cuando el calendario tenga idioma, disponibilidad, confirmación y seguimiento validados; incluye siempre alternativa escrita. Cargar proveedor de booking solo después de pulsar “Choose a time / Elige un horario”. Si el embed falla, ofrecer enlace localizado al calendario y formulario. No cargar sus scripts en todas las páginas.

Si no hay booking bilingüe operable, la opción de release es consulta escrita con CTA “Start a Conversation / Inicia una conversación”. Requiere decisión del propietario; no se publica una falsa reserva ni se deja el CTA sin destino.

### 11.2 Intake mínimo propuesto

| Campo | EN / ES | Obligatorio | Regla |
| --- | --- | --- | --- |
| Nombre | Name / Nombre | Sí | Texto, límite propuesto 100 caracteres, autocomplete. |
| Negocio | Business name / Nombre del negocio | Sí | Texto, máximo 160 caracteres. |
| Email | Email / Correo electrónico | Sí | Validación comprensible; confirmar email como canal primario de release. |
| Website | Website / Sitio web | No | URL opcional, sin rechazar negocio que no tenga sitio. |
| Tipo de negocio | Business type / Tipo de negocio | No | Texto breve; sin lista que simule experiencia en todos los sectores. |
| Reto actual | What would you like to improve? / ¿Qué te gustaría mejorar? | Sí | Texto, máximo propuesto 1500 caracteres; pedir que no incluya datos sensibles. |
| Teléfono | Phone / Teléfono | No | Solicitar solo si pide llamada; formato tolerante a prefijos. |
| Canal preferido | Preferred contact / Medio de contacto preferido | Sí | Email / Correo; llamada si proporciona teléfono. Sin activar SMS. |
| Idioma | Preferred language / Idioma preferido | Sí | Preseleccionado desde la página, editable EN/ES; se envía como dato del lead. |

No preguntar presupuesto, dirección completa ni detalles clínicos en este primer contacto. Privacidad debe explicar destinatario, finalidad y tratamiento conforme a la operación real. No redactar aquí cláusulas legales definitivas. Cualquier consentimiento promocional será independiente, opcional y sin marcar; no confundir una solicitud de contacto con permiso para campañas, llamadas automatizadas o SMS.

### 11.3 Contrato de recepción

Endpoint valida datos e idioma en servidor, controla abuso y duplicados, guarda o entrega la consulta de forma durable y responde con estado claro. No incluir tokens en bundle, HTML, URL ni eventos. Honeypot/rate limit propuestos; CAPTCHA solo si el abuso lo exige y su alternativa es accesible. Logs minimizados, sin volcar mensajes completos o datos personales por defecto.

Campos de traspaso: ID interno, datos mínimos, idioma de atención, canal solicitado, página origen y estado de recepción. Atribución de campaña solo cuando su tratamiento esté aprobado; no copiar indiscriminadamente query strings. Si el CRM está caído, confirmar recepción solo cuando exista cola o almacenamiento durable; sin ello mostrar error y un medio alternativo verificado. No enviar confirmación de éxito por un clic en Submit.

La alternativa sin JS debe enviar por POST a una recepción funcional, con respuesta localizada; si se adopta un proveedor que no lo soporta, ese límite se revisa antes de aprobarlo y se habilita un contacto alternativo real. No usar `mailto` como única solución del formulario.

### 11.4 Microcopy y estados propuestos

| Estado | EN | ES | Comportamiento |
| --- | --- | --- | --- |
| Acción | Send inquiry | Envía tu consulta | Botón con nombre claro. |
| En curso | Sending your inquiry… | Enviando tu consulta… | Evitar doble envío; anunciar estado sin perder foco ni borrar campos. |
| Campo requerido | Enter your name. | Escribe tu nombre. | Mensaje ligado al campo; patrón equivalente para otros campos. |
| Email inválido | Enter a valid email address. | Escribe un correo electrónico válido. | Conservar valor para corrección. |
| Error general | We couldn't confirm receipt. Please try again or use the alternative contact option. | No pudimos confirmar la recepción. Inténtalo de nuevo o usa el medio de contacto alternativo. | Retener datos, permitir reintentar, ofrecer alternativa aprobada. |
| Recibido | Your inquiry has been received. We will review it and contact you in your preferred language. | Recibimos tu consulta. La revisaremos y te contactaremos en el idioma que elegiste. | Mostrar solo con recepción confirmada; sin SLA inventado. |
| Aclaración | Sending an inquiry does not reserve a call. | Enviar una consulta no reserva una llamada. | Mostrar junto a siguiente paso. |
| Calendario fallido | The calendar isn't available right now. You can send an inquiry instead. | El calendario no está disponible en este momento. Puedes enviar una consulta. | Formulario accesible en la misma página. |
| Sin horarios | No suitable time? Send an inquiry and tell us your preference. | ¿No encuentras un horario? Envía una consulta e indica tu preferencia. | No prometer disponibilidad. |

Validación inline, resumen enlazado de errores al enviar, foco al resumen cuando corresponda y anuncio accesible de éxito. Confirmación sin datos personales en URL. Acceder directamente a `/thank-you/` o `/es/gracias/` no dispara evento de conversión ni acredita envío.

Booking: idioma, zona horaria visible, horario elegido, confirmación y cancelación/reprogramación deben ser comprensibles en EN/ES. No asumir Caracas como zona comercial; el negocio definirá disponibilidad y el calendario indicará la zona del visitante o una zona explícita. Verificar un contacto de prueba por idioma hasta la recepción del responsable y su seguimiento.

### 11.5 Medición propuesta

| Evento | Cuándo se registra | Dimensiones permitidas |
| --- | --- | --- |
| `primary_cta_click` | Activación del CTA; mide interés, no lead. | Idioma, ID página, ubicación CTA. |
| `inquiry_received` | Recepción durable confirmada. | Idioma y origen no sensible; sin email, teléfono ni mensaje. |
| `booking_opened` | Se abre calendario. | Idioma y origen. |
| `booking_confirmed` | Callback/webhook validado del proveedor. | Idioma y origen; deduplicación privada. Sin callback fiable, reportar no medible. |
| `project_outbound_click` | Enlace externo autorizado. | Proyecto e idioma. |

Proveedor analítico y política de consentimiento pendientes. No condicionar el contacto al tracking. Métricas comerciales posteriores: consulta calificada, asistencia y encaje, comparadas por idioma/origen; no inferir mejora por número de clics. Evitar duplicar conversiones al recargar confirmación o recibir varios callbacks.

## 12. SEO técnico y migración legacy

### 12.1 Señales del sitio nuevo

Cada página publica HTML localizado, `lang` EN/ES, title/description, H1, canonical absoluto a sí misma y metadata social. El dominio canónico y preferencia www/no-www son **pendientes**; no se inventan a partir de los dominios de clientes. ES no canonicaliza hacia EN. [Referencia: canonicalización](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

Pares publicables usan `hreflang="en"` y `hreflang="es"` recíprocos y autorreferentes con URLs absolutas. Propuesta `x-default`: versión inglesa equivalente de cada pareja, como destino por defecto; confirmar al fijar las rutas. No usar `es-VE` por ubicación del desarrollador ni tratar ES como otro mercado geográfico. Las equivalencias deben conducir al mismo propósito, no siempre a Home. [Referencia: versiones localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions).

Sitemap incluye solo URLs canónicas publicables con HTTP 200 e indexables, con equivalencias verificadas; excluir confirmaciones, 404, drafts y previews. Usar integración oficial `@astrojs/sitemap` propuesta, comprobando manualmente los slugs traducidos porque no basta inferir rutas con prefijos. `lastmod` solo cuando exista modificación real. [Referencia: sitemap de Astro](https://docs.astro.build/en/guides/integrations-guide/sitemap/).

Robots permite contenido público según política aprobada; privacidad indexable como propuesta, confirmaciones `noindex`. Previews con acceso restringido cuando sea posible y `noindex`; robots por sí solo no sirve como privacidad. En producción revisar que no persista bloqueo de staging. Enlaces internos apuntan directamente a destinos finales, sin cadenas de redirects.

JSON-LD propuesto: Organization y WebSite con identidad verificada; BreadcrumbList en interiores. LocalBusiness solo si sus datos y pertinencia se confirman. Información estructurada debe coincidir con contenido visible; no rellenar dirección, ratings, clientes ni ofertas ficticias. No declarar resultados enriquecidos garantizados. [Referencia: datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).

No implementar FAQ/HowTo como promesa SEO del release, ni schema de software/SaaS para describir una relación gestionada. La auditoría profunda posterior corresponde a `seo`; esta fase define requisitos y no declara haber auditado rankings, indexación o backlinks del legacy.

### 12.2 Inventario previo a cerrar slugs y redirects

**Pendiente obligatorio antes de retirar o reemplazar contenido:** URL real del sitio vigente, acceso o exportación de sitemap, crawl, Search Console y analytics cuando estén disponibles. Registrar por URL: status, idioma, canonical, title/H1, contenido, intención, enlaces internos, activos, tráfico/consultas/backlinks conocidos y decisión de preservación. Si faltan datos orgánicos, registrar la incertidumbre; no asumir ausencia de valor.

Mapa de migración con columnas: URL antigua → destino → idioma → acción (conservar, actualizar, combinar, retirar) → razón → código HTTP → responsable → verificación. Las páginas de website/SEO que atraen demanda merecen revisión propia; no trasladar todas a Home ni borrar su intención por el reposicionamiento.

Mantener URLs valiosas cuando sea viable. Para cambios, redirect permanente de servidor 301/308 al destino relevante, en un salto y sin loops. Solo retirar con 404/410 una URL sin reemplazo pertinente después de revisar su valor. Evitar redirecciones masivas a Home que produzcan respuestas irrelevantes. Mantener redirects al menos un año y preferiblemente mientras reciban enlaces/visitas. [Referencia: migración con cambios de URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

### 12.3 Secuencia de publicación futura

1. Inventariar legacy y confirmar dominio, hosting, acceso DNS, contenido a conservar y mapa de URLs.
2. Construir preview protegido, probar EN/ES y redirects sin alterar producción.
3. Validar recepción y calendario con datos de prueba; limpiar datos de prueba según operación aprobada.
4. Preparar copia recuperable de sitio/configuración previa y procedimiento de reversión.
5. Con autorización de publicación, desplegar y verificar HTTP, rutas, assets, canonical, idiomas, formularios y ausencia de `noindex` accidental.
6. Actualizar sitemap/Search Console y enlaces propios; observar errores, consultas orgánicas y conversiones por idioma.

Responsable y ventanas propuestas de revisión: inmediatamente, 48 horas y semanas 1–4, por confirmar. Una pérdida de tráfico requiere diagnóstico; no atribuirla automáticamente a Astro. Si el contacto o rutas esenciales fallan, ejecutar la reversión acordada. Change of Address solo se evalúa si cambia el dominio; no es requisito por cambiar tecnología dentro del mismo dominio.

## 13. Rendimiento, fuentes y presupuestos

**Corrección posterior del propietario, 30/09/2026:** el hosting de construcción y despliegue pasa a Cloudflare Pages `truewebmaster-website`, conectado a GitHub `main`. Vercel queda desconectado y pausado. Configuración y evidencia en `docs/cloudflare-pages.md`; las menciones anteriores a decidir hosting o mantener Vercel son históricas. El dominio legacy, indexación y lanzamiento comercial siguen sujetos a la aprobación final.

`perf-astro` es la guía primaria bajo `astro-frontend-master`; sus recetas de paquetes se contrastan con documentación y medición. No se incorporan automáticamente `astro-critters`, `@playform/compress`, carga de fuentes mediante hacks inline, librerías de movimiento ni preloads indiscriminados.

**Propuesto F05:** CSS propio con alcance adecuado; HTML estático; sin React/Vue, carruseles, video de fondo o runtimes de animación por defecto. Movimiento por transform/opacity, sin layout por frame; scripts pausados fuera del viewport. El hero será principalmente texto y gráfico ligero. Identificar su LCP medido antes de priorizar recursos.

Fuentes autoalojadas WOFF2 con licencia conservada y caracteres necesarios para EN/ES. Outfit 700 únicamente; DM Sans 400/500/600 iniciales si se usan realmente. Comparar fuente variable limitada versus archivos por peso y elegir menor descarga efectiva. Fallback con métricas ajustadas para reducir cambios de layout y `font-display` elegido tras medir lectura y CLS. Preload solo de fuentes críticas demostradas, sin descargar todos los pesos. [Referencia: fuentes en Astro](https://docs.astro.build/en/guides/fonts/).

### 13.1 Presupuestos propuestos de aceptación

Medir build de producción servido con compresión real, caché fría y escenario documentado. KiB = 1024 bytes. Los presupuestos son decisiones del proyecto, no umbrales oficiales ni mediciones actuales.

| Recurso / métrica | Presupuesto de proyecto |
| --- | --- |
| JS propio inicial por página | ≤ 30 KiB transferidos comprimidos; sin runtime UI global. |
| CSS inicial por página | ≤ 35 KiB comprimidos, sin framework CSS completo innecesario. |
| Fuentes descargadas por página | ≤ 160 KiB; incluir todos los pesos realmente solicitados. |
| Transferencia inicial móvil | ≤ 500 KiB antes de scroll/booking, incluido todo recurso solicitado por ese escenario. |
| Crop estático de proyecto | ≤ 180 KiB por variante elegida. |
| Tramo largo desktop | ≤ 350 KiB por proyecto, bajo demanda/lazy; evaluar memoria decodificada además de bytes. |
| Terceros antes de solicitar booking | 0 recursos de calendario, chat o CRM; analítica pendiente de política y dentro del presupuesto global. |
| Lighthouse mobile | Mediana ≥ 95 en performance sobre tres corridas equivalentes; registrar rango, entorno y versión. |
| LCP lab objetivo | ≤ 2,5 s; meta interna deseable ≤ 2,0 s. |
| CLS lab objetivo | ≤ 0,1; meta interna deseable ≤ 0,05. |
| TBT lab indicativo | ≤ 150 ms; no sustituye INP de usuarios reales. |

Booking se mide en un segundo escenario, desde su activación hasta que puede usarse. Propuesta: interfaz disponible en ≤ 3 s en la conexión de prueba; si excede o falla, formulario alternativo visible inmediatamente. Registrar tamaño, solicitudes y efecto de terceros, sin excluirlos del informe por pertenecer a un proveedor.

Hosting deberá entregar compresión, HTTPS y caché larga para assets con hash; HTML con política que permita actualizar contenido. Previews y el logo no necesitan JS para mostrarse. No usar herramientas de compresión adicionales si no aportan una mejora medible.

### 13.2 CWV y evidencia

Objetivo de campo: **LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1** al percentil 75, separados por móvil/desktop y por las agrupaciones con datos suficientes. Son los umbrales de buena experiencia de Core Web Vitals. [Referencia: Web Vitals](https://web.dev/articles/vitals).

Antes de lanzar solo pueden verificarse laboratorio, presupuesto e interacciones de prueba. Lighthouse no acredita INP de campo. Tras lanzar, revisar CrUX/Search Console o RUM aprobado cuando exista muestra; si no hay datos, reportar “sin muestra suficiente”. No afirmar CWV aprobado en producción a partir de una corrida local. Registrar por separado Home EN/ES, contacto y páginas representativas, con booking activo y sin él.

## 14. Accesibilidad

**Propuesto F05:** objetivo WCAG 2.2 AA con verificación automatizada y manual. Reglas: texto normal 4,5:1, texto grande 3:1 y controles/indicadores relevantes 3:1; teclado completo, foco visible y no oculto, labels y errores asociados, reflow y estados comprensibles. Son requisitos de referencia WCAG; su cumplimiento necesita revisar el resultado construido. [Referencia: WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Conservar paleta aprobada seleccionando combinaciones de contraste válidas. Por ejemplo, el botón turquesa debe usar texto oscuro si el blanco no cumple; no cambiar el turquesa por una identidad nueva. Validar contraste efectivo en gradientes, estados, previews y overlays.

Un H1, jerarquía lógica, landmarks, skip link y orden DOM de lectura. Journey como lista ordenada; corriente e iconos redundantes decorativos fuera del árbol accesible. Enlaces descriptivos; aviso localizado si abren otra pestaña, con seguridad adecuada. Preferencia propuesta: misma pestaña salvo razón de contexto.

Objetivo de proyecto para controles táctiles: área de 44 × 44 CSS px; no confundirlo con el mínimo general de WCAG AA. Menú sticky no tapa foco ni anchors; reservar offset. Formularios usan labels persistentes, autocomplete, tipo apropiado y mensajes sin depender solo del color.

Sin JS: texto, enlaces, idioma, casos y navegación disponibles; formulario funciona según contrato; previews estáticas. Movimiento reducido, zoom, teclado y lector de pantalla no pierden información. El proveedor de booking participa en la aceptación de accesibilidad; un buen sitio envolvente no compensa un calendario inaccesible. Revisar con NVDA en Windows y, cuando sea posible, VoiceOver en móvil. Automatización sin errores no equivale por sí sola a conformidad.

## 15. Dependencias y responsables

### 15.1 Herramientas y paquetes futuros

| Dependencia | Decisión propuesta | Condición |
| --- | --- | --- |
| Astro + TypeScript | Base de implementación; elegir versión estable y runtime Node compatible al iniciar. | Registrar versiones y lockfile; no fijar una versión desde ejemplos antiguos. |
| `@astrojs/sitemap` | Integración oficial para sitemap. | Compatibilidad con Astro y revisión de URLs traducidas. |
| Imágenes / fuentes de Astro | Preferir capacidades nativas o autoalojamiento simple. | Medir salida y disponibilidad estable en la versión seleccionada. |
| Hosting / función de recepción | Pendiente de proveedor y dominio. | Static hosting, redirects reales, 404 localizada, secretos y recuperación. |
| CRM / calendario | Pendiente; HighLevel es una posibilidad operativa. | Idiomas, routing, seguridad, permisos, callback y responsable. |
| Analítica / consentimiento | Pendiente de política y herramienta. | Sin PII en eventos; medir sin bloquear contacto. |
| Librería de animación / framework UI | No incluidos por defecto. | Solo necesidad demostrada y presupuesto aprobado. |
| CMS externo | Fuera del release por defecto. | Añadir solo si el flujo editorial lo exige. |

La carpeta revisada no contiene repositorio Git ni aplicación Astro. **Pendiente antes de implementación:** confirmar repositorio/origen remoto o crear la estructura de control de versiones con autorización; verificar estado real antes de editar código. No se ha hecho fetch ni comparación remota porque no existe `.git` aquí.

### 15.2 Datos y bloqueos

| ID | Pendiente / decisión | Responsable propuesto | Bloquea |
| --- | --- | --- | --- |
| D01 | Aprobar esta F05, alcance y rutas propuestas. | Propietario. | Inicio de código Astro. |
| D02 | Confirmar capacidad, responsabilidad, límites y gestión directa/terceros por solución. | Negocio + operación. | Copy comercial definitivo y publicación de claims. |
| D03 | CTA, duración, owner, agenda, follow-up y alternativa escrita. | Responsable comercial + propietario. | Conversión final y publicación. |
| D04 | Permisos de nombres/capturas, alcance y estado de los dos proyectos; Palm live/preview. | Propietario + clientes pertinentes. | Showcase público y Results. |
| D05 | Revisar copy EN/ES, términos, About y área regional. | Revisor bilingüe designado + propietario. | Aprobación de contenido. |
| D06 | Dominio, hosting, URL legacy, inventario orgánico y mapa de migración. | Propietario + responsable SEO/técnico. | Slugs definitivos, redirects y reemplazo de producción. |
| D07 | Privacidad, recepción, proveedores y política de comunicaciones/consentimiento. | Negocio + revisor competente designado. | Captación pública y workflows sensibles. |
| D08 | Fuentes bibliográficas originales de Fases 01–02. | Propietario. | Reuso de hechos externos; no bloquea textos propios sin esos claims. |
| D09 | Analítica, métricas comerciales y seguimiento posterior. | Negocio + responsable técnico. | Medición aprobada; no autoriza tracking por omisión. |
| D10 | Repo, versiones, accesos de despliegue y rollback. | Propietario + responsable técnico. | Implementación coordinada y publicación. |

Responsables son roles sugeridos, no asignaciones confirmadas. No es necesario resolver todos los datos para revisar esta especificación; sí antes de publicar la parte afectada. Una aprobación de arquitectura puede permitir construir estructura con contenido privado en borrador, sin exponer pendientes como hechos.

## 16. Criterios de aceptación y evidencia futura

### 16.1 Gate de Fase 05 — antes de código

- [ ] El propietario revisa y aprueba este documento o pide correcciones.
- [ ] Queda aceptado el alcance de nueve propósitos de página en dos idiomas y las utilidades propuestas.
- [ ] Rutas, navegación, estrategia de contenido y adaptación responsive son revisables y se conocen las dependencias que pueden modificarlas.
- [ ] La aprobación visual existente sigue intacta; contenido candidato no se confunde con copy final aprobado.
- [ ] Se registran decisiones sobre conversión y evidencias pendientes, sin aprobarlas por omisión.

**No se marca ningún criterio como cumplido por haberlo especificado.** Esta entrega termina aquí para revisión; la siguiente actividad será corregir F05 o, después de aprobación expresa, implementar.

### 16.2 Gate de implementación — preview revisable

| Área | Aceptación | Evidencia a entregar |
| --- | --- | --- |
| Bilingüe | 18 páginas comerciales completas; utilidades EN/ES; selector equivalente, sin mezclas materiales. | Matriz de rutas, crawl de enlaces y recorridos EN/ES documentados. |
| Contenido | H1, introducción, bloques, FAQs relevantes, CTA y metadata revisados por idioma; cero placeholders públicos. | Registro de aprobación y revisión semántica, no solo comparación automática. |
| Identidad | Logo intacto, Outfit 700/DM Sans, roles de color y dos proyectos según aprobación. | Capturas desktop comparadas con Pencil y assets comprobados. |
| Responsive | Sin overflow indebido ni contenido oculto en tamaños de prueba; ES no comprimido artificialmente. | Capturas Home, Solutions, Results y Contact en móvil/tablet/desktop por idioma. |
| Movimiento | Hero/journey legibles en reposo; hover restituye; play/pause/reset usable; táctil y reduced motion estáticos. | Prueba de puntero, teclado, touch y configuración de movimiento. |
| Conversión | Consulta realmente recibida y asignada con idioma; calendario confirma reserva real cuando corresponda. | Envío end-to-end EN/ES, prueba de error, duplicado, proveedor caído y follow-up recibido. |
| Accesibilidad | Sin fallos críticos/serios automatizados y sin bloqueos manuales; foco/contraste/reflow/formulario válidos. | Informe de herramientas, teclado, lector y hallazgos resueltos o limitaciones explícitas. |
| SEO | HTTP, canonical, equivalencias, sitemap, títulos, schema y enlaces coherentes. | Crawl estático/renderizado y validación del HTML de producción. |
| Rendimiento | Presupuestos y objetivos lab de sección 13 cumplidos; estado booking reportado aparte. | Tamaños de build/red, tres corridas con mediana/rango y entorno registrado. |
| Dependencias | No secretos en cliente; terceros controlados; drafts y perfil Chrome fuera de publicación. | Inspección de output y recepción/configuración verificada. |

Pruebas específicas mínimas: cambiar idioma desde cada página; llegar por búsqueda directamente a un interior ES; enviar consulta con preferencia de idioma distinta de la página; abrir contacto sin JS; pausar preview y activar enlace sin interferencia; enviar con error manteniendo campos; entrar directamente a confirmación sin generar conversión; visitar URL inexistente sin soft 404.

### 16.3 Gate de release — antes y después de publicar

- [ ] Claims, permisos, copy, privacidad y medios de contacto aprobados; Palm tiene enlace y estado correctos verificados ese día.
- [ ] Inventario legacy y destinos aceptados; URLs con valor no se retiran sin resolución documentada.
- [ ] Preview EN/ES y adaptaciones móviles/interiores revisadas por el propietario.
- [ ] Hosting entrega redirects permanentes en un salto, 404 correctos, HTTPS y contenido indexable; no filtra drafts.
- [ ] Producción verificada semánticamente: contenido, idioma, CTAs, assets, formulario, agenda, canonical y sitemap.
- [ ] Hay responsable de operación y reversión, más plan acordado de revisión orgánica/comercial.
- [ ] CWV de campo se reporta después con muestra suficiente; no se sustituye por el puntaje Lighthouse.

Owners de revisión futura bajo `astro-frontend-master`: `ui-ux-pro-max` para UX/UI; Pencil para referencia visual; `perf-astro` para rendimiento Astro; `seo` para revisión profunda SEO. Impeccable critica fidelidad y calidad visual, Web Design Guidelines revisa usabilidad y Web Quality coordina el gate de calidad. Sus recomendaciones no cambian decisiones aprobadas sin revisión del propietario.

## 17. Decisiones presentadas para revisión

1. Primer release con nueve páginas principales EN/ES y utilidades completas, sin blog ni casos extensos todavía.
2. Inglés en raíz y español en `/es/`, slugs localizados ratificados tras inventario legacy.
3. Arquitectura estática Astro con contratos de contenido local y recepción comercial separada.
4. Results como proyectos seleccionados verificables; conservar las dos filas aprobadas sin claims de resultados añadidos.
5. Contacto como destino estable, reserva bajo demanda y alternativa escrita; etiqueta principal condicionada al proceso real.
6. Adaptación mobile first, preview con controles y movimiento reducido, manteniendo identidad y narrativa aprobadas.
7. Presupuestos técnicos y gates que exigen evidencia antes de declarar el sitio listo.

**Fin de la Fase 05.** La aprobación posterior del propietario habilita código Astro conforme a esta especificación. Publicación, claims pendientes y cambios de Pencil necesitan su autorización correspondiente.
