/**
 * Motion values.
 *
 * 2026-09-22 — approved change of direction: nothing on the page animates by itself
 * any more. Every change answers a click, a hover or the section scrolling into view,
 * once. Figma's prototype loops ("After delay") are dropped, and its springs and
 * keyword curves are replaced by two strong curves (see figma-easing.ts `UI_OUT`,
 * `UI_IN_OUT`). Durations follow the brief: micro-interactions ≤ 0.3 s, on-screen
 * moves 0.5–0.9 s. The Figma prototype values are kept in docs/motion.md.
 */
import type { FigmaTransition } from "./figma-easing";

const out = (duration: number) => ({ ease: "UI_OUT", duration }) satisfies FigmaTransition;
const move = (duration: number) => ({ ease: "UI_IN_OUT", duration }) satisfies FigmaTransition;

export const prototype = {
  /** Hero: the ring re-arranges around the chosen service. */
  hero: { click: move(0.7), copy: out(0.45) },
  /** Why Choose Us: maze zoom and card move; the feature pill arrives. */
  whyChoose: { click: move(0.8), tip: out(0.35) },
  /** App screens tile: the columns scroll while hovered. */
  screens: { hover: move(2.4), back: out(0.6) },
  /** Stepper: pills resize; the rocket slides in. */
  stepper: { click: move(0.5), rocket: { ...out(0.5), delay: 0.15 } },
  /** Service Areas title: swaps while hovered. */
  serviceAreas: { swap: out(0.4) },
  /** Search field: stroke on hover/focus; the cursor blinks only while focused and empty. */
  search: { hover: out(0.25), caret: { ...move(0.5), delay: 0.5 } },
  /** Provider (1440): build-up once in view, then the full section on click. */
  provider: { step: { ...out(0.5), stagger: 0.12 }, click: move(0.6) },
  /** Reviews: cards resize to the chosen one. */
  reviews: { click: move(0.5) },
  /** Typewriter: one character at a time, once, when the heading comes into view. */
  typewriter: { perChar: 0.045, caret: out(0.3) },
  /** Hover changes. */
  hover: { storeBadge: out(0.25), card: out(0.25), border: out(0.3), lift: out(0.2) },
  /** Phone menu. */
  menu: out(0.25),
} as const;
