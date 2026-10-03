"use client";

import Image from "next/image";
import { useRef } from "react";

import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "@themap/ui/motion/gsap";
import { prototype } from "@themap/ui/motion/tokens";

const POSITIONS = [
  [7.434, -222.655, 56.991, 25.31],
  [6.195, -170.442, 55.752, -52.212],
  [5.664, -99.646, 55.575, -81.416],
  [6.018, -29.558, 55.575, -175.044],
  [6.018, 18.761, 55.575, -249.735],
] as const;

const PHONE_POSITIONS = [
  [2.5, -289.34, 51.5, 32.89],
  [2.5, -221.49, 51.5, -67.85],
  [2.5, -129.49, 51.5, -105.8],
  [2.5, -38.41, 51.5, -227.47],
  [2.5, 24.38, 51.5, -324.53],
] as const;

const TABLET = "(min-width: 48rem)";

const LOOP_PAUSE = 0.8;

const COLUMNS = [
  {
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

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const setup = (positions: typeof POSITIONS | typeof PHONE_POSITIONS, reduce: boolean) => {
        const end = positions[4];
        const [one, two] = ["[data-column='0']", "[data-column='1']"] as [string, string];

        if (reduce) {
          gsap.set(one, { "--x": end[0], "--y": end[1] });
          gsap.set(two, { "--x": end[2], "--y": end[3] });
          return;
        }
        if (!ref.current) return;

        const pass = figmaTween(prototype.screens.pass);
        const tweens = [
          gsap.to(one, {
            "--x": end[0],
            "--y": end[1],
            ...pass,
            repeat: -1,
            yoyo: true,
            repeatDelay: LOOP_PAUSE,
            paused: true,
          }),
          gsap.to(two, {
            "--x": end[2],
            "--y": end[3],
            ...pass,
            repeat: -1,
            yoyo: true,
            repeatDelay: LOOP_PAUSE,
            paused: true,
          }),
        ];

        const wait = { hidden: document.hidden, away: true };
        const sync = () => {
          if (wait.hidden || wait.away) {
            tweens.forEach((tween) => tween.pause());
          } else {
            tweens.forEach((tween) => tween.resume());
          }
        };

        const io = new IntersectionObserver(
          (entries) => {
            wait.away = (entries[0]?.intersectionRatio ?? 0) < 0.5;
            sync();
          },
          { threshold: [0, 0.5, 1] },
        );
        io.observe(ref.current);

        const onVisibility = () => {
          wait.hidden = document.hidden;
          sync();
        };
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
          io.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          tweens.forEach((tween) => tween.kill());
        };
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
      className="@container relative aspect-4/5 w-[calc(100%-var(--spacing)*3)] max-w-114 shrink-0 overflow-hidden rounded-tile bg-primary-700 tablet:aspect-square tablet:w-full tablet:max-w-141.25 desktop:w-app-tile"
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
