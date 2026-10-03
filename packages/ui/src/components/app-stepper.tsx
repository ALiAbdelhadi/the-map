"use client";

import { type ReactNode, useCallback, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { measureSizes, morphSizes, type Sizes } from "../motion/size-morph";
import { prototype, STEPPER_AUTOPLAY_SECONDS } from "../motion/tokens";
import { useAutoplay } from "../motion/use-autoplay";
import { StepItem } from "./step-item";

export type AppStepperStep = {
  title: string;
  description: string;
  compactDescription?: boolean;
};

export type AppStepperProps = {
  steps: AppStepperStep[];
  defaultStep?: number;
  label: string;
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
      const settle = "opacity,visibility,transform";
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
