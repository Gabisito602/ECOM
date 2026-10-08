import type { Metadata } from "next";
import { LegalPage } from "../legal";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Aviso legal", robots: { index: false } };

export default function Page() {
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
