/**
 * Motion values — every one read from the Figma prototype.
 *
 * Each entry is a component set's prototype reactions (read with the Plugin API,
 * read-only): `delay` is the "After delay" trigger in seconds, the transitions are
 * Smart Animate with Figma's stored duration and easing type. See docs/motion.md →
 * "Prototype audit" for the source of each value, and figma-easing.ts for how the
 * easing types become curves.
 */
import type { FigmaTransition } from "./figma-easing";

type Step = { delay: number } & FigmaTransition;

export const prototype = {
  /** Hero section `898:20007`: every variant advances after 0.8 s; clicks jump there. */
  hero: {
    auto: { delay: 0.8, ease: "EASE_OUT", duration: 0.3 } satisfies Step,
    click: { ease: "EASE_OUT", duration: 0.3 } satisfies FigmaTransition,
  },
  /**
   * Why Choose Us `914:20605`: default → All-in-One → … → Easy → default.
   * Clicking a row: 0.3 s ease-out; clicking the selected row returns instantly.
   */
  whyChoose: {
    auto: { delay: 0.8, ease: "GENTLE", duration: 1.022 } satisfies Step,
    /** Easy → default. */
    back: { delay: 0.8, ease: "QUICK", duration: 0.744 } satisfies Step,
    click: { ease: "EASE_OUT", duration: 0.3 } satisfies FigmaTransition,
  },
  /** Screens `936:20018`: five scroll positions, looping. */
  screens: { delay: 0.8, ease: "SLOW", duration: 1.25 } satisfies Step,
  /** Get the App Now badge `936:20234`: the gradient border swaps and swaps back. */
  badge: {
    out: { delay: 0.8, ease: "EASE_IN_AND_OUT", duration: 0.3 } satisfies Step,
    back: { delay: 0.8, ease: "EASE_IN_AND_OUT_BACK", duration: 0.3 } satisfies Step,
  },
  /** Get the App section `963:20033`: 1 → 2 → 3 after 0.8 s, 3 → 1 after 0.4 s. */
  stepper: {
    auto: { delay: 0.8, ease: "GENTLE", duration: 1.022 } satisfies Step,
    back: { delay: 0.4, ease: "QUICK", duration: 0.248 } satisfies Step,
    click: { ease: "GENTLE", duration: 1.022 } satisfies FigmaTransition,
    /** Choose Your Store `950:20377`: Action → 3D, the rocket slides in. */
    rocket: { delay: 0.2, ease: "SLOW", duration: 0.417 } satisfies Step,
  },
  /**
   * Service Areas title `974:20059`: "Service Areas" holds 0.8 s, hands over to
   * "Where We Operate" through two off-stage variants, and back.
   */
  serviceAreas: {
    hold: { delay: 0.8, ease: "GENTLE", duration: 1.022 } satisfies Step,
    enter: { delay: 0.1, ease: "GENTLE", duration: 0.128 } satisfies Step,
  },
  /** Search by location `984:20302`: hover and focus borders; `Cursor` `982:20292` blinks. */
  search: {
    hover: { ease: "GENTLE", duration: 1.022 } satisfies FigmaTransition,
    caret: { delay: 0.8, ease: "GENTLE", duration: 1.022 } satisfies Step,
  },
  /** Contact us `998:20842` — the provider sequence. */
  provider: {
    step: { delay: 0.8, ease: "EASE_IN_AND_OUT", duration: 0.3 } satisfies Step,
    /** Click here → the full section. */
    click: { ease: "EASE_IN_AND_OUT", duration: 0.3 } satisfies FigmaTransition,
    /** Service provider Cart `995:20700`: the gradient border flips back and forth. */
    pill: { delay: 0.8, ease: "EASE_IN_AND_OUT", duration: 0.3 } satisfies Step,
    /** Click `997:21182`: the hand icon grows and shrinks. */
    hand: { delay: 0.8, ease: "EASE_OUT", duration: 0.3 } satisfies Step,
  },
  /** Real Reviews `1015:20920`: the expanded card moves on every 0.8 s. */
  reviews: {
    auto: { delay: 0.8, ease: "EASE_IN_AND_OUT", duration: 0.3 } satisfies Step,
    click: { ease: "EASE_IN_AND_OUT", duration: 0.3 } satisfies FigmaTransition,
  },
  /** Trust Built on Real Reviews `1028:23286`: 11 variants, one step each, looping. */
  typewriter: { delay: 0.8, ease: "EASE_IN_AND_OUT", duration: 0.3 } satisfies Step,
  /** Hover transitions. */
  hover: {
    /** Store badge `942:20435`. */
    storeBadge: { ease: "SLOW", duration: 1.25 } satisfies FigmaTransition,
    /** Email card `998:20792`, Click here `996:20962`. */
    card: { ease: "EASE_OUT", duration: 0.3 } satisfies FigmaTransition,
  },
  /** menu `1038:26925`: the phone menu opens and closes. */
  menu: { ease: "EASE_IN_AND_OUT", duration: 0.3 } satisfies FigmaTransition,
} as const;
