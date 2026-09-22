"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { GlassCard } from "@themap/ui/components/glass-card";
import { WhyChooseList } from "@themap/ui/components/why-choose-list";
import { AllInOneIcon } from "@themap/ui/icons/all-in-one";
import { ChooseIcon } from "@themap/ui/icons/choose";
import { EasyIcon } from "@themap/ui/icons/easy";
import { FastIcon } from "@themap/ui/icons/fast";
import { FlexibleIcon } from "@themap/ui/icons/flexible";
import { NearbyIcon } from "@themap/ui/icons/nearby";
import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, useGSAP } from "@themap/ui/motion/gsap";
import { prototype } from "@themap/ui/motion/tokens";

import type { SiteContent } from "../../content/types";

/**
 * Why Choose Us.
 *
 * Figma `914:20605` (1440x1024) and the phone set `1038:25190` (375 wide): the maze
 * (`image 6658`) and the character (`image 6659`) behind a glass card with the title
 * row and five feature rows.
 *
 * 768 (`1037:26497`): the 608 px card sits 15 px down and 98 px in, at the 1440
 * type sizes, with the character (392 px) standing under it, its head 33 px over the
 * card; the section is 1024 tall.
 *
 * Six variants — the default and one per feature. Choosing a feature:
 * - zooms and pans the maze (each variant places `image 6658` differently);
 * - removes the character;
 * - outlines the row and shows the feature beside the card — a pill with the
 *   feature's chip, label and description, reached by a hand-drawn arrow on the
 *   1440 frame; below 1440 (phone and tablet) the pill sits 62 px under the card,
 *   without the arrow — the tablet frame is too narrow to hold it beside the card.
 *
 * Motion: only a click changes the state (the prototype's auto-advance is dropped,
 * approved 2026-09-22). Clicking a row zooms the maze and moves the card over 0.8 s
 * on a strong ease-in-out; the feature pill rises in just after. Clicking the
 * selected row goes back to the default the same way. Hover only restyles the row.
 */

const ICONS = {
  "all-in-one": AllInOneIcon,
  flexible: FlexibleIcon,
  nearby: NearbyIcon,
  fast: FastIcon,
  easy: EasyIcon,
} as const;

type Place = { scale: number; xPercent: number; yPercent: number };

/*
 * Where each variant puts the maze, as a transform of the default placement.
 * 1440 frame: the default `image 6658` is (−222, −10, 1896x1034), which the cover-
 * fitted maze matches; the transform origin is that image's top-left corner in the
 * 1440x1024 section and the shift is in % of the section.
 * 375 frame: the default is (−445, 0, 1930x1053), which the phone maze box is; the
 * shift is in % of that box.
 */
const MAZE = {
  desktop: {
    origin: "-15.417% -0.977%",
    places: {
      "all-in-one": { scale: 1.2426, xPercent: -16.389, yPercent: 0.977 },
      flexible: { scale: 1.7848, xPercent: -52.083, yPercent: 0.977 },
      nearby: { scale: 1.7162, xPercent: -14.792, yPercent: -31.641 },
      fast: { scale: 2.5401, xPercent: -12.153, yPercent: -80.762 },
      easy: { scale: 2.7247, xPercent: 15.417, yPercent: -54.59 },
    } satisfies Record<string, Place>,
  },
  /*
   * 768 frame (`1037:26496`, the 1440 composition placed at x −64): the default maze
   * box is (−303, −10, 1930x1053) in the 768x1024 section — the box itself — and the
   * feature variants reuse the 1440 rectangles, shifted by the same 64 px.
   */
  tablet: {
    origin: "0% 0%",
    places: {
      "all-in-one": { scale: 1.2207, xPercent: -11.347, yPercent: 0.95 },
      flexible: { scale: 1.7534, xPercent: -37.979, yPercent: 0.95 },
      nearby: { scale: 1.686, xPercent: -10.155, yPercent: -30.769 },
      fast: { scale: 2.4953, xPercent: -8.187, yPercent: -78.537 },
      easy: { scale: 2.6767, xPercent: 12.383, yPercent: -53.086 },
    } satisfies Record<string, Place>,
  },
  phone: {
    origin: "0% 0%",
    places: {
      "all-in-one": { scale: 1.2207, xPercent: -0.674, yPercent: 0 },
      flexible: { scale: 1.7534, xPercent: -27.306, yPercent: 0 },
      nearby: { scale: 1.686, xPercent: 0.518, yPercent: -31.719 },
      fast: { scale: 2.4953, xPercent: 2.487, yPercent: -79.487 },
      easy: { scale: 2.6767, xPercent: 23.057, yPercent: -54.036 },
    } satisfies Record<string, Place>,
  },
} as const;

