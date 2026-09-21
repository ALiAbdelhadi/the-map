"use client";

import { useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, useGSAP } from "../motion/gsap";
import { prototype } from "../motion/tokens";
import { useAfterDelay } from "../motion/use-after-delay";

/**
 * Heading that types itself, looping.
 *
 * Figma `Trust Built on Real Reviews` (`1028:23286`) and its Arabic twin
 * (`1015:21041`) are 11-variant sets. Each variant is one step longer and advances
 * after 0.8 s with a 0.3 s ease-in-out Smart Animate; the last returns to the first.
 * Smart Animate cross-fades a text layer whose content changes, so the outgoing and
 * incoming text are stacked in one cell and faded against each other. The heading is
 * centred and auto-width, so each state is centred on its own width, and the
 * gradient spans the text as far as it has been typed.
 *
 * `steps` are the variants verbatim — Arabic grows by whole letter groups, exactly
 * as Figma spells it, so letters stay joined. The full heading is the accessible
 * name throughout. Before JavaScript runs, and under reduced motion, the heading is
 * shown complete.
 */
export type TypewriterHeadingProps = {
  children: string;
  /** Figma's variants, shortest first; the last is normally the full heading. */
  steps: string[];
  className?: string;
  /** Classes for the typed text itself — where the gradient goes. */
  textClassName?: string;
};

export function TypewriterHeading({
  children,
  steps,
  className,
  textClassName,
}: TypewriterHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  // null until the client takes over: the server renders the whole heading.
  const [step, setStep] = useState<number | null>(null);
  const [outgoing, setOutgoing] = useState<string | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setStep(0);
    },
    { scope: ref },
  );

  useGSAP(
    () => {
      if (outgoing === null) return;
      const tween = figmaTween(prototype.typewriter);
      gsap.fromTo("[data-typed-in]", { opacity: 0 }, { opacity: 1, ...tween });
      gsap.fromTo("[data-typed-out]", { opacity: 1 }, { opacity: 0, ...tween });
    },
    { scope: ref, dependencies: [step] },
  );

  useAfterDelay(ref, {
    key: step,
    wait: prototype.typewriter.duration + prototype.typewriter.delay,
    enabled: step !== null,
    onFire: () => {
      if (step === null) return;
      setOutgoing(steps[step] ?? null);
      setStep((step + 1) % steps.length);
    },
  });

  const shown = step === null ? children : (steps[step] ?? children);
  const layer = cn("col-start-1 row-start-1 justify-self-center whitespace-nowrap", textClassName);

  return (
    <h2 ref={ref} aria-label={children} className={cn("grid", className)}>
      {outgoing !== null ? (
        <span key={`out-${String(step)}`} data-typed-out="" aria-hidden="true" className={layer}>
          {outgoing}
        </span>
      ) : null}
      <span key={`in-${String(step)}`} data-typed-in="" aria-hidden="true" className={layer}>
        {shown}
      </span>
    </h2>
  );
}
