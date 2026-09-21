"use client";

import { useRef, useState } from "react";

import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, useGSAP } from "@themap/ui/motion/gsap";
import { prototype } from "@themap/ui/motion/tokens";
import { useAfterDelay } from "@themap/ui/motion/use-after-delay";

/**
 * The Service Areas title — Figma `974:20059`, four variants in a loop:
 * "Service Areas" (holds 0.8 s) → `1` → "Where We Operate" (holds 0.8 s) → `2` → …
 *
 * In `1` and `2` the incoming title waits off-stage to the left at 56 % of its size
 * while the outgoing one is gone (`1.022 s GENTLE`); 0.1 s later it sweeps into
 * place full size (`0.128 s GENTLE`). The heading's accessible name stays the
 * section title; the swap is decorative.
 */
export function ServiceAreasTitle({
  title,
  titleAlt,
  className,
}: {
  title: string;
  titleAlt: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [alt, setAlt] = useState(false);
  const first = useRef(true);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const { hold, enter } = prototype.serviceAreas;
      const from = document.documentElement.dir === "rtl" ? "110%" : "-110%";
      // Off-stage in Figma means clipped by the title frame; here the incoming title
      // stays transparent until it sweeps in.
      gsap
        .timeline()
        .set("[data-title-in]", { x: from, scale: 0.56, opacity: 0 })
        .fromTo("[data-title-out]", { opacity: 1 }, { opacity: 0, ...figmaTween(hold) })
        .set("[data-title-in]", { opacity: 1 }, `+=${String(enter.delay)}`)
        .to("[data-title-in]", { x: 0, scale: 1, ...figmaTween(enter) });
    },
    { scope: ref, dependencies: [alt] },
  );

  const { hold, enter } = prototype.serviceAreas;
  useAfterDelay(ref, {
    key: alt,
    wait: hold.duration + enter.delay + enter.duration + hold.delay,
    onFire: () => {
      setAlt((value) => !value);
    },
  });

  const layer = "col-start-1 row-start-1 justify-self-center whitespace-nowrap";
  return (
    <h2 ref={ref} aria-label={title} className={`grid ${className ?? ""}`}>
      <span
        key={`out-${String(alt)}`}
        data-title-out=""
        aria-hidden="true"
        className={`${layer} opacity-0`}
      >
        {alt ? title : titleAlt}
      </span>
      <span key={`in-${String(alt)}`} data-title-in="" aria-hidden="true" className={layer}>
        {alt ? titleAlt : title}
      </span>
    </h2>
  );
}
