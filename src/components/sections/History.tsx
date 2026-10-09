"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Video } from "@/components/ui/Video";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { videos } from "@/content/media";
import { site } from "@/content/site";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}

/** Historia: 20 años de oficio. Los hitos se rellenan en content/site.ts → history. */
export function History() {
  const years = site.yearsExperience;
  return (
    <section id="historia" className="relative overflow-hidden bg-ink py-24 text-white md:py-36" aria-labelledby="historia-title">
      <div className="mesh-bg pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_20%_30%,black,transparent_65%)]" aria-hidden />
      <div className="wrap relative">
        <SectionLabel index="09" dark>
          Historia
        </SectionLabel>

        <div className="mt-10 grid items-end gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <p className="flex items-start leading-none" aria-label={`${years} años`}>
              <span className="text-[clamp(9rem,26vw,22rem)] font-semibold tracking-[-0.08em]">
                <Counter to={years} />
              </span>
              <span className="mt-[0.6em] text-[clamp(1.2rem,2vw,1.8rem)] font-medium tracking-[-0.02em] text-white/50">años</span>
            </p>
          </Reveal>
          <Reveal className="md:col-span-6 md:pb-8" delay={0.1}>
            <h2 id="historia-title" className="display-md">
              Dos décadas
              <span className="block text-white/40">imprimiendo marcas.</span>
            </h2>
            <p className="lede mt-6 max-w-xl text-white/65">
              Newgraf lleva {years} años dedicada a la serigrafía. Dos décadas ajustando pantallas, tintas y registros para que
              cada marca quede bien sobre su producto. Esa experiencia es la que hoy ponemos al servicio de las empresas.
            </p>
          </Reveal>
        </div>

        <Reveal className="relative mt-16 overflow-hidden rounded-[28px] bg-graphite">
          <div className="relative aspect-[4/3] md:aspect-[21/9]">
            <Video asset={videos.productionCups} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden />
            <p className="eyebrow absolute bottom-5 left-5 text-white/85 md:bottom-8 md:left-8">Producción real · Serigrafía de vasos</p>
          </div>
        </Reveal>

        {site.history.length > 0 && (
          <ol className="no-scrollbar mt-16 flex snap-x gap-px overflow-x-auto rounded-[24px] bg-white/10" aria-label="Línea de tiempo">
            {site.history.map((h) => (
              <li key={h.year + h.title} className="min-w-[16rem] flex-1 snap-start bg-ink p-6 md:p-8">
                <p className="eyebrow text-red">{h.year}</p>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{h.title}</h3>
                <p className="mt-2 text-[15px] text-white/55">{h.text}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
