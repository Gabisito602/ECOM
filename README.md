# Newgraf · Web

Web de Newgraf — serigrafía y personalización para empresas.
**Tu producto. Tu marca. Nuestra serigrafía.**

## Stack

- **Next.js 16** (App Router, React 19, Server Components, SSG) · **TypeScript**
- **Tailwind CSS 4** · tipografías **Geist** (autohospedadas, sin peticiones a Google)
- **Framer Motion** para scroll cinematográfico, transiciones y microinteracciones
- Renderizador de producto propio en **SVG** (`src/components/product/ProductArt.tsx`), base del configurador

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint       # typecheck
```

## Estructura

```
src/
  app/                    rutas: /, /productos/[slug], /presupuesto, /privacidad, /aviso-legal, /api/lead
  content/
    site.ts               ← DATOS DE EMPRESA (contacto, redes, cifras, legal). Lo que es null se oculta.
    media.ts              ← manifiesto de vídeos e imágenes (sustituir aquí los definitivos)
    products.ts           categorías, textos y SEO de cada producto
    useCases.ts           8 sectores y su escena visual
  components/
    sections/             secciones de la home
    configurator/         configurador (opciones separadas de la UI)
    quote/QuoteWizard     formulario de 5 pasos con adjunto
    product/              renderizador SVG de soportes + artes de ejemplo
docs/HIGGSFIELD.md        prompts y jobs de los vídeos generados
scripts/                  descarga/optimización de vídeos
```

## Configurador → evolución a 3D

`ProductArt` recibe `kind, color, ink, artwork, finish, turn, artScale, artOffsetY`. Un renderizador 3D
(React Three Fiber + modelos GLB por soporte, con el logo como textura/decal) puede implementar las mismas
props y sustituirlo en `Configurator.tsx` sin tocar el estado, las opciones ni el envío al formulario.
Las opciones (`configurator/options.ts`) están listas para venir de un catálogo/CMS.

## Formulario

`/api/lead` valida, filtra spam (honeypot) y reenvía la solicitud (con el archivo adjunto, máx. 10 MB) a:
- `LEAD_WEBHOOK_URL` (Make, Zapier, n8n, CRM…), o
- email vía Resend (`RESEND_API_KEY` + `LEAD_TO_EMAIL`).

Sin ninguno configurado responde 503 y el usuario ve un aviso. Ver `.env.example`.

## Medios

- Fotos aportadas: `public/media/botellas-rey-leon.jpg`, `public/media/vasos-shaker.jpg` (Next/Image genera AVIF/WebP responsive).
- Grabaciones reales de producción de cajas: `public/media/produccion-cajas-*.mp4` (recomprimidas, sin audio, ~1,3 MB).
- 5 vídeos Higgsfield servidos desde su CDN; para alojarlos en tu dominio: `npm run media:fetch && npm run media:optimize`, luego `NEXT_PUBLIC_LOCAL_MEDIA=1`.
- Todos los vídeos: lazy (se cargan al acercarse), pausa fuera de pantalla, respetan `prefers-reduced-motion`.

## Pendiente de datos reales (no se ha inventado nada)

Rellenar en `src/content/site.ts`:
- [ ] Teléfono, email, WhatsApp, dirección, horario
- [ ] Redes sociales
- [ ] Ciudad: está como "Barcelona" deducido de las keywords SEO — **confirmar**
- [ ] Dominio definitivo (`NEXT_PUBLIC_SITE_URL`)
- [ ] Razón social y CIF (privacidad y aviso legal)
- [ ] Cifras (años, clientes, unidades, m², máquinas…) — la sección Empresa las muestra si existen
- [ ] Logotipo oficial en SVG (ahora hay un wordmark tipográfico provisional en `components/ui/Logo.tsx`)
- [ ] Confirmar técnicas, soportes, colores, acabados, mínimos y plazos reales
- [ ] Permiso de uso de las marcas de terceros que aparecen en fotos y vídeos (Disney/El Rey León, Perfect Nutrition, Delicias Fit, Catalana Occidente, Logista)
