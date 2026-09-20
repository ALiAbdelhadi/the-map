import type { ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * Circular icon chip.
 *
 * Figma `911:19545` (Why Choose feature) and `995:20682` (provider pill):
 * padding 8, radius 37, icon 32 (22 inside the provider pill).
 */
export type IconBadgeProps = {
  children: ReactNode;
  /** primary/400 in the default and selected states, primary/600 on hover. */
  tone?: "default" | "hover";
  /** Icon box size in px — 32 in Why Choose, 22 in the provider pill. */
  iconSize?: 22 | 32;
  className?: string;
};

export function IconBadge({
  children,
  tone = "default",
  iconSize = 32,
  className,
}: IconBadgeProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-chip p-2",
        tone === "hover" ? "bg-primary-600" : "bg-primary-400",
        className,
      )}
    >
      <span
        className={cn("flex items-center justify-center", iconSize === 32 ? "size-8" : "size-5.5")}
      >
        {children}
      </span>
    </span>
  );
}
