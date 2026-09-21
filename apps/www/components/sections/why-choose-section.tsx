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
import { useAfterDelay } from "@themap/ui/motion/use-after-delay";

import type { SiteContent } from "../../content/types";

/**
 * Why Choose Us.
 *
 * Figma `914:20605` (1440x1024) and the phone set `1038:25190` (375 wide): the maze
 * (`image 6658`) and the character (`image 6659`) behind a glass card with the title
 * row and five feature rows.
 *
 * Six variants — the default and one per feature. Choosing a feature:
 * - zooms and pans the maze (each variant places `image 6658` differently);
 * - removes the character;
 * - outlines the row and shows the feature beside the card — a pill with the
 *   feature's chip, label and description, reached by a hand-drawn arrow on the
 *   1440 frame; on the phone the pill sits 62 px under the card, without the arrow.
 *
 * Motion (prototype reactions): default → All-in-One → Flexible → Nearby → Fast →
 * Easy → default, each after 0.8 s with a 1.022 s `GENTLE` spring (Easy → default:
 * 0.744 s `QUICK`); a click on a row goes there with 0.3 s ease-out, and a click on
 * the selected row returns to the default instantly.
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
  // How the current state arrived: its transition, and whether it was instant.
  const [arrival, setArrival] = useState<"auto" | "back" | "click" | "instant">("instant");
  const first = useRef(true);
  const height = useRef(0);

  const go = (next: string | null, how: "auto" | "back" | "click" | "instant") => {
    height.current = ref.current?.offsetHeight ?? 0;
    setArrival(how);
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
      const timing =
        reduce || arrival === "instant"
          ? { duration: 0 }
          : figmaTween(
              arrival === "auto"
                ? prototype.whyChoose.auto
                : arrival === "back"
                  ? prototype.whyChoose.back
                  : prototype.whyChoose.click,
            );
      const phone = !window.matchMedia("(min-width: 48rem)").matches;
      const maze = phone ? MAZE.phone : MAZE.desktop;
      const place = selected ? maze.places[selected as FeatureId] : null;
      gsap.set("[data-maze]", { transformOrigin: maze.origin });
      gsap.to("[data-maze]", { ...(place ?? { scale: 1, xPercent: 0, yPercent: 0 }), ...timing });

      const shift = selected
        ? (phone ? CARD_SHIFT.phone : CARD_SHIFT.desktop)[selected as FeatureId]
        : [0, 0];
      const flip = document.documentElement.dir === "rtl" ? -1 : 1;
      gsap.to("[data-why-card]", { x: shift[0] * flip, y: shift[1], ...timing });

      gsap.to("[data-character]", { autoAlpha: selected ? 0 : 1, ...timing });
      gsap.fromTo("[data-why-tip]:not([hidden])", { autoAlpha: 0 }, { autoAlpha: 1, ...timing });
      gsap.fromTo("[data-selected-ring]", { opacity: 0 }, { opacity: 1, ...timing });

      // The phone frame grows from 888 to 1024 while a feature is shown.
      if (phone && height.current) {
        gsap.fromTo(section, { height: height.current }, { height: "auto", ...timing });
      }
    },
    { scope: ref, dependencies: [selected] },
  );

  const index = selected ? features.findIndex((feature) => feature.id === selected) : -1;
  const last = index === features.length - 1;
  const arrived =
    arrival === "instant"
      ? 0
      : arrival === "auto"
        ? prototype.whyChoose.auto.duration
        : arrival === "back"
          ? prototype.whyChoose.back.duration
          : prototype.whyChoose.click.duration;
  useAfterDelay(ref, {
    key: selected,
    wait: arrived + prototype.whyChoose.auto.delay,
    onFire: () => {
      if (last) go(null, "back");
      else go(features[index + 1]?.id ?? null, "auto");
    },
  });

  const title = content.whyChoose.title;

  return (
    <section
      ref={ref}
      id="why-us"
      className="relative isolate flex w-full flex-col items-center overflow-hidden px-2 pt-22.5 pb-9.5 tablet:flex-row tablet:items-stretch tablet:justify-center tablet:px-8 tablet:py-24 desktop:min-h-256 desktop:items-center desktop:py-0"
    >
      {/*
        Phone: the maze box is Figma's (−445, 0, 1930x1053) — 514.667 % of the
        375 frame. From the tablet frame up it cover-fits the section.
      */}
      <div
        data-maze=""
        aria-hidden="true"
        className="-z-20 absolute top-0 -start-[118.667%] aspect-[1930/1053] w-[514.667%] tablet:inset-0 tablet:aspect-auto tablet:w-auto"
      >
        <Image
          src="/images/why-choose-maze.webp"
          alt=""
          fill
          sizes="(min-width: 48rem) 100vw, 515vw"
          className="object-cover"
        />
      </div>

      <div className="flex w-full max-w-container-desktop justify-start">
        <div data-why-card="" className="relative flex flex-col gap-15.5">
          <GlassCard surface="field" className="w-fit tablet:w-152">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2 ps-5 py-1 tablet:gap-4 tablet:ps-0 tablet:py-0">
                <span className="flex size-15.5 shrink-0 items-center justify-center rounded-chip bg-secondary-500 p-2 text-bg">
                  <ChooseIcon width={40} height={40} />
                </span>
                <h2 className="text-32 font-regular whitespace-nowrap text-bg tablet:text-40 desktop:text-56">
                  {title}
                </h2>
              </div>

              <WhyChooseList
                label={title}
                selectedId={selected}
                onSelect={(id) => {
                  if (id === selected) go(null, "instant");
                  else go(id, "click");
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
                className="tablet:absolute tablet:start-full tablet:top-1/2 tablet:h-133.75 tablet:w-182.5 tablet:-translate-y-1/2"
              >
                {/* `arrow` (914:19995): 336.767 px, turned 13.22°, 130 px down. */}
                <span
                  aria-hidden="true"
                  className="absolute start-0 top-32.5 hidden size-101.25 items-center justify-center tablet:flex rtl:-scale-x-100"
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
                <div className="flex items-center rounded-pill bg-surface-glass-strong px-7.5 py-3 text-bg tablet:absolute tablet:start-32.25 tablet:top-0 tablet:px-17 tablet:py-6">
                  <div className="flex flex-col gap-0 tablet:w-116.25 tablet:gap-3">
                    <div className="flex h-16.5 items-center gap-6 pe-5 py-1 tablet:h-auto">
                      <span className="flex size-15.5 shrink-0 items-center justify-center rounded-chip bg-primary-400 p-2">
                        <Icon width={40} height={40} />
                      </span>
                      <span className="text-24 font-regular whitespace-nowrap tablet:text-40">
                        {feature.label}
                      </span>
                    </div>
                    <p className="text-16 font-regular whitespace-nowrap tablet:text-32">
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
        className={`pointer-events-none relative -mt-11 h-69.5 w-auto tablet:absolute tablet:end-[12%] tablet:bottom-[2%] tablet:-z-10 tablet:mt-0 tablet:h-[86%] rtl:-scale-x-100 ${selected ? "max-tablet:hidden" : ""}`}
      />
    </section>
  );
}
