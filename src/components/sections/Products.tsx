import Image from "next/image";
import Link from "next/link";
import { categories, type Category } from "@/content/products";
import { images, videos } from "@/content/media";
import { TiltCard } from "@/components/ui/TiltCard";
import { Video } from "@/components/ui/Video";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Arrow } from "@/components/ui/Arrow";

const layout: Record<Category["slug"], string> = {
  vasos: "md:col-span-7 md:row-span-2 md:min-h-[44rem]",
  botellas: "md:col-span-5 md:min-h-[21.5rem]",
  packaging: "md:col-span-5 md:min-h-[21.5rem]",
  envases: "md:col-span-6 md:min-h-[26rem]",
  merchandising: "md:col-span-6 md:min-h-[26rem]",
};

const order: Category["slug"][] = ["vasos", "botellas", "packaging", "envases", "merchandising"];

function Media({ c }: { c: Category }) {
  const zoom = "transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]";
  switch (c.slug) {
    case "vasos":
      return (
        <Image
          src={images.cups.src}
          alt={images.cups.alt}
          fill
          sizes="(min-width: 768px) 58vw, 88vw"
          className={`object-cover object-[60%_50%] ${zoom}`}
        />
      );
    case "botellas":
      return (
        <Image
          src={images.bottles.src}
          alt={images.bottles.alt}
          fill
          sizes="(min-width: 768px) 42vw, 88vw"
          className={`object-cover object-[55%_60%] ${zoom}`}
        />
      );
    case "packaging":
      return <Video asset={videos.productionB} className={`absolute inset-0 h-full w-full object-cover ${zoom}`} />;
    case "envases":
      return (
        <Image
          src={images.containers.src}
          alt={images.containers.alt}
          fill
          sizes="(min-width: 768px) 50vw, 88vw"
          className={`object-cover object-[50%_30%] ${zoom}`}
        />
      );
    case "merchandising":
      return (
        <Image
          src={images.merch.src}
          alt={images.merch.alt}
          fill
          sizes="(min-width: 768px) 50vw, 88vw"
          className={`object-cover object-[50%_30%] ${zoom}`}
        />
      );
  }
}

export function Products() {
  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
  return (
    <section id="productos" className="bg-paper py-24 md:py-36" aria-labelledby="productos-title">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <SectionLabel index="02">Productos</SectionLabel>
            <h2 id="productos-title" className="display-lg mt-6">
              ¿Qué quieres personalizar?
            </h2>
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.1}>
            <p className="lede text-muted">
              Vasos, botellas, envases, packaging y merchandising. Elige el soporte; nosotros lo convertimos en tu marca.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Móvil: carrusel con scroll-snap. Escritorio: composición bento. */}
      <ul
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-auto md:mt-16 md:max-w-[1440px] md:grid md:grid-cols-12 md:gap-5 md:overflow-visible md:px-[clamp(1.25rem,4vw,3rem)]"
        aria-label="Categorías de producto"
      >
        {order.map((slug, i) => {
          const c = bySlug[slug];
          const dark = slug !== "envases";
          return (
            <li key={slug} className={`w-[86vw] shrink-0 snap-center md:w-auto ${layout[slug]}`}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <TiltCard className="h-full rounded-[28px]">
                  <Link
                    href={`/productos/${slug}`}
                    className={`relative flex h-[30rem] flex-col overflow-hidden rounded-[28px] shadow-[0_1px_0_rgb(255_255_255/0.4)_inset,0_30px_60px_-30px_rgb(0_0_0/0.45)] md:h-full ${
                      dark ? "bg-graphite text-white" : "bg-paper-2 text-ink"
                    }`}
                    aria-label={`${c.h1}: ${c.short}`}
                  >
                    <Media c={c} />
                    <div
                      className={`pointer-events-none absolute inset-0 ${
                        dark ? "bg-gradient-to-t from-ink/85 via-ink/10 to-ink/30" : "bg-gradient-to-t from-paper/80 via-transparent to-transparent"
                      }`}
                      aria-hidden
                    />
                    <div className="relative flex items-start justify-between p-6 md:p-8">
                      <span className="eyebrow opacity-70">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full backdrop-blur-md transition-transform duration-500 group-hover:rotate-[-45deg] ${
                          dark ? "bg-white/15" : "bg-ink/10"
                        }`}
                        aria-hidden
                      >
                        <Arrow className="" />
                      </span>
                    </div>
                    <div className="relative mt-auto p-6 md:p-8">
                      <h3 className="text-[clamp(2.2rem,4.4vw,4.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em]">
                        {c.name}
                      </h3>
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] max-md:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className={`mt-3 max-w-md text-[15px] ${dark ? "text-white/70" : "text-muted"}`}>{c.short}</p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {c.items.slice(0, 4).map((it) => (
                              <li
                                key={it}
                                className={`rounded-full px-3 py-1 text-xs ${dark ? "bg-white/10 text-white/80" : "bg-ink/5 text-ink/70"}`}
                              >
                                {it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
