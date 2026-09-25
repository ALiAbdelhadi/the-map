"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { GlassCard } from "@themap/ui/components/glass-card";
import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, useGSAP } from "@themap/ui/motion/gsap";
import { prototype } from "@themap/ui/motion/tokens";

import type { SiteContent } from "../../content/types";
import { ITEM_START, ORBIT, RING_START } from "./hero-orbit-data";
import type { OrbitItem, OrbitState } from "./hero-orbit-data";

/**
 * Hero service switcher.
 *
 * Figma `Hero section` (`898:20007`) has ten variants: the default ("The Map") and
 * one per service. Moving between them, the whole ring turns so the chosen service
 * reaches the top, where it is shown large; the logo drops back into the ring; the
 * card copy and the background scene change.
 *
 * Every variant places every item by hand, and Smart Animate moves each one — the
 * same layer in both variants — straight to its place in the next: the chosen
 * service grows from 120 px on the ring to ~560 px at the top, the others travel
 * round, the ring itself shifts and turns (−0.6°, −26.2°, −51.3° …), and each item's
 * dot slides along it (18 px, or the 32 px dark marker under the item on top).
 * `hero-orbit-data.ts` holds those places per variant, exactly as Figma has them;
 * GSAP tweens each item's CSS variables from one variant's values to the next's.
 * Rotations take the short way round.
 *
 * Only a click changes the state (no auto-advance, approved 2026-09-22); the move
 * takes 0.7 s on a strong ease-in-out, and the card copy follows with a short rise.
 *
 * Phone (`1041:26353`, 375 frame): Figma's ring is 218 px, but the items reach past
 * the orbit frame on both sides, so at that size the outermost ones were cut off by
 * the screen edge. The orbit box is 312 px wide instead (ring ≈ 175 px), which keeps
 * every item on screen (approved 2026-09-22). The box starts 142 px down so the ring centre lands at y 387; the card is
 * 352x305 (content centred, as Figma clips it), 75 px below, with a 16 px regular body and a 41 px title gap.
 * 1440 frame: the orbit frame sits at (689, 256) and reaches the bottom of the
 * 1024 px section; the card is 544x471 at (81, 405), 148 px above the bottom.
 * The phone variants (`1038:26404`) hug their content, so their frames have no common
 * origin; the 1440 geometry, scaled, is used there.
 */

/** Figma pixels of the 669.642 px orbit frame, as container-query units. */
/** Width of the chosen service on top, in Figma pixels of the orbit frame. */
const FEATURED_WIDTH = 300;

const AT = {
  left: "left-[calc(var(--cx)*100cqw/669.642)]",
  top: "top-[calc(var(--cy)*100cqw/669.642)]",
  width: "w-[calc(var(--w)*100cqw/669.642)]",
  size: "size-[calc(var(--s)*100cqw/669.642)]",
  rotate: "rotate-[calc(var(--r)*1deg)]",
} as const;

/**
 * Phone logo (`1041:26353` → `Group` `1038:26412`): Figma draws "The Map" mark 121.6 px
 * wide, 36 px above the marker on the ring — larger, relative to the ring, than the 1440
 * geometry gives it (75 px). Below the tablet breakpoint, while the logo is the chosen
 * item (`--on` 1 → 0 as it drops into the ring), it is scaled by 121.6 / 75.5 and lifted
 * 98.4 frame px so its tip keeps Figma's 36 px gap. Above it, `--k` and `--lift` are inert.
 */
const LOGO = {
  width: "w-[calc(var(--w)*var(--k)*100cqw/669.642)]",
  top: "top-[calc((var(--cy)-var(--lift))*100cqw/669.642)]",
  vars: "[--on:1] [--k:1] [--lift:0] max-tablet:[--k:calc(1+0.611*var(--on))] max-tablet:[--lift:calc(98.4*var(--on))]",
} as const;

/**
 * Figma places each variant by hand, so its ring centre drifts and the marker lands
 * up to 12° off 12 o'clock. The owner asked (2026-09-25) for the ring and marker to
 * stay put, so each variant is turned about its ring centre until the marker is at
 * 12 o'clock, moved onto the first variant's centre, and every dot is snapped to
 * one radius (the mean across all variants) so it sits on the ring line.
 */
const [CENTRE_X, CENTRE_Y] = ORBIT[0]?.ring ?? [0, 0];
const DOT_RADIUS = (() => {
  const radii = ORBIT.flatMap(({ ring: [cx, cy], items }) =>
    Object.values(items).map(([, , , , dx, dy]) => Math.hypot(dx - cx, dy - cy)),
  );
  return radii.reduce((sum, r) => sum + r, 0) / radii.length;
})();

