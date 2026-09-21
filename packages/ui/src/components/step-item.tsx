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
 * step is 156 tall, and 0.2 s after it opens the `business-startup 1` rocket (86 px)
 * slides from (−57, 113) to (0, 70) with a 0.417 s `SLOW` spring, fading in — the
 * `Action` variant has no image fill.
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
    <div data-flip-id={buttonId} className={cn("relative w-full", expanded && "pb-14", className)}>
      <button
        type="button"
        id={buttonId}
        aria-expanded={expanded}
        onClick={onExpand}
        className={cn(
          "flex min-h-25 items-center overflow-hidden rounded-card border border-secondary-500 bg-surface-field py-3 text-start text-bg tablet:gap-3 tablet:px-6",
          // Figma 963:20033: the expanded step fills the column, a collapsed one is
          // a pill the width of its number. Phone (`1041:27796`): the open step has
          // 12 px padding and a 4 px gap, a collapsed one keeps 24 px; the open step
          // is followed by Figma's empty 86 px `business-startup 1` slot (156 px tall).
          expanded ? "w-max min-w-full gap-1 px-3 tablet:w-full" : "w-auto px-6",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        )}
      >
        <span className="w-5.25 shrink-0 text-center text-24 font-medium tablet:text-42">
          {index}
        </span>
        <span
          id={panelId}
          hidden={!expanded}
          data-step-open={expanded ? "" : undefined}
          className="flex flex-col gap-3"
        >
          <span className="text-20 font-semibold tablet:text-24">{title}</span>
          <span
            className={
              compactDescription
                ? "text-14 font-regular"
                : "text-14 font-regular whitespace-nowrap tablet:text-16 tablet:whitespace-normal"
            }
          >
            {description}
          </span>
        </span>
      </button>
      {expanded && rocket ? (
        <span
          data-rocket=""
          aria-hidden="true"
          className="pointer-events-none absolute start-0 top-17.5 size-21.5"
        >
          {rocket}
        </span>
      ) : null}
    </div>
  );
}
