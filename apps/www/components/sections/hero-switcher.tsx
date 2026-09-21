"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { GlassCard } from "@themap/ui/components/glass-card";
import { gsap, useGSAP } from "@themap/ui/motion/gsap";
import { motion } from "@themap/ui/motion/tokens";

import type { SiteContent } from "../../content/types";

/**
 * Hero service switcher.
 *
 * Figma `Hero section` (`898:20007`) has ten variants: the default ("The Map") and
 * one per service. Moving between them, the whole ring turns so the chosen service
 * reaches the top, where it is shown large; the logo drops back into the ring; the
 * card copy and the background scene change.
 *
 * Figma places each variant's icons by hand and the spacing is irregular, so the
 * ring here is ten even slots (36° apart, in the default variant's clockwise order)
 * at the radius the default variant uses. Every geometry value below is from the
 * default variant `898:20006`, in container-query units of its 669.642 px orbit box.
 */

const BOX = 669.642;
const u = (px: number) => `${((px / BOX) * 100).toFixed(3)}cqw`;

/** Ring centre, ring size and icon radius, from `898:20006`. */
const CENTER = { x: 331, y: 423.8 };
const RING = 376;
const RADIUS = 260;
/** Where the featured (top) item sits — the default variant's logo position. */
const FEATURED = { x: 331, y: 134 };
const STEP = 36;

type Hero = SiteContent["hero"];

export function HeroSwitcher({ hero }: { hero: Hero }) {
  const [selected, setSelected] = useState(0);
  const scope = useRef<HTMLDivElement>(null);
  const wheel = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const firstRun = useRef(true);

  // Slot 0 is the logo ("The Map"); slots 1–9 are the services in ring order.
  const slots = [{ id: "the-map" }, ...hero.services];
  const active = selected === 0 ? null : hero.services[selected - 1];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const animate = !firstRun.current && !reduce;
      firstRun.current = false;

      const duration = animate ? motion.hero.duration : 0;
      const fade = animate ? motion.hero.fade : 0;

      // Turn the short way round to bring the selected slot to the top.
      const target = -selected * STEP;
      const delta = ((((target - angle.current) % 360) + 540) % 360) - 180;
      angle.current += delta;
      gsap.to(wheel.current, { rotation: angle.current, duration, ease: motion.hero.ease });

      gsap.utils.toArray<HTMLElement>("[data-slot]").forEach((el) => {
        gsap.to(el, { autoAlpha: Number(el.dataset.slot) === selected ? 0 : 1, duration: fade });
      });
      gsap.utils.toArray<HTMLElement>("[data-featured]").forEach((el) => {
        gsap.to(el, { autoAlpha: Number(el.dataset.featured) === selected ? 1 : 0, duration });
      });
      gsap.utils.toArray<HTMLElement>("[data-scene]").forEach((el) => {
        gsap.to(el, { autoAlpha: Number(el.dataset.scene) === selected ? 1 : 0, duration });
      });
      if (animate) {
        gsap.from("[data-hero-copy]", {
          autoAlpha: 0,
          y: motion.swap.distance,
          duration: motion.swap.duration,
          ease: motion.swap.ease,
        });
      }
    },
    { scope, dependencies: [selected] },
  );

  const hidden = (index: number) => (index === selected ? "invisible opacity-0" : "");
  const shown = (index: number) => (index === selected ? "" : "invisible opacity-0");

  return (
    <div
      ref={scope}
      className="flex w-full items-center justify-center px-4 py-24 tablet:px-8 desktop:min-h-256 desktop:py-0"
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

      <div className="flex w-full max-w-container-desktop flex-col items-center gap-16 pt-16 desktop:flex-row-reverse desktop:justify-center desktop:pt-0">
        <div
          role="group"
          aria-label={hero.ringLabel}
          className="@container relative w-full max-w-167.25 shrink-0"
          style={{ aspectRatio: "669.642 / 767.626" }}
        >
          {/* `Ellipse 1593` (888:20654) */}
          <div
            ref={wheel}
            className="absolute"
            style={{
              left: u(CENTER.x - RADIUS),
              top: u(CENTER.y - RADIUS),
              width: u(RADIUS * 2),
              height: u(RADIUS * 2),
            }}
          >
            <Image
              src="/svg/orbit-ring.svg"
              alt=""
              width={376}
              height={376}
              unoptimized
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: u(RING), height: u(RING) }}
            />

            {slots.map((slot, index) => {
              const isHome = index === 0;
              const service = isHome ? null : hero.services[index - 1];
              return (
                <button
                  key={slot.id}
                  type="button"
                  data-slot={index}
                  aria-label={service ? service.title : hero.homeLabel}
                  aria-pressed={selected === index}
                  onClick={() => {
                    setSelected(index);
                  }}
                  className={`absolute top-1/2 left-1/2 flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bg ${hidden(index)}`}
                  style={{
                    width: u(isHome ? 62 : 74),
                    height: u(isHome ? 74 : 74),
                    transform: `translate(-50%, -50%) rotate(${index * STEP}deg) translateY(-${u(RADIUS)}) rotate(-${index * STEP}deg)`,
                  }}
                >
                  <Image
                    src={service ? service.image : "/svg/logo-mark.svg"}
                    alt=""
                    width={service ? 360 : 165}
                    height={service ? 260 : 196}
                    unoptimized={!service}
                    className="h-auto w-full"
                  />
                </button>
              );
            })}
          </div>

          {/* Featured item at the top — the logo by default, otherwise the service, large. */}
          {slots.map((slot, index) => {
            const service = index === 0 ? null : hero.services[index - 1];
            return (
              <div
                key={slot.id}
                data-featured={index}
                aria-hidden="true"
                className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${shown(index)}`}
                style={{ left: u(FEATURED.x), top: u(FEATURED.y), width: u(service ? 300 : 165) }}
              >
                <Image
                  src={service ? service.imageLarge : "/svg/logo-mark.svg"}
                  alt=""
                  width={service ? 760 : 165}
                  height={service ? 550 : 196}
                  unoptimized={!service}
                  sizes="(min-width: 90rem) 300px, 45vw"
                  className="h-auto w-full"
                />
              </div>
            );
          })}
        </div>

        <GlassCard className="w-full max-w-136 shrink-0">
          <div data-hero-copy="" aria-live="polite" className="flex flex-col gap-20">
            <div dir="auto" className="flex flex-col gap-3">
              <h1 className="text-38 font-bold text-primary-300">
                {active ? active.title : hero.title}
              </h1>
              <span aria-hidden="true" className="h-1.25 w-35.5 rounded-full bg-primary-200" />
            </div>
            <p className="text-28 font-medium text-bg">
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
