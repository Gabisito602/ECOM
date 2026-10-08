# Contenido audiovisual · Higgsfield

Los 5 vídeos base se generaron con **Higgsfield · Kling 3.0 (modo pro, 1920×1080, sin audio)** el 08/10/2026
y ya están enlazados en `src/content/media.ts`. Son solo texto-a-vídeo: el contenedor de desarrollo no podía
subir tus fotos a Higgsfield, así que **no usan tus fotografías como referencia**. Revísalos y regenera los
que no encajen (con las fotos reales como `start_image` el resultado se parecerá mucho más a tu producto).

| # | Uso en la web | Job ID | Duración |
|---|---|---|---|
| 01 | Hero (fondo) | `6d2472c9-d0a8-4dbf-949b-8b3740345f9f` | 10 s |
| 02 | Galería de vasos, página Vasos | `2ca350a5-66a4-4c83-97da-81df0c09bc8f` | 5 s |
| 03 | Sección Packaging, página Packaging | `f4d0e3bd-2eab-40a1-9ee0-a51437cdc440` | 10 s |
| 04 | Sección Botellas, página Botellas | `f9ac2b37-d8e5-4470-8646-e14063cbef64` | 5 s |
| 05 | Banda industrial, páginas Envases / Merchandising | `2e98582f-07b3-48d6-80b3-f13dfc657649` | 10 s |

Para servirlos desde tu dominio: `npm run media:fetch && npm run media:optimize` y `NEXT_PUBLIC_LOCAL_MEDIA=1`.

**Ajustes comunes:** modelo `kling3_0`, `mode: pro`, `sound: off`, `aspect_ratio: 16:9`.
Para la versión móvil del hero, repite el prompt 01 con `aspect_ratio: 9:16`.

---

## VIDEO 01 — HERO · Proceso de serigrafía de un vaso

```
Premium industrial commercial, multi-shot sequence, dark graphite studio with controlled soft top light, shallow depth of field, slow motion, precise motorized camera moves, no people, no faces, no text overlays. Shot 1: extreme macro of thick white screen-printing ink being stirred, glossy viscous texture catching a rim light. Shot 2: macro of a fine polyester screen-printing mesh stretched on an aluminium frame, light passing through the stencil of a simple abstract circular logo. Shot 3: a rubber squeegee glides slowly across the screen pushing a bead of white ink through the mesh. Shot 4: close-up of a matte black plastic tumbler cup rotating on a precision printing jig as the white abstract logo appears printed on its surface. Shot 5: wide shot of an industrial semi-automatic screen printing machine working rhythmically in a clean dark workshop. Shot 6: final hero shot, a perfectly aligned row of identical customised black cups with crisp white print on a polished concrete surface, slow dolly along the row. Color palette graphite, black, warm white, a single subtle red accent light. Ultra realistic, 4k commercial advertising look.
```

## VIDEO 02 — PRODUCT · Vaso personalizado girando

```
High-end product commercial. A single glossy yellow reusable plastic cup with a bold black printed abstract geometric logo slowly rotates 360 degrees on a light grey micro-cement pedestal. Minimalist studio, soft controlled key light from the left, gentle reflections, shallow depth of field, neutral warm grey seamless background, slow locked-off camera with a very slight push in. No people, no readable text. Photorealistic, premium packaging photography, 4k.
```
> Mejor resultado: usa la foto de los vasos amarillos como `start_image`.

## VIDEO 03 — PACKAGING · De caja neutra a caja personalizada

```
Premium packaging commercial, minimalist studio with soft daylight, top-down and three-quarter angles, shallow depth of field, slow precise camera moves, no people, no readable text. Shot 1: a plain white corrugated cardboard shipping box sits on a pale stone surface. Shot 2: macro of black ink being printed onto flat white corrugated cardboard sheets passing under a screen printing frame, crisp abstract logo appearing. Shot 3: a stack of freshly printed flat box blanks with a minimalist black logo sliding on an industrial conveyor. Shot 4: the final folded white box with a clean black abstract brand mark and a thin red line, rotating slowly, studio hero lighting. Ultra realistic commercial look, neutral palette white, kraft, graphite, subtle red accent.
```

## VIDEO 04 — BOTELLA · Macro del acabado de tinta

```
Luxury product macro commercial. Extreme close-up slow camera glide along the curved surface of a matte cobalt blue aluminium water bottle, revealing the texture of a crisp white screen-printed abstract graphic, ink slightly raised on the matte powder-coated surface, raking light sweeping across highlighting the print edges. Then pull back to reveal the full bottle standing on a beige stone block, soft studio light, shallow depth of field. No people, no readable text or brand names. Photorealistic 4k.
```
> Mejor resultado: usa la foto de las tres botellas como `start_image`.

## VIDEO 05 — INDUSTRIAL · Maquinaria, tinta, pantallas

```
Industrial macro cinematography, premium manufacturing film, clean dark workshop, controlled lighting, slow motion, shallow depth of field, no people visible, no readable text. Shot 1: macro of a stainless steel squeegee blade edge coated in glossy black ink. Shot 2: rack focus across a fine screen printing mesh revealing tiny geometric stencil details. Shot 3: pneumatic arm of a screen printing machine lowering in slow motion, metal and anodised aluminium parts glinting. Shot 4: spatula scooping thick red ink from a metal tin, viscous drips. Shot 5: rows of printed cups drying on a metal rack, bokeh of workshop lights. Graphite, steel, black, single red accent. Ultra realistic 4k commercial.
```

---

## Fotografía pendiente (no se pudo generar: límite diario de la cuenta)

La web usa ahora renders SVG propios para la galería de vasos, envases, merchandising y los 8 sectores.
Cuando quieras sustituirlos por fotografía, estos prompts (modelo `gpt_image_2_5`, 4:5) mantienen la estética:

- **Vasos transparentes:** `Premium product photography: three crystal-clear transparent reusable plastic cups with a crisp white screen-printed minimalist abstract logo, on a pale grey stone surface, soft studio daylight, subtle caustic reflections, shallow depth of field, no readable text, photorealistic.`
- **Vasos para eventos:** `Stack of reusable event cups in coral red with white screen-printed abstract wave graphic, dark graphite background, dramatic rim light, soft bokeh of warm lights, no readable text, photorealistic commercial look.`
- **Restauración:** `Matte white reusable cups with a black printed minimalist leaf mark on a light oak counter of an upscale restaurant, soft window light, no people, no readable text, photorealistic editorial.`
- **Fitness:** `Dark premium gym interior, black shaker cup with a white printed abstract logo on a rubber floor next to a chrome dumbbell, dramatic side light, no people, photorealistic.`
- **Retail:** `Minimalist retail shelf with printed shopping bags, boxes and bottles sharing one minimal abstract brand mark, white and oak interior, soft light, no people, photorealistic.`
- **Alimentación:** `Printed kraft boxes and white jars with a minimal black abstract brand graphic on a stone kitchen counter, natural daylight, no people, photorealistic.`
- **Bebidas / Hospitality / Marketing:** misma estructura cambiando soporte y paleta (ver `src/content/useCases.ts`).

**Mejor opción:** fotografiar producción y trabajos reales de Newgraf. Las grabaciones reales de cajas ya están en la web.
