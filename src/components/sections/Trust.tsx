import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/content/site";

const pillars = [
  { t: "Calidad", d: "Cada pieza sale con la imagen de tu marca. La tratamos como tal." },
  { t: "Precisión", d: "Registro, color y posición cuidados en cada pasada de tinta." },
  { t: "Producción", d: "Preparados para pedidos de empresa y producción en serie." },
  { t: "Personalización", d: "Soportes, colores y diseños adaptados a cada proyecto." },
  { t: "Atención B2B", d: "Un interlocutor que entiende de plazos, marcas y cliente final." },
];

export function Trust() {
  return (
    <section id="empresa" className="bg-paper py-24 md:py-36" aria-labelledby="empresa-title">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <SectionLabel index="10">Empresa</SectionLabel>
            <h2 id="empresa-title" className="display-lg mt-6">
              Experiencia industrial.
              <span className="block text-muted/70">Mentalidad de marca.</span>
            </h2>
          </Reveal>
          <Reveal className="md:col-span-5 md:pt-14" delay={0.1}>
            <p className="lede text-muted">
              {site.yearsExperience} años de producción en serigrafía y una forma de trabajar pensada para marcas: entender qué
              quieres comunicar y llevarlo con precisión al producto.
            </p>
          </Reveal>
        </div>

        {site.stats.length > 0 && (
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-ink/10 md:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.label} className="bg-paper p-6 md:p-8">
                <dt className="eyebrow text-muted">{s.label}</dt>
                <dd className="mt-3 text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p, i) => (
            <li key={p.t} className="group relative bg-paper p-7 transition-colors duration-500 hover:bg-white md:p-8">
              <Reveal delay={i * 0.06}>
                <span className="eyebrow text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-2xl md:mt-14 font-semibold tracking-[-0.03em]">{p.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.d}</p>
                <span className="mt-8 block h-px w-8 bg-ink/30 transition-all duration-700 group-hover:w-full group-hover:bg-red" aria-hidden />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
