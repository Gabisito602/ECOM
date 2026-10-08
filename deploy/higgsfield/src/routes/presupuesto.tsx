import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "@/components/sections/Quote";


function Page() {
  return (
    <div className="pt-[var(--header-h)]">
      <Quote index="→" />
    </div>
  );
}

export const Route = createFileRoute("/presupuesto")({
  head: () => ({ meta: [{ title: "Solicitar propuesta de personalización · Newgraf" }] }),
  component: Page,
});
