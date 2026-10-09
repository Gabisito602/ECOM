/**
 * Manifiesto único de medios.
 *
 * Cada vídeo tiene una fuente remota (generada con Higgsfield) y una ruta local opcional.
 * Para servirlos desde tu propio dominio (recomendado en producción):
 *   1. npm run media:fetch      → descarga los MP4 remotos a /public/media/higgsfield
 *   2. npm run media:optimize   → genera versiones ligeras + póster
 *   3. Cambia USE_LOCAL_VIDEO a true (o pon NEXT_PUBLIC_LOCAL_MEDIA=1).
 *
 * Para sustituir un vídeo por el definitivo basta con cambiar `remote`/`local` aquí.
 * Los prompts de cada vídeo están en docs/HIGGSFIELD.md.
 */

export type VideoAsset = {
  id: string;
  /** URL generada en Higgsfield (CDN). `null` = aún no generado. */
  remote: string | null;
  /** Versión ligera para pantallas ≤ 768 px (opcional). */
  mobile?: string;
  /** Ruta servida desde /public tras `npm run media:fetch`. */
  local: string;
  poster?: string;
  alt: string;
};

const USE_LOCAL_VIDEO = typeof process !== "undefined" && process.env?.NEXT_PUBLIC_LOCAL_MEDIA === "1";

const HF = "https://d8j0ntlcm91z4.cloudfront.net/user_3I2s6cIxgsgvd1l0EiSOfN6pYiS";
/** Versiones optimizadas para web (720p, ~1–2 MB) subidas al CDN de Higgsfield el 09/10/2026. */
const CDN = "https://d2ol7oe51mr4n9.cloudfront.net/user_3I2s6cIxgsgvd1l0EiSOfN6pYiS";

export const videos = {
  hero: {
    id: "v01-hero",
    // Montaje: vídeo Higgsfield (v01) intercalado con producción real de vasos y cajas.
    remote: `${CDN}/474cb941-2976-4b16-94d1-8b4566cd0cbc.mp4`,
    mobile: `${CDN}/17a09d25-1dc1-4712-89ff-1bdaa233c08a.mp4`,
    local: "/media/higgsfield/v01-hero.mp4",
    poster: `${CDN}/9b23075f-6c37-4630-9c35-ba377a3e22b6.jpg`,
    alt: "Proceso de serigrafía: tinta, pantalla, rasqueta, producción real de vasos y cajas, y vasos terminados.",
  },
  product: {
    id: "v02-product",
    remote: `${HF}/hf_20261008_203424_2ca350a5-66a4-4c83-97da-81df0c09bc8f.mp4`,
    local: "/media/higgsfield/v02-product.mp4",
    alt: "Vaso personalizado girando lentamente sobre un pedestal.",
  },
  packaging: {
    id: "v03-packaging",
    remote: `${CDN}/8cfc4a18-7fd4-403d-87ab-df18858049b7.mp4`,
    poster: `${CDN}/c7d556de-c639-46d9-b55e-959b03dfc6f5.jpg`,
    local: "/media/higgsfield/v03-packaging.mp4",
    alt: "Caja neutra que pasa a estar impresa con una marca.",
  },
  bottle: {
    id: "v04-bottle",
    remote: `${HF}/hf_20261008_203424_f9ac2b37-d8e5-4470-8646-e14063cbef64.mp4`,
    local: "/media/higgsfield/v04-bottle.mp4",
    alt: "Macro del acabado de tinta sobre una botella personalizada.",
  },
  industrial: {
    id: "v05-industrial",
    remote: `${CDN}/7560a11e-1642-4d2d-aa34-c6ba063127ee.mp4`,
    poster: `${CDN}/cd48910f-d075-47e4-942d-f0b70ca2936c.jpg`,
    local: "/media/higgsfield/v05-industrial.mp4",
    alt: "Planos macro de maquinaria, tinta y pantallas de serigrafía.",
  },
  /** Animados en Higgsfield a partir de las fotos reales de Newgraf (09/10/2026). */
  cupsReal: {
    id: "v06-vasos-reales",
    remote: `${CDN}/57526eec-1d11-4a46-8d10-90b884cccf00.mp4`,
    local: "/media/higgsfield/v06-vasos-reales.mp4",
    poster: "/media/vasos-shaker.jpg",
    alt: "Vasos amarillos serigrafiados con logotipos de marcas fitness.",
  },
  bottlesReal: {
    id: "v07-botellas-reales",
    remote: `${CDN}/1d058a31-bc00-4b23-afcc-d597d01277d6.mp4`,
    local: "/media/higgsfield/v07-botellas-reales.mp4",
    poster: "/media/botellas-rey-leon.jpg",
    alt: "Botellas roja, amarilla y azul serigrafiadas en blanco.",
  },
  /** Higgsfield v02 y v04, optimizados (720p) y servidos desde /public. */
  yellowCup: {
    id: "v02-vaso-amarillo",
    remote: null,
    local: "/media/vaso-amarillo-giro.mp4",
    poster: "/media/vaso-amarillo-giro.jpg",
    alt: "Vaso amarillo personalizado girando sobre un pedestal.",
  },
  blueBottle: {
    id: "v04-botella-azul",
    remote: null,
    local: "/media/botella-azul-macro.mp4",
    poster: "/media/botella-azul-macro.jpg",
    alt: "Macro del acabado de tinta blanca sobre una botella azul.",
  },
  /** Grabaciones reales de producción aportadas por Newgraf. */
  /** Grabación real: serigrafía de vasos en máquina (Newgraf). */
  productionCups: {
    id: "produccion-vasos",
    remote: null,
    local: "/media/produccion-vasos.mp4",
    poster: "/media/produccion-vasos.jpg",
    alt: "Máquina de serigrafía imprimiendo vasos en el taller de Newgraf.",
  },
  productionA: {
    id: "produccion-a",
    remote: null,
    local: "/media/produccion-cajas-a.mp4",
    poster: "/media/produccion-cajas-a.jpg",
    alt: "Planchas de cartón recién impresas saliendo de producción.",
  },
  productionB: {
    id: "produccion-b",
    remote: null,
    local: "/media/produccion-cajas-b.mp4",
    poster: "/media/produccion-cajas-b.jpg",
    alt: "Troqueles de caja impresos apilados en producción.",
  },
} satisfies Record<string, VideoAsset>;

