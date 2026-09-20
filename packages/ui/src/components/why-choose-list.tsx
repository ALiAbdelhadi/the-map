"use client";

import { type ReactNode, useState } from "react";

import { cn } from "../lib/cn";
import { FeatureItem } from "./feature-item";

/**
 * Why Choose Us feature list.
 *
 * Figma `Why Choose Us` `914:20605` has six variants: a default plus one per
 * feature, where the selected row is outlined and that feature's description is
 * revealed. Rows are a tab list; the description is the matching panel.
 */
export type WhyChooseFeature = {
  id: string;
  label: string;
  /** Revealed when the row is selected. */
  description: ReactNode;
  /** 32x32 icon. */
  icon: ReactNode;
};

export type WhyChooseListProps = {
  features: WhyChooseFeature[];
  label: string;
  className?: string;
  /** Classes for the revealed description panel. */
  descriptionClassName?: string;
};

export function WhyChooseList({
  features,
  label,
  className,
  descriptionClassName,
}: WhyChooseListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = features.find((feature) => feature.id === selectedId) ?? null;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        className="flex flex-col gap-6"
      >
        {features.map((feature) => (
          <FeatureItem
            key={feature.id}
            id={`feature-${feature.id}`}
            controls={`feature-${feature.id}-panel`}
            icon={feature.icon}
            selected={selected?.id === feature.id}
            onSelect={() => {
              setSelectedId(feature.id);
            }}
          >
            {feature.label}
          </FeatureItem>
        ))}
      </div>
      {features.map((feature) => (
        <div
          key={feature.id}
          id={`feature-${feature.id}-panel`}
          role="tabpanel"
          aria-labelledby={`feature-${feature.id}`}
          hidden={selected?.id !== feature.id}
          className={descriptionClassName}
        >
          {feature.description}
        </div>
      ))}
    </div>
  );
}
