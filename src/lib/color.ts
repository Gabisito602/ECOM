const toRgb = (hex: string) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
};

export function mix(a: string, b: string, t: number) {
  const k = Math.max(0, Math.min(1, t));
  const A = toRgb(a);
  const B = toRgb(b);
  const c = A.map((v, i) => Math.round(v + (B[i] - v) * k));
  return `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/** Luminancia relativa simple para decidir tinta clara u oscura sobre un color. */
export function isDark(hex: string) {
  const [r, g, b] = toRgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 140;
}

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
/** Normaliza v del rango [a,b] a [0,1]. */
export const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
