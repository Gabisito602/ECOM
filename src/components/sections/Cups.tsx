"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ProductArt, type ProductKind } from "@/components/product/ProductArt";
import type { ArtworkId } from "@/components/product/artworks";
import { Video } from "@/components/ui/Video";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { images, videos } from "@/content/media";

type Tag = "Color" | "Transparentes" | "Corporativos" | "Eventos" | "Restauración" | "Gimnasios" | "Promocionales";
const filters: ("Todos" | Tag)[] = ["Todos", "Color", "Transparentes", "Corporativos", "Eventos", "Restauración", "Gimnasios", "Promocionales"];

type Item =
  | { id: string; type: "photo"; tags: Tag[]; title: string; span: string }
  | { id: string; type: "video"; tags: Tag[]; title: string; span: string }
  | {
      id: string;
      type: "art";
      tags: Tag[];
      title: string;
      span: string;
      kind: ProductKind;
      color: string;
      ink: string;
      art: ArtworkId;
      clear?: boolean;
      bg: string;
      finish?: "mate" | "brillo";
    };

const items: Item[] = [
  { id: "foto-amarillos", type: "photo", tags: ["Color", "Gimnasios"], title: "Vasos de color para marcas fitness", span: "col-span-2 row-span-2" },
  { id: "transparente", type: "art", tags: ["Transparentes", "Eventos"], title: "Vaso transparente", kind: "vaso", color: "#cfe3ea", ink: "#ffffff", art: "onda", clear: true, bg: "bg-[radial-gradient(ellipse_at_50%_30%,#2b3a44,#0e1316)]", span: "" },
  { id: "corporativo", type: "art", tags: ["Corporativos"], title: "Vaso corporativo", kind: "vaso", color: "#141518", ink: "#ffffff", art: "monograma", bg: "bg-[radial-gradient(ellipse_at_50%_30%,#ecebe7,#cfccc4)]", span: "" },
  { id: "video-giro", type: "video", tags: ["Color", "Promocionales"], title: "Vaso personalizado en giro", span: "col-span-2" },
  { id: "eventos", type: "art", tags: ["Eventos", "Color"], title: "Vaso para eventos", kind: "vaso", color: "#e8492f", ink: "#ffffff", art: "onda", finish: "brillo", bg: "bg-[radial-gradient(ellipse_at_50%_30%,#3b1712,#130908)]", span: "" },
  { id: "restaurante", type: "art", tags: ["Restauración"], title: "Vaso para restauración", kind: "vaso", color: "#f7f5f0", ink: "#1e3a2b", art: "hoja", bg: "bg-[radial-gradient(ellipse_at_50%_30%,#e7efe8,#c5d2c8)]", span: "" },
  { id: "gimnasio", type: "art", tags: ["Gimnasios"], title: "Vaso tipo shaker para gimnasios", kind: "shaker", color: "#111214", ink: "#f5c400", art: "rayo", finish: "brillo", bg: "bg-[radial-gradient(ellipse_at_50%_30%,#2a2a1c,#0d0d0a)]", span: "" },
  { id: "promocional", type: "art", tags: ["Promocionales", "Corporativos"], title: "Vaso promocional", kind: "vaso", color: "#1d3fc4", ink: "#ffffff", art: "orbita", bg: "bg-[radial-gradient(ellipse_at_50%_30%,#dfe5fb,#b8c3ee)]", span: "" },
  { id: "transparente-rojo", type: "art", tags: ["Transparentes", "Restauración"], title: "Vaso transparente con tinta de color", kind: "vaso", color: "#f1d9d5", ink: "#d7192a", art: "tu-marca", clear: true, bg: "bg-[radial-gradient(ellipse_at_50%_30%,#ffffff,#e4e0d8)]", span: "" },
];

function ArtTile({ it }: { it: Extract<Item, { type: "art" }> }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [turn, setTurn] = useState(0);
  useMotionValueEvent(mv, "change", setTurn);
  const go = (v: number) => !reduce && animate(mv, v, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });

  return (
    <div
      className={`group absolute inset-0 flex items-center justify-center ${it.bg}`}
      onPointerEnter={() => go(0.32)}
      onPointerLeave={() => go(0)}
    >
      <div className="h-[72%] transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] [transform:perspective(900px)_rotateY(0deg)] group-hover:[transform:perspective(900px)_rotateY(-14deg)_translateY(-3%)]">
        <ProductArt
          kind={it.kind}
          color={it.color}
          ink={it.ink}
          artwork={{ type: "preset", id: it.art }}
          clear={it.clear}
          finish={it.finish}
          turn={turn}
          className="h-full w-auto drop-shadow-[0_30px_40px_rgb(0_0_0/0.3)]"
          title={it.title}
        />
      </div>
    </div>
  );
}

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

        <motion.ul layout className="mt-8 grid auto-rows-[18rem] grid-cols-2 gap-3 md:auto-rows-[20rem] md:grid-cols-4 md:gap-4">
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
                {it.type === "video" && <Video asset={videos.product} className="absolute inset-0 h-full w-full object-cover" />}
                {it.type === "art" && <ArtTile it={it} />}

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
