"use client";

import Image from "next/image";
import { type ReactNode, useRef, useState } from "react";

import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "@themap/ui/motion/gsap";
import { revealOnce } from "@themap/ui/motion/reveal";
import { prototype } from "@themap/ui/motion/tokens";
import { useHoverTween } from "@themap/ui/motion/use-hover-tween";

type Stage = "stage" | "full";

const STAGE_MEDIA = "(min-width: 63.9375rem)";

const HIDDEN = {
  "wider-reach": { x: 0, y: -90 },
  income: { x: 80, y: 0 },
  simple: { x: 96, y: 0 },
  "ready-clients": { x: -136, y: 0 },
  "full-flexibility": { x: -136, y: 0 },
} as const;

export type StagePill = { id: keyof typeof HIDDEN; pill: ReactNode };

const PLACES: Record<
  keyof typeof HIDDEN,
  { pill: string; line: string; src: string; width: number }
> = {
  "wider-reach": {
    pill: "left-81.75 top-0 w-max rotate-[-0.82deg]",
    line: "left-131.5 top-64 w-35 -rotate-90",
    src: "/svg/connector-43.svg",
    width: 140,
  },
  income: {
    pill: "left-203 top-97.75 w-max",
    line: "left-169.75 top-109.5 w-33.25",
    src: "/svg/connector-44.svg",
    width: 133,
  },
  simple: {
    pill: "left-197.75 top-47.75 w-max rotate-[1.1deg]",
    line: "left-160.5 top-80 w-43.5 rotate-[-31.93deg]",
    src: "/svg/connector-45.svg",
    width: 175,
  },
  "ready-clients": {
    pill: "-left-34.25 top-92.5 w-max",
    line: "left-99 top-104.5 w-24 rotate-180",
    src: "/svg/connector-46.svg",
    width: 95,
  },
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
  full: ReactNode;
  pills: StagePill[];
  illustration: ReactNode;
  clickHere: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<Stage>("full");
  const [active, setActive] = useState(false);
  const opened = useRef(false);

  useHoverTween(button, { backgroundColor: "var(--color-primary-500)" }, prototype.hover.card);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${STAGE_MEDIA} and ${MOTION_OK}`, () => {
        setActive(true);
        setStage(opened.current ? "full" : "stage");
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

  useGSAP(
    () => {
      if (!active || opened.current) return;
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
      const trigger = revealOnce({
        trigger: ref.current?.querySelector("[data-provider-stage]") ?? "[data-provider-stage]",
        start: "top 70%",
        reveal: (instant) => {
          if (instant) tl.progress(1);
          else tl.play();
        },
      });

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
    { scope: ref, dependencies: [active], revertOnUpdate: true },
  );

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
        className={`col-start-1 row-start-1 self-center ${active && stage === "stage" ? "absolute inset-x-0 top-0" : ""}`}
        inert={active && stage !== "full"}
      >
        {full}
      </div>

      {active ? (
        <div
          data-provider-stage=""
          inert={stage !== "stage"}
          className={`${stage === "stage" ? "" : "invisible "}relative col-start-1 row-start-1 mr-auto ml-29.5 mt-31.75 mb-11.75 h-212.5 w-224.75 opacity-0 max-wide:mx-auto max-wide:-translate-x-18.5 max-wide:[--spacing:var(--provider-stage-unit)] max-wide:[--text-20:calc(var(--provider-stage-unit)*5)] max-wide:[--text-24:calc(var(--provider-stage-unit)*6)]`}
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

            <div
              data-click-here=""
              className="absolute top-140.25 left-138.5 flex h-32.75 w-43 items-center justify-center opacity-0"
            >
              <button
                ref={button}
                type="button"
                aria-expanded={false}
                onClick={() => {
                  opened.current = true;
                  setStage("full");
                }}
                className="flex h-14.5 w-41.25 rotate-[-28.97deg] items-center justify-center gap-1.75 rounded-button bg-secondary-500 px-5 py-2 text-24 font-semibold text-bg shadow-click select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
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
