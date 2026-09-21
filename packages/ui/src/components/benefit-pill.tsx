import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { IconBadge } from "./icon-badge";

/**
 * "Why join as a service provider" benefit pill.
 *
 * Figma `Service provider Cart` `995:20699`: fill rgb(5 35 76 / .8), 2 px
 * primary/500 border, px 32, py 16, radius 114, inner gap 9, row gap 12,
 * chip 32 with a 22 px icon, title 24 px medium, body 20 px regular.
 * Phone (`1041:29327`): 313 wide, title 16 px regular, body 14 px.
 */
export type BenefitPillProps = {
  title: string;
  description: string;
  /** 22x22 icon. */
  icon: ReactNode;
  className?: string;
};

export function BenefitPill({ title, description, icon, className }: BenefitPillProps) {
  return (
    <div
      className={cn(
        "flex items-center overflow-hidden rounded-pill border-2 border-primary-500 bg-surface-glass-strong px-8 py-4 text-bg",
        className,
      )}
    >
      <div className="flex flex-col items-start gap-2.25">
        <div className="flex w-full items-center gap-3 rounded-row pe-5 py-1">
          <IconBadge iconSize={22}>{icon}</IconBadge>
          <p className="text-16 font-regular whitespace-nowrap tablet:text-24 tablet:font-medium tablet:whitespace-normal">
            {title}
          </p>
        </div>
        <p className="text-14 font-regular whitespace-nowrap tablet:text-20 tablet:whitespace-normal">
          {description}
        </p>
      </div>
    </div>
  );
}
