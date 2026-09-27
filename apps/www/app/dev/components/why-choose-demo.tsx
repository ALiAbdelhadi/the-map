"use client";

import { WhyChooseList, type WhyChooseFeature } from "@themap/ui/components/why-choose-list";
import { useState } from "react";

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
