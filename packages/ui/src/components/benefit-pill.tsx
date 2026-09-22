import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { prototype } from "../motion/tokens";
import { GradientBorder } from "./gradient-border";
import { IconBadge } from "./icon-badge";

/**
 * "Why join as a service provider" benefit pill.
 *
 * Figma `Service provider Cart` `995:20699`: fill rgb(5 35 76 / .8), 2 px
 * gradient stroke, px 32, py 16, radius 114, inner gap 9, row gap 12,
 * chip 32 with a 22 px icon, title 24 px medium, body 20 px regular.
 * Phone (`1041:29327`) and tablet (`1037:32101`): title 16 px regular, body 14 px.
 */
export type BenefitPillProps = {
  title: string;
  description: string;
  /** 22x22 icon. */
  icon: ReactNode;
  /** The tablet frame pads two of the scattered pills 16 px instead of 32. */
  compact?: boolean;
  className?: string;
};

export function BenefitPill({
  title,
  description,
  icon,
  compact = false,
  className,
}: BenefitPillProps) {
  return (
    <div
      className={cn(
        "relative flex items-center overflow-hidden rounded-pill bg-surface-glass-strong px-8.5 py-4.5 text-bg",
        compact && "tablet:px-4.5 desktop:px-8.5",
        className,
      )}
    >
      {/*
        Figma `Gradient Service provider` stroke: 2 px primary/500 → green/600. On
        hover it flips end for end (`995:20700`'s second variant) and back on leave —
        no longer on a loop (approved 2026-09-22). It is drawn
        inside the padding (+2 px) because the pill clips its content.
      */}
      <GradientBorder
        mode="hover"
        width="p-0.5"
        states={[
          [
            [0, "var(--color-primary-500)"],
            [1, "var(--color-green-600)"],
          ],
          [
            [0, "var(--color-green-600)"],
            [1, "var(--color-primary-500)"],
          ],
        ]}
        steps={[prototype.hover.border, prototype.hover.border]}
      />
      <div className="flex flex-col items-start gap-2.25">
        <div className="flex w-full items-center gap-3 rounded-row pe-5 py-1">
          <IconBadge iconSize={22}>{icon}</IconBadge>
          <p className="text-16 font-regular whitespace-nowrap desktop:text-24 desktop:font-medium">
            {title}
          </p>
        </div>
        <p className="text-14 font-regular whitespace-nowrap desktop:text-20">{description}</p>
      </div>
    </div>
  );
}
