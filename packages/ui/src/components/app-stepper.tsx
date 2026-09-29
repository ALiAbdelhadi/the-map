"use client";

import { type ReactNode, useCallback, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { measureSizes, morphSizes, type Sizes } from "../motion/size-morph";
import { prototype, STEPPER_AUTOPLAY_SECONDS } from "../motion/tokens";
import { useAutoplay } from "../motion/use-autoplay";
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
 *
 * Autoplay, owner-approved 2026-09-26: every STEPPER_AUTOPLAY_SECONDS (10 s) the
 * next step opens (1 → 2 → 3 → 1) through the same path a click takes, and a thin
 * line along the bottom of the open pill fills linearly over that time. Every
 * change — its own or the visitor's click — starts the count again from zero. The
 * count freezes, and resumes where it stopped, while a mouse is over the stepper,
 * keyboard focus (`:focus-visible`) is inside it, the tab is hidden, or less than
 * half of it is in view. A mouse click's focus does not pause it: hover already
 * covers that, and leaving it would stop autoplay for good after one click. Under
 * reduced motion there is no autoplay and no line. Automatic changes are not
 * announced (no live region); the buttons keep their `aria-expanded`.
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

  const open = useCallback(
    (step: number) => {
      if (step === openStep || !ref.current) return;
      before.current = {
        sizes: measureSizes(ref.current.querySelectorAll("[data-step], [data-step-button]")),
        from: openStep,
      };
      setOpenStep(step);
    },
    [openStep],
  );

  // Autoplay (see the header comment). The open step's progress line is the timer.
  useAutoplay(ref, {
    step: openStep,
    seconds: STEPPER_AUTOPLAY_SECONDS,
    fill: (root) =>
      root
        .querySelectorAll("[data-step]")
        [openStep - 1]?.querySelector("[data-step-progress-fill]"),
    busy: (root) =>
      gsap
        .getTweensOf(root.querySelectorAll("[data-step], [data-step-button], [data-rocket]"))
        .some((tween) => tween.isActive()),
    next: () => {
      open((openStep % steps.length) + 1);
    },
  });

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
      // Every tween below overwrites (`true`) whatever is still queued on its element:
      // on a fast second click the previous step's delayed fade-in would otherwise
      // start after its step had closed, leaving two panels and two rockets visible.
      // The closing fades are `to` (not fromTo from 1) so a half-faded panel leaves
      // from where it stands, and each tween clears its inline styles at the end so
      // the step's own classes decide visibility again.
      const settle = "opacity,visibility,transform";
      // The closing step's text and rocket leave at once, before its pill narrows.
      gsap.to(closed?.querySelector("[data-step-panel]") ?? [], {
        autoAlpha: 0,
        duration: 0.12,
        ease: "none",
        overwrite: true,
        clearProps: settle,
      });
      gsap.to(closed?.querySelector("[data-rocket]") ?? [], {
        autoAlpha: 0,
        duration: 0.15,
        ease: "none",
        overwrite: true,
        clearProps: settle,
      });
      gsap.fromTo(
        opened?.querySelector("[data-step-panel]") ?? [],
        { autoAlpha: 0, x: -8 },
        {
          autoAlpha: 1,
          x: 0,
          ...figmaTween(prototype.hover.border),
          delay: move.duration * 0.4,
          overwrite: true,
          clearProps: settle,
        },
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
          overwrite: true,
          clearProps: settle,
        },
      );
    },
    { scope: ref, dependencies: [openStep] },
  );

  return (
    <div
      ref={ref}
      className={cn("@container flex w-full flex-col gap-7.25", className)}
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