export function videoSrc(v: VideoAsset, small = false) {
  if (!v.remote || USE_LOCAL_VIDEO) return v.local;
  return small && v.mobile ? v.mobile : v.remote;
}

export const images = {
  bottles: {
    src: "/media/botellas-rey-leon.jpg",
    width: 1536,
    height: 1024,
    alt: "Tres botellas de aluminio roja, amarilla y azul serigrafiadas en blanco.",
  },
  cups: {
    src: "/media/vasos-shaker.jpg",
    width: 1536,
    height: 1024,
    alt: "Dos vasos amarillos serigrafiados en negro con logotipos de marca.",
  },
  clearCups: {
    src: `${CDN}/f103367c-bbce-4b07-aee9-f099809c3b08.webp`,
    width: 900,
    height: 1125,
    alt: "Vasos transparentes serigrafiados en blanco.",
  },
  /** Generadas con Higgsfield (09/10/2026). */
  containers: {
    src: `${CDN}/25a19a1e-b02c-4862-a324-c675f27f9475.webp`,
    width: 1400,
    height: 1055,
    alt: "Envases de champú y gel serigrafiados directamente sobre la botella.",
  },
  merch: {
    src: `${CDN}/87016122-75ca-4449-a60c-229ffa75ea23.webp`,
    width: 1400,
    height: 1055,
    alt: "Mochila negra y bolsa de algodón serigrafiadas con un logotipo blanco.",
  },
  productionA: {
    src: "/media/produccion-cajas-a.jpg",
    width: 464,
    height: 832,
    alt: "Planchas de cartón impresas en producción.",
  },
  productionB: {
    src: "/media/produccion-cajas-b.jpg",
    width: 1024,
    height: 576,
    alt: "Troqueles de caja impresos.",
  },
} as const;
