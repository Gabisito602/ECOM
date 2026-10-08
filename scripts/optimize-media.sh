#!/usr/bin/env bash
# Optimiza los vídeos de /public/media/higgsfield para web (requiere ffmpeg):
#  - H.264 sin audio, faststart, 1080p máx. (CRF 26) + versión móvil 720p
#  - póster JPG del primer segundo
set -euo pipefail
cd "$(dirname "$0")/../public/media/higgsfield"
for f in *.mp4; do
  [[ "$f" == *-web.mp4 || "$f" == *-m.mp4 ]] && continue
  n="${f%.mp4}"
  ffmpeg -v error -y -i "$f" -an -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart "$n-web.mp4"
  ffmpeg -v error -y -i "$f" -an -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart "$n-m.mp4"
  ffmpeg -v error -y -ss 1 -i "$f" -frames:v 1 -q:v 4 "$n.jpg"
  mv "$n-web.mp4" "$f"
  echo "✓ $n"
done
