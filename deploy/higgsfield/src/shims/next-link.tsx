import type { AnchorHTMLAttributes } from "react";

/** Adaptador de `next/link` para el hosting Higgsfield (TanStack Start): ancla nativa. */
export default function Link({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a href={href} {...rest} />;
}
