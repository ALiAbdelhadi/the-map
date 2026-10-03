import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { prototype } from "../motion/tokens";
import { GradientBorder } from "./gradient-border";
import { IconBadge } from "./icon-badge";

export type BenefitPillProps = {
  title: string;
  description: string;
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
        "relative flex items-center overflow-hidden rounded-pill bg-surface-glass-strong text-bg select-none",
        compact ? "p-4" : "px-8 py-4",
        className,
      )}
    >
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
        <p className={cn("font-regular tablet:whitespace-nowrap", stage ? "text-20" : "text-14")}>
          {description}
        </p>
      </div>
    </div>
  );
}
