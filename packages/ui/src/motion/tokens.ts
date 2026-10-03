import type { FigmaTransition } from "./figma-easing";

const out = (duration: number) => ({ ease: "UI_OUT", duration }) satisfies FigmaTransition;
const move = (duration: number) => ({ ease: "UI_IN_OUT", duration }) satisfies FigmaTransition;

export const prototype = {
  hero: { click: move(0.7), copy: out(0.45) },
  whyChoose: { click: move(0.8), tip: out(0.35) },
  screens: { pass: move(2.2) },
  stepper: { click: move(0.5), rocket: { ...out(0.5), delay: 0.15 } },
  serviceAreas: { swap: out(0.4) },
  search: { hover: out(0.25), caret: { ...move(0.5), delay: 0.5 } },
  provider: { step: { ...out(0.5), stagger: 0.12 }, click: move(0.6) },
  reviews: { click: move(0.5) },
  typewriter: { perChar: 0.045, caret: out(0.3) },
  hover: { storeBadge: out(0.25), card: out(0.25), border: out(0.3), lift: out(0.2) },
  menu: out(0.25),
} as const;

export const STEPPER_AUTOPLAY_SECONDS = 10;

export const WHY_CHOOSE_AUTOPLAY_SECONDS = 10;
