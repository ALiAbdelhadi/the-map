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
 * - select: 4 px primary/500 border, radius 56, chip primary/400, label Natural/BG
 */
export type FeatureItemProps = {
  children: ReactNode;
  /** 32x32 icon. */
  icon: ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  id?: string;
  controls?: string;
  className?: string;
};

export function FeatureItem({
  children,
  icon,
  selected = false,
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
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      className={cn(
        "group flex items-center gap-6 rounded-row px-5 py-1 text-24 font-regular text-bg tablet:text-32 desktop:text-40",
        "hover:bg-gradient-to-r hover:from-primary-500 hover:to-white hover:text-secondary-500",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg",
        selected && "border-4 border-primary-500",
        className,
      )}
    >
      <IconBadge className="group-hover:bg-primary-600">{icon}</IconBadge>
      {children}
    </button>
  );
}
