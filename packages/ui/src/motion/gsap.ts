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

/** Animate only when the user has not asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
