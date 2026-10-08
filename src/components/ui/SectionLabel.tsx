export function SectionLabel({ index, children, dark = false }: { index: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`eyebrow flex items-center gap-3 ${dark ? "text-white/55" : "text-muted"}`}>
      <span className="text-red">{index}</span>
      <span className={`h-px w-8 ${dark ? "bg-white/25" : "bg-ink/20"}`} aria-hidden />
      <span>{children}</span>
    </div>
  );
}
