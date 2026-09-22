import type { ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * Translucent surface used for the hero card and the header bar.
 *
 * Figma hero card `888:19276`: fill rgb(254 254 254 / .1), padding 24,
 * radius 32, Figma GLASS effect radius 13 (approximated with backdrop-blur).
 * Header bar `1028:25400`: fill rgb(53 150 253 / .2), padding 20, radius 80.
 * Phone header bar `1040:26239`: same fill, 359x62, radius 12, logo inset 14.
 * Tablet header bar `1037:23582`: same fill, 709x88, radius 12, logo inset 20.
 */
export type GlassCardProps = {
  children: ReactNode;
  surface?: "card" | "field" | "header" | "strong";
  /** Element to render — `header` for the site header, `div` elsewhere. */
  as?: "div" | "header" | "section";
  className?: string;
};

const SURFACES = {
  card: "bg-surface-glass rounded-card p-6 backdrop-blur-glass",
  /** Why Choose Us card, Figma 1028:22140 — Secondary-tinted field behind the glass blur. */
  field: "bg-surface-field rounded-card p-6 backdrop-blur-glass",
  header:
    "bg-surface-header rounded-button px-3.5 py-3.75 tablet:px-5 tablet:py-6 desktop:rounded-header desktop:p-5",
  strong: "bg-surface-glass-strong rounded-pill backdrop-blur-glass",
} as const;

export function GlassCard({
  children,
  surface = "card",
  as: Tag = "div",
  className,
}: GlassCardProps) {
  return <Tag className={cn(SURFACES[surface], className)}>{children}</Tag>;
}
