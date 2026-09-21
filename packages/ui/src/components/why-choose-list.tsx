"use client";

import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { FeatureItem } from "./feature-item";

/**
 * Why Choose Us feature list.
 *
 * Figma `Why Choose Us` `914:20605` has six variants: a default plus one per
 * feature, where the selected row is outlined and that feature's description is
 * shown beside the card. The rows are a tab list; the page renders the matching
 * panels (`feature-<id>-panel`) and owns the selection, because the whole section
 * changes with it.
 */
export type WhyChooseFeature = {
  id: string;
  label: string;
  /** 32x32 icon. */
  icon: ReactNode;
};

export type WhyChooseListProps = {
  features: WhyChooseFeature[];
  label: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
};

export function WhyChooseList({
  features,
  label,
  selectedId,
  onSelect,
  className,
}: WhyChooseListProps) {
  return (
    <div
      role="tablist"
      aria-label={label}
      aria-orientation="vertical"
      className={cn("flex flex-col gap-6", className)}
    >
      {features.map((feature, index) => (
        <FeatureItem
          key={feature.id}
          id={`feature-${feature.id}`}
          controls={`feature-${feature.id}-panel`}
          icon={feature.icon}
          selected={selectedId === feature.id}
          focusable={selectedId === feature.id || (selectedId === null && index === 0)}
          onSelect={() => {
            onSelect(feature.id);
          }}
        >
          {feature.label}
        </FeatureItem>
      ))}
    </div>
  );
}
