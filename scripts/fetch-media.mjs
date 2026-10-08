// Descarga los vídeos generados en Higgsfield a /public/media/higgsfield para servirlos
// desde tu propio dominio. Uso: npm run media:fetch  (luego NEXT_PUBLIC_LOCAL_MEDIA=1)
import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/content/media.ts", import.meta.url), "utf8");
const base = src.match(/const HF = "([^"]+)"/)?.[1];
const entries = [...src.matchAll(/remote: `\$\{HF\}\/([^`]+)`,\s*local: "([^"]+)"/g)];

await mkdir(new URL("../public/media/higgsfield/", import.meta.url), { recursive: true });
for (const [, file, local] of entries) {
  const url = `${base}/${file}`;
  process.stdout.write(`↓ ${local} … `);
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`error ${res.status}`);
    continue;
  }
  await writeFile(new URL(`../public${local}`, import.meta.url), Buffer.from(await res.arrayBuffer()));
  console.log("ok");
}
