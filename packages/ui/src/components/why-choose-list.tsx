"use client";

import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { FeatureItem } from "./feature-item";

export type WhyChooseFeature = {
  id: string;
  label: string;
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
      className={cn(
        "-my-2 ms-2 flex w-fit max-w-full flex-col items-start gap-2 tablet:my-0 tablet:items-stretch tablet:gap-6",
        className,
      )}
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
