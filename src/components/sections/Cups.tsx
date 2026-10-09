"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Video } from "@/components/ui/Video";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { images, videos } from "@/content/media";

type Tag = "Color" | "Transparentes" | "Eventos" | "Restauración" | "Gimnasios" | "Promocionales";

type Item = { id: string; type: "photo" | "photo2" | "video"; tags: Tag[]; title: string; span: string };

const items: Item[] = [
  { id: "foto-amarillos", type: "photo", tags: ["Color", "Gimnasios"], title: "Vasos de color para marcas fitness", span: "col-span-2 row-span-2" },
  { id: "transparente", type: "photo2", tags: ["Transparentes", "Eventos", "Restauración"], title: "Vasos transparentes", span: "row-span-2" },
  { id: "video-giro", type: "video", tags: ["Color", "Gimnasios", "Promocionales"], title: "Vasos para marcas fitness", span: "row-span-2" },
];

// Solo se muestran los filtros que tienen al menos un trabajo.
const filters: ("Todos" | Tag)[] = [
  "Todos",
  ...(["Color", "Transparentes", "Eventos", "Restauración", "Gimnasios", "Promocionales"] as Tag[]).filter((t) =>
    items.some((i) => i.tags.includes(t)),
  ),
];

export function Cups() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const visible = items.filter((i) => filter === "Todos" || i.tags.includes(filter));

  return (
    <section id="proyectos" className="bg-ink py-24 text-white md:py-36" aria-labelledby="vasos-title">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <SectionLabel index="03" dark>
              Vasos
            </SectionLabel>
            <h2 id="vasos-title" className="display-lg mt-6">
              El vaso es el soporte.
              <span className="block text-white/40">La marca es el producto.</span>
            </h2>
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.1}>
            <p className="lede text-white/60">
              Vasos de colores, transparentes y corporativos para restaurantes, eventos, gimnasios y campañas promocionales.
            </p>
          </Reveal>
        </div>

        <div
          className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0"
          role="toolbar"
          aria-label="Filtrar vasos por uso"
        >
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                filter === f ? "bg-white text-ink" : "bg-white/[0.06] text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.ul layout className="mt-8 grid grid-flow-dense auto-rows-[18rem] grid-cols-2 gap-3 md:auto-rows-[20rem] md:grid-cols-4 md:gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((it) => (
              <motion.li
                layout
                key={it.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-[22px] bg-graphite ${it.span}`}
              >
                {it.type === "photo" && (
                  <Image
                    src={images.cups.src}
                    alt={images.cups.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-[62%_50%] transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                  />
                )}
                {it.type === "photo2" && (
                  <Image
                    src={images.clearCups.src}
                    alt={images.clearCups.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                  />
                )}
                {it.type === "video" && <Video asset={videos.cupsReal} className="absolute inset-0 h-full w-full object-cover" />}

                {/* Ficha que aparece al pasar el cursor (siempre visible en táctil) */}
                <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 rounded-2xl bg-ink/55 p-4 opacity-0 backdrop-blur-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100 max-md:p-3">
                  <p className="text-[15px] font-medium leading-tight">{it.title}</p>
                  <p className="eyebrow mt-2 hidden text-[0.62rem] text-white/55 sm:block">Serigrafía industrial · Producción para empresas</p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
