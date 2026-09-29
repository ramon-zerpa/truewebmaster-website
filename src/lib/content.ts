import { text, type Locale, type PageId } from "./routes";
type Pair = [string, string];
type Section = { title: Pair; body: Pair };
type Page = { title: Pair; intro: Pair; sections: Section[] };
const s = (
  en: string,
  es: string,
  bodyEn: string,
  bodyEs: string,
): Section => ({ title: [en, es], body: [bodyEn, bodyEs] });
export const pages: Record<Exclude<PageId, "home">, Page> = {
  solutions: {
    title: [
      "Connected solutions for the way your business works.",
      "Soluciones conectadas para la forma en que trabaja tu negocio.",
    ],
    intro: [
      "Start with the gap that matters most. We look at how customers find you, make contact, receive a response, and move to the next step. The scope is built around that journey and the people responsible for it.",
      "Empieza por la brecha más importante. Revisamos cómo te encuentran los clientes, cómo consultan, cómo reciben respuesta y cómo avanzan. El alcance se define alrededor de ese recorrido y de las personas responsables.",
    ],
    sections: [
      s(
        "Where should we start?",
        "¿Por dónde empezamos?",
        "One urgent gap can be the starting point. Several disconnected steps may need a broader plan. We assess the current setup before agreeing on the work, its dependencies, and the people who will own each step.",
        "Una brecha urgente puede ser el punto de partida. Si hay varios pasos desconectados, puede hacer falta un plan más amplio. Evaluamos la situación antes de acordar el trabajo, sus dependencias y quién será responsable de cada paso.",
      ),
    ],
  },
  process: {
    title: [
      "A clear process. An ongoing partnership.",
      "Un proceso claro. Una relación continua.",
    ],
    intro: [
      "We begin with the current operation, agree on priorities, and build the connections that matter. After launch, the work continues through monitoring, maintenance, and improvements within the agreed scope.",
      "Empezamos por la operación actual, acordamos prioridades y construimos las conexiones necesarias. Después del lanzamiento, el trabajo continúa con monitoreo, mantenimiento y mejoras dentro del alcance acordado.",
    ],
    sections: [
      s(
        "Shared decisions. Clear responsibility.",
        "Decisiones compartidas. Responsabilidades claras.",
        "Your team brings business knowledge, access to the agreed tools, and a person who can approve priorities. Together, we define responsibilities, review the work, and keep the next decision visible. Support and reporting are agreed as part of the scope.",
        "Tu equipo aporta conocimiento del negocio, acceso a las herramientas acordadas y una persona que pueda aprobar prioridades. Definimos responsabilidades, revisamos el trabajo y mantenemos visible la próxima decisión. El soporte y los reportes se acuerdan como parte del alcance.",
      ),
    ],
  },
  websites: {
    title: [
      "A stronger foundation for discovery and contact.",
      "Una base sólida para que te encuentren y contacten.",
    ],
    intro: [
      "A clear, fast website and a sound search presence help people understand your business and take the next step. We connect that public foundation with the way your team receives and follows up on inquiries.",
      "Un sitio web claro y rápido, junto con una presencia bien trabajada en buscadores, ayuda a las personas a entender tu negocio y dar el siguiente paso. Conectamos esa base con la forma en que tu equipo recibe y sigue las consultas.",
    ],
    sections: [
      s(
        "Clarity before complexity.",
        "Claridad antes que complejidad.",
        "Visitors need to understand what you do, find relevant information, and contact you easily. The structure, writing, navigation, and mobile experience all serve that next step.",
        "Las personas necesitan entender qué haces, encontrar información relevante y contactarte fácilmente. La estructura, el texto, la navegación y la experiencia móvil facilitan ese siguiente paso.",
      ),
      s(
        "Fast, stable, and accessible.",
        "Rápido, estable y accesible.",
        "A technical foundation should support the experience. We prioritize lightweight pages, optimized images and fonts, semantic HTML, and usable controls. Performance is checked with evidence, rather than promises of a perfect score.",
        "La base técnica debe apoyar la experiencia. Priorizamos páginas ligeras, imágenes y fuentes optimizadas, HTML semántico y controles utilizables. El rendimiento se comprueba con evidencia, sin prometer un puntaje perfecto.",
      ),
      s(
        "Search with a useful destination.",
        "Búsquedas con un destino útil.",
        "Technical and local SEO connect relevant searches with useful pages. Content, internal links, and accurate business information matter alongside the way the website receives an inquiry. Rankings and traffic depend on more than a website launch.",
        "El SEO técnico y local conecta búsquedas relevantes con páginas útiles. El contenido, los enlaces internos y la información precisa del negocio importan junto con la atención de consultas. El posicionamiento y el tráfico dependen de más que un lanzamiento.",
      ),
      s(
        "The work continues after launch.",
        "El trabajo continúa después del lanzamiento.",
        "Maintenance, content updates, and measurement keep the foundation useful. The agreed scope defines what is monitored, who responds, and how the next improvements are prioritized.",
        "El mantenimiento, las actualizaciones y la medición mantienen útil la base. El alcance acordado define qué se monitorea, quién responde y cómo se priorizan las mejoras.",
      ),
    ],
  },
  automation: {
    title: [
      "Practical automation, with people in control.",
      "Automatización útil, con supervisión humana.",
    ],
    intro: [
      "Automation works best when the task, inputs, and next owner are clear. We evaluate where workflows or AI assistance can reduce repetitive work, and where a person needs to review, decide, or take over.",
      "La automatización funciona mejor cuando la tarea, la información y el siguiente responsable están claros. Evaluamos dónde los flujos o la asistencia de IA pueden reducir trabajo repetitivo y dónde una persona debe revisar, decidir o intervenir.",
    ],
    sections: [
      s(
        "Route a new inquiry.",
        "Asigna una consulta.",
        "Illustrative workflow: a form creates a record, agreed rules route it to the appropriate person, and that person reviews the next step. The rules and exception handling are defined before activation.",
        "Flujo ilustrativo: un formulario crea un registro, las reglas acordadas lo asignan a la persona adecuada y esa persona revisa el siguiente paso. Las reglas y el manejo de excepciones se definen antes de activarlo.",
      ),
      s(
        "Make the next step easier to remember.",
        "Facilita recordar el siguiente paso.",
        "Illustrative workflow: a pending opportunity triggers an internal reminder. The team keeps ownership of the conversation and decides whether an external message is appropriate.",
        "Flujo ilustrativo: una oportunidad pendiente activa un recordatorio interno. El equipo sigue siendo responsable de la conversación y decide si corresponde enviar un mensaje externo.",
      ),
      s(
        "Assist the person doing the work.",
        "Apoya a la persona que hace el trabajo.",
        "Illustrative AI use: prepare a draft from approved business information for a person to review. Accuracy, privacy, and human handoff matter more than letting a workflow run unattended.",
        "Uso ilustrativo de IA: preparar un borrador a partir de información aprobada del negocio para revisión humana. La precisión, la privacidad y la intervención humana importan más que dejar un flujo sin supervisión.",
      ),
      s(
        "Define the boundaries first.",
        "Define primero los límites.",
        "Useful workflows need reliable information, a clear owner, monitoring, and a way to handle exceptions. Communication channels and consent requirements are reviewed for each use case before it goes live.",
        "Los flujos útiles necesitan información confiable, un responsable, monitoreo y una forma de manejar excepciones. Los canales de comunicación y requisitos de consentimiento se revisan para cada caso antes de activarlo.",
      ),
    ],
  },
  crm: {
    title: [
      "Keep every inquiry’s next step visible.",
      "Mantén visible el siguiente paso de cada consulta.",
    ],
    intro: [
      "Receiving an inquiry is only the beginning. A usable CRM helps the team see who owns it, what has happened, and what needs to happen next. Follow-up should support that process and keep people accountable.",
      "Recibir una consulta es solo el comienzo. Un CRM útil permite ver quién la atiende, qué ha ocurrido y cuál es el siguiente paso. El seguimiento debe apoyar ese proceso y mantener claras las responsabilidades.",
    ],
    sections: [
      s(
        "Capture. Assign. Respond.",
        "Captura. Asigna. Responde.",
        "Give each inquiry a place in the process and a person responsible for its next step. Website forms, calls, and calendars should connect to that process where the tools and agreed scope allow.",
        "Dale a cada consulta un lugar en el proceso y una persona responsable de su siguiente paso. Los formularios, las llamadas y los calendarios deben conectarse con ese proceso cuando las herramientas y el alcance lo permitan.",
      ),
      s(
        "A pipeline the team can actually use.",
        "Un proceso comercial que el equipo pueda usar.",
        "Keep stages understandable and actions visible. A useful record shows the conversation, current status, next action, and responsible person without hiding accountability behind automation.",
        "Mantén las etapas comprensibles y las acciones visibles. Un registro útil muestra la conversación, el estado, la próxima acción y el responsable, sin esconder la responsabilidad detrás de la automatización.",
      ),
      s(
        "Follow up with purpose.",
        "Haz seguimiento con propósito.",
        "Reminders and agreed workflows support staff, rather than replacing judgment. Follow-up channels, frequency, and ownership need to match the business and the customer relationship.",
        "Los recordatorios y flujos acordados apoyan al equipo sin reemplazar su criterio. Los canales, la frecuencia y las responsabilidades del seguimiento deben corresponder al negocio y la relación con el cliente.",
      ),
    ],
  },
  work: {
    title: [
      "Selected work, with clear context.",
      "Proyectos seleccionados, con contexto claro.",
    ],
    intro: [
      "Real websites for different service businesses. Explore their customer-facing experience, from finding relevant information to taking the next step.",
      "Sitios web reales para distintos negocios de servicios. Explora su experiencia pública, desde encontrar información relevante hasta dar el siguiente paso.",
    ],
    sections: [],
  },
  about: {
    title: [
      "A technical partner for the work behind your website.",
      "Un socio técnico para el trabajo que hay detrás de tu sitio web.",
    ],
    intro: [
      "True Webmaster brings websites and search together with the operational steps that follow a customer inquiry. Based in Tampa, FL, our direction is a connected, managed partnership for service businesses, with conversations in English and Spanish.",
      "True Webmaster conecta los sitios web y la presencia en buscadores con el trabajo que continúa después de una consulta. Desde Tampa, FL, proponemos una relación de gestión continua para negocios de servicios, con atención en inglés y español.",
    ],
    sections: [
      s(
        "A foundation in websites and search.",
        "Una base en sitios web y buscadores.",
        "A good public experience is the beginning of a customer journey. The broader relationship connects that foundation to inquiry handling, follow-up, and an operation that can be maintained over time.",
        "Una buena experiencia pública es el inicio de un recorrido. La relación más amplia conecta esa base con la atención de consultas, el seguimiento y una operación que pueda mantenerse en el tiempo.",
      ),
      s(
        "Technical work. Human responsibility.",
        "Trabajo técnico. Responsabilidad humana.",
        "Clear scope, visible responsibilities, and decisions based on evidence guide the partnership. Tools and AI serve the work; people remain responsible for priorities, judgment, and customer relationships.",
        "El alcance claro, las responsabilidades visibles y las decisiones basadas en evidencia guían la relación. Las herramientas y la IA apoyan el trabajo; las personas siguen al frente de las prioridades, el criterio y la relación con los clientes.",
      ),
    ],
  },
  contact: {
    title: [
      "Let’s understand where your digital operation needs attention.",
      "Entendamos qué necesita mejorar en tu operación digital.",
    ],
    intro: [
      "Tell us how inquiries reach your business, where the next step becomes unclear, and what you want to improve. The first conversation helps us understand your priorities and whether there is a fit.",
      "Cuéntanos cómo llegan las consultas a tu negocio, dónde se pierde claridad y qué quieres mejorar. La primera conversación nos ayuda a entender tus prioridades y si podemos trabajar juntos.",
    ],
    sections: [],
  },
  privacy: {
    title: ["Privacy", "Privacidad"],
    intro: [
      "This preview does not collect inquiries or load marketing trackers. The privacy notice for the public contact service is being prepared before activation.",
      "Esta vista previa no recibe consultas ni carga rastreadores de marketing. El aviso de privacidad del servicio público de contacto se preparará antes de activarlo.",
    ],
    sections: [],
  },
  confirmation: {
    title: ["Contact confirmation", "Confirmación de contacto"],
    intro: [
      "This page alone does not confirm that an inquiry was sent or that a call was booked. Receipt will be confirmed by the connected contact service.",
      "Esta página por sí sola no confirma que se haya enviado una consulta o reservado una llamada. El servicio de contacto conectado confirmará la recepción.",
    ],
    sections: [],
  },
};
export const solutions = [
  {
    id: "foundation",
    title: ["Digital foundation", "Base digital"],
    summary: [
      "Make it easy to find, trust, and contact your business.",
      "Facilita que encuentren tu negocio, confíen en él y te contacten.",
    ],
    detail: ["Website · SEO · measurement", "Sitio web · SEO · medición"],
    page: "websites",
  },
  {
    id: "response",
    title: ["Lead response", "Respuesta a consultas"],
    summary: [
      "Give every inquiry a clear owner and next step.",
      "Dale a cada consulta un responsable y un siguiente paso.",
    ],
    detail: [
      "Forms · calls · inbox · routing",
      "Formularios · llamadas · bandeja · asignación",
    ],
    page: "crm",
  },
  {
    id: "follow-up",
    title: ["Sales follow-up", "Seguimiento comercial"],
    summary: [
      "Keep opportunities visible and moving.",
      "Mantén las oportunidades visibles y en movimiento.",
    ],
    detail: ["CRM · pipelines · reminders", "CRM · etapas · recordatorios"],
    page: "crm",
  },
  {
    id: "retention",
    title: ["Reputation & retention", "Reputación y relación con clientes"],
    summary: [
      "Make the relationship continue after the first job.",
      "Mantén la relación después del primer servicio.",
    ],
    detail: [
      "Reviews · reactivation · referrals",
      "Reseñas · reactivación · recomendaciones",
    ],
    page: "solutions",
  },
  {
    id: "operations",
    title: ["Managed operations", "Operación administrada"],
    summary: [
      "Keep the whole system healthy as the business changes.",
      "Mantén el sistema en buen estado mientras el negocio cambia.",
    ],
    detail: [
      "Monitoring · support · improvement",
      "Monitoreo · soporte · mejora",
    ],
    page: "process",
  },
] as const;
export const process = [
  {
    title: ["Audit", "Evaluar"],
    summary: [
      "Map goals, tools, gaps, and existing handoffs.",
      "Revisa objetivos, herramientas, brechas y traspasos actuales.",
    ],
  },
  {
    title: ["Architect", "Diseñar"],
    summary: [
      "Decide what should connect and what matters first.",
      "Define qué debe conectarse y qué es prioritario.",
    ],
  },
  {
    title: ["Build", "Implementar"],
    summary: [
      "Put the agreed foundation and workflows in place.",
      "Implementa la base y los flujos acordados.",
    ],
  },
  {
    title: ["Operate", "Administrar"],
    summary: [
      "Support, monitor, and maintain the working system.",
      "Acompaña, monitorea y mantiene el sistema.",
    ],
  },
  {
    title: ["Improve", "Mejorar"],
    summary: [
      "Review evidence and refine the next priorities.",
      "Revisa la evidencia y ajusta las próximas prioridades.",
    ],
  },
] as const;
export const journey = [
  {
    title: ["Be seen", "Que te encuentren"],
    hero: ["Get found", "Que te encuentren"],
    detail: ["Website + search", "Sitio web y buscadores"],
  },
  {
    title: ["Be reached", "Recibe consultas"],
    hero: ["Start the conversation", "Inicia la conversación"],
    detail: ["Inquiry + response", "Consulta y respuesta"],
  },
  {
    title: ["Keep moving", "Mantén el seguimiento"],
    hero: ["Keep it moving", "Mantén el seguimiento"],
    detail: ["CRM + follow-up", "CRM y seguimiento"],
  },
  {
    title: ["Be chosen", "Avanza al siguiente paso"],
    hero: ["Turn interest into action", "Avanza al siguiente paso"],
    detail: ["Booking + handoff", "Cita y traspaso"],
  },
  {
    title: ["Stay connected", "Mantén la relación"],
    hero: ["Stay connected", "Mantén la relación"],
    detail: ["Reviews + retention", "Reseñas y relación"],
  },
] as const;
export const faqs: Section[] = [
  s(
    "Can we start with one part of the system?",
    "¿Podemos empezar por una parte del sistema?",
    "Yes. The starting point and scope are agreed around the gap that matters most and its connections to the rest of the operation.",
    "Sí. El punto de partida y el alcance se acuerdan según la brecha más importante y su relación con el resto de la operación.",
  ),
  s(
    "Do we need to replace all our tools?",
    "¿Tenemos que reemplazar todas las herramientas?",
    "We review the current setup first. What can stay, what needs to connect, and what may need to change depends on the tools and the agreed scope.",
    "Primero revisamos lo que ya utilizan. Qué puede conservarse, qué debe conectarse y qué conviene cambiar depende de las herramientas y del alcance acordado.",
  ),
  s(
    "Can we speak in Spanish?",
    "¿Podemos hablar en español?",
    "Yes. Commercial conversations are available in English and Spanish. Your language preference continues through contact and follow-up.",
    "Sí. Las conversaciones comerciales pueden ser en inglés o español. Tu preferencia de idioma se conserva durante el contacto y el seguimiento.",
  ),
];
export const local = (pair: readonly string[], locale: Locale) =>
  pair[locale === "en" ? 0 : 1];
export const primaryCta = (locale: Locale) =>
  text(locale, "Book a strategy call", "Agenda una llamada estratégica");
