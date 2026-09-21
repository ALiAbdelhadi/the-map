"use client";

import { type ReactNode, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { Flip, gsap, useGSAP } from "../motion/gsap";
import { prototype } from "../motion/tokens";
import { useAfterDelay } from "../motion/use-after-delay";
import { StepItem } from "./step-item";

/**
 * "Get the App Now" stepper.
 *
 * Figma `Get the App section` `963:20033` — variants `1`, `2`, `3`: exactly one
 * step is expanded at a time, column gap 29.
 *
 * Motion: 1 → 2 → 3 each after 0.8 s with a 1.022 s `GENTLE` spring, 3 → 1 after
 * 0.4 s with a 0.248 s `QUICK` spring; a click opens that step with `GENTLE`. Smart
 * Animate resizes the pills and slides the others, which is a Flip here.
 */
export type AppStepperStep = {
  title: string;
  description: string;
  /** Figma sets step 3's body at 14 px rather than 16 px. */
  compactDescription?: boolean;
};

export type AppStepperProps = {
  steps: AppStepperStep[];
  /** 1-based index of the step open on first render. Figma's default is step 1. */
  defaultStep?: number;
  /** Accessible name for the group, supplied by the page. */
  label: string;
  /** Rocket artwork under the open step (`business-startup 1`). */
  rocket?: ReactNode;
  className?: string;
};

export function AppStepper({ steps, defaultStep = 1, label, rocket, className }: AppStepperProps) {
  const [openStep, setOpenStep] = useState(defaultStep);
  const ref = useRef<HTMLDivElement>(null);
  // How long the current step took to arrive — Figma starts the timer after it.
  const [arrival, setArrival] = useState(0);
  const layout = useRef<{ state: Flip.FlipState; back: boolean } | null>(null);

  const open = (step: number, back = false) => {
    if (ref.current) {
      layout.current = {
        state: Flip.getState(ref.current.querySelectorAll("[data-flip-id]")),
        back,
      };
    }
    setArrival(back ? prototype.stepper.back.duration : prototype.stepper.auto.duration);
    setOpenStep(step);
  };

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const saved = layout.current;
      layout.current = null;
      if (reduce) return;
      if (saved) {
        Flip.from(saved.state, {
          targets: ref.current?.querySelectorAll("[data-flip-id]") ?? [],
          ...figmaTween(saved.back ? prototype.stepper.back : prototype.stepper.auto),
        });
      }
      const flip = document.documentElement.dir === "rtl" ? -1 : 1;
      gsap.fromTo(
        "[data-rocket]",
        { x: -57 * flip, y: 43, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          delay: prototype.stepper.rocket.delay,
          ...figmaTween(prototype.stepper.rocket),
        },
      );
    },
    { scope: ref, dependencies: [openStep] },
  );

  const last = openStep === steps.length;
  useAfterDelay(ref, {
    key: openStep,
    wait: arrival + (last ? prototype.stepper.back.delay : prototype.stepper.auto.delay),
    onFire: () => {
      if (last) open(1, true);
      else open(openStep + 1);
    },
  });

  return (
    <div
      ref={ref}
      className={cn("flex w-full flex-col gap-7.25", className)}
      role="group"
      aria-label={label}
    >
      {steps.map((step, index) => {
        const number = index + 1;
        return (
          <StepItem
            key={step.title}
            index={number}
            title={step.title}
            description={step.description}
            compactDescription={step.compactDescription ?? false}
            {...(rocket ? { rocket } : {})}
            expanded={openStep === number}
            onExpand={() => {
              open(number);
            }}
            buttonId={`step-${number}-button`}
            panelId={`step-${number}-panel`}
          />
        );
      })}
    </div>
  );
}
