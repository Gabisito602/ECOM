import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadProvider } from "@/lib/lead-context";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Newgraf · Serigrafía de vasos, botellas y packaging para empresas",
    template: "%s · Newgraf",
  },
  description: site.description,
  keywords: [
    "serigrafía de vasos",
    "vasos personalizados para empresas",
    "vasos serigrafiados",
    "botellas personalizadas",
    "serigrafía industrial",
    "personalización de envases",
    "packaging personalizado",
    "vasos corporativos",
    "merchandising personalizado",
    "serigrafía Barcelona",
    "personalización de productos para empresas",
  ],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: "Newgraf · Tu marca. Impresa sobre el producto.",
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: "Newgraf · Tu marca. Impresa sobre el producto.", description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <LeadProvider>
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
        </LeadProvider>
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
