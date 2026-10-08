"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLead } from "@/lib/lead-context";
import { Arrow } from "@/components/ui/Arrow";

const PRODUCTS = ["Vasos", "Botellas", "Envases", "Packaging / cajas", "Bolsas", "Mochilas", "Merchandising", "Otro soporte"];
const QUANTITIES = ["Menos de 500", "500 – 2.000", "2.000 – 10.000", "Más de 10.000", "Aún no lo sé"];
const DESIGN = [
  { id: "listo", label: "Sí, tengo el diseño listo" },
  { id: "logo", label: "Tengo el logotipo, hay que adaptarlo" },
  { id: "ayuda", label: "No, necesito ayuda con el diseño" },
];
const WHEN = ["Lo antes posible", "En 2–4 semanas", "En 1–3 meses", "Sin fecha fija"];
const MAX_FILE_MB = 10;
const ACCEPT = ".png,.jpg,.jpeg,.svg,.pdf,.ai,.eps,.webp";

const mapConfigToProduct: Record<string, string> = {
  Vaso: "Vasos",
  Botella: "Botellas",
  Caja: "Packaging / cajas",
  Bolsa: "Bolsas",
  Envase: "Envases",
};

type Data = {
  products: string[];
  quantity: string;
  design: string;
  when: string;
  date: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
  website: string; // honeypot
};

const initial: Data = {
  products: [],
  quantity: "",
  design: "",
  when: "",
  date: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  privacy: false,
  website: "",
};

const titles = [
  "¿Qué quieres personalizar?",
  "¿Cuántas unidades aproximadamente?",
  "¿Tienes diseño?",
  "¿Para cuándo lo necesitas?",
  "¿Cómo te contactamos?",
];

