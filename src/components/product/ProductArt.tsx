"use client";

/**
 * Renderizador 2.5D de soportes personalizables (SVG).
 *
 * Es la pieza común del configurador, la sección "De un producto a una marca", la galería
 * y los casos de uso. Su interfaz (`ProductArtProps`) está pensada para que, en el futuro,
 * un renderizador 3D (three.js / R3F con modelos GLB) pueda implementar las mismas props
 * y sustituirlo sin cambiar el configurador.
 */
import { useId, type ReactNode } from "react";
import { Artwork, type ArtworkId } from "./artworks";

export type ProductKind = "vaso" | "botella" | "caja" | "bolsa" | "envase" | "shaker";
export type Finish = "mate" | "brillo";

export type ArtworkInput =
  | { type: "preset"; id: ArtworkId }
  | { type: "image"; src: string; mono: boolean }
  | { type: "text"; text: string }
  | { type: "none" };

export type ProductArtProps = {
  kind: ProductKind;
  color: string;
  ink: string;
  artwork: ArtworkInput;
  finish?: Finish;
  /** Soporte transparente (vasos de plástico transparente). */
  clear?: boolean;
  /** Giro simulado del cilindro: -1 … 1. */
  turn?: number;
  /** 0 … 1 — revela la impresión como una pasada de rasqueta. */
  print?: number;
  /** Escala del arte dentro de la zona de impresión: 0.4 … 1.2 */
  artScale?: number;
  /** Desplazamiento vertical del arte dentro de la zona: -1 … 1 */
  artOffsetY?: number;
  showZone?: boolean;
  /** Banda decorativa de diseño (franja de color bajo el logotipo). */
  accent?: { color: string; amount: number };
  title?: string;
  className?: string;
};

type Zone = { x: number; y: number; w: number; h: number };
type Shape = {
  viewBox: [number, number];
  zone: Zone;
  cylinder: boolean;
};

const shapes: Record<ProductKind, Shape> = {
  vaso: { viewBox: [200, 300], zone: { x: 52, y: 92, w: 96, h: 120 }, cylinder: true },
  shaker: { viewBox: [200, 300], zone: { x: 52, y: 100, w: 96, h: 120 }, cylinder: true },
  botella: { viewBox: [200, 340], zone: { x: 56, y: 150, w: 88, h: 130 }, cylinder: true },
  envase: { viewBox: [220, 240], zone: { x: 56, y: 104, w: 108, h: 96 }, cylinder: true },
  bolsa: { viewBox: [220, 300], zone: { x: 56, y: 130, w: 108, h: 120 }, cylinder: false },
  caja: { viewBox: [300, 260], zone: { x: 0, y: 0, w: 100, h: 100 }, cylinder: false },
};

