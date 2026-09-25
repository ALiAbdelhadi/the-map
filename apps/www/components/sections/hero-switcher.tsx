"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { GlassCard } from "@themap/ui/components/glass-card";
import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, useGSAP } from "@themap/ui/motion/gsap";
import { prototype } from "@themap/ui/motion/tokens";

import type { SiteContent } from "../../content/types";
import { ORBIT } from "./hero-orbit-data";

/**
 * Hero service switcher.
 *
 * Figma `Hero section` (`898:20007`) has ten variants: the default ("The Map") and
 * one per service. Moving between them, the whole ring turns so the chosen service
 * reaches the top, where it is shown large; the card copy and the background change.
 *
 * Figma places every item by hand in every variant, so between two variants each
 * item moves and tilts by a different amount. The owner found that impossible to
 * follow on a phone (2026-09-25), so the ring is now a rigid dial:
 *
 * - The ten items sit in ten slots 36° apart, in ring order, around one fixed centre.
 *   Choosing item k turns the whole set by the same angle (the short way round) until
 *   k is at 12 o'clock, under a fixed dark marker. Nothing else moves on its own.
 * - Unselected items stay upright. Figma's tilts are different in every variant (the
 *   same item is at 63.7° in one and −32.7° in the next), so no tilt is "its own";
 *   upright keeps the artwork readable at every slot and nothing spins during a turn.
 * - The chosen item grows at the top (300 px of artwork, as approved 2026-09-22); the
 *   logo keeps Figma's default-state size and place.
 * - The chosen title is shown inside the ring (owner-approved addition, 2026-09-25 —
 *   docs/phase-5-deviations.md), so a tap has an answer where the eye already is.
 *
 * Geometry, in Figma pixels of the 669.642 x 767.626 orbit frame, from the default
 * variant (`ORBIT[0]` in hero-orbit-data.ts; checked in development below):
 * ring centre (331, 423.8); dots on radius 175.5 (the mean dot distance); artwork on
 * radius 265.7 (the mean service distance). Unselected artwork boxes are 150x100:
 * the Figma image (1408x768, mostly transparent margin) is drawn 156.7 % of the box
 * width so its artwork fills the box height — the box is the art, and the tap target.
 * 150 is the widest box that keeps neighbours apart: the slots at 144° and 180° are
 * 265.7 · sin 36° = 156.2 apart horizontally. The chosen service's box is 191.5x127.7
 * (300 px of image), lifted 8 px clear of its neighbours' tops (radius 336.8). The
 * logo is 83.2 wide in the ring (100 tall, like the services) and 162 on top
 * (radius 325, Figma's).
 *
 * Phone (`1041:26353`): the orbit box is at most 312 px wide (ring ≈ 175 px, approved
 * 2026-09-22) so every item stays on screen; items are ≥ 68 px wide down to 320.
 */

/** Lengths below are Figma px of the orbit frame, as container-query units (`100cqw/669.642`). */

/** Starting slot angle of each item (ring order), written out so Tailwind finds them. */
const SLOT = [
  "[--slot:0]",
  "[--slot:36]",
  "[--slot:72]",
  "[--slot:108]",
  "[--slot:144]",
  "[--slot:180]",
  "[--slot:216]",
  "[--slot:252]",
  "[--slot:288]",
  "[--slot:324]",
] as const;

/**
 * Polar placement. `--turn` (on the orbit, tweened) turns every slot at once;
 * `--rho` is the distance from the ring centre; `--lift` raises the phone logo.
 */
const POLAR = {
  angle: "[--a:calc((var(--slot)+var(--turn))*1deg)]",
  left: "left-[calc((331+var(--rho)*sin(var(--a)))*100cqw/669.642)]",
  top: "top-[calc((423.8-var(--rho)*cos(var(--a))-var(--lift,0))*100cqw/669.642)]",
} as const;

