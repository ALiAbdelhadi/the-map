"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
 * (`image 6676`, 2026-09-25) and the character (`image 6665`) behind a glass card
 * with the title row and five feature rows.
 *
 * 768 (`1037:26497`): the 608 px card sits 15 px down and 98 px in, at the 1440
 * type sizes, with the character (426 px) standing under it, its head 65 px over the
 * card; the section is 1024 tall.
 *
 * Six variants — the default and one per feature. Choosing a feature:
 * - zooms and pans the maze (each variant places the maze image differently);
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
 * Where each variant puts the maze, as a transform of the default placement. The
 * `[data-maze]` box IS the default image rectangle, so the origin is its top-left
 * corner, the scale is (variant width / default width) and the shift is in % of the
 * box. Rectangles are the `image 6676`–`6692` nodes (2026-09-25 images, one source).
 * 1440 (`914:20600`–`914:20603`): default (−222, −93, 1721x1224);
 *   All-in-One (−458, 0, 2175), Flexible (−972, 0, 3427), Nearby (−1711, −57, 5133),
 *   Fast (−1451, −276, 3981), Easy (−1854, −534, 5481).
 * 768 (`1037:26497`, the 1440 composition placed at x −64): default
 *   (−303, −131, 1826x1300); the feature variants reuse the 1440 rectangles shifted
 *   by the same 64 px.
 * 375 (`1038:25191`–`1038:25300`): default (−445, 0, 1487x1058); All-in-One
 *   (−458, −146, 1896), Flexible (−972, −308, 2352), Nearby (−1273, −334, 3163),
 *   Fast (−1740, −200, 4293), Easy (0, 0, 4293).
 * The Arabic 1440 default (`1028:22136`) sits the maze slightly smaller; the feature
 * variants reuse the English transforms.
 */
const MAZE = {
  desktop: {
    places: {
      "all-in-one": { scale: 1.2638, xPercent: -13.713, yPercent: 7.598 },
      flexible: { scale: 1.9913, xPercent: -43.579, yPercent: 7.598 },
      nearby: { scale: 2.9826, xPercent: -86.519, yPercent: 2.941 },
      fast: { scale: 2.3132, xPercent: -71.412, yPercent: -14.951 },
      easy: { scale: 3.1848, xPercent: -94.829, yPercent: -36.029 },
    } satisfies Record<string, Place>,
  },
  tablet: {
    places: {
      "all-in-one": { scale: 1.1911, xPercent: -11.993, yPercent: 10.077 },
      flexible: { scale: 1.8768, xPercent: -40.142, yPercent: 10.077 },
      nearby: { scale: 2.8111, xPercent: -80.613, yPercent: 5.692 },
      fast: { scale: 2.1802, xPercent: -66.375, yPercent: -11.154 },
      easy: { scale: 3.0016, xPercent: -88.445, yPercent: -31 },
    } satisfies Record<string, Place>,
  },
  phone: {
    places: {
      "all-in-one": { scale: 1.2751, xPercent: -0.874, yPercent: -13.8 },
      flexible: { scale: 1.5817, xPercent: -35.44, yPercent: -29.112 },
      nearby: { scale: 2.1271, xPercent: -55.683, yPercent: -31.569 },
      fast: { scale: 2.887, xPercent: -87.088, yPercent: -18.904 },
      easy: { scale: 2.887, xPercent: 29.926, yPercent: 0 },
    } satisfies Record<string, Place>,
  },
} as const;

/**
 * Where the maze goes for a selection, kept covering the section.
 *
 * The Figma rectangles are drawn for the 375, 768 and 1440 frames. At other widths
 * (and in the Arabic 1440 frame, whose default box is smaller) the same transform
 * could leave a band of the section uncovered, so the result is scaled up just
 * enough to cover and its edges are pulled back inside the section. At the design
 * widths the Figma rectangles already cover, so they pass through unchanged.
 */
