#!/usr/bin/env bash
# Vuelca la web de Newgraf (código Next.js de este repo) sobre la plantilla TanStack Start
# del hosting de Higgsfield. Uso: sync.sh <ruta-repo-newgraf> <ruta-app-higgsfield>
set -euo pipefail
SRC="$1"; APP="$2"; OV="$SRC/deploy/higgsfield"
mkdir -p "$APP/src/components" "$APP/src/content" "$APP/src/lib" "$APP/public/media"
cp -r "$SRC/src/components/." "$APP/src/components/"
cp -r "$SRC/src/content/." "$APP/src/content/"
cp -r "$SRC/src/lib/." "$APP/src/lib/"
cp -r "$SRC/public/media/." "$APP/public/media/"
cp "$SRC/src/app/icon.svg" "$APP/public/icon.svg"
cp -r "$OV/src/." "$APP/src/"
cd "$APP"
python3 - <<'PY'
import json,re
p='vite.config.ts'; s=open(p).read()
if 'next-link' not in s:
    s=s.replace('alias: [{ find: /^@higgsfield-ai\\/icons(\\/.*)?$/, replacement: QUANTA_ICONS_SHIM }],',
      'alias: [\n        { find: /^@higgsfield-ai\\/icons(\\/.*)?$/, replacement: QUANTA_ICONS_SHIM },\n'
      '        { find: /^next\\/link$/, replacement: fileURLToPath(new URL("./src/shims/next-link.tsx", import.meta.url)) },\n'
      '        { find: /^next\\/image$/, replacement: fileURLToPath(new URL("./src/shims/next-image.tsx", import.meta.url)) },\n'
      '        { find: /^next\\/navigation$/, replacement: fileURLToPath(new URL("./src/shims/next-navigation.ts", import.meta.url)) },\n      ],')
    assert 'next-link' in s
    open(p,'w').write(s)
p='tsconfig.json'; s=open(p).read()
if 'next/link' not in s:
    s=s.replace('"@/*": ["./src/*"],','"@/*": ["./src/*"],\n      "next/link": ["./src/shims/next-link.tsx"],\n      "next/image": ["./src/shims/next-image.tsx"],\n      "next/navigation": ["./src/shims/next-navigation.ts"],')
    open(p,'w').write(s)
json.dump({"og_title":"Newgraf · Serigrafía de vasos, botellas y packaging para empresas","og_description":"Serigrafía y personalización de vasos, botellas, envases y packaging para empresas. Tu producto. Tu marca. Nuestra serigrafía.","og_image_url":None,"favicon_url":"/icon.svg","og_video_url":None},open('src/app-meta.json','w'),ensure_ascii=False,indent=2)
PY
echo "sync ok"
