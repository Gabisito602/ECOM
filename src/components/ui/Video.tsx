"use client";

import { useEffect, useRef, useState } from "react";
import { videoSrc, type VideoAsset } from "@/content/media";

type Props = {
  asset: VideoAsset;
  className?: string;
  /** Hero: empieza a cargar en cuanto la página está lista. Resto: al acercarse al viewport. */
  priority?: boolean;
  /** Vídeo puramente decorativo (oculto a lectores de pantalla). */
  decorative?: boolean;
};

/**
 * Vídeo en autoplay, silenciado y en bucle.
 * - El póster se ve al instante; el vídeo lo sustituye cuando ya tiene imagen.
 * - Lazy: no descarga nada hasta estar a ~1 pantalla del viewport.
 * - Versión ligera en móvil cuando el asset la tiene.
 * - Se pausa fuera de pantalla. Respeta prefers-reduced-motion.
 * - Si el navegador bloquea la reproducción (p. ej. ahorro de batería en iPhone), queda el póster.
 */
export function Video({ asset, className = "", priority = false, decorative = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;
    const load = () => setSrc((s) => s ?? videoSrc(asset, small));

    if (priority) load();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          if (!reduced) el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "100% 0px 100% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [asset, priority]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={asset.poster}
      muted
      loop
      playsInline
      autoPlay={priority}
      preload={priority ? "auto" : "metadata"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : asset.alt}
      disablePictureInPicture
      disableRemotePlayback
    />
  );
}
