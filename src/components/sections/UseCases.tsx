"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductArt } from "@/components/product/ProductArt";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { useCases, type UseCase } from "@/content/useCases";

function Scene({ uc, className = "" }: { uc: UseCase; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: uc.scene.bg }}>
      <div className="absolute inset-x-[8%] bottom-[12%] top-[14%] flex items-end justify-center gap-[3%]">
        {uc.scene.items.map((it, i) => (
          <motion.div
            key={i}
            className="flex h-full items-end"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.08 * i }}
            style={{ height: `${it.h}%` }}
          >
            <ProductArt
              kind={it.kind}
              color={it.color}
              ink={it.ink}
              artwork={{ type: "preset", id: it.art }}
              clear={it.clear}
              turn={(i - 1) * 0.12}
              className="h-full w-auto drop-shadow-[0_30px_40px_rgb(0_0_0/0.28)]"
              title={`${it.kind} para ${uc.name}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function UseCases() {
  const [active, setActive] = useState(0);
  const uc = useCases[active];

  return (
    <section id="sectores" className="bg-paper py-24 md:py-36" aria-labelledby="sectores-title">
      <div className="wrap">
        <Reveal>
          <SectionLabel index="06">Casos de uso</SectionLabel>
          <h2 id="sectores-title" className="display-lg mt-6 max-w-[16ch]">
            Creado para marcas que quieren destacar.
          </h2>
        </Reveal>

        {/* Escritorio: lista + escena */}
        <div className="mt-16 hidden gap-10 md:grid md:grid-cols-12">
          <ul className="md:col-span-6" role="tablist" aria-label="Sectores" aria-orientation="vertical">
            {useCases.map((u, i) => (
              <li key={u.id} role="presentation">
                <button
                  type="button"
                  role="tab"
                  id={`tab-${u.id}`}
                  aria-selected={i === active}
                  aria-controls="sector-panel"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-baseline gap-6 border-t py-4 text-left hairline"
                >
                  <span className={`eyebrow w-8 transition-colors ${i === active ? "text-red" : "text-muted"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[clamp(1.6rem,2.6vw,2.5rem)] font-semibold uppercase leading-none tracking-[-0.035em] transition-all duration-500 ${
                      i === active ? "translate-x-1 text-ink" : "text-ink/25 group-hover:text-ink/60"
                    }`}
                  >
                    {u.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="md:col-span-6">
            <div
              id="sector-panel"
              role="tabpanel"
              aria-labelledby={`tab-${uc.id}`}
              className="sticky top-[calc(var(--header-h)+2rem)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={uc.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    <Scene uc={uc} className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="lede mt-6 max-w-md">{uc.line}</p>
              <p className="eyebrow mt-4 text-muted">{uc.products.join(" · ")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Móvil: carrusel */}
      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:hidden" aria-label="Sectores">
        {useCases.map((u, i) => (
          <li key={u.id} className="w-[78vw] shrink-0 snap-center">
            <Scene uc={u} className="aspect-[4/5] rounded-[24px]" />
            <p className="eyebrow mt-4 text-red">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-1 text-2xl font-semibold uppercase tracking-[-0.03em]">{u.name}</h3>
            <p className="mt-2 text-[15px] text-muted">{u.line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
