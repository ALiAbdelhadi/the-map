"use client";

/**
 * The single place GSAP plugins are registered.
 *
 * Client-only: every animated component imports gsap from here, so registration
 * happens once and never on the server. Importing this module touches no browser
 * globals — GSAP and ScrollTrigger defer `window` access until they run.
 */
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, CustomEase, Flip, ScrollToPlugin, ScrollTrigger, SplitText);

export { Flip, gsap, ScrollToPlugin, ScrollTrigger, SplitText, useGSAP };

/*
 * Background tabs: GSAP's ticker runs on requestAnimationFrame, which stops while a
 * tab is hidden, and the default lagSmoothing (500 ms, 33 ms) is kept on purpose — a
 * tween that was running when the tab went away resumes where it stood and still lands
 * on its end values, and delayed calls do not all fire at once on return. Components
 * with timers (hero 20 s, stepper 10 s) pause them on `visibilitychange` themselves.
 */

/** Animate only when the user has not asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** The reduced-motion query, for `gsap.matchMedia` branches that set end states. */
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** True when the visitor asked for reduced motion (client only). */
export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION).matches;
}