/** `--f` is 1 for the chosen item, 0 otherwise (tweened). */
const SERVICE = {
  rho: "[--rho:calc(265.7+71.1*var(--f))]",
  width: "aspect-[3/2] w-[calc((150+41.5*var(--f))*100cqw/669.642)]",
} as const;

/**
 * Phone logo (`1041:26353` → `Group` `1038:26412`): Figma draws "The Map" mark 121.6 px
 * wide, 36 px above the marker — larger, relative to the ring, than the 1440 geometry
 * gives it (75 px). Below the tablet breakpoint, while the logo is chosen, it is scaled
 * by 121.6 / 75.5 and lifted 98.4 frame px so its tip keeps Figma's 36 px gap.
 */
const LOGO = {
  rho: "[--rho:calc(265.7+59.3*var(--f))]",
  width: "aspect-[162/194.6] w-[calc((83.2+78.8*var(--f))*var(--k)*100cqw/669.642)]",
  vars: "[--k:1] max-tablet:[--k:calc(1+0.611*var(--f))] max-tablet:[--lift:calc(98.4*var(--f))]",
} as const;

const RING = {
  at: "left-[calc(331*100cqw/669.642)] top-[calc(423.8*100cqw/669.642)]",
  marker: "left-[calc(331*100cqw/669.642)] top-[calc((423.8-175.5)*100cqw/669.642)]",
  // Figma's default ring angle (−0.6°) plus the 1.7° that brings its marker to 12 o'clock.
  rotate: "rotate-[calc((1.1+var(--turn))*1deg)]",
} as const;

/** Hover / focus lift of an unselected item, and its pressed state. */
const LIFT = { scale: 1.08, pressed: 0.96, brightness: 1.12 } as const;

if (process.env.NODE_ENV !== "production") {
  // The literals above come from the default variant; warn if the data drifts.
  const figma = ORBIT[0];
  if (figma) {
    const [cx, cy] = figma.ring;
    const entries = Object.entries(figma.items);
    const mean = (values: number[]) => values.reduce((sum, v) => sum + v, 0) / values.length;
    const dot = mean(entries.map(([, i]) => Math.hypot(i[4] - cx, i[5] - cy)));
    const art = mean(
      entries.filter(([id]) => id !== "the-map").map(([, i]) => Math.hypot(i[0] - cx, i[1] - cy)),
    );
    if (cx !== 331 || cy !== 423.8 || Math.abs(dot - 175.5) > 0.1 || Math.abs(art - 265.7) > 0.1) {
      console.warn("hero-switcher: orbit geometry no longer matches ORBIT[0]", {
        cx,
        cy,
        dot,
        art,
      });
    }
  }
}

type Hero = SiteContent["hero"];
type Face = "hover" | "focus" | "press";

