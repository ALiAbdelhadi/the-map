"use client";

import { ScrollTrigger } from "./gsap";

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
