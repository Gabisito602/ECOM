"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProductArt } from "@/components/product/ProductArt";

const steps = [
  { n: "01", t: "Cuéntanos qué necesitas.", d: "Producto, cantidades aproximadas, plazos y dónde vas a usarlo." },
  { n: "02", t: "Preparamos tu diseño.", d: "Adaptamos tu logotipo o tu arte a la superficie de impresión." },
  { n: "03", t: "Seleccionamos el soporte y acabado.", d: "Elegimos contigo el producto, el color y el acabado más adecuado." },
  { n: "04", t: "Producimos.", d: "Serigrafía con control en cada pasada." },
  { n: "05", t: "Tu producto llega listo para vender.", d: "Personalizado y preparado para tu cliente." },
];

function StepVisual({ i }: { i: number }) {
  const common = "h-full w-auto";
  switch (i) {
    case 0:
      return (
        <div className="flex h-full flex-col justify-center gap-2 px-6" aria-hidden>
          {["Vasos · 2.000 uds", "Logotipo adjunto", "Para mayo"].map((t, k) => (
            <span key={t} className={`w-fit rounded-2xl px-4 py-2 text-sm ${k % 2 ? "self-end bg-red text-white" : "bg-white/10"}`}>
              {t}
            </span>
          ))}
        </div>
      );
    case 1:
      return <ProductArt kind="vaso" color="#2a2c31" ink="#ffffff" artwork={{ type: "preset", id: "tu-marca" }} showZone className={`${common} text-white`} />;
    case 2:
      return (
        <div className="flex h-full items-end justify-center gap-3" aria-hidden>
          {["#f5c400", "#1d3fc4", "#d7192a", "#f4f2ee"].map((c) => (
            <ProductArt key={c} kind="vaso" color={c} ink="#000" artwork={{ type: "none" }} className="h-[70%] w-auto" />
          ))}
        </div>
      );
    case 3:
      return <ProductArt kind="vaso" color="#1d3fc4" ink="#ffffff" artwork={{ type: "preset", id: "tu-marca" }} print={0.55} showZone className={`${common} text-white`} />;
    default:
      return (
        <div className="flex h-full items-end justify-center -space-x-6" aria-hidden>
          {[0, 1, 2].map((k) => (
            <ProductArt key={k} kind="vaso" color="#1d3fc4" ink="#ffffff" artwork={{ type: "preset", id: "tu-marca" }} turn={(k - 1) * 0.2} className="h-[80%] w-auto" />
          ))}
        </div>
      );
  }
}

/** Proceso en 5 pasos con desplazamiento horizontal ligado al scroll (escritorio). */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-62%"]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const card = (s: (typeof steps)[number], i: number) => (
    <article className="flex h-full flex-col rounded-[28px] bg-white/[0.04] p-7 ring-1 ring-white/10 md:p-9">
      <div className="flex items-start justify-between">
        <span className="text-[clamp(4rem,8vw,7.5rem)] font-semibold leading-none tracking-[-0.06em] text-white/90">{s.n}</span>
        <span className="eyebrow text-white/35">Paso {i + 1}/5</span>
      </div>
      <div className="my-6 h-40 md:my-8 md:h-52">
        <StepVisual i={i} />
      </div>
      <h3 className="mt-auto text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-[1.9rem]">{s.t}</h3>
      <p className="mt-3 text-[15px] text-white/55">{s.d}</p>
    </article>
  );

  return (
    <section id="proceso" ref={ref} className="relative bg-ink text-white md:h-[320vh]" aria-labelledby="proceso-title">
      <div className="md:sticky md:top-0 md:flex md:h-[100svh] md:flex-col md:justify-center md:overflow-hidden">
        <div className="wrap pt-24 md:pt-[calc(var(--header-h)+1rem)]">
          <SectionLabel index="07" dark>
            Proceso
          </SectionLabel>
          <div className="mt-6 flex items-end justify-between gap-10">
            <h2 id="proceso-title" className="display-lg max-w-[13ch]">
              De la idea al producto.
            </h2>
            <div className="mb-3 hidden h-px w-64 bg-white/15 md:block" aria-hidden>
              <motion.div className="h-px bg-red" style={{ width: bar }} />
            </div>
          </div>
        </div>

        {/* Escritorio: pista horizontal */}
        <div className="mt-12 hidden md:block">
          <motion.ol className="flex gap-5 pl-[clamp(1.25rem,4vw,3rem)]" style={{ x }}>
            {steps.map((s, i) => (
              <li key={s.n} className="h-[min(60vh,34rem)] w-[min(34vw,30rem)] shrink-0">
                {card(s, i)}
              </li>
            ))}
          </motion.ol>
        </div>

        {/* Móvil: carrusel nativo */}
        <ol className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-24 md:hidden">
          {steps.map((s, i) => (
            <li key={s.n} className="h-[30rem] w-[84vw] shrink-0 snap-center">
              {card(s, i)}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
