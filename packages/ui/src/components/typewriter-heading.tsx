"use client";

import { useRef } from "react";

import { cn } from "../lib/cn";
import { gsap, MOTION_OK, SplitText, useGSAP } from "../motion/gsap";
import { motion } from "../motion/tokens";

/**
 * Heading that types itself in when it scrolls into view.
 *
 * Figma evidence: `Trust Built on Real Reviews` (`1028:23286`) and its Arabic twin
 * (`1015:21041`) are 11-variant sets, each variant one character longer than the
 * last — a typewriter. Timing is not in the file; see motion/tokens.ts.
 *
 * Arabic is revealed a word at a time, not a character at a time: Arabic letters
 * join, and splitting them into separate elements breaks the joining.
 *
 * With reduced motion, or before JavaScript runs, the heading is simply complete.
 * SplitText keeps an aria-label on the heading so it is announced once, whole.
 */
export type TypewriterHeadingProps = {
  children: string;
  /** `words` for scripts whose letters join (Arabic). */
  splitBy?: "chars" | "words";
  className?: string;
};

export function TypewriterHeading({
  children,
  splitBy = "chars",
  className,
}: TypewriterHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const heading = ref.current;
      if (!heading) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(heading, { type: splitBy, aria: "auto" });
        const pieces = splitBy === "chars" ? split.chars : split.words;
        const step =
          splitBy === "chars" ? motion.typewriter.stepDuration : motion.typewriter.stepDuration * 4;

        // autoAlpha, not opacity: the heading is gradient text (background-clip:
        // text on the parent), which paints every character regardless of the
        // character's own opacity. `visibility: hidden` is what actually removes an
        // un-typed character from the clip. Visibility never affects layout.
        gsap.from(pieces, {
          autoAlpha: 0,
          duration: 0.01,
          ease: motion.typewriter.ease,
          stagger: step,
          scrollTrigger: { trigger: heading, start: motion.triggerStart, once: true },
        });

        return () => {
          split.revert();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: ref, dependencies: [children, splitBy] },
  );

  return (
    <h2 ref={ref} className={cn(className)}>
      {children}
    </h2>
  );
}
