import type { ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * Header / drawer navigation item.
 *
 * Figma `Header action` — Default `870:18939`, Hover `870:18938`, choose `870:18937`.
 * px 16, py 4, radius 38, gap 8, icon 24, label 24 px regular, colour Natural/BG.
 * Hover fills primary/400; the "choose" (current) state draws a 1 px white border.
 */
export type NavLinkProps = {
  href: string;
  children: ReactNode;
  /** 24x24 icon. */
  icon: ReactNode;
  /** Figma's "choose" variant — the item for the section currently in view. */
  current?: boolean;
  className?: string;
};

export function NavLink({ href, children, icon, current = false, className }: NavLinkProps) {
  return (
    <a
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-nav px-4 py-1 text-24 font-regular text-bg",
        "hover:bg-primary-400",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg",
        current && "border border-white",
        className,
      )}
    >
      <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
      {children}
    </a>
  );
}
