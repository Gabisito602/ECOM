import type { ProductKind } from "@/components/product/ProductArt";

/**
 * Opciones del configurador. Separadas de la UI para poder alimentarlas en el futuro
 * desde un CMS/API (catálogo real de soportes, colores y acabados de Newgraf).
 */
export type ConfigProduct = { id: ProductKind; label: string; cylinder: boolean; colors: string[] };

export const configProducts: ConfigProduct[] = [
  { id: "vaso", label: "Vaso", cylinder: true, colors: ["transparente", "blanco", "negro", "rojo", "amarillo", "azul", "verde"] },
  { id: "botella", label: "Botella", cylinder: true, colors: ["blanco", "negro", "rojo", "amarillo", "azul", "verde"] },
  { id: "caja", label: "Caja", cylinder: false, colors: ["blanco", "kraft", "negro"] },
  { id: "bolsa", label: "Bolsa", cylinder: false, colors: ["kraft", "blanco", "negro", "rojo", "azul"] },
  { id: "envase", label: "Envase", cylinder: true, colors: ["blanco", "negro", "rojo", "verde", "transparente"] },
];

export const colors: Record<string, { label: string; hex: string; clear?: boolean }> = {
  transparente: { label: "Transparente", hex: "#d5e4ea", clear: true },
  blanco: { label: "Blanco", hex: "#f6f4ef" },
  negro: { label: "Negro", hex: "#141518" },
  rojo: { label: "Rojo", hex: "#d7192a" },
  amarillo: { label: "Amarillo", hex: "#f5c400" },
  azul: { label: "Azul", hex: "#1d3fc4" },
  verde: { label: "Verde", hex: "#2f5d1e" },
  kraft: { label: "Kraft", hex: "#c9a77a" },
};

export const inks = [
  { id: "auto", label: "Automático" },
  { id: "#ffffff", label: "Blanco" },
  { id: "#0b0b0c", label: "Negro" },
  { id: "#d7192a", label: "Rojo" },
] as const;

export const finishes = [
  { id: "mate", label: "Mate", hint: "Superficie sin reflejos" },
  { id: "brillo", label: "Brillo", hint: "Superficie con reflejo" },
] as const;
