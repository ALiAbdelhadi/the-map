"use client";

import { ScrollTrigger } from "./gsap";

/**
 * A once-on-scroll reveal that can never leave its content hidden.
 *
 * ScrollTrigger already calls `onEnter` when the page loads (or jumps) past the start —
 * a reload mid-page, a `#hash` landing, a language switch carrying the hash, the End
 * key. But the reveal would then play its full duration off-screen, and a visitor who
 * scrolls back up quickly catches it half-way. Here, when the trigger element is
 * already entirely above the viewport at the moment it fires, `reveal(true)` asks the
 * caller to jump to the end state instead (e.g. `timeline.progress(1)`); otherwise it
 * gets `reveal(false)` and plays normally.
 *
 * Returns the ScrollTrigger (kill it in the useGSAP cleanup, or let the context do it).
 */
export function revealOnce({
  trigger,
  start,
  reveal,
}: {
  trigger: Element | string;
  start: string;
  reveal: (instant: boolean) => void;
}): ScrollTrigger {
  return ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: (self) => {
      const element = self.trigger;
      const passed = element ? element.getBoundingClientRect().bottom <= 0 : self.progress >= 1;
      reveal(passed);
    },
  });
}
