"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, useGSAP } from "@themap/ui/motion/gsap";
import { prototype } from "@themap/ui/motion/tokens";
import { useAfterDelay } from "@themap/ui/motion/use-after-delay";

/**
 * The phone-mockup tile — Figma `Screens` (`936:20018`).
 *
 * Two 200 px columns of app screenshots inside a 565 px tile. The set has five
 * variants that differ only in where the two columns sit; each advances after 0.8 s
 * with a 1.25 s `SLOW` spring, and variant 5 returns to 1, so the columns scroll past
 * one another. Positions are container-query units of the 565 px tile
 * (px / 565 × 100), per variant: column one (x, y), column two (x, y).
 */
const POSITIONS = [
  // 1 `936:20017`: (42, −1258), (322, 143)
  [7.434, -222.655, 56.991, 25.31],
  // 2 `936:20015`: (35, −963), (315, −295)
  [6.195, -170.442, 55.752, -52.212],
  // 3 `936:20014`: (32, −563), (314, −460)
  [5.664, -99.646, 55.575, -81.416],
  // 4 `936:20016`: (34, −167), (314, −989)
  [6.018, -29.558, 55.575, -175.044],
  // 5 `936:20013`: (34, 106), (314, −1411)
  [6.018, 18.761, 55.575, -249.735],
] as const;

const COLUMNS = [
  {
    // Starting place (variant 1) — the variables GSAP moves from here.
    position: "[--x:7.434] [--y:-222.655]",
    shots: [
      { src: "/images/app-screen-splash.webp", width: 420, height: 910 },
      { src: "/images/app-screen-new-order.webp", width: 420, height: 1218 },
      { src: "/images/app-screen-search-results.webp", width: 420, height: 1176 },
    ],
  },
  {
    position: "[--x:56.991] [--y:25.31]",
    shots: [
      { src: "/images/app-screen-meal-details.webp", width: 420, height: 941 },
      { src: "/images/app-screen-documents.webp", width: 420, height: 1273 },
      { src: "/images/app-screen-find-missing-people.webp", width: 420, height: 1435 },
    ],
  },
] as const;

export function AppScreens({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState(0);
  const first = useRef(true);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      const place = POSITIONS[variant];
      if (!place) return;
      const tween = figmaTween(prototype.screens);
      gsap.to("[data-column='0']", { "--x": place[0], "--y": place[1], ...tween });
      gsap.to("[data-column='1']", { "--x": place[2], "--y": place[3], ...tween });
    },
    { scope: ref, dependencies: [variant] },
  );

  useAfterDelay(ref, {
    key: variant,
    wait: prototype.screens.duration + prototype.screens.delay,
    onFire: () => {
      setVariant((current) => (current + 1) % POSITIONS.length);
    },
  });

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      dir="ltr"
      className="@container relative aspect-square w-76 shrink-0 overflow-hidden rounded-tile bg-primary-700 tablet:w-full tablet:max-w-141.25"
    >
      {COLUMNS.map((column, index) => (
        <div
          key={column.position}
          data-column={index}
          className={`absolute start-[calc(var(--x)*1cqw)] top-[calc(var(--y)*1cqw)] flex w-[35.398cqw] flex-col gap-[4.248cqw] ${column.position}`}
        >
          {column.shots.map((shot) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt=""
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 90rem) 200px, 36vw"
              className="h-auto w-full rounded-screen"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
