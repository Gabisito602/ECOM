"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

/** Selección que el configurador pasa al formulario de propuesta. */
export type ConfigSummary = {
  product: string;
  color: string;
  colorName: string;
  design: string;
  finish: string;
  /** Logotipo subido en el configurador (se adjunta al formulario). */
  file?: File;
};

type LeadState = {
  config: ConfigSummary | null;
  setConfig: (c: ConfigSummary | null) => void;
  /** Producto preseleccionado desde una card o una página de producto. */
  preset: string | null;
  setPreset: (p: string | null) => void;
  goToQuote: () => void;
};

const Ctx = createContext<LeadState | null>(null);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ConfigSummary | null>(null);
  const [preset, setPreset] = useState<string | null>(null);

  const goToQuote = useCallback(() => {
    const el = document.getElementById("propuesta");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => el.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true }), 700);
    } else {
      window.location.href = "/presupuesto";
    }
  }, []);

  const value = useMemo(() => ({ config, setConfig, preset, setPreset, goToQuote }), [config, preset, goToQuote]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLead() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLead fuera de LeadProvider");
  return v;
}