function upright({ ring: [cx, cy, rr], items }: OrbitState): OrbitState {
  const marker = Object.values(items).find(([, , , , , , dot]) => dot > 18);
  // Clockwise from 12 o'clock, in screen coordinates (y down).
  const delta = marker ? Math.atan2(marker[4] - cx, -(marker[5] - cy)) : 0;
  const cos = Math.cos(delta);
  const sin = Math.sin(delta);
  const deg = (delta * 180) / Math.PI;
  const turn = (x: number, y: number): [number, number] => [
    (x - cx) * cos + (y - cy) * sin,
    (y - cy) * cos - (x - cx) * sin,
  ];
  return {
    ring: [CENTRE_X, CENTRE_Y, rr - deg],
    items: Object.fromEntries(
      Object.entries(items).map(
        ([id, [fx, fy, fw, rotation, dx, dy, dot]]): [string, OrbitItem] => {
          const [ax, ay] = turn(fx, fy);
          const [px, py] = turn(dx, dy);
          const k = DOT_RADIUS / Math.hypot(px, py);
          return [
            id,
            [
              CENTRE_X + ax,
              CENTRE_Y + ay,
              fw,
              rotation - deg,
              CENTRE_X + px * k,
              CENTRE_Y + py * k,
              dot,
            ],
          ];
        },
      ),
    ),
  };
}

type Hero = SiteContent["hero"];

export function HeroSwitcher({ hero }: { hero: Hero }) {
  const [selected, setSelected] = useState(0);
  const scope = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);
  // The rotation each element is at now, unwrapped, so every turn takes the short way.
  const turned = useRef<Record<string, number>>({});
  // Announce the card once the visitor has chosen something.
  const [announce, setAnnounce] = useState(false);

  // Slot 0 is the logo ("The Map"); slots 1–9 are the services in ring order.
  const slots = [{ id: "the-map" }, ...hero.services];
  const active = selected === 0 ? null : hero.services[selected - 1];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const animate = !firstRun.current && !reduce;
      firstRun.current = false;

      const tween = animate ? figmaTween(prototype.hero.click) : { duration: 0 };

      const figma = ORBIT[selected];
      if (!figma) return;
      const state = upright(figma);
      const turn = (key: string, rotation: number) => {
        const now = turned.current[key] ?? rotation;
        const next = now + (((((rotation - now) % 360) + 540) % 360) - 180);
        turned.current[key] = next;
        return next;
      };

      const [rx, ry, rr] = state.ring;
      gsap.to("[data-orbit-ring]", { "--cx": rx, "--cy": ry, "--r": turn("ring", rr), ...tween });

      for (const [id, [fx, fy, fw, rotation, dx, dy, dot]] of Object.entries(state.items)) {
        // The chosen service is shown at 300 px, centred just above its marker, rather
        // than Figma's ~560 px — approved 2026-09-22 so it stays in proportion with the
        // ring (and clear of the header on the phone). The logo keeps Figma's size.
        const featured = dot > 18 && id !== "the-map";
        const width = featured ? FEATURED_WIDTH : fw;
        const cx = featured ? dx : fx;
        const cy = featured ? dy - 16 - (FEATURED_WIDTH * 65) / 120 / 2 - 8 : fy;
        gsap.to(`[data-orbit-art='${id}']`, {
          "--cx": cx,
          "--cy": cy,
          "--w": width,
          "--r": turn(id, rotation),
          ...(id === "the-map" ? { "--on": selected === 0 ? 1 : 0 } : {}),
          ...tween,
        });
        gsap.to(`[data-orbit-dot='${id}']`, { "--cx": dx, "--cy": dy, "--s": dot, ...tween });
        gsap.to(`[data-orbit-dot='${id}'] > span`, { opacity: dot > 18 ? 1 : 0, ...tween });
      }
      gsap.utils.toArray<HTMLElement>("[data-scene]").forEach((el) => {
        gsap.to(el, { autoAlpha: Number(el.dataset.scene) === selected ? 1 : 0, ...tween });
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
          className="@container relative aspect-[669.642/767.626] w-78 shrink-0 tablet:w-full tablet:max-w-167.25"
        >
          {/* `Ellipse 1593` (888:20654), 375.8 px. */}
          <Image
            data-orbit-ring=""
            src="/svg/orbit-ring.svg"
            alt=""
            width={376}
            height={376}
            unoptimized
            className={`absolute size-[56.12cqw] -translate-x-1/2 -translate-y-1/2 ${AT.left} ${AT.top} ${AT.rotate} ${RING_START}`}
          />

          {/* Each item's dot on the ring: 18 px primary/200, or the 32 px Secondary/500 marker. */}
          {slots.map((slot) => (
            <span
              key={slot.id}
              data-orbit-dot={slot.id}
              aria-hidden="true"
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-200 ${AT.left} ${AT.top} ${AT.size} ${ITEM_START[slot.id]?.dot ?? ""}`}
            >
              <span
                className={`absolute inset-0 rounded-full bg-secondary-500 ${slot.id === "the-map" ? "" : "opacity-0"}`}
              />
            </span>
          ))}

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
                className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bg ${service ? `aspect-[120/65] ${AT.top} ${AT.width}` : `aspect-[162/194.6] ${LOGO.top} ${LOGO.width} ${LOGO.vars}`} ${AT.left} ${AT.rotate} ${ITEM_START[slot.id]?.art ?? ""}`}
              >
                {/*
                  The service artwork is Figma's own image fill: the full 1408x768 source
                  with its transparent margins, filling the 120x65 frame — so it sits and
                  scales inside the frame exactly as in Figma.
                */}
                <Image
                  src={service ? service.image : "/svg/logo-mark.svg"}
                  alt=""
                  width={service ? 1408 : 165}
                  height={service ? 768 : 196}
                  unoptimized={!service}
                  sizes="(min-width: 90rem) 620px, 90vw"
                  className="h-full w-full object-cover"
                />
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
