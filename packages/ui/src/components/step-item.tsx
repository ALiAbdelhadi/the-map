import type { ReactNode } from "react";

import { cn } from "../lib/cn";

export type StepItemProps = {
  index: number;
  title: string;
  description: string;
  expanded: boolean;
  onExpand: () => void;
  compactDescription?: boolean;
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
          expanded ? "w-full gap-1 px-3" : "w-auto px-6",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        )}
      >
        <span className="w-5.25 shrink-0 text-center text-24 font-medium tablet:text-42">
          {index}
        </span>
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
        <span
          data-step-progress=""
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-6 bottom-1.5 h-1 overflow-hidden rounded-full bg-bg/25 motion-reduce:hidden",
            expanded ? "" : "hidden",
          )}
        >
          <span data-step-progress-fill="" className="block h-full w-0 rounded-full bg-bg" />
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
