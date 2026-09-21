"use client";

import Image from "next/image";
import { type ReactNode, useRef, useState } from "react";

import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "@themap/ui/motion/gsap";
import { prototype } from "@themap/ui/motion/tokens";
import { useAfterDelay } from "@themap/ui/motion/use-after-delay";
import { useHoverTween } from "@themap/ui/motion/use-hover-tween";

/**
 * The provider sequence — Figma `Contact us` (`998:20842`), 1440 frame only.
 *
 * The page starts on `cart hide`: the provider illustration alone. Every 0.8 s,
 * 0.3 s ease-in-out:
 *   cart hide → cart 1        Wider Reach drops in from above with its connector;
 *   cart 1 → cart 5 hide      the other four pills wait off-stage, left and right;
 *   cart 5 hide → cart 5      they slide in, and a `Click here` button appears;
 * then it waits for a click, which opens the full section (`Frame 2147225994`, the
 * copy, email card and downloads), and 0.8 s later it starts again from `cart hide`.
 *
 * The 899x850 stage sits at (196, 127) in the 1440x1024 section — 118 px into the
 * 1284 px container, with 47 px under it so the section stays 1024 tall. Positions below
 * are in that stage, read from `998:20840` (cart 5); the connectors run from the
 * illustration to the dot beside each pill.
 *
 * On the web the timer waits while the pointer or keyboard focus is in the section,
 * so the copy stays while someone is reading it. Below 1440, and with reduced
 * motion, only the full section is shown.
 */

type Stage = "hide" | "one" | "fiveHide" | "five" | "full";

const NEXT: Record<Stage, Stage | null> = {
  hide: "one",
  one: "fiveHide",
  fiveHide: "five",
  five: null,
  full: "hide",
};

/** How far each pill group sits from its `cart 5` place in the hidden variants. */
const HIDDEN = {
  "wider-reach": { x: 0, y: -273 },
  income: { x: 243, y: 0 },
  simple: { x: 291, y: 0 },
  "ready-clients": { x: -413, y: 0 },
  "full-flexibility": { x: -413, y: 0 },
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
  const first = useRef(true);
  // Entering or leaving the sequence swaps layers without a transition.
  const jump = useRef(false);

  useHoverTween(button, { backgroundColor: "var(--color-primary-500)" }, prototype.hover.card);

  // The sequence only exists on the 1440 frame, with motion allowed.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 90rem) and ${MOTION_OK}`, () => {
        jump.current = true;
        setActive(true);
        setStage("hide");
        return () => {
          jump.current = true;
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

  useGSAP(
    () => {
      const instant = first.current || jump.current;
      first.current = false;
      jump.current = false;
      const timing = instant ? { duration: 0 } : figmaTween(prototype.provider.step);
      const staged = stage !== "full";
      gsap.to("[data-provider-full]", { autoAlpha: staged ? 0 : 1, ...timing });
      gsap.to("[data-provider-stage]", { autoAlpha: staged ? 1 : 0, ...timing });
      if (!staged) return;

      for (const id of Object.keys(HIDDEN) as (keyof typeof HIDDEN)[]) {
        const shown =
          id === "wider-reach" ? stage === "one" || stage.startsWith("five") : stage === "five";
        const present = id === "wider-reach" || stage.startsWith("five");
        const offset = shown ? { x: 0, y: 0 } : HIDDEN[id];
        gsap.to(`[data-stage-group='${id}']`, { ...offset, autoAlpha: present ? 1 : 0, ...timing });
      }
      // Only cart 5 lets the pills overhang the stage.
      gsap.set("[data-stage-clip]", { overflow: stage === "five" ? "visible" : "hidden" });
      gsap.to("[data-click-here]", { autoAlpha: stage === "five" ? 1 : 0, ...timing });
    },
    { scope: ref, dependencies: [stage] },
  );

  // Click `997:21182`: the hand grows to twice its size and back, every 0.8 s.
  useGSAP(
    () => {
      if (!active) return;
      const { hand } = prototype.provider;
      const tl = gsap
        .timeline({ repeat: -1 })
        .to("[data-hand]", { scale: 2, delay: hand.delay, ...figmaTween(hand) })
        .to("[data-hand]", { scale: 1, delay: hand.delay, ...figmaTween(hand) });
      return () => {
        tl.kill();
      };
    },
    { scope: ref, dependencies: [active] },
  );

  const next = NEXT[stage];
  const { step } = prototype.provider;
  useAfterDelay(ref, {
    key: stage,
    enabled: active && next !== null,
    // Only the full section holds while someone is in it; the build-up always plays.
    pauseOnHover: stage === "full",
    wait: step.duration + step.delay,
    onFire: () => {
      if (next) setStage(next);
    },
  });

  return (
    <div ref={ref} className="grid w-full max-w-container-desktop">
      <div
        data-provider-full=""
        className="col-start-1 row-start-1 self-center"
        inert={active && stage !== "full"}
      >
        {full}
      </div>

      {active ? (
        <div
          data-provider-stage=""
          className="invisible relative col-start-1 row-start-1 ms-29.5 mt-31.75 mb-11.75 h-212.5 w-224.75 opacity-0"
        >
          <div data-stage-clip="" className="absolute inset-0 overflow-hidden">
            <div className="absolute top-44 left-0 h-168.5 w-224.75">{illustration}</div>

            {pills.map(({ id, pill }) => {
              const place = PLACES[id];
              return (
                <div
                  key={id}
                  data-stage-group={id}
                  className="invisible absolute inset-0 opacity-0"
                >
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
              className="invisible absolute top-140.25 left-138.5 flex h-32.75 w-43 items-center justify-center opacity-0"
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
