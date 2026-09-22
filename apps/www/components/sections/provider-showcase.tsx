"use client";

import Image from "next/image";
import { type ReactNode, useRef, useState } from "react";

import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@themap/ui/motion/gsap";
import { prototype } from "@themap/ui/motion/tokens";
import { useHoverTween } from "@themap/ui/motion/use-hover-tween";

/**
 * The provider stage — Figma `Contact us` (`998:20842`), 1440 frame only.
 *
 * Figma plays the build-up on a loop and folds the full section away again 0.8 s
 * after `Click here`. Approved 2026-09-22 instead: the build-up plays once, when the
 * section scrolls into view — Wider Reach drops in, the other four pills slide in
 * one after another, then `Click here` appears — and waits. A click opens the full
 * section (the copy, email card and downloads), which then stays.
 *
 * The 899x850 stage sits at (196, 127) in the 1440x1024 section — 118 px into the
 * 1284 px container, with 47 px under it so the section stays 1024 tall. Positions
 * below are in that stage, read from `998:20840` (cart 5); the connectors run from
 * the illustration to the dot beside each pill. Below 1440, and with reduced motion,
 * only the full section is shown.
 */

type Stage = "stage" | "full";

/**
 * Where each pill group comes from — the direction of Figma's hidden variants, at a
 * third of the distance so the entrance stays calm.
 */
const HIDDEN = {
  "wider-reach": { x: 0, y: -90 },
  income: { x: 80, y: 0 },
  simple: { x: 96, y: 0 },
  "ready-clients": { x: -136, y: 0 },
  "full-flexibility": { x: -136, y: 0 },
} as const;

export type StagePill = { id: keyof typeof HIDDEN; pill: ReactNode };

/*
 * Pill boxes (left, top, width) and connectors (start at the illustration end,
 * length, angle) in the stage, from `998:20840`. Class strings are written out in
 * full for Tailwind.
 */
const PLACES: Record<
  keyof typeof HIDDEN,
  { pill: string; line: string; src: string; width: number }
> = {
  // pill 380.657 wide, turned −0.82°; connector 133.583 straight up to it.
  "wider-reach": {
    pill: "left-81.75 top-0 w-max rotate-[-0.82deg]",
    line: "left-131.5 top-64 w-35 -rotate-90",
    src: "/svg/connector-43.svg",
    width: 140,
  },
  // pill 386 at (812, 391); connector 127 to the right of the illustration.
  income: {
    pill: "left-203 top-97.75 w-max",
    line: "left-169.75 top-109.5 w-33.25",
    src: "/svg/connector-44.svg",
    width: 133,
  },
  // pill 388 at (791, 191), turned 1.1°; connector 167 up and right at −31.93°.
  simple: {
    pill: "left-197.75 top-47.75 w-max rotate-[1.1deg]",
    line: "left-160.5 top-80 w-43.5 rotate-[-31.93deg]",
    src: "/svg/connector-45.svg",
    width: 175,
  },
  // pill 425 at (−137, 370); connector 90 to its right, pointing left.
  "ready-clients": {
    pill: "-left-34.25 top-92.5 w-max",
    line: "left-99 top-104.5 w-24 rotate-180",
    src: "/svg/connector-46.svg",
    width: 95,
  },
  // pill 419 at (−145, 120), turned 0.76°; connector 134 up and left at −135°.
  "full-flexibility": {
    pill: "-left-36.25 top-30 w-max rotate-[0.76deg]",
    line: "left-96.25 top-72 w-35 rotate-[-135deg]",
    src: "/svg/connector-47.svg",
    width: 140,
  },
};

