"use client";

import { useState } from "react";

import { WhyChooseList, type WhyChooseFeature } from "@themap/ui/components/why-choose-list";

/** Dev gallery wrapper: the list is controlled, so something has to hold the state. */
export function WhyChooseDemo({ features }: { features: WhyChooseFeature[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <WhyChooseList
      label="Why choose us"
      features={features}
      selectedId={selected}
      onSelect={(id) => {
        setSelected(id === selected ? null : id);
      }}
    />
  );
}
