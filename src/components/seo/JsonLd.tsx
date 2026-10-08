import { site } from "@/content/site";
import { categories } from "@/content/products";

/** Datos estructurados. Solo se publican los campos confirmados en content/site.ts. */
export function OrganizationJsonLd() {
  const c = site.contact;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": c.address ? "LocalBusiness" : "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    slogan: site.claim,
    knowsAbout: ["Serigrafía", "Personalización de productos", ...categories.map((x) => x.h1)],
  };
  if (c.phone) data.telephone = c.phone;
  if (c.email) data.email = c.email;
  if (c.address) data.address = c.address;
  if (c.city) data.areaServed = c.city;
  if (site.socials.length) data.sameAs = site.socials.map((s) => s.href);

  return <JsonLd data={data} />;
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
