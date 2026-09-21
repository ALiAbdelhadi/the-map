import { cn } from "../lib/cn";

/**
 * One step of the "Get the App Now" stepper.
 *
 * Figma `Choose Your Store` — number `950:20375`, Action `950:20360`.
 * 433x100, fill rgb(5 35 76 / .5), 1 px Secondary/500 border, radius 32,
 * px 24, py 12. Collapsed shows the number only (42 px medium); expanded adds a
 * 352 px column with a 24 px semibold title and a 16 px body (14 px on step 3).
 */
export type StepItemProps = {
  index: number;
  title: string;
  description: string;
  expanded: boolean;
  onExpand: () => void;
  /** Figma renders step 3's body at 14 px rather than 16 px. */
  compactDescription?: boolean;
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
  panelId,
  buttonId,
  className,
}: StepItemProps) {
  return (
    <div className={cn("w-full", className)}>
      <button
        type="button"
        id={buttonId}
        aria-expanded={expanded}
        onClick={onExpand}
        className={cn(
          "flex min-h-25 items-center gap-3 overflow-hidden rounded-card border border-secondary-500 bg-surface-field px-6 py-3 text-start text-bg",
          // Figma 963:20033: the expanded step fills the column, a collapsed one is
          // a pill the width of its number.
          expanded ? "w-full" : "w-auto",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        )}
      >
        <span className="w-5.25 shrink-0 text-center text-42 font-medium">{index}</span>
        <span id={panelId} hidden={!expanded} className="flex flex-col gap-3">
          <span className="text-24 font-semibold">{title}</span>
          <span className={compactDescription ? "text-14 font-regular" : "text-16 font-regular"}>
            {description}
          </span>
        </span>
      </button>
    </div>
  );
}
