"use client";

import Image from "next/image";
import { useRef } from "react";
import { ProductArt } from "@/components/product/ProductArt";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/content/media";
import { range } from "@/lib/color";
import { useSectionProgress } from "@/lib/useSectionProgress";

const zones = [
  { at: 0.42, label: "Zona frontal" },
  { at: 0.66, label: "Lateral" },
  { at: 0.86, label: "Zona trasera" },
];

export function Bottles() {
  const ref = useRef<HTMLDivElement>(null);
  const { p } = useSectionProgress(ref);

  const focus = range(p, 0.18, 0.45); // la botella central se acerca
  const spin = range(p, 0.45, 1); // y gira mostrando zonas
  const sideX = 1 + focus * 0.9; // separación lateral
  const sideOpacity = 1 - focus * 0.75;
  const centerScale = 1 + focus * 0.55;
  const centerTurn = -0.55 + focus * 0.55 + spin * 0.9; // -0.55 → 0 → 0.9
  const zoneIdx = zones.reduce((acc, z, i) => (p >= z.at ? i : acc), -1);

  return (
    <section aria-labelledby="botellas-title" className="bg-paper">
      <div ref={ref} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <div className="wrap relative z-10 pt-[calc(var(--header-h)+2.5rem)]">
            <SectionLabel index="04">Botellas</SectionLabel>
            <h2 id="botellas-title" className="display-lg mt-6 max-w-[14ch]">
              Tu diseño.
              <span className="block text-muted/70">En cualquier superficie.</span>
            </h2>
          </div>

          <div className="relative flex flex-1 items-end justify-center pb-[8vh]">
            {/* Plataforma */}
            <div className="absolute bottom-[6vh] left-1/2 h-[18vh] w-[min(90vw,64rem)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,#d9d4c9,transparent_70%)]" aria-hidden />

            <div
              className="relative h-[46vh] w-[min(28vw,12rem)] transition-opacity"
              style={{ transform: `translateX(${-48 * sideX}%) scale(0.9)`, opacity: sideOpacity }}
            >
              <ProductArt kind="botella" color="#a3161f" ink="#ffffff" artwork={{ type: "preset", id: "rayo" }} turn={-0.15} className="h-full w-full" title="Botella roja serigrafiada en blanco" />
            </div>
            <div
              className="relative z-10 h-[46vh] w-[min(28vw,12rem)] origin-bottom"
              style={{ transform: `scale(${centerScale})` }}
            >
              <ProductArt
                kind="botella"
                color="#f2cf00"
                ink="#ffffff"
                artwork={{ type: "preset", id: "tu-marca" }}
                turn={centerTurn}
                showZone={zoneIdx >= 0}
                className="h-full w-full text-ink drop-shadow-[0_40px_50px_rgb(0_0_0/0.25)]"
                title="Botella amarilla girando para mostrar las zonas de impresión"
              />
            </div>
            <div
              className="relative h-[46vh] w-[min(28vw,12rem)]"
              style={{ transform: `translateX(${48 * sideX}%) scale(0.9)`, opacity: sideOpacity }}
            >
              <ProductArt kind="botella" color="#1a34a8" ink="#ffffff" artwork={{ type: "preset", id: "rayo" }} turn={0.15} className="h-full w-full" title="Botella azul serigrafiada en blanco" />
            </div>

            <p className="eyebrow absolute inset-x-0 bottom-[3vh] text-center text-muted md:hidden" aria-live="polite">
              {zoneIdx >= 0 ? zones[zoneIdx].label : "Tres colores, una marca"}
            </p>
            {/* Etiquetas de zona */}
            <div className="absolute bottom-[12vh] left-[max(1.25rem,4vw)] hidden w-56 md:block" aria-live="polite">
              {zones.map((z, i) => (
                <p
                  key={z.label}
                  className={`flex items-center gap-3 border-t py-3 text-[15px] transition-opacity duration-500 hairline ${i === zoneIdx ? "opacity-100" : "opacity-30"}`}
                >
                  <span className={`h-2 w-2 rounded-full ${i === zoneIdx ? "bg-red" : "bg-ink/30"}`} aria-hidden />
                  {z.label}
                </p>
              ))}
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Las zonas de impresión disponibles dependen de cada soporte. Te las confirmamos en la propuesta.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Proyecto real */}
      <div className="wrap pb-24 md:pb-36">
        <Reveal className="relative aspect-[3/2] overflow-hidden rounded-[28px] md:aspect-[21/10]">
          <Image src={images.bottles.src} alt={images.bottles.alt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" aria-hidden />
          <p className="eyebrow absolute bottom-5 left-5 text-white/90 md:bottom-8 md:left-8">Proyecto real · Botellas serigrafiadas</p>
        </Reveal>
      </div>
    </section>
  );
}
