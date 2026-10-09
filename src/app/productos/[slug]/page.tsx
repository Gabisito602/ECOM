import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, categoryBySlug, type Category } from "@/content/products";
import { images, videos } from "@/content/media";
import { site } from "@/content/site";
import { ProductArt } from "@/components/product/ProductArt";
import { Video } from "@/components/ui/Video";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { Quote } from "@/components/sections/Quote";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";

type Params = { slug: string };

const wizardProduct: Record<Category["slug"], string> = {
  vasos: "Vasos",
  botellas: "Botellas",
  envases: "Envases",
  packaging: "Packaging / cajas",
  merchandising: "Merchandising",
};

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = categoryBySlug(slug);
  if (!c) return {};
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    keywords: c.keywords,
    alternates: { canonical: `/productos/${c.slug}` },
    openGraph: { title: `${c.h1} · Newgraf`, description: c.seoDescription, url: `/productos/${c.slug}` },
  };
}

const faqs = (c: Category) => [
  {
    q: `¿Cuántas unidades necesito para personalizar ${c.name.toLowerCase()}?`,
    a: "Depende del soporte, del diseño y del número de colores. Indícanos una cantidad aproximada en la solicitud y te lo concretamos en la propuesta.",
  },
  {
    q: "¿Puedo enviaros mi logotipo tal cual lo tengo?",
    a: "Sí. Adjúntalo en el formulario en el formato que tengas. Si hace falta adaptarlo a la superficie de impresión, te lo indicamos.",
  },
  {
    q: "¿Qué colores y acabados hay disponibles?",
    a: "Varían según el soporte. Puedes hacer una primera prueba en el configurador y te confirmamos las opciones reales en la propuesta.",
  },
  {
    q: "¿Cuánto tarda la producción?",
    a: "El plazo depende del producto y del volumen. Dinos para cuándo lo necesitas y lo tendremos en cuenta desde el primer momento.",
  },
];

