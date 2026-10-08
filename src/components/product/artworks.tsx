/**
 * Artes de demostración (marcas ficticias y abstractas) dibujadas en una caja de 100×100.
 * No representan clientes reales: sirven para enseñar cómo queda una marca sobre el soporte.
 */
import type { ReactNode } from "react";

export type ArtworkId = "tu-marca" | "orbita" | "onda" | "hoja" | "rayo" | "monograma";

export const artworkLabels: Record<ArtworkId, string> = {
  "tu-marca": "Tu marca",
  orbita: "Órbita",
  onda: "Onda",
  hoja: "Hoja",
  rayo: "Rayo",
  monograma: "Monograma",
};

export function Artwork({ id, ink }: { id: ArtworkId; ink: string }): ReactNode {
  switch (id) {
    case "tu-marca":
      return (
        <g fill={ink}>
          <path d="M50 10C50 10 33 29 33 40a17 17 0 0 0 34 0C67 29 50 10 50 10Z" />
          <text
            x="50"
            y="72"
            textAnchor="middle"
            fontFamily="var(--font-geist-sans), system-ui, sans-serif"
            fontWeight="800"
            fontSize="15"
            letterSpacing="1.5"
          >
            TU MARCA
          </text>
          <rect x="38" y="80" width="24" height="3" rx="1.5" />
        </g>
      );
    case "orbita":
      return (
        <g fill="none" stroke={ink} strokeWidth="6">
          <circle cx="50" cy="50" r="30" />
          <path d="M20 50h60" />
          <circle cx="50" cy="50" r="9" fill={ink} stroke="none" />
        </g>
      );
    case "onda":
      return (
        <g fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round">
          <path d="M14 38c12-12 24 12 36 0s24 12 36 0" />
          <path d="M14 54c12-12 24 12 36 0s24 12 36 0" />
          <path d="M14 70c12-12 24 12 36 0s24 12 36 0" />
        </g>
      );
    case "hoja":
      return (
        <path fill={ink} d="M50 12C24 32 22 62 50 88 78 62 76 32 50 12Zm-3 18v52h6V30h-6Z" fillRule="evenodd" />
      );
    case "rayo":
      return (
        <g fill={ink}>
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="47"
              y="8"
              width="6"
              height="24"
              rx="3"
              transform={`rotate(${i * 30} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="13" />
        </g>
      );
    case "monograma":
      return (
        <g fill="none" stroke={ink} strokeWidth="7" strokeLinejoin="round">
          <rect x="18" y="18" width="64" height="64" rx="14" />
          <path d="M32 68 68 32" />
          <circle cx="40" cy="40" r="6" fill={ink} stroke="none" />
        </g>
      );
  }
}
