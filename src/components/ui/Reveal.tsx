"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Aparición sutil al entrar en pantalla. Una sola vez, sin rebotes. */
export function Reveal({ delay = 0, y = 28, children, ...rest }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
