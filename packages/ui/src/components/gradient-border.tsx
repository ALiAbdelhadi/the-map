"use client";

import { useRef, useState } from "react";

import { cn } from "../lib/cn";
import { type FigmaTransition, figmaTween } from "../motion/figma-easing";
import { gsap, useGSAP } from "../motion/gsap";
import { useAfterDelay } from "../motion/use-after-delay";

/**
 * A gradient stroke drawn over its parent's border area.
 *
 * Figma strokes several components with a two-stop linear gradient and animates
 * the stops between variants — the `Get the App Now` badge (`936:20234`), the
 * `Service provider Cart` pills (`995:20700`), the search field (`984:20302`) and the
 * email card (`998:20792`). CSS cannot animate a gradient border directly, so this
 * is an overlay: a gradient in a ring cut out with a mask, its two stops held in CSS
 * variables that GSAP tweens. The parent needs `relative` and its own radius; the
 * overlay inherits the radius.
 *
 * `states` are the variants' stops, left to right, as (position 0–1, colour token).
 * - `loop`: state 0 → 1 → 0 … each after its step's delay (Figma "After delay").
 * - `hover`: state 0 at rest, state 1 while the parent is hovered or has focus.
 */
export type GradientStop = [position: number, color: string];
export type GradientState = [GradientStop, GradientStop] | null;

type Step = { delay: number } & FigmaTransition;

export type GradientBorderProps = {
  states: [GradientState, GradientState];
  mode: "loop" | "hover";
  /** loop: [0 → 1, 1 → 0]; hover: [in, out]. */
  steps: [Step, Step] | [FigmaTransition, FigmaTransition];
  /** Border width class, e.g. `p-1` for Figma's 4 px stroke. */
  width: string;
  className?: string;
};

function resolve(color: string): string {
  const token = /^var\((--[^)]+)\)$/.exec(color)?.[1];
  return token ? getComputedStyle(document.documentElement).getPropertyValue(token).trim() : color;
}

function vars(state: GradientState) {
  // No stroke is drawn as a fully transparent ring, so it can fade in.
  if (!state) return { "--gb-o": 0 };
  const [[p1, c1], [p2, c2]] = state;
  return {
    "--gb-o": 1,
    "--gb-p1": p1 * 100,
    "--gb-c1": resolve(c1),
    "--gb-p2": p2 * 100,
    "--gb-c2": resolve(c2),
  };
}

export function GradientBorder({ states, mode, steps, width, className }: GradientBorderProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<0 | 1>(0);
  const first = useRef(true);

  useGSAP(
    () => {
      const ring = ref.current;
      if (!ring) return;
      const target = states[state];
      if (first.current) {
        first.current = false;
        gsap.set(ring, target ? vars(target) : { ...vars(states[1]), "--gb-o": 0 });
        return;
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // The transition into state 1 is step 0; back into state 0 is step 1.
      const timing = reduce ? { duration: 0 } : figmaTween(steps[state === 1 ? 0 : 1]);
      if (!target) {
        gsap.to(ring, { "--gb-o": 0, ...timing });
        return;
      }
      if (!states[state === 1 ? 0 : 1]) gsap.set(ring, vars(target));
      gsap.to(ring, { ...vars(target), ...timing });
    },
    { scope: ref, dependencies: [state] },
  );

  useGSAP(
    () => {
      const parent = ref.current?.parentElement;
      if (mode !== "hover" || !parent) return;
      const on = () => {
        setState(1);
      };
      const off = () => {
        if (!parent.matches(":hover, :focus-within")) setState(0);
      };
      parent.addEventListener("pointerenter", on);
      parent.addEventListener("pointerleave", off);
      parent.addEventListener("focusin", on);
      parent.addEventListener("focusout", off);
      return () => {
        parent.removeEventListener("pointerenter", on);
        parent.removeEventListener("pointerleave", off);
        parent.removeEventListener("focusin", on);
        parent.removeEventListener("focusout", off);
      };
    },
    { scope: ref },
  );

  // Figma starts a state's timer once the state has arrived: wait for the transition
  // that brought it in, then the delay on the way out.
  const incoming = steps[state === 0 ? 1 : 0];
  const outgoing = steps[state === 0 ? 0 : 1];
  useAfterDelay(ref, {
    key: state,
    enabled: mode === "loop",
    wait: incoming.duration + ("delay" in outgoing ? outgoing.delay : 0),
    onFire: () => {
      setState((value) => (value === 0 ? 1 : 0));
    },
  });

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--gb-o,1)]",
        "bg-[linear-gradient(90deg,var(--gb-c1)_calc(var(--gb-p1)*1%),var(--gb-c2)_calc(var(--gb-p2)*1%))]",
        "[mask:linear-gradient(black,black)_content-box_exclude,linear-gradient(black,black)]",
        width,
        className,
      )}
    />
  );
}
