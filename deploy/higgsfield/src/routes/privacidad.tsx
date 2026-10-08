import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/content/site";


function Page() {
  const owner = site.legal.companyName ?? "[Razón social pendiente]";
  return (
    <LegalPage title="Política de privacidad">
      <h2>Responsable del tratamiento</h2>
      <p>
        {owner}
        {site.legal.taxId ? `, CIF ${site.legal.taxId}` : " · [CIF pendiente]"}
        {site.contact.address ? ` · ${site.contact.address}` : " · [Dirección pendiente]"}
        {site.contact.email ? ` · ${site.contact.email}` : " · [Email pendiente]"}.
      </p>
      <h2>Finalidad</h2>
      <p>
        Gestionar las solicitudes de propuesta enviadas desde esta web y contactar contigo en relación con ellas. Los
        archivos adjuntos (logotipos o diseños) se usan exclusivamente para preparar la propuesta.
      </p>
      <h2>Legitimación</h2>
      <p>Tu consentimiento al enviar el formulario y la aplicación de medidas precontractuales a petición tuya.</p>
      <h2>Conservación</h2>
      <p>Mientras sea necesario para atender tu solicitud y, después, durante los plazos legalmente exigibles.</p>
      <h2>Derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo al
        responsable. También puedes reclamar ante la Agencia Española de Protección de Datos.
      </p>
    </LegalPage>
  );
}

export const Route = createFileRoute("/privacidad")({
  head: () => ({ meta: [{ title: "Política de privacidad · Newgraf" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});
