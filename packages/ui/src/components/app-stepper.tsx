"use client";

import { useRef, useState } from "react";

import { cn } from "../lib/cn";
import { useSwapIn } from "../motion/use-swap-in";
import { StepItem } from "./step-item";

/**
 * "Get the App Now" stepper.
 *
 * Figma `Get the App section` `963:20033` — variants `1`, `2`, `3`: exactly one
 * step is expanded at a time, column gap 29.
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
  className?: string;
};

export function AppStepper({ steps, defaultStep = 1, label, className }: AppStepperProps) {
  const [openStep, setOpenStep] = useState(defaultStep);
  const ref = useRef<HTMLDivElement>(null);
  useSwapIn(ref, "[data-step-open]", openStep);

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
            expanded={openStep === number}
            onExpand={() => {
              setOpenStep(number);
            }}
            buttonId={`step-${number}-button`}
            panelId={`step-${number}-panel`}
          />
        );
      })}
    </div>
  );
}
