/**
 * Wordmark provisional de Newgraf (tipográfico, basado en el packaging de referencia).
 * PENDIENTE: sustituir por el SVG oficial del logotipo.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`} aria-label="Newgraf">
      <span className="text-[1.32em] font-bold tracking-[-0.045em]" aria-hidden>
        Newgraf
      </span>
      <span className="mt-[0.28em] block h-[0.14em] w-[1.25em] rounded-full bg-red" aria-hidden />
    </span>
  );
}
