import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { categories } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...categories.map((c) => ({
      url: `${site.url}/productos/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/presupuesto`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
