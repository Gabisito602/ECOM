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
  /** Ruta servida desde /public tras `npm run media:fetch`. */
  local: string;
  poster?: string;
  alt: string;
};

const USE_LOCAL_VIDEO = typeof process !== "undefined" && process.env?.NEXT_PUBLIC_LOCAL_MEDIA === "1";

const HF = "https://d8j0ntlcm91z4.cloudfront.net/user_3I2s6cIxgsgvd1l0EiSOfN6pYiS";

export const videos = {
  hero: {
    id: "v01-hero",
    remote: `${HF}/hf_20261008_203424_6d2472c9-d0a8-4dbf-949b-8b3740345f9f.mp4`,
    local: "/media/higgsfield/v01-hero.mp4",
    alt: "Proceso de serigrafía: tinta, pantalla, rasqueta e impresión de un logotipo sobre un vaso.",
  },
  product: {
    id: "v02-product",
    remote: `${HF}/hf_20261008_203424_2ca350a5-66a4-4c83-97da-81df0c09bc8f.mp4`,
    local: "/media/higgsfield/v02-product.mp4",
    alt: "Vaso personalizado girando lentamente sobre un pedestal.",
  },
  packaging: {
    id: "v03-packaging",
    remote: `${HF}/hf_20261008_203424_f4d0e3bd-2eab-40a1-9ee0-a51437cdc440.mp4`,
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
    remote: `${HF}/hf_20261008_203424_2e98582f-07b3-48d6-80b3-f13dfc657649.mp4`,
    local: "/media/higgsfield/v05-industrial.mp4",
    alt: "Planos macro de maquinaria, tinta y pantallas de serigrafía.",
  },
  /** Grabaciones reales de producción aportadas por Newgraf. */
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

export function videoSrc(v: VideoAsset) {
  if (!v.remote || USE_LOCAL_VIDEO) return v.local;
  return v.remote;
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
