import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";
import appMetaJson from "../app-meta.json";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadProvider } from "@/lib/lead-context";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

type AppMeta = { og_title?: string | null; og_description?: string | null; og_image_url?: string | null; favicon_url?: string | null };
const meta = appMetaJson as AppMeta;
const TITLE = meta.og_title ?? "Newgraf · Serigrafía de vasos, botellas y packaging para empresas";
const DESC =
  meta.og_description ??
  "Serigrafía y personalización de vasos, botellas, envases y packaging para empresas. Convertimos tus productos en soportes de tu marca.";

function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col justify-center pt-[var(--header-h)]">
      <p className="eyebrow text-red">404</p>
      <h1 className="display-lg mt-4">Esta página no está impresa.</h1>
      <a href="/" className="btn btn-dark mt-10 w-fit">
        Volver al inicio
      </a>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "serigrafía de vasos, vasos personalizados para empresas, vasos serigrafiados, botellas personalizadas, serigrafía industrial, personalización de envases, packaging personalizado, vasos corporativos, merchandising personalizado, serigrafía Barcelona, personalización de productos para empresas",
      },
      { name: "theme-color", content: "#0b0b0c" },
      { property: "og:title", content: "Newgraf · Tu marca. Impresa sobre el producto." },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_ES" },
      { name: "twitter:card", content: meta.og_image_url ? "summary_large_image" : "summary" },
      ...(meta.og_image_url ? [{ property: "og:image", content: meta.og_image_url }] : []),
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: meta.favicon_url ?? "/icon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://d2ol7oe51mr4n9.cloudfront.net" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LeadProvider>
        <Header />
        <main id="contenido">
          <Outlet />
        </main>
        <Footer />
      </LeadProvider>
      <OrganizationJsonLd />
    </QueryClientProvider>
  );
}
