import type { ProductKind } from "@/components/product/ProductArt";
import type { ArtworkId } from "@/components/product/artworks";

/**
 * Categorías de producto. Solo soportes indicados por Newgraf.
 * No se listan técnicas, medidas, mínimos ni plazos: se confirman en cada propuesta.
 */
export type Category = {
  slug: "vasos" | "botellas" | "envases" | "packaging" | "merchandising";
  name: string;
  short: string;
  /** Título SEO (<title>) */
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  /** Soportes que entran en la categoría (confirmados en el briefing). */
  items: string[];
  uses: string[];
  visual: { kind: ProductKind; color: string; ink: string; art: ArtworkId; clear?: boolean };
  keywords: string[];
};

export const categories: Category[] = [
  {
    slug: "vasos",
    name: "Vasos",
    short: "Vasos de colores, transparentes y corporativos con tu marca.",
    seoTitle: "Vasos personalizados para empresas · Serigrafía de vasos",
    seoDescription:
      "Vasos personalizados y serigrafiados con tu logotipo para empresas, restaurantes, gimnasios y eventos. Pide tu propuesta a Newgraf.",
    h1: "Vasos personalizados para empresas",
    intro:
      "Vasos serigrafiados con tu logotipo para restauración, eventos, gimnasios y campañas. Tu marca, en el objeto que tus clientes tienen en la mano.",
    items: ["Vasos de color", "Vasos transparentes", "Vasos corporativos", "Vasos para eventos", "Vasos promocionales"],
    uses: ["Restaurantes y cafeterías", "Eventos y festivales", "Gimnasios", "Campañas promocionales", "Regalo corporativo"],
    visual: { kind: "vaso", color: "#f5c400", ink: "#0b0b0c", art: "tu-marca" },
    keywords: ["serigrafía de vasos", "vasos personalizados para empresas", "vasos serigrafiados", "vasos corporativos"],
  },
  {
    slug: "botellas",
    name: "Botellas",
    short: "Botellas con tu diseño impreso, listas para regalar o vender.",
    seoTitle: "Botellas personalizadas con logo para empresas",
    seoDescription:
      "Botellas personalizadas y serigrafiadas con tu diseño para empresas, eventos y merchandising. Solicita propuesta a Newgraf.",
    h1: "Botellas personalizadas",
    intro:
      "Botellas con tu diseño impreso para merchandising, eventos, equipos y venta. Color de soporte y diseño a medida de tu marca.",
    items: ["Botellas de color", "Botellas para eventos", "Botellas corporativas", "Botellas promocionales"],
    uses: ["Merchandising corporativo", "Eventos y espectáculos", "Clubes y gimnasios", "Tiendas y retail"],
    visual: { kind: "botella", color: "#1f3fbf", ink: "#ffffff", art: "orbita" },
    keywords: ["botellas personalizadas", "botellas serigrafiadas", "botellas con logo"],
  },
  {
    slug: "envases",
    name: "Envases",
    short: "Envases que ya llegan con tu identidad impresa.",
    seoTitle: "Personalización de envases para marcas",
    seoDescription:
      "Personalización de envases con serigrafía para marcas de alimentación, bebidas y retail. Cuéntanos tu proyecto.",
    h1: "Personalización de envases",
    intro:
      "Envases personalizados para marcas que quieren que su producto se reconozca en el lineal y en casa del cliente.",
    items: ["Envases para alimentación", "Envases para bebidas", "Envases para retail"],
    uses: ["Marcas de alimentación", "Marcas de bebidas", "Retail", "Distribuidores"],
    visual: { kind: "envase", color: "#ffffff", ink: "#0b0b0c", art: "hoja" },
    keywords: ["personalización de envases", "envases personalizados", "envases serigrafiados"],
  },
  {
    slug: "packaging",
    name: "Packaging",
    short: "Cajas y packaging personalizados que hablan por tu marca.",
    seoTitle: "Packaging personalizado y cajas impresas para empresas",
    seoDescription:
      "Packaging personalizado y cajas impresas con tu marca para envíos, retail y empresas. Producción para pedidos B2B.",
    h1: "Packaging personalizado",
    intro:
      "Cajas y packaging impresos con tu marca: desde la plancha neutra hasta la caja que abre tu cliente.",
    items: ["Cajas", "Cajas de envío", "Packaging para retail", "Packaging corporativo"],
    uses: ["E-commerce y envíos", "Retail", "Empresas de packaging", "Marcas de alimentación"],
    visual: { kind: "caja", color: "#f4f2ee", ink: "#0b0b0c", art: "monograma" },
    keywords: ["packaging personalizado", "cajas personalizadas", "cajas impresas con logo"],
  },
  {
    slug: "merchandising",
    name: "Merchandising",
    short: "Mochilas, bolsas y merchandising corporativo con tu marca.",
    seoTitle: "Merchandising personalizado para empresas",
    seoDescription:
      "Merchandising corporativo personalizado: mochilas, bolsas y otros soportes con tu logotipo. Pide propuesta a Newgraf.",
    h1: "Merchandising personalizado",
    intro:
      "Mochilas, bolsas y merchandising corporativo para equipos, eventos, ferias y campañas de marca.",
    items: ["Mochilas", "Bolsas", "Merchandising corporativo", "Otros soportes personalizables"],
    uses: ["Agencias de marketing", "Agencias de merchandising", "Eventos y ferias", "Equipos internos"],
    visual: { kind: "bolsa", color: "#d8c9a8", ink: "#0b0b0c", art: "rayo" },
    keywords: ["merchandising personalizado", "merchandising corporativo", "bolsas personalizadas", "mochilas personalizadas"],
  },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
