"use client";

import { type ReactNode, useRef } from "react";

import { prototype } from "@themap/ui/motion/tokens";
import { useHoverTween } from "@themap/ui/motion/use-hover-tween";

/**
 * Service Areas "Check Availability" CTA.
 *
 * Figma draws only its default state. Hover, owner-requested 2026-09-29
 * (docs/figma-gaps.md D14): the fill turns Secondary/500 → primary/600, faded over the
 * site's 0.25 s hover. Not primary/500 (`Click here`'s hover, `997:21147`): its white
 * 16 px label would fall to 3.9:1 contrast; primary/600 keeps it at 5.6:1.
 */
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
