import type { ReactNode } from "react";

/**
 * Renders content for assistive technology only.
 *
 * Scaffold-phase primitive: it also proves that Tailwind's `@source` directive in
 * apps/www picks up class names declared inside this package.
 */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
