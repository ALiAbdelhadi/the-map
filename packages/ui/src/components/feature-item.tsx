import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { IconBadge } from "./icon-badge";

/**
 * Why Choose Us feature row.
 *
 * Figma `Why Choose features` — Defult `911:19599`, hover `911:19598`,
 * Select `911:19597`. gap 24, px 20, py 4, label 40 px regular.
 * - default: no background, chip primary/400, label Natural/BG
 * - hover: gradient primary/500 -> white, chip primary/600, label Secondary/500, radius 56
 * - select: 4 px primary/500 → white gradient stroke, radius 56, chip primary/400,
 *   label Natural/BG. The stroke sits inside the row, so selecting never moves it.
 */
export type FeatureItemProps = {
  children: ReactNode;
  /** 32x32 icon. */
  icon: ReactNode;
  selected?: boolean;
  /** In the tab order — the selected row, or the first when none is selected. */
  focusable?: boolean;
  onSelect?: () => void;
  id?: string;
  controls?: string;
  className?: string;
};

export function FeatureItem({
  children,
  icon,
  selected = false,
  focusable = selected,
  onSelect,
  id,
  controls,
  className,
}: FeatureItemProps) {
  return (
    <button
      type="button"
      id={id}
      role="tab"
      aria-selected={selected}
      aria-controls={controls}
      tabIndex={focusable ? 0 : -1}
      onClick={onSelect}
      className={cn(
        "group relative flex items-center gap-6 rounded-row border-4 border-transparent px-5 py-1 text-24 font-regular text-bg tablet:text-32 desktop:text-40",
        "hover:bg-gradient-to-r hover:from-primary-500 hover:to-white hover:text-secondary-500",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg",
        className,
      )}
    >
      {selected ? (
        <span
          aria-hidden="true"
          data-selected-ring=""
          className="pointer-events-none absolute inset-0 -m-1 rounded-[inherit] bg-gradient-to-r from-primary-500 to-white p-1 [mask:linear-gradient(black,black)_content-box_exclude,linear-gradient(black,black)]"
        />
      ) : null}
      <IconBadge className="group-hover:bg-primary-600">{icon}</IconBadge>
      {children}
    </button>
  );
}
