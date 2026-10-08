"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

const nav = [
  { href: "/#productos", label: "Productos" },
  { href: "/#configurador", label: "Configurador" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#sectores", label: "Sectores" },
  { href: "/#empresa", label: "Empresa" },
];

export function Header() {
  const pathname = usePathname();
  const darkStart = pathname === "/" || pathname.startsWith("/productos");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onDark = darkStart && !scrolled && !open;

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,backdrop-filter] duration-500 ${
          open
            ? "text-white"
            : onDark
              ? "text-white"
              : "bg-paper/75 text-ink shadow-[0_1px_0_rgb(0_0_0/0.06)] backdrop-blur-xl backdrop-saturate-150"
        }`}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="relative z-10 text-[15px]" aria-label="Newgraf, inicio">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-1 text-[14px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="rounded-full px-3.5 py-2 opacity-75 transition-opacity hover:opacity-100"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <Link href="/#propuesta" className="btn btn-primary hidden !h-10 !px-4 !text-[14px] sm:inline-flex">
              Pedir propuesta
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full md:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-transform duration-500 ${open ? "translate-y-[5px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-current transition-transform duration-500 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-10 pt-28 text-white md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Móvil">
              <ul className="space-y-1">
                {nav.map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link href={n.href} onClick={() => setOpen(false)} className="block py-2 text-[2.6rem] font-semibold tracking-[-0.04em]">
                      {n.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto">
              <Link href="/#propuesta" onClick={() => setOpen(false)} className="btn btn-primary w-full justify-center">
                Personaliza tu producto
              </Link>
              <p className="eyebrow mt-6 text-white/40">Serigrafía y personalización para empresas</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
