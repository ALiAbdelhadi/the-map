"use client";

import { useRef, useState } from "react";

import { cn } from "../lib/cn";
import { type FigmaTransition, figmaTween } from "../motion/figma-easing";
import { gsap, useGSAP } from "../motion/gsap";

export type GradientStop = [position: number, color: string];
export type GradientState = [GradientStop, GradientStop] | null;

export type GradientBorderProps = {
  states: [GradientState, GradientState];
  mode: "hover";
  steps: [FigmaTransition, FigmaTransition];
  width: string;
  className?: string;
};

function resolve(color: string): string {
  const token = /^var\((--[^)]+)\)$/.exec(color)?.[1];
  return token ? getComputedStyle(document.documentElement).getPropertyValue(token).trim() : color;
}

function vars(state: GradientState) {
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

export function GradientBorder({ states, steps, width, className }: GradientBorderProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<0 | 1>(0);
  const drawn = useRef<0 | 1 | null>(null);

  useGSAP(
    () => {
      const ring = ref.current;
      if (!ring) return;
      const target = states[state];
      if (drawn.current === null || drawn.current === state) {
        drawn.current = state;
        gsap.set(ring, target ? vars(target) : { ...vars(states[1]), "--gb-o": 0 });
        return;
      }
      drawn.current = state;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const timing = reduce ? { duration: 0 } : figmaTween(steps[state === 1 ? 0 : 1]);
      if (!target) {
        gsap.to(ring, { "--gb-o": 0, ...timing, overwrite: "auto" });
        return;
      }
      if (!states[state === 1 ? 0 : 1]) gsap.set(ring, vars(target));
      gsap.to(ring, { ...vars(target), ...timing, overwrite: "auto" });
    },
    { scope: ref, dependencies: [state] },
  );

  useGSAP(
    () => {
      const parent = ref.current?.parentElement;
      if (!parent) return;
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
