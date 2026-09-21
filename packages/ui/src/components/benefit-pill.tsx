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
        "relative flex items-center overflow-hidden rounded-pill bg-surface-glass-strong px-8.5 py-4.5 text-bg",
        className,
      )}
    >
      {/*
        Figma `Gradient Service provider` stroke: 2 px primary/500 → green/600, which
        flips end for end every 0.8 s (`995:20700`, 0.3 s ease-in-out). It is drawn
        inside the padding (+2 px) because the pill clips its content.
      */}
      <GradientBorder
        mode="loop"
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
        steps={[prototype.provider.pill, prototype.provider.pill]}
      />
      <div className="flex flex-col items-start gap-2.25">
        <div className="flex w-full items-center gap-3 rounded-row pe-5 py-1">
          <IconBadge iconSize={22}>{icon}</IconBadge>
          <p className="text-16 font-regular whitespace-nowrap tablet:text-24 tablet:font-medium">
            {title}
          </p>
        </div>
        <p className="text-14 font-regular whitespace-nowrap tablet:text-20">{description}</p>
      </div>
    </div>
  );
}