function Gallery({ c }: { c: Category }) {
  const tile = "relative overflow-hidden rounded-[28px] bg-graphite";
  if (c.slug === "vasos")
    return (
      <>
        <Reveal className={`${tile} aspect-[3/2] md:col-span-7`}>
          <Image src={images.cups.src} alt={images.cups.alt} fill sizes="(min-width:768px) 58vw, 100vw" className="object-cover" />
        </Reveal>
        <Reveal delay={0.1} className={`${tile} aspect-[3/2] md:col-span-5 md:aspect-auto`}>
          <Video asset={videos.cupsReal} className="absolute inset-0 h-full w-full object-cover" />
        </Reveal>
      </>
    );
  if (c.slug === "botellas")
    return (
      <>
        <Reveal className={`${tile} aspect-[3/2] md:col-span-7`}>
          <Image src={images.bottles.src} alt={images.bottles.alt} fill sizes="(min-width:768px) 58vw, 100vw" className="object-cover" />
        </Reveal>
        <Reveal delay={0.1} className={`${tile} aspect-[3/2] md:col-span-5 md:aspect-auto`}>
          <Video asset={videos.bottlesReal} className="absolute inset-0 h-full w-full object-cover" />
        </Reveal>
      </>
    );
  if (c.slug === "packaging")
    return (
      <>
        <Reveal className={`${tile} aspect-video md:col-span-8`}>
          <Video asset={videos.packaging} className="absolute inset-0 h-full w-full object-cover" />
        </Reveal>
        <Reveal delay={0.1} className={`${tile} aspect-[9/14] md:col-span-4 md:aspect-auto`}>
          <Video asset={videos.productionA} className="absolute inset-0 h-full w-full object-cover" />
        </Reveal>
      </>
    );
  const photo = c.slug === "envases" ? images.containers : c.slug === "merchandising" ? images.merch : null;
  if (photo)
    return (
      <>
        <Reveal className={`${tile} aspect-[4/3] md:col-span-7`}>
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width:768px) 58vw, 100vw" className="object-cover" />
        </Reveal>
        <Reveal delay={0.1} className={`${tile} aspect-[4/3] md:col-span-5 md:aspect-auto`}>
          <Video asset={videos.industrial} className="absolute inset-0 h-full w-full object-cover" />
        </Reveal>
      </>
    );
  return (
    <Reveal className={`${tile} aspect-video md:col-span-12 md:aspect-[21/9]`}>
      <Video asset={videos.industrial} className="absolute inset-0 h-full w-full object-cover" />
    </Reveal>
  );
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = categoryBySlug(slug);
  if (!c) notFound();
  const others = categories.filter((x) => x.slug !== c.slug);
  const qa = faqs(c);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: c.h1,
            description: c.seoDescription,
            serviceType: "Serigrafía y personalización",
            provider: { "@type": "Organization", name: site.name, url: site.url },
            ...(site.contact.city ? { areaServed: site.contact.city } : {}),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
              { "@type": "ListItem", position: 2, name: c.h1, item: `${site.url}/productos/${c.slug}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: qa.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white md:pb-24 md:pt-40">
        <div className="mesh-bg pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" aria-hidden />
        <div className="wrap relative grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <nav aria-label="Migas de pan" className="eyebrow text-white/45">
              <Link href="/" className="hover:text-white">Inicio</Link> <span aria-hidden>/</span>{" "}
              <Link href="/#productos" className="hover:text-white">Productos</Link> <span aria-hidden>/</span>{" "}
              <span className="text-white/80">{c.name}</span>
            </nav>
            <h1 className="display-lg mt-8">{c.h1}</h1>
            <p className="lede mt-6 max-w-xl text-white/65">{c.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#propuesta" className="btn btn-primary">
                Pedir propuesta <Arrow />
              </Link>
              <Link href="/#configurador" className="btn btn-ghost text-white">
                Probar en el configurador
              </Link>
            </div>
          </div>
          <div className="relative mx-auto h-[46vh] max-h-[34rem] md:col-span-5">
            <div className="absolute inset-[10%] rounded-full blur-3xl" style={{ background: c.visual.color, opacity: 0.22 }} aria-hidden />
            <ProductArt
              kind={c.visual.kind}
              color={c.visual.color}
              ink={c.visual.ink}
              artwork={{ type: "preset", id: c.visual.art }}
              finish="brillo"
              className="relative h-full w-auto drop-shadow-[0_40px_60px_rgb(0_0_0/0.5)]"
              title={c.h1}
            />
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28" aria-labelledby="soportes-title">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 id="soportes-title" className="display-md">Qué personalizamos</h2>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[24px] bg-ink/10 sm:grid-cols-2 md:col-span-8">
            {c.items.map((it, i) => (
              <li key={it} className="flex items-baseline gap-4 bg-paper p-6">
                <span className="eyebrow text-red">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg font-medium tracking-[-0.02em]">{it}</span>
              </li>
            ))}
          </ul>
          <div className="md:col-span-4">
            <h2 className="display-md">Para quién</h2>
          </div>
          <ul className="flex flex-wrap gap-2 md:col-span-8">
            {c.uses.map((u) => (
              <li key={u} className="rounded-full bg-white px-4 py-2 text-[15px] ring-1 ring-ink/10">
                {u}
              </li>
            ))}
          </ul>
        </div>
        <div className="wrap mt-16 grid gap-4 md:grid-cols-12 md:gap-5">
          <Gallery c={c} />
        </div>
      </section>

      <section className="bg-paper pb-20 md:pb-28" aria-labelledby="faq-title">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <h2 id="faq-title" className="display-md md:col-span-4">Preguntas frecuentes</h2>
          <div className="md:col-span-8">
            {qa.map((f) => (
              <details key={f.q} className="group border-t border-ink/10 py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium tracking-[-0.02em]">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 ring-ink/15 transition-transform duration-500 group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Quote defaultProduct={wizardProduct[c.slug]} index="→" />

      <section className="bg-paper pb-24" aria-label="Otros productos">
        <div className="wrap">
          <p className="eyebrow text-muted">También personalizamos</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/productos/${o.slug}`}
                  className="group flex items-center justify-between rounded-2xl bg-white px-6 py-5 ring-1 ring-ink/10 transition-all hover:ring-ink/40"
                >
                  <span className="text-xl font-semibold uppercase tracking-[-0.03em]">{o.name}</span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