function mazePlace(section: HTMLElement, box: HTMLElement, selected: string | null): Place {
  const phone = !window.matchMedia("(min-width: 48rem)").matches;
  const wide = window.matchMedia("(min-width: 90rem)").matches;
  const maze = phone ? MAZE.phone : wide ? MAZE.desktop : MAZE.tablet;
  const place: Place = selected
    ? maze.places[selected as FeatureId]
    : { scale: 1, xPercent: 0, yPercent: 0 };

  // The section's natural height — a running height tween is set inline.
  const inline = section.style.height;
  section.style.height = "";
  const H = section.clientHeight;
  section.style.height = inline;
  const W = section.clientWidth;
  const { offsetLeft: x, offsetTop: y, offsetWidth: w, offsetHeight: h } = box;
  if (!w || !h) return place;

  const scale = Math.max(place.scale, W / w, H / h);
  const clamp = (v: number, min: number) => Math.min(0, Math.max(min, v));
  const left = clamp(x + (place.xPercent / 100) * w, W - scale * w);
  const top = clamp(y + (place.yPercent / 100) * h, H - scale * h);
  return { scale, xPercent: ((left - x) / w) * 100, yPercent: ((top - y) / h) * 100 };
}

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

  const current = useRef<string | null>(null);

  // A resize changes the section's shape (and maybe the breakpoint): re-fit the maze.
  useEffect(() => {
    const fit = () => {
      const section = ref.current;
      const box = section?.querySelector<HTMLElement>("[data-maze]");
      if (section && box) gsap.set(box, mazePlace(section, box, current.current));
    };
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
    };
  }, []);

  const go = (next: string | null) => {
    height.current = ref.current?.offsetHeight ?? 0;
    setSelected(next);
  };

  useGSAP(
    () => {
      const section = ref.current;
      const box = section?.querySelector<HTMLElement>("[data-maze]");
      if (!section || !box) return;
      current.current = selected;
      gsap.set(box, { transformOrigin: "0% 0%" });
      if (first.current) {
        first.current = false;
        gsap.set(box, mazePlace(section, box, null));
        return;
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const move = reduce ? { duration: 0 } : figmaTween(prototype.whyChoose.click);
      const arrive = reduce ? { duration: 0 } : figmaTween(prototype.whyChoose.tip);
      const phone = !window.matchMedia("(min-width: 48rem)").matches;
      gsap.to(box, { ...mazePlace(section, box, selected), ...move, overwrite: "auto" });

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
    // The phone feature variants (`1038:25208`–`1038:25300`) are 1024 tall: the card
    // moves down (a transform, outside layout) and the pill sits under it.
    <section
      ref={ref}
      id="why-us"
      className={`relative isolate flex w-full flex-col items-center overflow-hidden px-2 pt-22.5 pb-7.25 tablet:min-h-256 tablet:px-0 tablet:pt-3.75 tablet:pb-4 desktop:flex-row desktop:items-center desktop:justify-center desktop:px-8 desktop:py-0 ${selected ? "min-h-256" : ""}`}
    >
      {/*
        The maze box is the default `image 6676` rectangle at each frame, in % of the
        section: 375 `1171:9057` (−445, 0, 1487 wide); 768 `1171:9038` (−303, −131,
        1826x1300); 1440 `1171:9019` (−222, −93, 1721x1224), Arabic `1170:8755`
        (−222, −79, 1681x1196). The maze is not mirrored in the Arabic 1440 frame, so
        the desktop box is placed from the physical left.
      */}
      <div
        data-maze=""
        aria-hidden="true"
        className="-z-20 absolute top-0 -start-[118.667%] aspect-[1487/1058] w-[396.533%] tablet:-start-[39.453%] tablet:-top-[12.793%] tablet:w-[237.76%] desktop:start-auto desktop:-left-[15.417%] desktop:-top-[9.082%] desktop:aspect-auto desktop:h-[119.531%] desktop:w-[119.514%] desktop:rtl:-top-[7.715%] desktop:rtl:h-[116.797%] desktop:rtl:w-[116.736%]"
      >
        <Image
          src="/images/why-choose-maze-v2.webp"
          alt=""
          fill
          sizes="(min-width: 90rem) 120vw, (min-width: 48rem) 238vw, 397vw"
          className="object-cover"
        />
      </div>

      {/*
        Phone: the card keeps Figma's place in the 375 frame (8 px in) inside a 359 px
        column that is centred on wider phones, so it never drifts to one side.
      */}
      <div className="flex w-full max-w-89.75 justify-start tablet:max-w-desktop tablet:ps-24.5 desktop:ps-0">
        <div data-why-card="" className="relative flex max-w-full flex-col gap-15.5">
          <GlassCard surface="field" className="w-fit max-w-full tablet:w-152">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2 ps-5 py-1 tablet:gap-6">
                <span className="flex size-15.5 shrink-0 items-center justify-center rounded-chip bg-secondary-500 p-2 text-bg">
                  <ChooseIcon width={40} height={40} />
                </span>
                <h2 className="min-w-0 text-32 font-regular text-bg tablet:text-56 tablet:whitespace-nowrap">
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
        The character (`image 6665` 1440 `1170:8726`, 768 `1170:8751`, 375
        `1170:8746`) is one uploaded cut-out; the file is cropped to the figure, so
        the box below is the figure itself, not Figma's padded image box.
        375: in flow under the card, 309 px tall, its head 66 px over the card and its
        centre 83 px right of the column's centre. 768: 426 px tall, 65 px over the
        card, centre 29.5 px right of centre. 1440: behind the card at the section's
        end, 1003 px tall, 122 px in from the end, 1 px past the bottom. The Arabic
        1440 frame (`1170:8730`) mirrors it and draws it smaller: 914 px tall, 139 px
        in, 25 px up. It is not in any feature variant.
      */}
      <Image
        data-character=""
        src="/images/why-choose-character-v2.webp"
        alt=""
        width={435}
        height={1134}
        sizes="(min-width: 90rem) 27vw, (min-width: 48rem) 22vw, 32vw"
        className={`pointer-events-none relative -mt-16.5 ms-41.5 h-77.25 w-auto tablet:-mt-16.25 tablet:ms-14.75 tablet:h-106.5 desktop:absolute desktop:-bottom-[0.13%] desktop:end-[8.48%] desktop:-z-10 desktop:ms-0 desktop:mt-0 desktop:h-[97.97%] desktop:rtl:bottom-[2.45%] desktop:rtl:end-[9.67%] desktop:rtl:h-[89.21%] rtl:-scale-x-100 ${selected ? "max-desktop:hidden" : ""}`}
      />
    </section>
  );
}