export function HeroSwitcher({ hero }: { hero: Hero }) {
  const [selected, setSelected] = useState(0);
  const scope = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);
  // The ring's turn now, unwrapped, so every turn takes the short way round.
  const turn = useRef(0);
  // Announce the card once the visitor has chosen something.
  const [announce, setAnnounce] = useState(false);

  // Slot 0 is the logo ("The Map"); slots 1–9 are the services in ring order.
  const slots = [{ id: "the-map" }, ...hero.services];
  const active = selected === 0 ? null : hero.services[selected - 1];
  const titles = [hero.title, ...hero.services.map((service) => service.title)];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const animate = !firstRun.current && !reduce;
      firstRun.current = false;

      const tween = animate
        ? { ...figmaTween(prototype.hero.click), overwrite: "auto" as const }
        : { duration: 0, overwrite: "auto" as const };

      const target = -36 * selected;
      const next = turn.current + ((((target - turn.current) % 360) + 540) % 360) - 180;
      turn.current = next;
      gsap.to("[data-orbit]", { "--turn": next, ...tween });

      slots.forEach((slot, index) => {
        gsap.to(`[data-orbit-art='${slot.id}']`, { "--f": index === selected ? 1 : 0, ...tween });
      });
      // The chosen item is no longer an action: drop any hover lift it had.
      const chosen = slots[selected];
      if (chosen) {
        gsap.to(`[data-orbit-art='${chosen.id}'] [data-orbit-face]`, {
          scale: 1,
          filter: "brightness(1)",
          ...(animate ? figmaTween(prototype.hover.lift) : { duration: 0 }),
          overwrite: "auto",
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-scene]").forEach((el) => {
        gsap.to(el, { autoAlpha: Number(el.dataset.scene) === selected ? 1 : 0, ...tween });
      });

      const copy = animate ? figmaTween(prototype.hero.copy) : { duration: 0 };
      gsap.utils.toArray<HTMLElement>("[data-orbit-title]").forEach((el) => {
        if (Number(el.dataset.orbitTitle) === selected) {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: animate ? 8 : 0 },
            { autoAlpha: 1, y: 0, ...copy, delay: animate ? 0.15 : 0, overwrite: "auto" },
          );
        } else {
          gsap.to(el, { autoAlpha: 0, y: 0, ...copy, overwrite: "auto" });
        }
      });
      if (animate) {
        gsap.fromTo(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, ...figmaTween(prototype.hero.copy), delay: 0.15 },
        );
      }
    },
    { scope, dependencies: [selected] },
  );

  /**
   * Hover (mouse), keyboard focus and press on an unselected item. The state lives on
   * the button (`data-hover`, `data-focus`, `data-press`) so the three combine.
   */
  const setFace = (button: HTMLElement, index: number, change: Partial<Record<Face, boolean>>) => {
    for (const [key, on] of Object.entries(change)) button.toggleAttribute(`data-${key}`, on);
    if (index === selected) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pressed = button.hasAttribute("data-press");
    const lifted = button.hasAttribute("data-hover") || button.hasAttribute("data-focus");
    const scale = reduce ? 1 : pressed ? LIFT.pressed : lifted ? LIFT.scale : 1;
    gsap.to(button.querySelector("[data-orbit-face]"), {
      scale,
      filter: `brightness(${lifted || pressed ? LIFT.brightness : 1})`,
      ...(reduce ? { duration: 0 } : figmaTween(prototype.hover.lift)),
      overwrite: "auto",
    });
  };

  const shown = (index: number) => (index === selected ? "" : "invisible opacity-0");

  return (
    <div
      ref={scope}
      className="flex w-full items-center justify-center px-2 pt-47.5 pb-3 tablet:px-8 tablet:pt-30 tablet:pb-12 desktop:min-h-256 desktop:py-0"
    >
      {/* Background scenes — Figma exports them already composited, so no extra opacity. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {[{ background: "/images/hero-map-scene.webp" }, ...hero.services].map((scene, index) => (
          <div
            key={scene.background}
            data-scene={index}
            className={`absolute inset-0 ${shown(index)}`}
          >
            <Image
              src={scene.background}
              alt=""
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-desktop flex-col items-center gap-18.75 tablet:gap-8 desktop:flex-row-reverse desktop:gap-16 desktop:items-end desktop:justify-center desktop:self-stretch desktop:pt-0">
        <div
          role="group"
          aria-label={hero.ringLabel}
          data-orbit=""
          className="@container relative aspect-[669.642/767.626] w-full max-w-78 shrink-0 [--turn:0] tablet:max-w-167.25"
        >
          {/* `Ellipse 1593` (888:20654), 375.8 px. */}
          <Image
            data-orbit-ring=""
            src="/svg/orbit-ring.svg"
            alt=""
            width={376}
            height={376}
            unoptimized
            className={`absolute size-[56.12cqw] -translate-x-1/2 -translate-y-1/2 ${RING.at} ${RING.rotate}`}
          />

          {/* Each item's 18 px primary/200 dot turns with it. */}
          {slots.map((slot, index) => (
            <span
              key={slot.id}
              data-orbit-dot={slot.id}
              aria-hidden="true"
              className={`absolute size-[calc(18*100cqw/669.642)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-200 [--rho:175.5] ${SLOT[index]} ${POLAR.angle} ${POLAR.left} ${POLAR.top}`}
            />
          ))}
          {/* The 32 px Secondary/500 marker stays at 12 o'clock; the chosen dot stops under it. */}
          <span
            data-orbit-marker=""
            aria-hidden="true"
            className={`absolute size-[calc(32*100cqw/669.642)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-500 ${RING.marker}`}
          />

          {/* The chosen title, inside the ring (owner-approved addition, 2026-09-25). */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute grid w-[calc(290*100cqw/669.642)] -translate-x-1/2 -translate-y-1/2 place-items-center text-center ${RING.at}`}
          >
            {titles.map((title, index) => (
              <span
                key={index}
                dir="auto"
                data-orbit-title={index}
                className={`col-start-1 row-start-1 text-20 font-bold text-balance text-bg tablet:text-38 ${shown(index)}`}
              >
                {title}
              </span>
            ))}
          </div>

          {slots.map((slot, index) => {
            const service = index === 0 ? null : hero.services[index - 1];
            return (
              <button
                key={slot.id}
                type="button"
                data-orbit-art={slot.id}
                aria-label={service ? service.title : hero.homeLabel}
                aria-pressed={selected === index}
                onClick={() => {
                  setAnnounce(true);
                  setSelected(index);
                }}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse")
                    setFace(event.currentTarget, index, { hover: true });
                }}
                onPointerLeave={(event) =>
                  setFace(event.currentTarget, index, { hover: false, press: false })
                }
                onPointerDown={(event) => setFace(event.currentTarget, index, { press: true })}
                onPointerUp={(event) => setFace(event.currentTarget, index, { press: false })}
                onPointerCancel={(event) => setFace(event.currentTarget, index, { press: false })}
                onFocus={(event) => {
                  if (event.currentTarget.matches(":focus-visible"))
                    setFace(event.currentTarget, index, { focus: true });
                }}
                onBlur={(event) => setFace(event.currentTarget, index, { focus: false })}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer aria-pressed:cursor-default focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bg ${index === 0 ? "[--f:1]" : "[--f:0]"} ${SLOT[index]} ${POLAR.angle} ${POLAR.left} ${POLAR.top} ${service ? `${SERVICE.rho} ${SERVICE.width}` : `${LOGO.rho} ${LOGO.width} ${LOGO.vars}`}`}
              >
                <span
                  data-orbit-face=""
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  {/*
                    The service artwork is Figma's own image fill: the full 1408x768 source
                    with its transparent margins, drawn 156.7 % of the box width so the
                    artwork itself fills the box.
                  */}
                  <Image
                    src={service ? service.image : "/svg/logo-mark.svg"}
                    alt=""
                    width={service ? 1408 : 165}
                    height={service ? 768 : 196}
                    unoptimized={!service}
                    sizes="(min-width: 90rem) 620px, 90vw"
                    className={service ? "h-auto w-[156.7%] max-w-none shrink-0" : "h-full w-full"}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <GlassCard className="flex h-76.25 w-full max-w-88 shrink-0 flex-col justify-center tablet:h-117.75 tablet:max-w-136 desktop:mb-37">
          <div
            data-hero-copy=""
            aria-live={announce ? "polite" : "off"}
            className="flex flex-col gap-10.25 tablet:gap-20"
          >
            <div dir="auto" className="flex flex-col gap-3">
              <h1 className="text-38 font-bold text-primary-300">
                {active ? active.title : hero.title}
              </h1>
              <span aria-hidden="true" className="h-1.25 w-35.5 rounded-full bg-primary-200" />
            </div>
            <p className="text-16 font-regular text-bg tablet:text-28 tablet:font-medium">
              {active ? (
                <>
                  {active.lead}
                  <br />
                  {active.body}
                </>
              ) : (
                hero.body
              )}
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
