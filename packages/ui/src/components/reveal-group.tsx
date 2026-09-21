"use client";

import { type ReactNode, useRef } from "react";

import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { motion } from "../motion/tokens";

/**
 * Reveals marked descendants in sequence when the group scrolls into view.
 *
 * Children opt in with `data-reveal="<n>"`; they appear in ascending `n`, which lets
 * the reveal order differ from DOM order. Figma evidence: the provider section
 * (`998:20842`) steps through five variants — illustration alone, then the benefit
 * pills one at a time, then the email card and downloads.
 *
 * Only opacity and translateY are animated. Without JavaScript, or with reduced
 * motion, everything is visible from the start — nothing is hidden by CSS.
 */
export type RevealGroupProps = {
  children: ReactNode;
  className?: string;
};

export function RevealGroup({ children, className }: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]")).sort(
          (a, b) => Number(a.dataset.reveal) - Number(b.dataset.reveal),
        );
        if (items.length === 0) return;

        gsap.from(items, {
          opacity: 0,
          y: motion.reveal.distance,
          duration: motion.reveal.duration,
          ease: motion.reveal.ease,
          stagger: motion.reveal.stagger,
          scrollTrigger: { trigger: root, start: motion.triggerStart, once: true },
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
