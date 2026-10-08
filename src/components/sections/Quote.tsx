import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function Quote({ defaultProduct, index = "10" }: { defaultProduct?: string; index?: string }) {
  return (
    <section id="propuesta" className="bg-paper pb-24 md:pb-36" aria-labelledby="propuesta-title">
      <div className="wrap grid gap-10 border-t border-ink/10 pt-24 md:pt-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionLabel index={index}>Propuesta</SectionLabel>
          <h2 id="propuesta-title" className="display-md mt-6">
            Cuéntanos tu proyecto en cinco pasos.
          </h2>
          <p className="mt-5 text-muted">
            Producto, cantidad, diseño y plazo. Con eso preparamos una propuesta adaptada a tu marca.
          </p>
        </Reveal>
        <div className="lg:col-span-8">
          <QuoteWizard defaultProduct={defaultProduct} />
        </div>
      </div>
    </section>
  );
}
