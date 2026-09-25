import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { prototype } from "../motion/tokens";
import { GradientBorder } from "./gradient-border";
import { IconBadge } from "./icon-badge";

/**
 * "Why join as a service provider" benefit pill.
 *
 * Figma `Service provider Cart`: fill rgb(5 35 76 / .8), 2 px gradient stroke drawn
 * inside the box (it does not add to the padding), radius 114, inner gap 9.
 * - `default` — Ready Clients, Full Flexibility, Wider Reach in the section's final
 *   state (`998:20841`), the 768 frame (`1037:32101`) and the phone frame
 *   (`1041:29327`): px 32, py 16; the title row has gap 12, pe 20, py 4 and a 32 px
 *   chip holding a 22 px icon; title 16 px regular, body 14 px.
 * - `compact` — Increase Your Income and Simple & Organized System in the same frames
 *   (`997:21637`, `997:21619`): padding 16, title row gap 8, a 24 px chip holding a
 *   16 px icon, same 16 / 14 px text.
 * - `stage` — the 1440 build-up (`995:20699`): px 32, py 16, 32 px chip, title 24 px
 *   medium, body 20 px.
 */
export type BenefitPillProps = {
  title: string;
  description: string;
  /** The pill's icon; the chip sizes it. */
  icon: ReactNode;
  variant?: "default" | "compact" | "stage";
  className?: string;
};

export function BenefitPill({
  title,
  description,
  icon,
  variant = "default",
  className,
}: BenefitPillProps) {
  const compact = variant === "compact";
  const stage = variant === "stage";
  return (
    <div
      className={cn(
        "relative flex items-center overflow-hidden rounded-pill bg-surface-glass-strong text-bg",
        compact ? "p-4" : "px-8 py-4",
        className,
      )}
    >
      {/*
        Figma `Gradient Service provider` stroke: 2 px primary/500 → green/600. On
        hover it flips end for end (`995:20700`'s second variant) and back on leave —
        no longer on a loop (approved 2026-09-22).
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
        <div className={cn("flex items-center", compact ? "gap-2" : "w-full gap-3 pe-5 py-1")}>
          <IconBadge iconSize={compact ? 16 : 22}>{icon}</IconBadge>
          <p
            className={cn(
              "whitespace-nowrap",
              stage ? "text-24 font-medium" : "text-16 font-regular",
            )}
          >
            {title}
          </p>
        </div>
        {/* One line as drawn; it may wrap only on phones narrower than the 375 frame. */}
        <p className={cn("font-regular tablet:whitespace-nowrap", stage ? "text-20" : "text-14")}>
          {description}
        </p>
      </div>
    </div>
  );
}
