"use client";

import { useState } from "react";

const RANGES = ["1D", "7D", "1M", "1Y"] as const;

export function RangeFilter({ label, className = "" }: { label: string; className?: string }) {
  const [active, setActive] = useState<(typeof RANGES)[number]>("1D");

  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center justify-center rounded-[30px] border border-neutral-100 bg-neutral-50 px-2 py-[9px] ${className}`}
    >
      {RANGES.map((range) => (
        <button
          key={range}
          type="button"
          aria-pressed={range === active}
          onClick={() => setActive(range)}
          className={`flex h-6 w-[45px] cursor-pointer items-center justify-center rounded-[35px] text-sm leading-[normal] transition-[color,background-color,box-shadow] duration-300 ${
            range === active
              ? "bg-primary-500 text-neutral-50 shadow-filter"
              : "bg-neutral-50 text-neutral-400 hover:text-primary-500"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
