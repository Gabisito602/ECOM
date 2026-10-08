"use client";

import { useRef } from "react";
import { ProductArt } from "@/components/product/ProductArt";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { mix, range } from "@/lib/color";
import { useSectionProgress } from "@/lib/useSectionProgress";

const steps = [
  { k: "01", t: "Soporte", d: "Un vaso neutro, igual a miles." },
  { k: "02", t: "Color", d: "Elegimos el soporte en el color de tu marca." },
  { k: "03", t: "Logotipo", d: "La tinta pasa por la pantalla y fija tu logo." },
  { k: "04", t: "Diseño", d: "Elementos gráficos que completan la identidad." },
  { k: "05", t: "Marca", d: "Un objeto que ya habla por ti." },
];

/** "De un producto a una marca": el vaso se personaliza mientras haces scroll. */
export function Transform() {
  const ref = useRef<HTMLElement>(null);
  const { p } = useSectionProgress(ref);

  const colorT = range(p, 0.14, 0.34);
  const printT = range(p, 0.38, 0.6);
  const accentT = range(p, 0.64, 0.8);
  const turnT = range(p, 0.82, 1);
  const active = p < 0.14 ? 0 : p < 0.36 ? 1 : p < 0.62 ? 2 : p < 0.82 ? 3 : 4;

  const color = mix("#dedbd4", "#1d3fc4", colorT);
  const clear = colorT < 0.05;

  return (
    <section ref={ref} className="relative h-[340vh] bg-paper" aria-labelledby="transform-title">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-[calc(var(--header-h)/2)]">
        <div className="mesh-bg-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />
        <div className="wrap relative grid items-center gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel index="01">De un producto a una marca</SectionLabel>
            <h2 id="transform-title" className="display-lg mt-6">
              Un producto genérico.
              <span className="block text-muted/70">Una identidad única.</span>
            </h2>

            <ol className="mt-10 hidden space-y-1 md:block" aria-label="Fases de personalización">
              {steps.map((s, i) => (
                <li
                  key={s.k}
                  className={`flex items-baseline gap-5 border-t py-3.5 transition-all duration-500 hairline ${
                    i === active ? "opacity-100" : "opacity-35"
                  }`}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span className={`eyebrow ${i === active ? "text-red" : ""}`}>{s.k}</span>
                  <span className="w-24 font-medium">{s.t}</span>
                  <span className="text-[15px] text-muted">{s.d}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative md:col-span-7">
            <div className="relative mx-auto aspect-[4/5] w-[min(72vw,30rem)] md:w-[min(42vw,34rem)]">
              {/* Halo de luz que se intensifica al personalizar */}
              <div
                className="absolute inset-[8%] rounded-full blur-3xl transition-colors"
                style={{ background: color, opacity: 0.12 + colorT * 0.22 }}
                aria-hidden
              />
              <ProductArt
                kind="vaso"
                color={color}
                clear={clear}
                ink="#ffffff"
                artwork={{ type: "preset", id: "tu-marca" }}
                print={printT}
                accent={{ color: "#d7192a", amount: accentT }}
                turn={Math.sin(turnT * Math.PI) * -0.18}
                finish={turnT > 0.5 ? "brillo" : "mate"}
                showZone={printT > 0 && printT < 1}
                className="relative h-full w-full text-ink drop-shadow-[0_40px_60px_rgb(0_0_0/0.18)]"
                title="Vaso que pasa de neutro a personalizado con una marca"
              />
              {/* Rasqueta durante la impresión */}
              {printT > 0 && printT < 1 && (
                <div
                  className="absolute left-[18%] right-[18%] h-[3px] rounded-full bg-red shadow-[0_0_24px_4px_rgb(215_25_42/0.5)]"
                  style={{ top: `${30 + printT * 41}%` }}
                  aria-hidden
                />
              )}
            </div>

            {/* Indicador móvil */}
            <div className="mt-6 text-center md:hidden" aria-live="polite">
              <p className="eyebrow text-red">{steps[active].k} · {steps[active].t}</p>
              <p className="mt-2 text-[15px] text-muted">{steps[active].d}</p>
            </div>

            <div className="absolute bottom-0 right-0 hidden md:block" aria-hidden>
              <div className="eyebrow text-muted">{Math.round(p * 100).toString().padStart(3, "0")} / 100</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
