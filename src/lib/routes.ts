export type Locale = "en" | "es";
export const routeIds = [
  "home",
  "solutions",
  "process",
  "websites",
  "automation",
  "crm",
  "work",
  "about",
  "contact",
  "privacy",
  "confirmation",
] as const;
export type PageId = (typeof routeIds)[number];
export const routes: Record<PageId, Record<Locale, string>> = {
  home: { en: "/", es: "/es/" },
  solutions: { en: "/solutions/", es: "/es/soluciones/" },
  process: { en: "/how-it-works/", es: "/es/como-trabajamos/" },
  websites: { en: "/websites-seo/", es: "/es/sitios-web-seo/" },
  automation: { en: "/ai-automation/", es: "/es/ia-automatizacion/" },
  crm: { en: "/crm-follow-up/", es: "/es/crm-seguimiento/" },
  work: { en: "/results/", es: "/es/proyectos/" },
  about: { en: "/about/", es: "/es/sobre-nosotros/" },
  contact: { en: "/contact/", es: "/es/contacto/" },
  privacy: { en: "/privacy/", es: "/es/privacidad/" },
  confirmation: { en: "/thank-you/", es: "/es/gracias/" },
};
export const href = (page: PageId, locale: Locale) => routes[page][locale];
export const text = (locale: Locale, en: string, es: string) =>
  locale === "en" ? en : es;
export const navigation: PageId[] = ["solutions", "process", "work", "about"];
export const labels: Record<PageId, Record<Locale, string>> = {
  home: { en: "Home", es: "Inicio" },
  solutions: { en: "Solutions", es: "Soluciones" },
  process: { en: "How it works", es: "Cómo trabajamos" },
  websites: { en: "Websites & SEO", es: "Sitios web y SEO" },
  automation: { en: "AI & Automation", es: "IA y automatización" },
  crm: { en: "CRM & Follow-Up", es: "CRM y seguimiento" },
  work: { en: "Selected work", es: "Proyectos" },
  about: { en: "About", es: "Sobre nosotros" },
  contact: { en: "Contact", es: "Contacto" },
  privacy: { en: "Privacy", es: "Privacidad" },
  confirmation: { en: "Inquiry received", es: "Consulta recibida" },
};
