import type { ProductKind } from "@/components/product/ProductArt";
import type { ArtworkId } from "@/components/product/artworks";

export type UseCase = {
  id: string;
  name: string;
  line: string;
  products: string[];
  /** Escena visual propia (composición de soportes y paleta). Sustituible por fotografía. */
  scene: {
    bg: string;
    items: { kind: ProductKind; color: string; ink: string; art: ArtworkId; clear?: boolean; h: number }[];
  };
};

export const useCases: UseCase[] = [
  {
    id: "restauracion",
    name: "Restauración",
    line: "Vasos y packaging que llevan tu marca del local a la calle.",
    products: ["Vasos", "Packaging", "Envases"],
    scene: {
      bg: "radial-gradient(ellipse at 50% 30%, #f3ece2, #d8cbb7)",
      items: [
        { kind: "vaso", color: "#f7f5f0", ink: "#7a2e1d", art: "hoja", h: 62 },
        { kind: "caja", color: "#c9a77a", ink: "#3b1f12", art: "hoja", h: 54 },
        { kind: "vaso", color: "#7a2e1d", ink: "#f7f5f0", art: "hoja", h: 44 },
      ],
    },
  },
  {
    id: "fitness",
    name: "Fitness",
    line: "Shakers, vasos y botellas para gimnasios y marcas deportivas.",
    products: ["Vasos", "Botellas", "Merchandising"],
    scene: {
      bg: "radial-gradient(ellipse at 50% 30%, #2b2b20, #0c0c09)",
      items: [
        { kind: "shaker", color: "#f5c400", ink: "#0b0b0c", art: "rayo", h: 60 },
        { kind: "botella", color: "#0b0b0c", ink: "#f5c400", art: "rayo", h: 74 },
        { kind: "shaker", color: "#0b0b0c", ink: "#f5c400", art: "rayo", h: 46 },
      ],
    },
  },
  {
    id: "eventos",
    name: "Eventos",
    line: "Vasos y merchandising para festivales, ferias y espectáculos.",
    products: ["Vasos", "Botellas", "Bolsas"],
    scene: {
      bg: "radial-gradient(ellipse at 50% 30%, #3a1430, #10060d)",
      items: [
        { kind: "vaso", color: "#ff5a36", ink: "#ffffff", art: "onda", h: 56 },
        { kind: "vaso", color: "#cfe3ea", ink: "#ffffff", art: "onda", clear: true, h: 66 },
        { kind: "vaso", color: "#7b3cff", ink: "#ffffff", art: "onda", h: 48 },
      ],
    },
  },
  {
    id: "retail",
    name: "Retail",
    line: "Bolsas, cajas y envases coherentes en todo el punto de venta.",
    products: ["Bolsas", "Packaging", "Envases"],
    scene: {
      bg: "radial-gradient(ellipse at 50% 30%, #f6f6f4, #d9d9d4)",
      items: [
        { kind: "bolsa", color: "#0b0b0c", ink: "#ffffff", art: "monograma", h: 66 },
        { kind: "caja", color: "#ffffff", ink: "#0b0b0c", art: "monograma", h: 50 },
        { kind: "bolsa", color: "#e9e4d8", ink: "#0b0b0c", art: "monograma", h: 50 },
      ],
    },
  },
  {
    id: "alimentacion",
    name: "Alimentación",
    line: "Envases y packaging para que tu producto se reconozca en el lineal.",
    products: ["Envases", "Packaging"],
    scene: {
      bg: "radial-gradient(ellipse at 50% 30%, #eef1e6, #c9d1b9)",
      items: [
        { kind: "envase", color: "#ffffff", ink: "#2f5d1e", art: "hoja", h: 44 },
        { kind: "envase", color: "#2f5d1e", ink: "#ffffff", art: "hoja", h: 56 },
        { kind: "caja", color: "#d9c39b", ink: "#2f5d1e", art: "hoja", h: 46 },
      ],
    },
  },
  {
    id: "bebidas",
    name: "Bebidas",
    line: "Botellas y vasos con la identidad de tu bebida.",
    products: ["Botellas", "Vasos"],
    scene: {
      bg: "radial-gradient(ellipse at 50% 30%, #12304a, #050e17)",
      items: [
        { kind: "botella", color: "#e8f1f6", ink: "#12304a", art: "onda", h: 70 },
        { kind: "vaso", color: "#bfe1f2", ink: "#ffffff", art: "onda", clear: true, h: 50 },
        { kind: "botella", color: "#1f6fa8", ink: "#ffffff", art: "onda", h: 60 },
      ],
    },
  },
  {
    id: "hospitality",
    name: "Hospitality",
    line: "Detalles de marca para hoteles: habitaciones, bar y eventos.",
    products: ["Vasos", "Botellas", "Merchandising"],
    scene: {
      bg: "radial-gradient(ellipse at 50% 30%, #efe7da, #c8b796)",
      items: [
        { kind: "botella", color: "#1d2a24", ink: "#c8a96a", art: "monograma", h: 66 },
        { kind: "vaso", color: "#f4efe6", ink: "#1d2a24", art: "monograma", h: 46 },
        { kind: "bolsa", color: "#1d2a24", ink: "#c8a96a", art: "monograma", h: 56 },
      ],
    },
  },
  {
    id: "marketing",
    name: "Marketing & Merchandising",
    line: "Producción para agencias: campañas, kits y merchandising de marca.",
    products: ["Merchandising", "Bolsas", "Mochilas", "Vasos"],
    scene: {
      bg: "radial-gradient(ellipse at 50% 30%, #2a0f13, #0c0405)",
      items: [
        { kind: "bolsa", color: "#d7192a", ink: "#ffffff", art: "tu-marca", h: 62 },
        { kind: "vaso", color: "#ffffff", ink: "#d7192a", art: "tu-marca", h: 48 },
        { kind: "botella", color: "#0b0b0c", ink: "#ffffff", art: "tu-marca", h: 64 },
      ],
    },
  },
];
