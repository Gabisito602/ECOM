"use client";

import { useEffect, useRef, useState } from "react";
import { videoSrc, type VideoAsset } from "@/content/media";

type Props = {
  asset: VideoAsset;
  className?: string;
  /** Hero: carga inmediata. Resto: carga diferida al acercarse al viewport. */
  priority?: boolean;
  /** Vídeo puramente decorativo (oculto a lectores de pantalla). */
  decorative?: boolean;
};

/**
 * Vídeo en autoplay, silenciado y en bucle.
 * - Lazy: no descarga nada hasta estar a ~1 pantalla del viewport.
 * - Se pausa fuera de pantalla (ahorra batería y CPU en móvil).
 * - Respeta prefers-reduced-motion (muestra el primer fotograma, sin reproducir).
 * - Si el vídeo falla, queda el fondo/póster: la composición nunca se rompe.
 */
export function Video({ asset, className = "", priority = false, decorative = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(priority ? videoSrc(asset) : undefined);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrc((s) => s ?? videoSrc(asset));
          if (!reduced) el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "100% 0px 100% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [asset]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) el.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={ref}
      className={`${className} transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      src={src}
      poster={asset.poster}
      muted
      loop
      playsInline
      preload={priority ? "auto" : "none"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : asset.alt}
      onLoadedData={() => setReady(true)}
      disablePictureInPicture
      disableRemotePlayback
    />
  );
}
