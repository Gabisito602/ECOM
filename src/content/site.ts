/**
 * Datos de empresa de Newgraf.
 *
 * REGLA: aquí solo van datos confirmados por Newgraf. Todo lo que está a `null`
 * o en una lista vacía está PENDIENTE y la web lo oculta automáticamente.
 * Al rellenarlo, aparece en contacto, footer, JSON-LD y SEO sin tocar componentes.
 */

export type Social = { label: string; href: string };
export type Stat = { value: string; label: string };

export const site = {
  name: "Newgraf",
  tagline: "Serigrafía y personalización para empresas",
  claim: "Tu producto. Tu marca. Nuestra serigrafía.",
  description:
    "Serigrafía y personalización de vasos, botellas, envases y packaging para empresas. Convertimos tus productos en soportes de tu marca.",

  /** Dominio de producción, sin barra final. PENDIENTE: confirmar dominio real. */
  url: (typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_SITE_URL : undefined) ?? "https://www.newgraf.es",

  locale: "es_ES",

  contact: {
    /** PENDIENTE — formato internacional, p. ej. "+34 600 000 000" */
    phone: null as string | null,
    /** PENDIENTE */
    email: null as string | null,
    /** PENDIENTE — solo dígitos con prefijo, p. ej. "34600000000" */
    whatsapp: null as string | null,
    /** PENDIENTE — dirección postal completa */
    address: null as string | null,
    /**
     * Ciudad usada en SEO. Se ha deducido de las búsquedas objetivo ("serigrafía Barcelona").
     * CONFIRMAR con Newgraf antes de publicar.
     */
    city: "Barcelona" as string | null,
    /** PENDIENTE — horario de atención */
    hours: null as string | null,
  },

  /** PENDIENTE — p. ej. { label: "Instagram", href: "https://instagram.com/..." } */
  socials: [] as Social[],

  /**
   * Cifras de empresa. NO inventar. Vacío = la sección muestra solo los pilares cualitativos.
   * Ejemplo: { value: "25+", label: "años de experiencia" }
   */
  stats: [] as Stat[],

  legal: {
    /** PENDIENTE — razón social y CIF para aviso legal / privacidad */
    companyName: null as string | null,
    taxId: null as string | null,
  },
} as const;

export const whatsappHref = (text?: string) =>
  site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    : null;
