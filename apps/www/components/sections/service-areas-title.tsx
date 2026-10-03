"use client";

import { useRef, useState } from "react";

import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "@themap/ui/motion/gsap";
import { prototype } from "@themap/ui/motion/tokens";

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
  const shownAlt = useRef(false);

  useGSAP(
    () => {
      if (shownAlt.current === alt) return;
      shownAlt.current = alt;
      const timing = window.matchMedia(MOTION_OK).matches
        ? figmaTween(prototype.serviceAreas.swap)
        : { duration: 0 };
      const shown = alt ? "[data-title='alt']" : "[data-title='main']";
      const hidden = alt ? "[data-title='main']" : "[data-title='alt']";
      gsap.to(hidden, { yPercent: -40, autoAlpha: 0, ...timing, overwrite: "auto" });
      gsap.fromTo(
        shown,
        { yPercent: 40, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, ...timing, overwrite: "auto" },
      );
    },
    { scope: ref, dependencies: [alt] },
  );

  const layer = "col-start-1 row-start-1 justify-self-center whitespace-nowrap";
  return (
    <h2
      ref={ref}
      aria-label={title}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setAlt(true);
      }}
      onPointerLeave={() => {
        setAlt(false);
      }}
      className={`grid overflow-y-clip ${className ?? ""}`}
    >
      <span data-title="main" aria-hidden="true" className={layer}>
        {title}
      </span>
      <span data-title="alt" aria-hidden="true" className={`${layer} invisible opacity-0`}>
        {titleAlt}
      </span>
    </h2>
  );
}
