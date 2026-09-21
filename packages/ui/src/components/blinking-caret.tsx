"use client";

import { useRef } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { prototype } from "../motion/tokens";

/**
 * Figma `Cursor` (`982:20292`): a 1x45 Natural/BG bar, radius 14, whose fill fades
 * to 6 % and back, each after 0.8 s with a 1.022 s `GENTLE` spring. Shown in the
 * search field's typing state (`984:20299`).
 */
export function BlinkingCaret({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const { caret } = prototype.search;
        gsap
          .timeline({ repeat: -1 })
          .to(ref.current, { opacity: 0.06, delay: caret.delay, ...figmaTween(caret) })
          .to(ref.current, { opacity: 1, delay: caret.delay, ...figmaTween(caret) });
      });
      return () => {
        mm.revert();
      };
    },
    { scope: ref },
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none h-11.25 w-px rounded-[0.875rem] bg-bg", className)}
    />
  );
}
