import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { categories } from "@/content/products";
import { site, whatsappHref } from "@/content/site";

export function Footer() {
  const c = site.contact;
  const wa = whatsappHref();
  const hasContact = c.phone || c.email || wa || c.address;

  return (
    <footer className="bg-ink text-white">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo className="text-[22px]" />
          <p className="mt-6 max-w-sm text-white/55">{site.claim}</p>
          <p className="mt-2 max-w-sm text-sm text-white/35">{site.tagline}.</p>
        </div>

        <nav aria-label="Productos" className="md:col-span-3">
          <p className="eyebrow text-white/40">Productos</p>
          <ul className="mt-5 space-y-2.5 text-[15px]">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/productos/${cat.slug}`} className="text-white/75 transition-colors hover:text-white">
                  {cat.h1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow text-white/40">Contacto</p>
          <ul className="mt-5 space-y-2.5 text-[15px] text-white/75">
            {c.phone && (
              <li>
                <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {c.phone}
                </a>
              </li>
            )}
            {c.email && (
              <li>
                <a href={`mailto:${c.email}`} className="hover:text-white">
                  {c.email}
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
            )}
            {c.address && <li>{c.address}</li>}
            {!hasContact && (
              <li>
                <Link href="/#propuesta" className="hover:text-white">
                  Solicitar propuesta →
                </Link>
              </li>
            )}
          </ul>
          {site.socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-4 text-sm text-white/55">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legal.companyName ?? site.name}
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacidad" className="hover:text-white/70">
                Privacidad
              </Link>
            </li>
            <li>
              <Link href="/aviso-legal" className="hover:text-white/70">
                Aviso legal
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
