"use client";

import { useState, type RefObject } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

/**
 * Progreso 0…1 de una sección "pinned" (sticky) mientras se recorre.
 * Devuelve un número de React para alimentar SVGs que no aceptan MotionValues.
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(Math.round(v * 1000) / 1000));
  return { p, scrollYProgress };
}
