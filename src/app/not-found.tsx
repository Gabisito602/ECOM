import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col justify-center pt-[var(--header-h)]">
      <p className="eyebrow text-red">404</p>
      <h1 className="display-lg mt-4">Esta página no está impresa.</h1>
      <Link href="/" className="btn btn-dark mt-10 w-fit">
        Volver al inicio
      </Link>
    </section>
  );
}
