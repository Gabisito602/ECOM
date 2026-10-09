"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Video } from "@/components/ui/Video";
import { Arrow } from "@/components/ui/Arrow";
import { videos } from "@/content/media";
import { site } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, reduce ? 1.04 : 1.14]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const line = (text: string, i: number, accent = false) => (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={`block ${accent ? "text-white/45" : ""}`}
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.25, ease, delay: 0.15 + i * 0.12 }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
      aria-labelledby="hero-title"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y, scale }}>
        <Video asset={videos.hero} priority className="h-full w-full object-cover" />
        {/* Viñeteado y legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,transparent_0%,rgb(11_11_12/0.65)_75%)]" />
      </motion.div>
      <div className="mesh-bg pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent)]" />

      <motion.div style={{ opacity: fade }} className="wrap flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-14">
        <motion.p
          className="eyebrow mb-6 flex items-center gap-3 text-white/60"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" aria-hidden />
          {site.yearsExperience} años · Serigrafía y personalización para empresas
        </motion.p>

        <h1 id="hero-title" className="display-xl max-w-[12ch]">
          {line("Tu marca.", 0)}
          {line("Impresa sobre", 1, true)}
          {line("el producto.", 2, true)}
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <motion.p
            className="lede max-w-xl text-white/70 md:col-span-6"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.6 }}
          >
            Serigrafía y personalización de vasos, botellas, envases y packaging para empresas.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 md:col-span-6 md:justify-end"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.75 }}
          >
            <Link href="#configurador" className="btn btn-primary">
              Personaliza tu producto <Arrow />
            </Link>
            <Link href="#productos" className="btn btn-ghost text-white">
              Ver proyectos
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Ticker de soportes */}
      <div className="relative border-t border-white/10 py-4 text-white/45" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="eyebrow flex gap-10">
              {["Vasos", "Botellas", "Envases", "Packaging", "Cajas", "Bolsas", "Mochilas", "Merchandising corporativo"].map(
                (t) => (
                  <span key={t + k} className="flex items-center gap-10">
                    {t}
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