function Choice({
  selected,
  onClick,
  children,
  multi = false,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onClick}
      className={`group flex items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-[15px] ring-1 transition-all duration-300 ${
        selected ? "bg-ink text-white ring-ink" : "bg-white/70 ring-ink/10 hover:ring-ink/40"
      }`}
    >
      <span>{children}</span>
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center ${multi ? "rounded-md" : "rounded-full"} ring-1 ${
          selected ? "bg-red ring-red" : "ring-ink/25"
        }`}
        aria-hidden
      >
        {selected && (
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M2 5.2 4.2 7.4 8 3" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </button>
  );
}

export function QuoteWizard({ defaultProduct }: { defaultProduct?: string }) {
  const { config, preset } = useLead();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [d, setD] = useState<Data>(initial);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Preselección desde configurador / card / página de producto.
  useEffect(() => {
    const p = (config && mapConfigToProduct[config.product]) || preset || defaultProduct;
    if (p) setD((x) => (x.products.includes(p) ? x : { ...x, products: [...x.products, p] }));
    if (config?.file) setFile(config.file);
    if (config) setD((x) => (x.design ? x : { ...x, design: "logo" }));
  }, [config, preset, defaultProduct]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((x) => ({ ...x, [k]: v }));
  const toggle = (p: string) =>
    set("products", d.products.includes(p) ? d.products.filter((x) => x !== p) : [...d.products, p]);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email);
  const canNext = [
    d.products.length > 0,
    !!d.quantity,
    !!d.design,
    !!d.when,
    d.name.trim().length > 1 && d.company.trim().length > 1 && emailOk && d.privacy,
  ][step];

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };

  function onFile(f?: File) {
    setFileError(null);
    if (!f) return;
    if (f.size > MAX_FILE_MB * 1024 * 1024) return setFileError(`El archivo supera ${MAX_FILE_MB} MB.`);
    setFile(f);
  }

  async function submit() {
    setStatus("sending");
    const fd = new FormData();
    fd.set("products", d.products.join(", "));
    fd.set("quantity", d.quantity);
    fd.set("design", DESIGN.find((x) => x.id === d.design)?.label ?? d.design);
    fd.set("when", d.when + (d.date ? ` (fecha: ${d.date})` : ""));
    fd.set("name", d.name);
    fd.set("company", d.company);
    fd.set("email", d.email);
    fd.set("phone", d.phone);
    fd.set("message", d.message);
    fd.set("website", d.website);
    if (config) {
      fd.set(
        "configurator",
        `${config.product} · ${config.colorName} · ${config.design} · Acabado ${config.finish}`,
      );
    }
    if (file) fd.set("file", file);
    try {
      const res = await fetch("/api/lead", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "No se ha podido enviar la solicitud.");
      setStatus("ok");
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "No se ha podido enviar la solicitud.");
    }
  }

  function next() {
    if (!canNext) return;
    if (step < 4) go(step + 1);
    else submit();
  }

  if (status === "ok") {
    return (
      <div className="rounded-[28px] bg-white p-8 text-center shadow-[0_40px_80px_-40px_rgb(0_0_0/0.3)] md:p-16" role="status">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red text-white">
          <svg width="22" height="22" viewBox="0 0 10 10" aria-hidden>
            <path d="M2 5.2 4.2 7.4 8 3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="display-md mt-6">Solicitud recibida.</h3>
        <p className="lede mx-auto mt-4 max-w-md text-muted">
          Gracias, {d.name.split(" ")[0]}. Revisaremos tu proyecto y te enviaremos una propuesta.
        </p>
      </div>
    );
  }

  const progress = ((step + 1) / 5) * 100;

  return (
    <form
      className="relative overflow-hidden rounded-[28px] bg-paper-2/70 p-6 ring-1 ring-ink/10 md:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      noValidate
      aria-labelledby="wizard-step-title"
    >
      <div className="flex items-center justify-between">
        <p className="eyebrow text-muted" aria-live="polite">
          Paso {step + 1} de 5
        </p>
        {step > 0 && (
          <button type="button" onClick={() => go(step - 1)} className="eyebrow text-muted hover:text-ink">
            ← Atrás
          </button>
        )}
      </div>
      <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-ink/10" aria-hidden>
        <motion.div className="h-full bg-red" animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
      </div>

      {config && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm">
          <span className="h-6 w-6 shrink-0 rounded-full ring-1 ring-ink/10" style={{ background: config.color }} aria-hidden />
          <span className="text-muted">
            Desde el configurador: <span className="text-ink">{config.product} · {config.colorName} · {config.design}</span>
          </span>
        </div>
      )}

      <div className="relative mt-8 min-h-[22rem]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            initial={reduce ? false : { opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 id="wizard-step-title" ref={headingRef} tabIndex={-1} className="display-md outline-none" data-autofocus>
              {titles[step]}
            </h3>

            {step === 0 && (
              <div className="mt-8 grid gap-2.5 sm:grid-cols-2" role="group" aria-label="Productos">
                {PRODUCTS.map((p) => (
                  <Choice key={p} multi selected={d.products.includes(p)} onClick={() => toggle(p)}>
                    {p}
                  </Choice>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="mt-8 grid gap-2.5 sm:grid-cols-2" role="radiogroup" aria-label="Unidades">
                {QUANTITIES.map((q) => (
                  <Choice key={q} selected={d.quantity === q} onClick={() => set("quantity", q)}>
                    {q}
                  </Choice>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="mt-8 space-y-6">
                <div className="grid gap-2.5" role="radiogroup" aria-label="Diseño">
                  {DESIGN.map((o) => (
                    <Choice key={o.id} selected={d.design === o.id} onClick={() => set("design", o.id)}>
                      {o.label}
                    </Choice>
                  ))}
                </div>
                <label
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-ink/20 bg-white/60 px-5 py-4 transition-colors hover:border-ink/50"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    onFile(e.dataTransfer.files?.[0]);
                  }}
                >
                  <span className="text-[15px]">
                    {file ? (
                      <>
                        <span className="font-medium">{file.name}</span>
                        <span className="ml-2 text-muted">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                      </>
                    ) : (
                      <>
                        Adjunta tu logo o diseño <span className="text-muted">(opcional)</span>
                      </>
                    )}
                    <span className="mt-1 block text-xs text-muted">PNG, JPG, SVG, PDF, AI o EPS · máx. {MAX_FILE_MB} MB</span>
                  </span>
                  <span className="btn btn-dark !h-10 !px-4 text-sm">{file ? "Cambiar" : "Adjuntar"}</span>
                  <input type="file" accept={ACCEPT} className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
                </label>
                {file && (
                  <button type="button" onClick={() => setFile(null)} className="text-sm text-muted underline underline-offset-4">
                    Quitar archivo
                  </button>
                )}
                {fileError && (
                  <p role="alert" className="text-sm text-red">
                    {fileError}
                  </p>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="mt-8 space-y-6">
                <div className="grid gap-2.5 sm:grid-cols-2" role="radiogroup" aria-label="Plazo">
                  {WHEN.map((w) => (
                    <Choice key={w} selected={d.when === w} onClick={() => set("when", w)}>
                      {w}
                    </Choice>
                  ))}
                </div>
                <label className="block text-sm text-muted">
                  ¿Tienes una fecha concreta? <span className="text-muted/70">(opcional)</span>
                  <input
                    type="date"
                    value={d.date}
                    onChange={(e) => set("date", e.target.value)}
                    className="mt-2 block w-full rounded-2xl bg-white px-4 py-3 text-base text-ink ring-1 ring-ink/10 outline-none focus:ring-ink/40 sm:w-64"
                  />
                </label>
              </div>
            )}

            {step === 4 && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["name", "Nombre", "text", "name", true],
                    ["company", "Empresa", "text", "organization", true],
                    ["email", "Email", "email", "email", true],
                    ["phone", "Teléfono", "tel", "tel", false],
                  ] as const
                ).map(([k, label, type, ac, req]) => (
                  <label key={k} className="block">
                    <span className="mb-1.5 block text-sm text-muted">
                      {label}
                      {req ? " *" : ""}
                    </span>
                    <input
                      type={type}
                      autoComplete={ac}
                      required={req}
                      value={d[k]}
                      onChange={(e) => set(k, e.target.value)}
                      aria-invalid={k === "email" && d.email.length > 3 && !emailOk ? true : undefined}
                      className="w-full rounded-2xl bg-white px-4 py-3.5 text-base ring-1 ring-ink/10 outline-none transition-shadow focus:ring-2 focus:ring-ink/50"
                    />
                  </label>
                ))}
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm text-muted">Cuéntanos más (opcional)</span>
                  <textarea
                    rows={3}
                    value={d.message}
                    onChange={(e) => set("message", e.target.value)}
                    className="w-full resize-none rounded-2xl bg-white px-4 py-3.5 text-base ring-1 ring-ink/10 outline-none focus:ring-2 focus:ring-ink/50"
                  />
                </label>
                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={d.website}
                  onChange={(e) => set("website", e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden
                />
                <label className="flex items-start gap-3 text-sm text-muted sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={d.privacy}
                    onChange={(e) => set("privacy", e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[#d7192a]"
                    required
                  />
                  <span>
                    Acepto la{" "}
                    <Link href="/privacidad" className="text-ink underline underline-offset-4" target="_blank">
                      política de privacidad
                    </Link>{" "}
                    y que Newgraf me contacte sobre esta solicitud. *
                  </span>
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 rounded-2xl bg-red/10 px-4 py-3 text-sm text-red-deep">
          {errorMsg}
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">Sin compromiso. Respondemos con una propuesta adaptada a tu proyecto.</p>
        <button
          type="submit"
          disabled={!canNext || status === "sending"}
          className="btn btn-primary justify-center !h-14 !px-7 text-base disabled:cursor-not-allowed disabled:opacity-40"
        >
          {step < 4 ? "Continuar" : status === "sending" ? "Enviando…" : "Solicitar propuesta"} <Arrow />
        </button>
      </div>
    </form>
  );
}
