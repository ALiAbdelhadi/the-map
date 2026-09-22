"use client";

import { type ReactNode, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { measureSizes, morphSizes, type Sizes } from "../motion/size-morph";
import { prototype } from "../motion/tokens";
import { StepItem } from "./step-item";

/**
 * "Get the App Now" stepper.
 *
 * Figma `Get the App section` `963:20033` — variants `1`, `2`, `3`: exactly one
 * step is expanded at a time, column gap 29.
 *
 * Motion, rebuilt 2026-09-22: a click opens that step. The real sizes animate —
 * the opening pill widens (uncovering its text), the closing one narrows, and each
 * step's height eases between 100 and 156 so the steps below glide rather than jump
 * (0.5 s strong ease-in-out; no scaling, so text never squashes). The new text
 * settles in as the pill finishes, then the rocket flies in under its corner.
 * Nothing advances by itself.
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
  const before = useRef<{ sizes: Sizes; from: number } | null>(null);

  const open = (step: number) => {
    if (step === openStep || !ref.current) return;
    before.current = {
      sizes: measureSizes(ref.current.querySelectorAll("[data-step], [data-step-button]")),
      from: openStep,
    };
    setOpenStep(step);
  };

  useGSAP(
    () => {
      const root = ref.current;
      const saved = before.current;
      before.current = null;
      if (!root || !saved || !window.matchMedia(MOTION_OK).matches) return;

      const move = figmaTween(prototype.stepper.click);
      morphSizes(saved.sizes, move);

      const step = (n: number) => root.querySelectorAll("[data-step]")[n - 1];
      const opened = step(openStep);
      const closed = step(saved.from);
      // The closing step's text and rocket leave at once, before its pill narrows.
      gsap.fromTo(
        closed?.querySelector("[data-step-panel]") ?? [],
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.12, ease: "none" },
      );
      gsap.fromTo(
        closed?.querySelector("[data-rocket]") ?? [],
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.15, ease: "none" },
      );
      gsap.fromTo(
        opened?.querySelector("[data-step-panel]") ?? [],
        { autoAlpha: 0, x: -8 },
        { autoAlpha: 1, x: 0, ...figmaTween(prototype.hover.border), delay: move.duration * 0.4 },
      );
      const flip = document.documentElement.dir === "rtl" ? -1 : 1;
      gsap.fromTo(
        opened?.querySelector("[data-rocket]") ?? [],
        { autoAlpha: 0, x: -20 * flip, y: 20, rotate: -12 * flip },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotate: 0,
          ...figmaTween(prototype.stepper.rocket),
          delay: move.duration * 0.8,
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
