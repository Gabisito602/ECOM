import type { Metadata } from "next";
import { Quote } from "@/components/sections/Quote";

export const metadata: Metadata = {
  title: "Solicitar propuesta de personalización",
  description: "Cuéntanos qué quieres personalizar, cuántas unidades y para cuándo. Newgraf te prepara una propuesta.",
  alternates: { canonical: "/presupuesto" },
};

export default function Page() {
  return (
    <div className="pt-[var(--header-h)]">
      <Quote index="→" />
    </div>
  );
}
