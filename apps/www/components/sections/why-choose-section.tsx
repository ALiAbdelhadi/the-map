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
import { prototype, WHY_CHOOSE_AUTOPLAY_SECONDS } from "@themap/ui/motion/tokens";
import { useAutoplay } from "@themap/ui/motion/use-autoplay";

import type { SiteContent } from "../../content/types";

const ICONS = {
  "all-in-one": AllInOneIcon,
  flexible: FlexibleIcon,
  nearby: NearbyIcon,
  fast: FastIcon,
  easy: EasyIcon,
} as const;

type Place = { scale: number; xPercent: number; yPercent: number };

const DESKTOP = "(min-width: 63.9375rem)";

const frameScale = () => Math.min(1, window.innerWidth / 1440);

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

function mazePlace(section: HTMLElement, box: HTMLElement, selected: string | null): Place {
  const phone = !window.matchMedia("(min-width: 48rem)").matches;
  const desktop = window.matchMedia(DESKTOP).matches;
  const maze = phone ? MAZE.phone : desktop ? MAZE.desktop : MAZE.tablet;
  const place: Place = selected
    ? maze.places[selected as FeatureId]
    : { scale: 1, xPercent: 0, yPercent: 0 };

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

function cardShift(selected: string | null) {
  const phone = !window.matchMedia("(min-width: 48rem)").matches;
  const shift = selected
    ? (phone ? CARD_SHIFT.phone : CARD_SHIFT.desktop)[selected as FeatureId]
    : [0, 0];
  const flip = document.documentElement.dir === "rtl" ? -1 : 1;
  const k = window.matchMedia(DESKTOP).matches ? frameScale() : 1;
  return { x: shift[0] * flip * k, y: shift[1] * k };
}

export function WhyChooseSection({ content }: { content: SiteContent }) {
  const features = content.whyChoose.features;
  const ref = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const first = useRef(true);
  const height = useRef(0);

  const current = useRef<string | null>(null);

  useEffect(() => {
    const fit = () => {
      const section = ref.current;
      const box = section?.querySelector<HTMLElement>("[data-maze]");
      if (!section || !box) return;
      gsap.killTweensOf(box);
      gsap.set(box, mazePlace(section, box, current.current));
      const card = section.querySelector("[data-why-card]");
      if (card) {
        gsap.killTweensOf(card, "x,y");
        gsap.set(card, cardShift(current.current));
      }
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

  const card = useRef<HTMLDivElement>(null);
  useAutoplay(card, {
    step: selected,
    seconds: WHY_CHOOSE_AUTOPLAY_SECONDS,
    pauseOnInteraction: false,
    busy: () => {
      const section = ref.current;
      if (!section) return false;
      return gsap
        .getTweensOf([section, ...section.querySelectorAll("[data-maze], [data-why-card]")])
        .some((tween) => tween.isActive());
    },
    next: () => {
      const ids = features.map((feature) => feature.id);
      go(ids[(selected === null ? 0 : ids.indexOf(selected) + 1) % ids.length] ?? null);
    },
  });

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
      gsap.to(box, { ...mazePlace(section, box, selected), ...move, overwrite: "auto" });
      gsap.to("[data-why-card]", { ...cardShift(selected), ...move, overwrite: "auto" });

      gsap.to("[data-character]", { autoAlpha: selected ? 0 : 1, ...arrive, overwrite: "auto" });
      gsap.fromTo(
        "[data-why-tip]:not([hidden])",
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, ...arrive, delay: reduce ? 0 : 0.2, overwrite: true },
      );
      gsap.fromTo(
        "[data-selected-ring]",
        { opacity: 0 },
        { opacity: 1, ...arrive, overwrite: true },
      );

      const stacked = !window.matchMedia(DESKTOP).matches;
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
      className={`relative isolate flex w-full flex-col items-center overflow-hidden px-2 pt-22.5 pb-7.25 tablet:min-h-256 tablet:px-0 tablet:pt-3.75 tablet:pb-4 desktop:frame-scaled desktop:flex-row desktop:items-center desktop:justify-center desktop:px-8 desktop:py-0 ${selected ? "min-h-256" : ""}`}
    >
      <div
        data-maze=""
        aria-hidden="true"
        className="-z-20 absolute top-0 -start-[118.667%] aspect-[1487/1058] w-[396.533%] tablet:-start-[39.453%] tablet:-top-[12.793%] tablet:w-[237.76%] desktop:start-auto desktop:-left-[15.417%] desktop:-top-[9.082%] desktop:aspect-auto desktop:h-[119.531%] desktop:w-[119.514%] desktop:rtl:-top-[7.715%] desktop:rtl:h-[116.797%] desktop:rtl:w-[116.736%]"
      >
        <Image
          src="/images/why-choose-maze-v2.webp"
          alt=""
          fill
          sizes={`${DESKTOP} 120vw, (min-width: 48rem) 238vw, 397vw`}
          className="object-cover"
        />
      </div>

      <div className="flex w-full max-w-89.75 justify-start tablet:max-w-192 tablet:ps-24.5 desktop:w-321 desktop:max-w-none desktop:ps-0">
        <div ref={card} data-why-card="" className="relative flex max-w-full flex-col gap-15.5">
          <GlassCard surface="field" className="w-fit max-w-full tablet:w-152">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2 ps-5 py-1 tablet:gap-6">
                <span className="flex size-15.5 shrink-0 items-center justify-center rounded-chip bg-secondary-500 p-2 text-bg">
                  <ChooseIcon width={40} height={40} className="size-10" />
                </span>
                <h2 className="min-w-0 text-32 font-regular text-bg tablet:text-56 tablet:leading-title tablet:whitespace-nowrap">
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
                <div className="flex items-center rounded-pill bg-surface-glass-strong px-7.5 py-3 text-bg tablet:px-10 tablet:py-5 desktop:absolute desktop:start-32.25 desktop:top-0 desktop:px-17 desktop:py-6">
                  <div className="flex flex-col gap-0 desktop:w-116.25 desktop:gap-3">
                    <div className="flex h-16.5 items-center gap-6 pe-5 py-1 desktop:h-auto">
                      <span className="flex size-15.5 shrink-0 items-center justify-center rounded-chip bg-primary-400 p-2">
                        <Icon width={40} height={40} className="size-10" />
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

      <Image
        data-character=""
        src="/images/why-choose-character-v2.webp"
        alt=""
        width={435}
        height={1134}
        sizes={`${DESKTOP} 27vw, (min-width: 48rem) 22vw, 32vw`}
        className={`pointer-events-none relative -mt-16.5 ms-41.5 h-77.25 w-auto tablet:-mt-16.25 tablet:ms-14.75 tablet:h-106.5 desktop:absolute desktop:-bottom-[0.13%] desktop:end-[8.48%] desktop:-z-10 desktop:ms-0 desktop:mt-0 desktop:h-[97.97%] desktop:rtl:bottom-[2.45%] desktop:rtl:end-[9.67%] desktop:rtl:h-[89.21%] rtl:-scale-x-100 ${selected ? "max-desktop:hidden" : ""}`}
      />
    </section>
  );
}
