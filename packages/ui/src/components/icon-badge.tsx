import type { ReactNode } from "react";

import { cn } from "../lib/cn";

export type IconBadgeProps = {
  children: ReactNode;
  tone?: "default" | "hover";
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
        className={cn(
          "flex items-center justify-center text-bg [&>svg]:size-full",
          SIZES[iconSize].icon,
        )}
      >
        {children}
      </span>
    </span>
  );
}
