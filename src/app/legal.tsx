import { site } from "@/content/site";

/** Plantilla para páginas legales. El texto definitivo debe redactarlo/validarlo Newgraf. */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="wrap max-w-3xl pb-24 pt-[calc(var(--header-h)+4rem)]">
      <h1 className="display-md">{title}</h1>
      {!site.legal.companyName && (
        <p className="mt-6 rounded-2xl bg-red/10 px-4 py-3 text-sm text-red-deep">
          Contenido pendiente: faltan la razón social, el CIF y los datos de contacto de Newgraf.
        </p>
      )}
      <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
        {children}
      </div>
    </article>
  );
}
