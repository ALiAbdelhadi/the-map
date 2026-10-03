"use client";

import { type ReactNode, useRef } from "react";

import { prototype } from "@themap/ui/motion/tokens";
import { useHoverTween } from "@themap/ui/motion/use-hover-tween";

export function AvailabilityButton({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  useHoverTween(ref, { backgroundColor: "var(--color-primary-600)" }, prototype.hover.card);

  return (
    <button
      ref={ref}
      type="submit"
      className="flex h-12 items-center justify-center rounded-chip bg-secondary-500 px-6 py-0.5 text-16 font-regular text-bg select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
    >
      {children}
    </button>
  );
}
