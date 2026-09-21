/**
 * Motion values.
 *
 * The Figma file specifies no durations, easings or delays anywhere
 * (`get_motion_context` returns no keyframes — docs/figma-gaps.md M1). Its motion
 * evidence is structural: variant sets that step from one state to the next. These
 * values are therefore **proposed defaults, not Figma values**, kept in one place so
 * they can be tuned without touching any component.
 */
export const motion = {
  /** Section and element reveals on scroll. */
  reveal: { duration: 0.6, ease: "power2.out", distance: 24, stagger: 0.12 },
  /** Content swapping inside an interactive component (stepper, reviews, tabs). */
  swap: { duration: 0.35, ease: "power2.out", distance: 8 },
  /** Typewriter heading — one step per character (per word for Arabic). */
  typewriter: { stepDuration: 0.06, ease: "none" },
  /** Where a scroll reveal starts: when the element's top passes 80 % of the viewport. */
  triggerStart: "top 80%",
} as const;