export function ProductArt({
  kind,
  color,
  ink,
  artwork,
  finish = "mate",
  clear = false,
  turn = 0,
  print = 1,
  artScale = 1,
  artOffsetY = 0,
  showZone = false,
  accent,
  title,
  className,
}: ProductArtProps) {
  const uid = useId().replace(/:/g, "");
  const shape = shapes[kind];
  const [vw, vh] = shape.viewBox;
  const gloss = finish === "brillo";
  const bodyOpacity = clear ? 0.16 : 1;

  const shade = `shade-${uid}`;
  const clip = `clip-${uid}`;
  const reveal = `reveal-${uid}`;
  const mono = `mono-${uid}`;

  const body = bodyPath(kind);

  // Arte dentro de la zona (o cara izquierda de la caja).
  const z = shape.zone;
  const s = Math.max(0.3, Math.min(1.3, artScale));
  const size = Math.min(z.w, z.h) * s;
  const cx = z.x + z.w / 2;
  const cy = z.y + z.h / 2 + artOffsetY * (z.h - size) * 0.5;
  // Simulación de giro sobre cilindro: desplaza y comprime horizontalmente.
  const t = Math.max(-1, Math.min(1, turn));
  const squash = shape.cylinder ? Math.max(0.05, Math.cos((t * Math.PI) / 2)) : 1;
  const shift = shape.cylinder ? Math.sin((t * Math.PI) / 2) * (z.w * 0.62) : 0;
  const artVisible = Math.abs(t) < 0.98;

  const art = (
    <g
      transform={`translate(${cx + shift} ${cy}) scale(${squash} 1) translate(${-size / 2} ${-size / 2}) scale(${size / 100})`}
    >
      {renderArtwork(artwork, ink, mono)}
    </g>
  );

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      className={className}
      role="img"
      aria-label={title ?? `${kind} personalizado`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={shade} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity={clear ? 0.25 : 0.42} />
          <stop offset="0.16" stopColor="#000" stopOpacity="0.06" />
          <stop offset={gloss ? "0.27" : "0.3"} stopColor="#fff" stopOpacity={gloss ? 0.55 : 0.16} />
          <stop offset={gloss ? "0.33" : "0.42"} stopColor="#fff" stopOpacity="0" />
          <stop offset="0.72" stopColor="#000" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000" stopOpacity={clear ? 0.25 : 0.45} />
        </linearGradient>
        <clipPath id={clip}>
          <path d={body} />
        </clipPath>
        <linearGradient id={reveal} x1="0" x2="0" y1="0" y2="1">
          <stop offset={Math.max(0, print - 0.02)} stopColor="#fff" />
          <stop offset={Math.min(1, print + 0.02)} stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${reveal}-m`} maskUnits="userSpaceOnUse" x="0" y="0" width={vw} height={vh}>
          <rect x="0" y="0" width={vw} height={vh} fill={`url(#${reveal})`} />
        </mask>
        <filter id={mono} colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.33 -0.33 -0.33 1 0.5"
            result="lum"
          />
          <feComponentTransfer in="lum">
            <feFuncA type="discrete" tableValues="0 1" />
          </feComponentTransfer>
          <feComposite operator="in" in2="SourceAlpha" />
          <feFlood floodColor={ink} />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>

      {/* Sombra de contacto */}
      <ellipse
        cx={vw / 2}
        cy={vh - 10}
        rx={vw * 0.36}
        ry="7"
        fill="#000"
        opacity={clear ? 0.12 : 0.2}
        style={{ filter: "blur(4px)" }}
      />

      {kind === "caja" ? (
        <BoxFaces color={color} gloss={gloss} art={art} print={print} showZone={showZone} />
      ) : (
        <>
          {kind === "bolsa" && <BagHandles color={color} />}
          <path d={body} fill={color} fillOpacity={bodyOpacity} />
          {clear && <path d={body} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.2" />}
          <g clipPath={`url(#${clip})`}>
            {accent && accent.amount > 0 && (
              <g opacity={accent.amount}>
                <rect x="0" y={z.y + z.h + 14} width={vw * accent.amount} height="9" fill={accent.color} />
                <rect x={vw * (1 - accent.amount)} y={z.y + z.h + 28} width={vw} height="3" fill={accent.color} />
              </g>
            )}
            {artVisible && <g mask={`url(#${reveal}-m)`}>{art}</g>}
            {kind === "bolsa" ? (
              <BagShading vw={vw} vh={vh} />
            ) : (
              <rect x="0" y="0" width={vw} height={vh} fill={`url(#${shade})`} />
            )}
          </g>
          <Details kind={kind} color={color} clear={clear} gloss={gloss} />
          {showZone && (
            <rect
              x={z.x}
              y={z.y}
              width={z.w}
              height={z.h}
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </>
      )}
    </svg>
  );
}

function renderArtwork(a: ArtworkInput, ink: string, monoFilter: string) {
  switch (a.type) {
    case "preset":
      return <Artwork id={a.id} ink={ink} />;
    case "image":
      return (
        <image
          href={a.src}
          x="0"
          y="0"
          width="100"
          height="100"
          preserveAspectRatio="xMidYMid meet"
          filter={a.mono ? `url(#${monoFilter})` : undefined}
        />
      );
    case "text":
      return (
        <text
          x="50"
          y="50"
          dominantBaseline="central"
          textAnchor="middle"
          fill={ink}
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
          fontWeight="800"
          fontSize={Math.max(10, Math.min(30, 150 / Math.max(1, a.text.length)))}
          letterSpacing="0.5"
        >
          {a.text.toUpperCase()}
        </text>
      );
    case "none":
      return null;
  }
}

function bodyPath(kind: ProductKind) {
  switch (kind) {
    case "vaso":
      return "M28 52 L48 268 Q100 282 152 268 L172 52 Q100 66 28 52 Z";
    case "shaker":
      return "M30 70 L48 268 Q100 282 152 268 L170 70 Q100 82 30 70 Z";
    case "botella":
      return "M80 40 h40 v26 C120 92 158 98 158 140 V312 Q158 328 142 328 H58 Q42 328 42 312 V140 C42 98 80 92 80 66 Z";
    case "envase":
      return "M38 74 L46 214 Q110 228 174 214 L182 74 Q110 86 38 74 Z";
    case "bolsa":
      return "M34 96 H186 L194 286 H26 Z";
    case "caja":
      return "";
  }
}

function Details({
  kind,
  color,
  clear,
  gloss,
}: {
  kind: ProductKind;
  color: string;
  clear: boolean;
  gloss: boolean;
}) {
  const rimOpacity = clear ? 0.35 : 1;
  switch (kind) {
    case "vaso":
      return (
        <g>
          <ellipse cx="100" cy="52" rx="72" ry="9" fill={color} fillOpacity={rimOpacity} />
          <ellipse cx="100" cy="52" rx="72" ry="9" fill="none" stroke="#000" strokeOpacity="0.15" />
          <ellipse cx="100" cy="53" rx="66" ry="6.5" fill="#000" fillOpacity={clear ? 0.08 : 0.28} />
          {gloss && <ellipse cx="62" cy="50" rx="18" ry="2" fill="#fff" opacity="0.5" />}
        </g>
      );
    case "shaker":
      return (
        <g>
          {[42, 52, 62].map((y) => (
            <g key={y}>
              <path d={`M26 ${y} Q100 ${y + 12} 174 ${y} V${y + 7} Q100 ${y + 19} 26 ${y + 7} Z`} fill={color} />
              <path
                d={`M26 ${y} Q100 ${y + 12} 174 ${y} V${y + 7} Q100 ${y + 19} 26 ${y + 7} Z`}
                fill="#000"
                fillOpacity="0.14"
              />
            </g>
          ))}
          <ellipse cx="100" cy="42" rx="74" ry="9" fill={color} />
          <ellipse cx="100" cy="43" rx="66" ry="6.5" fill="#000" fillOpacity="0.28" />
        </g>
      );
    case "botella":
      return (
        <g>
          <rect x="76" y="28" width="48" height="16" rx="5" fill={color} />
          <rect x="76" y="28" width="48" height="16" rx="5" fill="#000" fillOpacity="0.22" />
          <rect x="84" y="31" width="10" height="10" rx="2" fill="#fff" fillOpacity={gloss ? 0.35 : 0.15} />
        </g>
      );
    case "envase":
      return (
        <g>
          <path d="M30 56 H190 V72 Q110 88 30 72 Z" fill={color} />
          <path d="M30 56 H190 V72 Q110 88 30 72 Z" fill="#000" fillOpacity="0.2" />
          <ellipse cx="110" cy="56" rx="80" ry="9" fill={color} />
          <ellipse cx="110" cy="56" rx="80" ry="9" fill="#fff" fillOpacity={gloss ? 0.25 : 0.1} />
        </g>
      );
    case "bolsa":
      return (
        <g>
          <path d="M34 96 H186 L188 110 H32 Z" fill="#000" fillOpacity="0.1" />
        </g>
      );
    default:
      return null;
  }
}

function BagHandles({ color }: { color: string }) {
  return (
    <g fill="none" stroke={color} strokeWidth="7" strokeLinecap="round">
      <path d="M70 100 C70 30 110 30 110 100" />
      <path d="M110 100 C110 30 150 30 150 100" />
      <path d="M70 100 C70 30 110 30 110 100" stroke="#000" strokeOpacity="0.25" />
      <path d="M110 100 C110 30 150 30 150 100" stroke="#000" strokeOpacity="0.15" />
    </g>
  );
}

function BagShading({ vw, vh }: { vw: number; vh: number }) {
  return (
    <g>
      <rect x="0" y="0" width={vw} height={vh} fill="#000" opacity="0.04" />
      <path d="M26 286 L34 96 H52 L46 286 Z" fill="#000" opacity="0.12" />
      <path d="M194 286 L186 96 H168 L174 286 Z" fill="#000" opacity="0.18" />
      <path d="M26 286 H194 L192 272 H28 Z" fill="#000" opacity="0.1" />
    </g>
  );
}

function BoxFaces({
  color,
  gloss,
  art,
  print,
  showZone,
}: {
  color: string;
  gloss: boolean;
  art: ReactNode;
  print: number;
  showZone: boolean;
}) {
  // Caja isométrica: cara izquierda (frontal), cara derecha y tapa.
  return (
    <g>
      <polygon points="30,92 150,142 150,248 30,198" fill={color} />
      <polygon points="150,142 270,92 270,198 150,248" fill={color} />
      <polygon points="150,142 270,92 270,198 150,248" fill="#000" opacity="0.2" />
      <polygon points="30,92 150,42 270,92 150,142" fill={color} />
      <polygon points="30,92 150,42 270,92 150,142" fill="#fff" opacity={gloss ? 0.32 : 0.16} />
      {/* Junta de solapas */}
      <path d="M90 67 L210 117" stroke="#000" strokeOpacity="0.18" strokeWidth="1.2" />
      {/* Arte proyectado sobre la cara frontal */}
      <g transform="matrix(1.2 0.5 0 1.06 30 92)">
        <g transform="translate(10 8) scale(0.8)" opacity={print}>
          {art}
        </g>
        {showZone && (
          <rect
            x="10"
            y="8"
            width="80"
            height="80"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.55"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </g>
      <polygon points="30,92 150,142 150,248 30,198" fill="#000" opacity="0.05" />
      <polygon points="30,92 150,142 150,248 30,198" fill="none" stroke="#000" strokeOpacity="0.08" />
    </g>
  );
}
