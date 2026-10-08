import Link from "next/link";
import { site, whatsappHref } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  const c = site.contact;
  const wa = whatsappHref("Hola Newgraf, quiero personalizar un producto.");
  const items = [
    c.phone && { k: "Teléfono", v: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
    c.email && { k: "Email", v: c.email, href: `mailto:${c.email}` },
    wa && { k: "WhatsApp", v: "Escríbenos", href: wa },
    c.address && { k: "Ubicación", v: c.address },
    ...site.socials.map((s) => ({ k: s.label, v: s.href.replace(/^https?:\/\/(www\.)?/, ""), href: s.href })),
  ].filter(Boolean) as { k: string; v: string; href?: string }[];

  return (
    <section className="relative overflow-hidden bg-red text-white" aria-labelledby="cta-title">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="wrap relative py-24 md:py-40">
        <Reveal>
          <h2 id="cta-title" className="display-xl max-w-[12ch]">
            ¿Tienes un producto?
            <span className="block text-white/55">Hagámoslo tuyo.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-4">
          <Link href={wa ?? "/#propuesta"} className="btn btn-light !h-14 !px-7 text-base" {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            Hablar con Newgraf <Arrow />
          </Link>
          <Link href="/#configurador" className="btn btn-ghost !h-14 text-base text-white">
            Probar el configurador
          </Link>
        </Reveal>

        {items.length > 0 && (
          <dl className="mt-20 grid gap-8 border-t border-white/25 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it) => (
              <div key={it.k}>
                <dt className="eyebrow text-white/60">{it.k}</dt>
                <dd className="mt-2 text-lg">
                  {it.href ? (
                    <a href={it.href} className="underline-offset-4 hover:underline" {...(it.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {it.v}
                    </a>
                  ) : (
                    it.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
