import type { ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * Circular icon chip, primary/400 (primary/600 on hover), radius 37.
 *
 * - 32 px icon, padding 8 — Why Choose feature (`911:19545`), a 48 px chip.
 * - 22 px icon — provider pill (`995:20682`, `1037:26969`): Figma fixes the chip at
 *   32 px, so its 8 px padding overflows and the icon sits centred with 5 px round it.
 * - 16 px icon — the compact provider pills (`997:21640`): a 24 px chip.
 */
export type IconBadgeProps = {
  children: ReactNode;
  /** primary/400 in the default and selected states, primary/600 on hover. */
  tone?: "default" | "hover";
  /** Icon box size in px — 32 in Why Choose, 22 or 16 in the provider pills. */
  iconSize?: 16 | 22 | 32;
  className?: string;
};

const SIZES = {
  32: { chip: "p-2", icon: "size-8" },
  22: { chip: "size-8", icon: "size-5.5" },
  16: { chip: "size-6", icon: "size-4" },
} as const;

export function IconBadge({
  children,
  tone = "default",
  iconSize = 32,
  className,
}: IconBadgeProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-chip",
        SIZES[iconSize].chip,
        tone === "hover" ? "bg-primary-600" : "bg-primary-400",
        className,
      )}
    >
      <span
        className={cn("flex items-center justify-center [&>svg]:size-full", SIZES[iconSize].icon)}
      >
        {children}
      </span>
    </span>
  );
}
