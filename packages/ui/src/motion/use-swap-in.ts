"use client";

import { type RefObject, useRef } from "react";

import { gsap, MOTION_OK, useGSAP } from "./gsap";
import { motion } from "./tokens";

/**
 * Fades in whatever matches `selector` inside `scope` each time `key` changes —
 * never on first render, so server-rendered content is not hidden on load.
 *
 * Used where Figma shows one state replacing another inside a component: the
 * stepper's open step (`963:20033`), the expanded review (`1015:20920`), the
 * selected Why-Choose row (`914:20605`).
 */
export function useSwapIn(scope: RefObject<HTMLElement | null>, selector: string, key: unknown) {
  const first = useRef(true);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(selector, {
          opacity: 0,
          y: motion.swap.distance,
          duration: motion.swap.duration,
          ease: motion.swap.ease,
        });
      });
      return () => {
        mm.revert();
      };
    },
    { scope, dependencies: [key] },
  );
}
