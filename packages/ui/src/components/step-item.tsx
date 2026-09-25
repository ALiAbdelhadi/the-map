import type { ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * One step of the "Get the App Now" stepper.
 *
 * Figma `Choose Your Store` — number `950:20375`, Action `950:20360`.
 * 433x100, fill rgb(5 35 76 / .5), 1 px Secondary/500 border, radius 32,
 * px 24, py 12. Collapsed shows the number only (42 px medium); expanded adds a
 * 352 px column with a 24 px semibold title and a 16 px body (14 px on step 3).
 *
 * The open step is Figma's `Action` → `3D` pair (`950:20376` → `950:20404`): the
 * step is 156 tall and the `business-startup 1` rocket (86 px) sits under the pill's
 * start corner. Rebuilt 2026-09-22: the text is always laid out, so opening a step
 * reveals it as the pill widens instead of popping it in, and the rocket is placed
 * so it only touches the pill's corner, never its text. The stepper animates the
 * sizes (see AppStepper).
 */
export type StepItemProps = {
  index: number;
  title: string;
  description: string;
  expanded: boolean;
  onExpand: () => void;
  /** Figma renders step 3's body at 14 px rather than 16 px. */
  compactDescription?: boolean;
  /** The rocket shown under the open step. */
  rocket?: ReactNode;
  panelId: string;
  buttonId: string;
  className?: string;
};

export function StepItem({
  index,
  title,
  description,
  expanded,
  onExpand,
  compactDescription = false,
  rocket,
  panelId,
  buttonId,
  className,
}: StepItemProps) {
  return (
    <div data-step="" className={cn("relative w-full", expanded && "pb-14", className)}>
      <button
        type="button"
        id={buttonId}
        data-step-button=""
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onExpand}
        className={cn(
          "relative flex min-h-25 items-center overflow-hidden rounded-card border border-secondary-500 bg-surface-field py-3 text-start text-bg tablet:gap-3 tablet:px-6",
          // Figma 963:20033: the expanded step fills the column, a collapsed one is
          // a pill the width of its number. Phone (`1041:27796`): the open step has
          // 12 px padding and a 4 px gap, a collapsed one keeps 24 px; the open step
          // is followed by Figma's 86 px `business-startup 1` slot (156 px tall).
          expanded ? "w-full gap-1 px-3" : "w-auto px-6",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        )}
      >
        <span className="w-5.25 shrink-0 text-center text-24 font-medium tablet:text-42">
          {index}
        </span>
        {/*
          Always rendered: out of flow while collapsed (so the pill hugs its number),
          in flow when open — the growing pill then uncovers it.
        */}
        {/*
          The body is one line, as drawn, whenever the stepper is at least the phone
          frame's 344 px column; only a narrower stepper (phones under 375) wraps it.
        */}
        <span
          id={panelId}
          data-step-panel=""
          aria-hidden={!expanded}
          className={cn(
            "flex flex-col gap-3",
            expanded ? "" : "pointer-events-none invisible absolute start-full opacity-0",
          )}
        >
          <span className="text-20 font-semibold tablet:text-24">{title}</span>
          <span
            className={
              compactDescription
                ? "text-14 font-regular"
                : "text-14 font-regular @mobile:whitespace-nowrap tablet:text-16"
            }
          >
            {description}
          </span>
        </span>
      </button>
      {rocket ? (
        <span
          data-rocket=""
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute start-1 top-23 size-21.5",
            expanded ? "" : "invisible opacity-0",
          )}
        >
          {rocket}
        </span>
      ) : null}
    </div>
  );
}
