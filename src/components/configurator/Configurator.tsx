"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ProductArt, type ArtworkInput, type Finish, type ProductKind } from "@/components/product/ProductArt";
import { artworkLabels, type ArtworkId } from "@/components/product/artworks";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Arrow } from "@/components/ui/Arrow";
import { useLead } from "@/lib/lead-context";
import { isDark } from "@/lib/color";
import { colors, configProducts, finishes, inks } from "./options";

type DesignMode = "logo" | "texto" | "ejemplo";
const MAX_MB = 8;

function Group({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-white/10 py-6 first:border-t-0 first:pt-0">
      <legend className="float-left mb-4 flex w-full items-center gap-3">
        <span className="eyebrow text-red">{n}</span>
        <span className="text-[15px] font-medium">{title}</span>
      </legend>
      <div className="clear-left">{children}</div>
    </fieldset>
  );
}

function Pill({
  active,
  onClick,
  children,
  label,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
        active ? "bg-white text-ink" : "bg-white/[0.06] text-white/75 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export function Configurator() {
  const { setConfig, goToQuote } = useLead();
  const reduce = useReducedMotion();

  const [product, setProduct] = useState<ProductKind>("vaso");
  const [colorId, setColorId] = useState("amarillo");
  const [customColor, setCustomColor] = useState<string | null>(null);
  const [ink, setInk] = useState<string>("auto");
  const [mode, setMode] = useState<DesignMode>("ejemplo");
  const [preset, setPreset] = useState<ArtworkId>("tu-marca");
  const [text, setText] = useState("Tu marca");
  const [logo, setLogo] = useState<{ url: string; file: File } | null>(null);
  const [mono, setMono] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [scale, setScale] = useState(0.9);
  const [offsetY, setOffsetY] = useState(0);
  const [finish, setFinish] = useState<Finish>("mate");
  const [stageDark, setStageDark] = useState(true);

  const def = configProducts.find((p) => p.id === product)!;
  // Si el color no existe en el nuevo soporte, se toma el primero disponible.
  useEffect(() => {
    if (!def.colors.includes(colorId) && !customColor) setColorId(def.colors[0]);
  }, [def, colorId, customColor]);

  useEffect(() => () => void (logo && URL.revokeObjectURL(logo.url)), [logo]);

  const color = customColor ?? colors[colorId]?.hex ?? "#ffffff";
  const clear = !customColor && !!colors[colorId]?.clear;
  const inkHex = ink === "auto" ? (clear ? "#ffffff" : isDark(color) ? "#ffffff" : "#0b0b0c") : ink;
  const colorName = customColor ? `Personalizado ${customColor.toUpperCase()}` : colors[colorId]?.label ?? "";

  const artwork: ArtworkInput = useMemo(() => {
    if (mode === "logo" && logo) return { type: "image", src: logo.url, mono };
    if (mode === "texto") return text.trim() ? { type: "text", text: text.trim().slice(0, 18) } : { type: "none" };
    return { type: "preset", id: preset };
  }, [mode, logo, mono, text, preset]);

  // Giro por arrastre (cilindros) con inercia suave.
  const turnMv = useMotionValue(0);
  const [turn, setTurn] = useState(0);
  useMotionValueEvent(turnMv, "change", setTurn);
  const drag = useRef<{ x: number; t: number } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    if (!def.cylinder) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, t: turnMv.get() };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = (e.clientX - drag.current.x) / 220;
    turnMv.set(Math.max(-0.95, Math.min(0.95, drag.current.t + dx)));
  };
  const onUp = () => {
    drag.current = null;
  };
  const spinTo = (v: number) => (reduce ? turnMv.set(v) : animate(turnMv, v, { duration: 1, ease: [0.16, 1, 0.3, 1] }));
  useEffect(() => {
    spinTo(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  function onFile(f: File | undefined) {
    setFileError(null);
    if (!f) return;
    if (!/^image\/(png|jpeg|svg\+xml|webp)$/.test(f.type)) return setFileError("Formato no admitido. Usa PNG, JPG, SVG o WEBP.");
    if (f.size > MAX_MB * 1024 * 1024) return setFileError(`El archivo supera ${MAX_MB} MB.`);
    setLogo({ url: URL.createObjectURL(f), file: f });
    setMode("logo");
  }

  function submit() {
    const designLabel =
      mode === "logo" && logo ? `Logotipo propio (${logo.file.name})` : mode === "texto" ? `Texto: “${text}”` : `Diseño de ejemplo: ${artworkLabels[preset]}`;
    setConfig({
      product: def.label,
      color: color,
      colorName,
      design: designLabel,
      finish: finishes.find((f) => f.id === finish)!.label,
      file: mode === "logo" ? logo?.file : undefined,
    });
    goToQuote();
  }

  const availableColors = def.colors;

  return (
    <section id="configurador" className="relative bg-ink text-white" aria-labelledby="config-title">
      <div className="wrap py-24 md:py-32">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="08" dark>
              Configurador
            </SectionLabel>
            <h2 id="config-title" className="display-lg mt-6">
              Mira cómo quedaría
              <span className="block text-white/40">tu producto.</span>
            </h2>
          </div>
          <p className="lede text-white/60 md:col-span-5">
            Elige soporte, color, diseño y acabado. Sube tu logotipo y verás una previsualización al instante.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Escenario */}
          <div className="sticky top-[var(--header-h)] z-10 max-lg:-mx-5 max-lg:bg-ink max-lg:px-5 max-lg:pb-3 max-lg:pt-2 lg:top-[calc(var(--header-h)+0.5rem)] lg:col-span-7 lg:self-start">
            <div
              className={`relative aspect-[5/4] overflow-hidden rounded-[28px] transition-colors duration-700 max-lg:aspect-[4/3] ${
                stageDark ? "bg-[radial-gradient(ellipse_at_50%_35%,#2a2c31,#0f1012)]" : "bg-[radial-gradient(ellipse_at_50%_35%,#ffffff,#dcd8cf)]"
              }`}
            >
              <div className={`${stageDark ? "mesh-bg" : "mesh-bg-light"} absolute inset-0 opacity-70`} aria-hidden />
              <div
                className={`absolute inset-0 flex items-center justify-center ${def.cylinder ? "cursor-grab active:cursor-grabbing" : ""}`}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerCancel={onUp}
                style={{ touchAction: def.cylinder ? "pan-y" : "auto" }}
              >
                <motion.div
                  key={product}
                  className="h-[78%]"
                  initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductArt
                    kind={product}
                    color={color}
                    clear={clear}
                    ink={inkHex}
                    artwork={artwork}
                    finish={finish}
                    turn={def.cylinder ? turn : 0}
                    artScale={scale}
                    artOffsetY={offsetY}
                    className={`h-full w-auto drop-shadow-[0_40px_50px_rgb(0_0_0/0.35)] ${stageDark ? "text-white" : "text-ink"}`}
                    title={`Previsualización: ${def.label} ${colorName.toLowerCase()} con ${mode === "logo" ? "tu logotipo" : "diseño"}`}
                  />
                </motion.div>
              </div>

              <div className={`absolute left-4 top-4 flex gap-2 ${stageDark ? "text-white/70" : "text-ink/70"}`}>
                <span className="eyebrow rounded-full bg-black/20 px-3 py-1.5 backdrop-blur-md">{def.label}</span>
                <span className="eyebrow rounded-full bg-black/20 px-3 py-1.5 backdrop-blur-md">{colorName}</span>
              </div>
              <div className="absolute right-4 top-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStageDark((d) => !d)}
                  className="eyebrow rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-md hover:bg-white/25"
                  aria-label="Cambiar fondo del escenario"
                >
                  {stageDark ? "Fondo claro" : "Fondo oscuro"}
                </button>
              </div>
              {def.cylinder && (
                <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
                  {[
                    { v: -0.6, l: "Izquierda" },
                    { v: 0, l: "Frontal" },
                    { v: 0.6, l: "Derecha" },
                  ].map((b) => (
                    <button
                      key={b.l}
                      type="button"
                      onClick={() => spinTo(b.v)}
                      className={`eyebrow rounded-full px-3 py-1.5 backdrop-blur-md transition-colors ${
                        Math.abs(turn - b.v) < 0.08 ? "bg-white text-ink" : "bg-white/15 text-white hover:bg-white/25"
                      }`}
                    >
                      {b.l}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="mt-3 text-xs text-white/40 max-lg:hidden">
              Previsualización orientativa. Soportes, colores, zonas de impresión y acabados se confirman en la propuesta.
              {def.cylinder && " Arrastra para girar."}
            </p>
          </div>

          {/* Controles */}
          <div className="rounded-[28px] bg-white/[0.04] p-6 ring-1 ring-white/10 md:p-8 lg:col-span-5">
            <Group n="01" title="Producto">
              <div className="flex flex-wrap gap-2">
                {configProducts.map((p) => (
                  <Pill key={p.id} active={product === p.id} onClick={() => setProduct(p.id)}>
                    {p.label}
                  </Pill>
                ))}
              </div>
            </Group>

            <Group n="02" title="Color del soporte">
              <div className="flex flex-wrap items-center gap-2.5">
                {availableColors.map((id) => {
                  const c = colors[id];
                  const active = !customColor && colorId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setCustomColor(null);
                        setColorId(id);
                      }}
                      aria-pressed={active}
                      aria-label={`Color del soporte: ${c.label}`}
                      title={c.label}
                      className={`relative h-10 w-10 rounded-full ring-1 ring-white/20 transition-transform duration-300 hover:scale-110 ${
                        active ? "scale-110 outline outline-2 outline-offset-[3px] outline-white" : ""
                      }`}
                      style={{
                        background: c.clear
                          ? "repeating-conic-gradient(#ffffff22 0 25%, #ffffff08 0 50%) 50% / 10px 10px"
                          : c.hex,
                      }}
                    />
                  );
                })}
                <label
                  className={`relative grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-[conic-gradient(red,yellow,lime,cyan,blue,magenta,red)] ring-1 ring-white/20 ${
                    customColor ? "outline outline-2 outline-offset-[3px] outline-white" : ""
                  }`}
                  title="Color de tu marca"
                >
                  <span className="sr-only">Elegir color de tu marca</span>
                  <input
                    type="color"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    value={customColor ?? "#d7192a"}
                    onChange={(e) => setCustomColor(e.target.value)}
                  />
                </label>
              </div>
              <p className="mt-3 text-xs text-white/40">{colorName}</p>
            </Group>

            <Group n="03" title="Logotipo / diseño">
              <div className="mb-4 flex gap-1 rounded-full bg-white/[0.06] p-1" role="tablist" aria-label="Tipo de diseño">
                {(
                  [
                    ["logo", "Sube tu logo"],
                    ["texto", "Texto"],
                    ["ejemplo", "Ejemplos"],
                  ] as const
                ).map(([id, l]) => (
                  <button
                    key={id}
                    role="tab"
                    type="button"
                    aria-selected={mode === id}
                    onClick={() => setMode(id)}
                    className={`flex-1 rounded-full px-3 py-2 text-sm transition-colors ${mode === id ? "bg-white text-ink" : "text-white/70 hover:text-white"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {mode === "logo" && (
                <div>
                  <label
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 px-4 py-6 text-center transition-colors hover:border-white/50"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      onFile(e.dataTransfer.files?.[0]);
                    }}
                  >
                    <span className="text-sm">{logo ? logo.file.name : "Arrastra tu logotipo o haz clic"}</span>
                    <span className="text-xs text-white/40">PNG, JPG, SVG o WEBP · máx. {MAX_MB} MB · fondo transparente recomendado</span>
                    <input type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
                  </label>
                  {fileError && (
                    <p className="mt-2 text-sm text-red" role="alert">
                      {fileError}
                    </p>
                  )}
                  {logo && (
                    <label className="mt-4 flex items-center gap-3 text-sm text-white/75">
                      <input type="checkbox" checked={mono} onChange={(e) => setMono(e.target.checked)} className="h-4 w-4 accent-[#d7192a]" />
                      Ver a una tinta (color de tinta seleccionado)
                    </label>
                  )}
                </div>
              )}
              {mode === "texto" && (
                <label className="block">
                  <span className="sr-only">Nombre de tu marca</span>
                  <input
                    type="text"
                    value={text}
                    maxLength={18}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full rounded-2xl bg-white/[0.06] px-4 py-3 text-base outline-none ring-1 ring-white/10 placeholder:text-white/30 focus:ring-white/40"
                    placeholder="Nombre de tu marca"
                  />
                </label>
              )}
              {mode === "ejemplo" && (
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(artworkLabels) as ArtworkId[]).map((id) => (
                    <Pill key={id} active={preset === id} onClick={() => setPreset(id)}>
                      {artworkLabels[id]}
                    </Pill>
                  ))}
                </div>
              )}

              <div className="mt-5">
                <p className="mb-2 text-xs text-white/50">Color de tinta</p>
                <div className="flex flex-wrap gap-2">
                  {inks.map((i) => (
                    <Pill key={i.id} active={ink === i.id} onClick={() => setInk(i.id)} label={`Tinta: ${i.label}`}>
                      {i.id !== "auto" && <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full ring-1 ring-black/20" style={{ background: i.id }} aria-hidden />}
                      {i.label}
                    </Pill>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <label className="text-xs text-white/50">
                  Tamaño
                  <input type="range" min={0.4} max={1.2} step={0.01} value={scale} onChange={(e) => setScale(+e.target.value)} className="mt-2 w-full accent-[#d7192a]" />
                </label>
                <label className="text-xs text-white/50">
                  Posición vertical
                  <input type="range" min={-1} max={1} step={0.01} value={offsetY} onChange={(e) => setOffsetY(+e.target.value)} className="mt-2 w-full accent-[#d7192a]" />
                </label>
              </div>
            </Group>

            <Group n="04" title="Acabado del soporte">
              <div className="grid grid-cols-2 gap-2">
                {finishes.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={finish === f.id}
                    onClick={() => setFinish(f.id)}
                    className={`rounded-2xl p-4 text-left transition-colors ${finish === f.id ? "bg-white text-ink" : "bg-white/[0.06] hover:bg-white/10"}`}
                  >
                    <span className="block text-sm font-medium">{f.label}</span>
                    <span className={`mt-1 block text-xs ${finish === f.id ? "text-ink/60" : "text-white/45"}`}>{f.hint}</span>
                  </button>
                ))}
              </div>
            </Group>

            <button type="button" onClick={submit} className="btn btn-primary mt-2 w-full justify-center !h-14 text-base">
              Quiero personalizar el mío <Arrow />
            </button>
            <p className="mt-3 text-center text-xs text-white/40">
              Tu selección y tu logotipo se adjuntan a la solicitud.
              <span className="mt-1 block lg:hidden">Previsualización orientativa: opciones reales confirmadas en la propuesta.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
