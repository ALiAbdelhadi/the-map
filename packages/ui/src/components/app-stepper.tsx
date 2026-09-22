"use client";

import { type ReactNode, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { Flip, gsap, useGSAP } from "../motion/gsap";
import { prototype } from "../motion/tokens";
import { StepItem } from "./step-item";

/**
 * "Get the App Now" stepper.
 *
 * Figma `Get the App section` `963:20033` — variants `1`, `2`, `3`: exactly one
 * step is expanded at a time, column gap 29.
 *
 * Motion: a click opens that step — the pills resize and the others slide (a Flip,
 * 0.5 s strong ease-in-out) and the rocket slides in under it. Nothing advances by
 * itself (approved 2026-09-22).
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
  const layout = useRef<Flip.FlipState | null>(null);

  const open = (step: number) => {
    if (step === openStep) return;
    if (ref.current) layout.current = Flip.getState(ref.current.querySelectorAll("[data-flip-id]"));
    setOpenStep(step);
  };

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const saved = layout.current;
      layout.current = null;
      if (reduce || !saved) return;
      Flip.from(saved, {
        targets: ref.current?.querySelectorAll("[data-flip-id]") ?? [],
        ...figmaTween(prototype.stepper.click),
      });
      // The opened step's text settles in as the pill finishes growing.
      gsap.fromTo(
        "[data-step-open]",
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, ...figmaTween(prototype.hover.border), delay: 0.2 },
      );
      const flip = document.documentElement.dir === "rtl" ? -1 : 1;
      gsap.fromTo(
        "[data-rocket]",
        { x: -24 * flip, y: 16, scale: 0.9, opacity: 0 },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          delay: prototype.stepper.rocket.delay,
          ...figmaTween(prototype.stepper.rocket),
        },
      );
    },
    { scope: ref, dependencies: [openStep] },
  );

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
