import type { ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * App-store download badge.
 *
 * Figma `Button` — Default `942:20434`, hover `942:20433`.
 * Default bg Secondary/500, hover bg Secondary/400, px 24, py 2, radius 12,
 * gap 7, icon 24, two lines at 16 px (regular over medium).
 */
export type StoreBadgeProps = {
  /** Store glyph, 24x24. */
  icon: ReactNode;
  /** First line, e.g. "Download On the". */
  topLine: string;
  /** Second line, e.g. "Apple Store". */
  bottomLine: string;
  href: string;
  className?: string;
};

export function StoreBadge({ icon, topLine, bottomLine, href, className }: StoreBadgeProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-1.75 overflow-hidden rounded-button bg-secondary-500 px-6 py-0.5 text-bg",
        "hover:bg-secondary-400",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        className,
      )}
    >
      <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
      <span className="flex flex-col text-start">
        <span className="text-16 font-regular">{topLine}</span>
        <span className="text-16 font-medium">{bottomLine}</span>
      </span>
    </a>
  );
}
