/**
 * Figma prototype easings, as GSAP eases.
 *
 * Figma stores an easing *type* on each prototype transition (read with the Plugin
 * API, `reaction.actions[].transition.easing.type`). It does not publish the numbers
 * behind its presets, so they are recorded here with where each one comes from:
 *
 * - `EASE_OUT`, `EASE_IN_AND_OUT`: the CSS keyword curves of the same names
 *   (`ease-out` = cubic-bezier(0, 0, 0.58, 1), `ease-in-out` = (0.42, 0, 0.58, 1)).
 * - `EASE_IN_AND_OUT_BACK`: (0.7, -0.4, 0.4, 1.4) — the curve Figma's editor draws
 *   for that preset; not published as numbers (docs/figma-gaps.md M6).
 * - `GENTLE`, `QUICK`, `SLOW`: damped springs (mass, stiffness, damping) of
 *   (1, 100, 15), (1, 300, 20) and (1, 80, 20). Figma does not publish these; they
 *   are the values that reproduce the settle times Figma stores on this file's
 *   transitions — SLOW settles in exactly 1.25 s, QUICK ≈ 0.72 s against 0.744 s,
 *   GENTLE ≈ 0.98 s against 1.022 s (gap M6).
 *
 * A spring is turned into a CustomEase path by sampling its step response up to the
 * moment it settles, so the tween's duration is Figma's stored duration and the
 * curve keeps the spring's shape (including overshoot).
 */
import { CustomEase } from "gsap/CustomEase";

type Spring = { mass: number; stiffness: number; damping: number };

const SPRINGS = {
  GENTLE: { mass: 1, stiffness: 100, damping: 15 },
  QUICK: { mass: 1, stiffness: 300, damping: 20 },
  SLOW: { mass: 1, stiffness: 80, damping: 20 },
} satisfies Record<string, Spring>;

const BEZIERS = {
  EASE_OUT: "0,0,0.58,1",
  EASE_IN_AND_OUT: "0.42,0,0.58,1",
  EASE_IN_AND_OUT_BACK: "0.7,-0.4,0.4,1.4",
} as const;

export type FigmaEasing = keyof typeof SPRINGS | keyof typeof BEZIERS;

/** Position of a spring released from 0 towards 1 at rest, after `t` seconds. */
function springAt({ mass, stiffness, damping }: Spring, t: number): number {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    const envelope = Math.exp(-zeta * w0 * t);
    return 1 - envelope * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
  }
  if (zeta === 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  const root = w0 * Math.sqrt(zeta * zeta - 1);
  const r1 = -zeta * w0 + root;
  const r2 = -zeta * w0 - root;
  const a = r2 / (r2 - r1);
  const b = -r1 / (r2 - r1);
  return 1 - (a * Math.exp(r1 * t) + b * Math.exp(r2 * t));
}

/** Time after which the spring stays within 0.1 % of rest. */
function settleTime(spring: Spring): number {
  const step = 1 / 1000;
  let last = 0;
  for (let t = 0; t < 10; t += step) {
    if (Math.abs(1 - springAt(spring, t)) > 0.001) last = t;
  }
  return last;
}

function springPath(spring: Spring, samples = 96): string {
  const end = settleTime(spring);
  const points: string[] = [];
  for (let i = 1; i <= samples; i += 1) {
    const p = i / samples;
    const y = i === samples ? 1 : springAt(spring, p * end);
    points.push(`L${p.toFixed(4)},${y.toFixed(4)}`);
  }
  return `M0,0 ${points.join(" ")}`;
}

let registered = false;

/** Registers the Figma eases once; call before the first tween that uses them. */
export function registerFigmaEases() {
  if (registered) return;
  registered = true;
  for (const [name, spring] of Object.entries(SPRINGS)) {
    CustomEase.create(`figma-${name}`, springPath(spring));
  }
  for (const [name, bezier] of Object.entries(BEZIERS)) {
    CustomEase.create(`figma-${name}`, bezier);
  }
}

/** GSAP ease name for a Figma easing type. */
export function figmaEase(type: FigmaEasing): string {
  registerFigmaEases();
  return `figma-${type}`;
}

/** A Figma transition: its easing type and the duration Figma stores, in seconds. */
export type FigmaTransition = { ease: FigmaEasing; duration: number };

/** Tween vars for a Figma transition. */
export function figmaTween({ ease, duration }: FigmaTransition) {
  return { ease: figmaEase(ease), duration };
}
