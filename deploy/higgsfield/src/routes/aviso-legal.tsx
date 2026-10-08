import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/content/site";


function Page() {
  return (
    <LegalPage title="Aviso legal">
      <h2>Titular</h2>
      <p>
        {site.legal.companyName ?? "[Razón social pendiente]"} · {site.legal.taxId ?? "[CIF pendiente]"} ·{" "}
        {site.contact.address ?? "[Domicilio pendiente]"}
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Los contenidos de esta web pertenecen a su titular o se usan con autorización. Las marcas de terceros que aparecen
        en imágenes de proyectos pertenecen a sus respectivos propietarios.
      </p>
    </LegalPage>
  );
}

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({ meta: [{ title: "Aviso legal · Newgraf" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});
