import type { ReactNode } from "react";

import { cn } from "../lib/cn";

export type GlassCardProps = {
  children: ReactNode;
  surface?: "card" | "field" | "header" | "strong";
  as?: "div" | "header" | "section";
  className?: string;
};

const SURFACES = {
  card: "bg-surface-glass rounded-card p-6 shadow-glass-edge backdrop-blur-glass",
  field: "bg-surface-field rounded-card p-6 backdrop-blur-glass",
  header:
    "bg-surface-header shadow-glass-edge rounded-button px-3.5 py-3.75 tablet:px-5 tablet:py-6 desktop:rounded-header desktop:p-[calc(20*var(--scale-landscape))]",
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
