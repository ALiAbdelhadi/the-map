"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "@themap/ui/motion/gsap";
import { prototype } from "@themap/ui/motion/tokens";

/**
 * The phone-mockup tile — Figma `Screens` (`936:20018`).
 *
 * Two 200 px columns of app screenshots inside a 565 px tile. The set has five
 * variants that differ only in where the two columns sit. Figma cycles them on a
 * loop; approved 2026-09-22, the columns scroll from variant 1's place to variant 5's
 * in one 2.4 s pass while the tile is hovered (or after a tap), and glide back when
 * it is left. Positions are container-query units of the 565 px tile
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
  // While hovered (or after a tap), the columns scroll through Figma's five
  // positions in one smooth pass; leaving brings them back.
  const [playing, setPlaying] = useState(false);
  const first = useRef(true);
  // A mouse plays the pass by hovering, so its clicks must not toggle it off.
  const pointer = useRef("mouse");

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      const reduce = !window.matchMedia(MOTION_OK).matches;
      const [one, two] = ["[data-column='0']", "[data-column='1']"];
      const positions = window.matchMedia(TABLET).matches ? POSITIONS : PHONE_POSITIONS;
      if (!playing) {
        const start = positions[0];
        const back = reduce ? { duration: 0 } : figmaTween(prototype.screens.back);
        // Once home, hand the place back to the classes, so a later resize across
        // the tablet breakpoint picks up that layout's starting place.
        const home = { ...back, overwrite: true, clearProps: "--x,--y" } as const;
        gsap.to(one, { "--x": start[0], "--y": start[1], ...home });
        gsap.to(two, { "--x": start[2], "--y": start[3], ...home });
        return;
      }
      const end = positions[4];
      const pass = reduce ? { duration: 0 } : figmaTween(prototype.screens.hover);
      gsap.to(one, { "--x": end[0], "--y": end[1], ...pass, overwrite: true });
      gsap.to(two, { "--x": end[2], "--y": end[3], ...pass, overwrite: true });
    },
    { scope: ref, dependencies: [playing] },
  );

  return (
    <div
      ref={ref}
      role="img"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setPlaying(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setPlaying(false);
      }}
      onPointerDown={(event) => {
        pointer.current = event.pointerType;
      }}
      onClick={() => {
        if (pointer.current !== "mouse") setPlaying((value) => !value);
      }}
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
