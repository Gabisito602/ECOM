"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Video } from "@/components/ui/Video";
import { videos } from "@/content/media";

/** Banda cinematográfica a sangre: maquinaria, tinta y pantallas. */
export function Industrial() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], reduce ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(8% 6% 8% 6% round 32px)", "inset(0% 0% 0% 0% round 0px)"]);

  return (
    <section ref={ref} className="relative bg-ink text-white" aria-label="Producción industrial">
      <motion.div className="relative h-[90svh] overflow-hidden md:h-[110svh]" style={{ clipPath: clip }}>
        <div className="mesh-bg absolute inset-0 bg-graphite" aria-hidden />
        <motion.div className="absolute inset-[-8%_0]" style={{ y }}>
          <Video asset={videos.industrial} className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/50" />
        <div className="wrap relative flex h-full flex-col justify-end pb-16 md:pb-24">
          <p className="display-xl max-w-[11ch]">
            Precisión
            <span className="block text-white/40">en cada pasada.</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
