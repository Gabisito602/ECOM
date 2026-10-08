import { createFileRoute } from "@tanstack/react-router";
import { env as cfEnv } from "cloudflare:workers";

/**
 * Recepción de solicitudes de propuesta.
 *
 * Destinos (se usa el primero configurado):
 *  1. LEAD_WEBHOOK_URL            → reenvía el multipart tal cual (Make, Zapier, n8n, CRM…)
 *  2. RESEND_API_KEY + LEAD_TO_EMAIL (+ LEAD_FROM_EMAIL) → email con el archivo adjunto
 * Sin destino configurado responde 503 para que nunca se "pierda" una solicitud en silencio.
 */

const envOf = (k: string) => (cfEnv as unknown as Record<string, string | undefined>)[k];

const MAX_FILE = 10 * 1024 * 1024;
const REQUIRED = ["products", "name", "company", "email"] as const;
const FIELDS: Record<string, string> = {
  products: "Productos",
  quantity: "Unidades",
  design: "Diseño",
  when: "Plazo",
  configurator: "Configurador",
  name: "Nombre",
  company: "Empresa",
  email: "Email",
  phone: "Teléfono",
  message: "Mensaje",
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

async function POST(req: Request): Promise<Response> {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  // Honeypot: los bots rellenan el campo oculto. Respondemos OK sin procesar.
  if (String(form.get("website") ?? "").trim()) return Response.json({ ok: true });

  const data: Record<string, string> = {};
  for (const k of Object.keys(FIELDS)) data[k] = String(form.get(k) ?? "").trim().slice(0, 4000);

  for (const k of REQUIRED) {
    if (!data[k]) return Response.json({ error: `Falta el campo: ${FIELDS[k]}.` }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return Response.json({ error: "El email no es válido." }, { status: 422 });
  }

  const file = form.get("file");
  const attachment = file instanceof File && file.size > 0 ? file : null;
  if (attachment && attachment.size > MAX_FILE) {
    return Response.json({ error: "El archivo supera 10 MB." }, { status: 413 });
  }

  const webhook = envOf("LEAD_WEBHOOK_URL");
  const resendKey = envOf("RESEND_API_KEY");
  const to = envOf("LEAD_TO_EMAIL");

  try {
    if (webhook) {
      const out = new FormData();
      for (const [k, v] of Object.entries(data)) out.set(k, v);
      out.set("source", "newgraf-web");
      out.set("receivedAt", new Date().toISOString());
      if (attachment) out.set("file", attachment, attachment.name);
      const r = await fetch(webhook, { method: "POST", body: out });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
      return Response.json({ ok: true });
    }

    if (resendKey && to) {
      const rows = Object.entries(FIELDS)
        .filter(([k]) => data[k])
        .map(([k, label]) => `<tr><td style="padding:6px 12px;color:#666">${label}</td><td style="padding:6px 12px">${esc(data[k])}</td></tr>`)
        .join("");
      const attachments = attachment
        ? [{ filename: attachment.name, content: toBase64(new Uint8Array(await attachment.arrayBuffer())) }]
        : undefined;
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: envOf("LEAD_FROM_EMAIL") ?? "Newgraf Web <onboarding@resend.dev>",
          to: [to],
          reply_to: data.email,
          subject: `Nueva solicitud de propuesta · ${data.company}`,
          html: `<h2 style="font-family:sans-serif">Nueva solicitud de propuesta</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
          attachments,
        }),
      });
      if (!r.ok) throw new Error(`resend ${r.status}`);
      return Response.json({ ok: true });
    }
  } catch (e) {
    console.error("[lead] error de entrega", e);
    return Response.json({ error: "No hemos podido enviar tu solicitud. Inténtalo de nuevo en unos minutos." }, { status: 502 });
  }

  console.warn("[lead] Sin destino configurado (LEAD_WEBHOOK_URL o RESEND_API_KEY+LEAD_TO_EMAIL).", {
    ...data,
    file: attachment?.name,
  });
  return Response.json(
    { error: "El formulario aún no está activo. Por favor, inténtalo más tarde." },
    { status: 503 },
  );
}

function toBase64(bytes: Uint8Array) {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

export const Route = createFileRoute("/api/lead")({
  server: { handlers: { POST: ({ request }) => POST(request) } },
});
