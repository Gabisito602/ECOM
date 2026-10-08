"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Superficie con inclinación 3D y luz que sigue al cursor.
 * Solo reacciona a puntero fino (ratón/trackpad); en táctil queda estática.
 */
export function TiltCard({
  children,
  className = "",
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 140, damping: 18 });
  const ry = useSpring(0, { stiffness: 140, damping: 18 });
  const lx = useMotionValue(50);
  const ly = useMotionValue(30);
  const light = useMotionTemplate`radial-gradient(600px circle at ${lx}% ${ly}%, rgb(255 255 255 / 0.16), transparent 45%)`;

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ry.set((x - 0.5) * max * 2);
    rx.set(-(y - 0.5) * max * 2);
    lx.set(x * 100);
    ly.set(y * 100);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div className="h-full [perspective:1400px]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`group relative will-change-transform ${className}`}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: light }}
        />
      </motion.div>
    </div>
  );
}
