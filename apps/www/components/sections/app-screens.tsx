"use client";

import Image from "next/image";
import { useRef } from "react";

import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@themap/ui/motion/gsap";
import { prototype } from "@themap/ui/motion/tokens";

/**
 * The phone-mockup tile — Figma `Screens` (`936:20018`).
 *
 * Two 200 px columns of app screenshots inside a 565 px tile. The set has five
 * variants that differ only in where the two columns sit. Figma cycles them on a
 * loop; the columns instead scroll from variant 1's place to variant 5's in one
 * smooth pass, once, when the tile first scrolls into view (no hover, no replay). Positions are container-query units of the 565 px tile
 * (px / 565 × 100), per variant: column one (x, y), column two (x, y).
 *
 * Phones (< tablet) — owner-approved deviation, 2026-09-25: at Figma's proportions a
 * 375 px screen showed ~108 px screenshots, too small to read. Below the tablet
 * breakpoint the tile lines up with the text column (6 px in from the section's 6 px
 * padding, capped at the column's 456 px) and is 4:5 instead of square, and each
 * column is 46 % of the tile (~161 px at 375). The
 * columns sit side by side at x 2.5 and 51.5 (2.5 margins, 3 gap). Every y is
 * Figma's px scaled by the phone column (46 / 200 = 0.23), so the pass shows the
 * same stretch of each column, and the 4:5 window (2.72 columns tall) is close to
 * Figma's (565 / 200 = 2.83 columns tall).
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

/** The same five variants on phones: Figma y × 0.23, x fixed side by side. */
const PHONE_POSITIONS = [
  [2.5, -289.34, 51.5, 32.89],
  [2.5, -221.49, 51.5, -67.85],
  [2.5, -129.49, 51.5, -105.8],
  [2.5, -38.41, 51.5, -227.47],
  [2.5, 24.38, 51.5, -324.53],
] as const;

/** Tailwind's `tablet` breakpoint (`--breakpoint-tablet`, 48rem). */
const TABLET = "(min-width: 48rem)";

const COLUMNS = [
  {
    // Starting place (variant 1) — the variables GSAP moves from here.
    position: "[--x:2.5] [--y:-289.34] tablet:[--x:7.434] tablet:[--y:-222.655]",
    shots: [
      { src: "/images/app-screen-splash.webp", width: 900, height: 1949 },
      { src: "/images/app-screen-new-order.webp", width: 900, height: 2609 },
      { src: "/images/app-screen-search-results.webp", width: 900, height: 2518 },
    ],
  },
  {
    position: "[--x:51.5] [--y:32.89] tablet:[--x:56.991] tablet:[--y:25.31]",
    shots: [
      { src: "/images/app-screen-meal-details.webp", width: 900, height: 2016 },
      { src: "/images/app-screen-documents.webp", width: 900, height: 2727 },
      { src: "/images/app-screen-find-missing-people.webp", width: 900, height: 3075 },
    ],
  },
] as const;

export function AppScreens({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // The pass plays once, when the tile first scrolls into view, and stays put.
  const played = useRef(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const setup = (positions: typeof POSITIONS | typeof PHONE_POSITIONS, reduce: boolean) => {
        const end = positions[4];
        const [one, two] = ["[data-column='0']", "[data-column='1']"] as [string, string];
        const to = (instant = false) => {
          const pass = instant ? { duration: 0 } : figmaTween(prototype.screens.pass);
          gsap.to(one, { "--x": end[0], "--y": end[1], ...pass });
          gsap.to(two, { "--x": end[2], "--y": end[3], ...pass });
        };
        // Reduced motion, or a resize after the pass: go straight to the end place.
        if (reduce || played.current) return to(true);
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 65%",
          once: true,
          onEnter: () => {
            played.current = true;
            to();
          },
        });
      };
      mm.add(`${TABLET} and ${MOTION_OK}`, () => setup(POSITIONS, false));
      mm.add(`(max-width: 47.999rem) and ${MOTION_OK}`, () => setup(PHONE_POSITIONS, false));
      mm.add(`${TABLET} and (prefers-reduced-motion: reduce)`, () => setup(POSITIONS, true));
      mm.add(`(max-width: 47.999rem) and (prefers-reduced-motion: reduce)`, () =>
        setup(PHONE_POSITIONS, true),
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      dir="ltr"
      className="@container relative aspect-4/5 w-[calc(100%-var(--spacing)*3)] max-w-114 shrink-0 overflow-hidden rounded-tile bg-primary-700 tablet:aspect-square tablet:w-full tablet:max-w-141.25"
    >
      {COLUMNS.map((column, index) => (
        <div
          key={column.position}
          data-column={index}
          className={`absolute start-[calc(var(--x)*1cqw)] top-[calc(var(--y)*1cqw)] flex w-[46cqw] flex-col gap-[5.52cqw] tablet:w-[35.398cqw] tablet:gap-[4.248cqw] ${column.position}`}
        >
          {column.shots.map((shot) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt=""
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 48rem) 200px, min(46vw, 210px)"
              className="h-auto w-full rounded-screen"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