export function ProviderShowcase({
  full,
  pills,
  illustration,
  clickHere,
}: {
  /** The section's final state — the copy, email card, downloads and pills. */
  full: ReactNode;
  pills: StagePill[];
  illustration: ReactNode;
  clickHere: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<Stage>("full");
  const [active, setActive] = useState(false);

  useHoverTween(button, { backgroundColor: "var(--color-primary-500)" }, prototype.hover.card);

  // The stage only exists on the 1440 frame, with motion allowed.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 90rem) and ${MOTION_OK}`, () => {
        setActive(true);
        setStage("stage");
        return () => {
          setActive(false);
          setStage("full");
        };
      });
      return () => {
        mm.revert();
      };
    },
    { scope: ref },
  );

  // The build-up, once, when the stage comes into view.
  useGSAP(
    () => {
      if (!active) return;
      const { step } = prototype.provider;
      const groups = (Object.keys(HIDDEN) as (keyof typeof HIDDEN)[]).map(
        (id) => `[data-stage-group='${id}']`,
      );
      for (const [index, id] of (Object.keys(HIDDEN) as (keyof typeof HIDDEN)[]).entries()) {
        gsap.set(groups[index] ?? "", { ...HIDDEN[id], autoAlpha: 0 });
      }
      gsap.set("[data-click-here]", { autoAlpha: 0, scale: 0.9 });
      gsap.set("[data-provider-full]", { autoAlpha: 0 });
      gsap.set("[data-provider-stage]", { autoAlpha: 1 });

      const tl = gsap
        .timeline({ paused: true })
        .to(groups, { x: 0, y: 0, autoAlpha: 1, ...figmaTween(step), stagger: step.stagger })
        .to("[data-click-here]", { autoAlpha: 1, scale: 1, ...figmaTween(step) }, "-=0.2");
      const trigger = ScrollTrigger.create({
        trigger: "[data-provider-stage]",
        start: "top 70%",
        once: true,
        onEnter: () => {
          tl.play();
        },
      });

      // The hand in `Click here` leans in on hover instead of pulsing forever.
      const hand = ref.current?.querySelector("[data-hand]");
      const target = button.current;
      const grow = () => gsap.to(hand ?? [], { scale: 1.15, ...figmaTween(prototype.hover.lift) });
      const shrink = () => gsap.to(hand ?? [], { scale: 1, ...figmaTween(prototype.hover.lift) });
      target?.addEventListener("pointerenter", grow);
      target?.addEventListener("pointerleave", shrink);
      return () => {
        trigger.kill();
        tl.kill();
        target?.removeEventListener("pointerenter", grow);
        target?.removeEventListener("pointerleave", shrink);
      };
    },
    { scope: ref, dependencies: [active] },
  );

  // Click here → the full section, which stays.
  useGSAP(
    () => {
      if (!active || stage !== "full") return;
      const timing = figmaTween(prototype.provider.click);
      gsap.to("[data-provider-stage]", { autoAlpha: 0, ...timing });
      gsap.fromTo(
        "[data-provider-full]",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, ...timing },
      );
    },
    { scope: ref, dependencies: [stage] },
  );

  return (
    <div ref={ref} className="relative grid w-full max-w-desktop">
      <div
        data-provider-full=""
        // While the stage shows, the full section is laid out out of flow so it
        // leaves no empty space under the illustration.
        className={`col-start-1 row-start-1 self-center ${active && stage === "stage" ? "absolute inset-x-0 top-0" : ""}`}
        inert={active && stage !== "full"}
      >
        {full}
      </div>

      {active ? (
        <div
          data-provider-stage=""
          className="relative col-start-1 row-start-1 ms-29.5 mt-31.75 mb-11.75 h-212.5 w-224.75 opacity-0"
        >
          <div className="absolute inset-0">
            <div className="absolute top-44 left-0 h-168.5 w-224.75">{illustration}</div>

            {pills.map(({ id, pill }) => {
              const place = PLACES[id];
              return (
                <div key={id} data-stage-group={id} className="absolute inset-0">
                  <Image
                    src={place.src}
                    alt=""
                    width={place.width}
                    height={11}
                    unoptimized
                    className={`absolute h-2.75 origin-left ${place.line}`}
                  />
                  <div className={`absolute ${place.pill}`}>{pill}</div>
                </div>
              );
            })}

            {/* `Click here` (997:21359): 165x58, turned −28.97°, at (554, 561). */}
            <div
              data-click-here=""
              className="absolute top-140.25 left-138.5 flex h-32.75 w-43 items-center justify-center opacity-0"
            >
              <button
                ref={button}
                type="button"
                aria-expanded={false}
                onClick={() => {
                  setStage("full");
                }}
                className="flex h-14.5 w-41.25 rotate-[-28.97deg] items-center justify-center gap-1.75 rounded-button bg-secondary-500 px-5 py-2 text-24 font-semibold text-bg shadow-click focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                {clickHere}
                <span
                  data-hand=""
                  aria-hidden="true"
                  className="flex h-6.5 w-4.25 origin-bottom-left"
                >
                  <Image src="/svg/click-hand.svg" alt="" width={17} height={26} unoptimized />
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
