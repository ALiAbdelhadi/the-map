"use client";

import { type ReactNode, useRef } from "react";

import { cn } from "../lib/cn";
import { prototype } from "../motion/tokens";
import { useHoverTween } from "../motion/use-hover-tween";

export type StoreBadgeProps = {
  icon: ReactNode;
  topLine: string;
  bottomLine: string;
  href: string;
  className?: string;
};

export function StoreBadge({ icon, topLine, bottomLine, href, className }: StoreBadgeProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useHoverTween(ref, { backgroundColor: "var(--color-secondary-400)" }, prototype.hover.storeBadge);

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center gap-1.5 overflow-hidden rounded-button bg-secondary-500 px-5 py-0 text-bg select-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        className,
      )}
    >
      <span className="flex size-5 shrink-0 items-center justify-center">{icon}</span>
      <span className="flex flex-col text-start">
        <span className="text-14 font-regular">{topLine}</span>
        <span className="text-14 font-medium">{bottomLine}</span>
      </span>
    </a>
  );
}