/*
 * How far the card moves from its default place in each variant (px).
 * 1440: default (48, 222); All-in-One (62, 195); Nearby (51, 236); others (51, 195).
 * 375: default (10, 90); All-in-One (18, 134), Flexible (17, 160), Nearby (17, 101),
 * Fast (17, 124 — its frame is 475 wide, the extra 50 px ignored), Easy (17, 196).
 */
const CARD_SHIFT = {
  desktop: {
    "all-in-one": [14, -27],
    flexible: [3, -27],
    nearby: [3, 14],
    fast: [3, -27],
    easy: [3, -27],
  },
  phone: {
    "all-in-one": [8, 44],
    flexible: [7, 70],
    nearby: [7, 11],
    fast: [7, 34],
    easy: [7, 106],
  },
} as const;

type FeatureId = keyof typeof ICONS;

export function WhyChooseSection({ content }: { content: SiteContent }) {
  const features = content.whyChoose.features;
  const ref = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const first = useRef(true);
  const height = useRef(0);

  const go = (next: string | null) => {
    height.current = ref.current?.offsetHeight ?? 0;
    setSelected(next);
  };

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      if (first.current) {
        first.current = false;
        return;
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const move = reduce ? { duration: 0 } : figmaTween(prototype.whyChoose.click);
      const arrive = reduce ? { duration: 0 } : figmaTween(prototype.whyChoose.tip);
      const phone = !window.matchMedia("(min-width: 48rem)").matches;
      const wide = window.matchMedia("(min-width: 90rem)").matches;
      const maze = phone ? MAZE.phone : wide ? MAZE.desktop : MAZE.tablet;
      const place = selected ? maze.places[selected as FeatureId] : null;
      gsap.set("[data-maze]", { transformOrigin: maze.origin });
      gsap.to("[data-maze]", {
        ...(place ?? { scale: 1, xPercent: 0, yPercent: 0 }),
        ...move,
        overwrite: "auto",
      });

      const shift = selected
        ? (phone ? CARD_SHIFT.phone : CARD_SHIFT.desktop)[selected as FeatureId]
        : [0, 0];
      const flip = document.documentElement.dir === "rtl" ? -1 : 1;
      gsap.to("[data-why-card]", { x: shift[0] * flip, y: shift[1], ...move, overwrite: "auto" });

      gsap.to("[data-character]", { autoAlpha: selected ? 0 : 1, ...arrive, overwrite: "auto" });
      // The feature pill arrives after the card has started moving; the arrow draws with it.
      gsap.fromTo(
        "[data-why-tip]:not([hidden])",
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, ...arrive, delay: reduce ? 0 : 0.2 },
      );
      gsap.fromTo("[data-selected-ring]", { opacity: 0 }, { opacity: 1, ...arrive });

      // Below 1440 the pill sits under the card, so the section grows to fit it.
      const stacked = !window.matchMedia("(min-width: 90rem)").matches;
      if (stacked && height.current) {
        gsap.fromTo(section, { height: height.current }, { height: "auto", ...move });
      }
    },
    { scope: ref, dependencies: [selected] },
  );

  const title = content.whyChoose.title;

  return (
    <section
      ref={ref}
      id="why-us"
      className="relative isolate flex w-full flex-col items-center overflow-hidden px-2 pt-22.5 pb-9.5 tablet:min-h-256 tablet:px-0 tablet:pt-3.75 tablet:pb-4 desktop:flex-row desktop:items-center desktop:justify-center desktop:px-8 desktop:py-0"
    >
      {/*
        Phone: the maze box is Figma's (−445, 0, 1930x1053) — 514.667 % of the
        375 frame. From the tablet frame up it cover-fits the section.
      */}
      <div
        data-maze=""
        aria-hidden="true"
        className="-z-20 absolute top-0 -start-[118.667%] aspect-[1930/1053] w-[514.667%] tablet:-start-[39.453%] tablet:-top-[0.977%] tablet:w-[251.302%] desktop:inset-0 desktop:aspect-auto desktop:w-auto"
      >
        <Image
          src="/images/why-choose-maze.webp"
          alt=""
          fill
          sizes="(min-width: 48rem) 100vw, 515vw"
          className="object-cover"
        />
      </div>

      <div className="flex w-full max-w-desktop justify-start tablet:ps-24.5 desktop:ps-0">
        <div data-why-card="" className="relative flex flex-col gap-15.5">
          <GlassCard surface="field" className="w-fit tablet:w-152">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2 ps-5 py-1 tablet:gap-6">
                <span className="flex size-15.5 shrink-0 items-center justify-center rounded-chip bg-secondary-500 p-2 text-bg">
                  <ChooseIcon width={40} height={40} />
                </span>
                <h2 className="text-32 font-regular whitespace-nowrap text-bg tablet:text-56">
                  {title}
                </h2>
              </div>

              <WhyChooseList
                label={title}
                selectedId={selected}
                onSelect={(id) => {
                  go(id === selected ? null : id);
                }}
                features={features.map((feature) => {
                  const Icon = ICONS[feature.id as FeatureId];
                  return { id: feature.id, label: feature.label, icon: <Icon /> };
                })}
              />
            </div>
          </GlassCard>

          {features.map((feature) => {
            const Icon = ICONS[feature.id as FeatureId];
            return (
              <div
                key={feature.id}
                id={`feature-${feature.id}-panel`}
                role="tabpanel"
                aria-labelledby={`feature-${feature.id}`}
                data-why-tip=""
                hidden={selected !== feature.id}
                className="desktop:absolute desktop:start-full desktop:top-1/2 desktop:h-133.75 desktop:w-182.5 desktop:-translate-y-1/2"
              >
                {/* `arrow` (914:19995): 336.767 px, turned 13.22°, 130 px down. */}
                <span
                  aria-hidden="true"
                  className="absolute start-0 top-32.5 hidden size-101.25 items-center justify-center desktop:flex rtl:-scale-x-100"
                >
                  <Image
                    src="/svg/why-choose-arrow.svg"
                    alt=""
                    width={337}
                    height={337}
                    unoptimized
                    className="size-84.25 rotate-[13.22deg]"
                  />
                </span>
                {/* Pill 914:19999 — phone 1038:25223. */}
                <div className="flex items-center rounded-pill bg-surface-glass-strong px-7.5 py-3 text-bg tablet:px-10 tablet:py-5 desktop:absolute desktop:start-32.25 desktop:top-0 desktop:px-17 desktop:py-6">
                  <div className="flex flex-col gap-0 desktop:w-116.25 desktop:gap-3">
                    <div className="flex h-16.5 items-center gap-6 pe-5 py-1 desktop:h-auto">
                      <span className="flex size-15.5 shrink-0 items-center justify-center rounded-chip bg-primary-400 p-2">
                        <Icon width={40} height={40} />
                      </span>
                      <span className="text-24 font-regular whitespace-nowrap tablet:text-32 desktop:text-40">
                        {feature.label}
                      </span>
                    </div>
                    <p className="text-16 font-regular whitespace-nowrap tablet:text-24 desktop:text-32">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/*
        Phone frame (`1041:27445`): the character stands below the card, in flow,
        278 px tall, its head 44 px over the card. From the tablet frame up it stands
        behind the card at the section's end. It is not in any feature variant.
      */}
      <Image
        data-character=""
        src="/images/why-choose-character.webp"
        alt=""
        width={216}
        height={659}
        sizes="(min-width: 90rem) 20vw, 35vw"
        className={`pointer-events-none relative -mt-11 h-69.5 w-auto tablet:-mt-8.25 tablet:h-98 desktop:absolute desktop:end-[12%] desktop:bottom-[2%] desktop:-z-10 desktop:mt-0 desktop:h-[86%] rtl:-scale-x-100 ${selected ? "max-desktop:hidden" : ""}`}
      />
    </section>
  );
}
