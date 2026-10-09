"use client";

import { useRef } from "react";
import { ProductArt } from "@/components/product/ProductArt";
import { Artwork } from "@/components/product/artworks";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Video } from "@/components/ui/Video";
import { Reveal } from "@/components/ui/Reveal";
import { videos } from "@/content/media";
import { mix, range } from "@/lib/color";
import { useSectionProgress } from "@/lib/useSectionProgress";

const steps = [
  { t: "Caja neutra", d: "El punto de partida: un soporte sin identidad." },
  { t: "Diseño", d: "Adaptamos tu logotipo y tu diseño a la caja." },
  { t: "Impresión", d: "La tinta se fija sobre el cartón, pieza a pieza." },
  { t: "Packaging terminado", d: "Una caja que ya habla por tu marca." },
];

export function Packaging() {
  const ref = useRef<HTMLDivElement>(null);
  const { p } = useSectionProgress(ref);
  const design = range(p, 0.2, 0.42);
  const printT = range(p, 0.48, 0.7);
  const done = range(p, 0.76, 0.95);
  const active = p < 0.2 ? 0 : p < 0.46 ? 1 : p < 0.74 ? 2 : 3;

  return (
    <section aria-labelledby="packaging-title" className="bg-graphite text-white">
      <div ref={ref} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-[var(--header-h)]">
          <div className="mesh-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden />
          <div className="wrap relative grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionLabel index="05" dark>
                Packaging
              </SectionLabel>
              <h2 id="packaging-title" className="display-lg mt-6">
                Packaging que habla por tu marca.
              </h2>
              <ol className="mt-10 grid grid-cols-4 gap-2 md:block md:space-y-0" aria-label="Fases del packaging">
                {steps.map((s, i) => (
                  <li
                    key={s.t}
                    aria-current={i === active ? "step" : undefined}
                    className={`transition-opacity duration-500 md:flex md:gap-5 md:border-t md:border-white/10 md:py-4 ${i === active ? "opacity-100" : "opacity-30"}`}
                  >
                    <span className={`block h-[2px] md:hidden ${i <= active ? "bg-red" : "bg-white/20"}`} aria-hidden />
                    <span className="eyebrow mt-3 block text-red md:mt-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="hidden md:block">
                      <span className="block font-medium">{s.t}</span>
                      <span className="mt-1 block text-[15px] text-white/55">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 md:hidden" aria-live="polite">
                <span className="font-medium">{steps[active].t}.</span> <span className="text-white/60">{steps[active].d}</span>
              </p>
            </div>

            <div className="relative h-[44vh] md:col-span-7 md:h-[70vh]">
              {/* Lámina de diseño que se "proyecta" sobre la caja */}
              <div
                className="absolute left-[6%] top-[4%] w-[30%] rounded-xl border border-white/15 bg-white/[0.04] p-3 backdrop-blur-sm"
                style={{
                  opacity: design * (1 - printT),
                  transform: `translate(${(1 - design) * -20}px, ${printT * 60}px) scale(${1 - printT * 0.3})`,
                }}
                aria-hidden
              >
                <div className="mesh-bg aspect-square rounded-md">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <Artwork id="orbita" ink="#ffffff" />
                  </svg>
                </div>
                <p className="eyebrow mt-2 text-[0.6rem] text-white/50">Arte final · 1 tinta</p>
              </div>

              <div
                className="absolute inset-0 transition-transform"
                style={{ transform: `rotate(${(1 - done) * -2}deg) scale(${0.92 + done * 0.08})` }}
              >
                <ProductArt
                  kind="caja"
                  color={mix("#e9e5dc", "#f6f4ef", done)}
                  ink="#0b0b0c"
                  artwork={{ type: "preset", id: "orbita" }}
                  print={printT}
                  finish={done > 0.5 ? "brillo" : "mate"}
                  showZone={design > 0.2 && printT < 1}
                  className="h-full w-full text-white drop-shadow-[0_50px_60px_rgb(0_0_0/0.5)]"
                  title="Caja que pasa de neutra a impresa con una marca"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap grid gap-4 pb-24 md:grid-cols-12 md:gap-5 md:pb-36">
        <Reveal className="relative aspect-[9/14] overflow-hidden rounded-[28px] bg-ink md:col-span-4 md:aspect-auto md:min-h-[34rem]">
          <Video asset={videos.productionA} className="absolute inset-0 h-full w-full object-cover" />
          <p className="eyebrow absolute bottom-5 left-5 text-white/85">En producción</p>
        </Reveal>
        <Reveal delay={0.08} className="relative aspect-video overflow-hidden rounded-[28px] bg-ink md:col-span-8 md:aspect-auto md:min-h-[34rem]">
          <Video asset={videos.packaging} className="absolute inset-0 h-full w-full object-cover" />
          <p className="eyebrow absolute bottom-5 left-5 text-white/85">De caja neutra a caja de marca</p>
        </Reveal>
      </div>
    </section>
  );
}
