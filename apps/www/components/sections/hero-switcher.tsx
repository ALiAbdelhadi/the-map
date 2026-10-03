"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { GlassCard } from "@themap/ui/components/glass-card";
import { figmaTween } from "@themap/ui/motion/figma-easing";
import { gsap, useGSAP } from "@themap/ui/motion/gsap";
import { SECTION_SCROLL_EVENT } from "@themap/ui/motion/scroll-to";
import { prototype } from "@themap/ui/motion/tokens";

import type { SiteContent } from "../../content/types";
import { ORBIT } from "./hero-orbit-data";

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

const POLAR = {
  angle: "[--a:calc((var(--slot)+var(--turn))*1deg)]",
  left: "left-[calc((331+var(--rho)*sin(var(--a)))*100cqw/669.642)]",
  top: "top-[calc((423.8-var(--rho)*cos(var(--a))-var(--lift,0))*100cqw/669.642)]",
} as const;

const SERVICE = {
  rho: "[--rho:calc(265.7+71.1*var(--f))]",
  width: "aspect-[3/2] w-[calc((150+41.5*var(--f))*100cqw/669.642)]",
} as const;

const LOGO = {
  rho: "[--rho:calc(265.7+59.3*var(--f))]",
  width: "aspect-[162/194.6] w-[calc((83.2+78.8*var(--f))*var(--k)*100cqw/669.642)]",
  vars: "[--k:1] max-tablet:[--k:calc(1+0.611*var(--f))] max-tablet:[--lift:calc(98.4*var(--f))]",
} as const;

const RING = {
  at: "left-[calc(331*100cqw/669.642)] top-[calc(423.8*100cqw/669.642)]",
  marker: "left-[calc(331*100cqw/669.642)] top-[calc((423.8-175.5)*100cqw/669.642)]",
  rotate: "rotate-[calc((1.1+var(--turn))*1deg)]",
} as const;

const AUTO_INTERVAL = 20_000;
const AUTO_RETRY = 250;

const LIFT = { scale: 1.08, pressed: 0.96, brightness: 1.12 } as const;

if (process.env.NODE_ENV !== "production") {
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
  const turn = useRef(0);
  const [announce, setAnnounce] = useState(false);

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
        gsap.to(el, {
          autoAlpha: Number(el.dataset.scene) === selected ? 1 : 0,
          ...tween,
          overwrite: true,
        });
      });

      const copy = animate ? figmaTween(prototype.hero.copy) : { duration: 0 };
      gsap.utils.toArray<HTMLElement>("[data-orbit-title]").forEach((el) => {
        if (Number(el.dataset.orbitTitle) === selected) {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: animate ? 8 : 0 },
            { autoAlpha: 1, y: 0, ...copy, delay: animate ? 0.15 : 0, overwrite: true },
          );
        } else {
          gsap.to(el, { autoAlpha: 0, y: 0, ...copy, overwrite: true });
        }
      });
      if (animate) {
        gsap.fromTo(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, ...figmaTween(prototype.hero.copy), delay: 0.15, overwrite: true },
        );
      }
    },
    { scope, dependencies: [selected] },
  );

  useEffect(() => {
    const root = scope.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const orbit = root.querySelector<HTMLElement>("[data-orbit]");
    const card = root.querySelector<HTMLElement>("[data-hero-copy]")?.parentElement;
    if (!orbit) return;

    const wait = { focus: false, hidden: document.hidden, away: true, scroll: false };
    let timer: ReturnType<typeof setTimeout> | undefined;

    const fire = () => {
      const turning = gsap.getTweensOf(orbit).some((tween) => tween.isActive());
      if (turning || wait.scroll) {
        timer = setTimeout(fire, AUTO_RETRY);
        return;
      }
      setAnnounce(false);
      setSelected((current) => (current + 1) % slots.length);
    };
    const sync = () => {
      clearTimeout(timer);
      timer = undefined;
      const paused = wait.focus || wait.hidden || wait.away || wait.scroll;
      if (!paused) timer = setTimeout(fire, AUTO_INTERVAL);
    };

    const zones = [orbit, card].filter((el): el is HTMLElement => Boolean(el));
    const cleanups: Array<() => void> = [];
    const on = <T extends EventTarget>(target: T, type: string, handler: EventListener) => {
      target.addEventListener(type, handler);
      cleanups.push(() => target.removeEventListener(type, handler));
    };
    for (const zone of zones) {
      on(zone, "focusin", (event) => {
        wait.focus = event.target instanceof Element && event.target.matches(":focus-visible");
        sync();
      });
      on(zone, "focusout", (event) => {
        const to = (event as FocusEvent).relatedTarget;
        wait.focus =
          to instanceof Element &&
          zones.some((el) => el.contains(to)) &&
          to.matches(":focus-visible");
        sync();
      });
    }
    on(document, "visibilitychange", () => {
      wait.hidden = document.hidden;
      sync();
    });
    on(window, SECTION_SCROLL_EVENT, (event) => {
      wait.scroll = (event as CustomEvent<string | null>).detail !== null;
      sync();
    });

    const watch = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        wait.away = !(
          entry.intersectionRatio >= 0.5 || entry.intersectionRect.height >= window.innerHeight / 2
        );
        sync();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    watch.observe(root);

    sync();
    return () => {
      clearTimeout(timer);
      watch.disconnect();
      cleanups.forEach((off) => off());
    };
  }, [selected, slots.length]);

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
      className="flex w-full items-center justify-center px-2 pt-47.5 pb-3 tablet:px-8 tablet:pt-30 tablet:pb-12 desktop:min-h-[calc(1024*var(--scale-landscape))] desktop:py-0"
    >
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

      <div className="flex w-full max-w-desktop flex-col items-center gap-18.75 tablet:gap-8 desktop:flex-row-reverse desktop:gap-[calc(64*var(--scale-landscape))] desktop:items-end desktop:justify-center desktop:self-stretch desktop:pt-0">
        <div
          role="group"
          aria-label={hero.ringLabel}
          data-orbit=""
          className="@container relative aspect-[669.642/767.626] w-full max-w-78 shrink-0 [--turn:0] tablet:max-w-167.25 desktop:w-[calc(669.642*var(--scale-landscape))]"
        >
          <Image
            data-orbit-ring=""
            src="/svg/orbit-ring.svg"
            alt=""
            width={376}
            height={376}
            unoptimized
            className={`absolute size-[56.12cqw] -translate-x-1/2 -translate-y-1/2 ${RING.at} ${RING.rotate}`}
          />

          {slots.map((slot, index) => (
            <span
              key={slot.id}
              data-orbit-dot={slot.id}
              aria-hidden="true"
              className={`absolute size-[calc(18*100cqw/669.642)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-200 [--rho:175.5] ${SLOT[index]} ${POLAR.angle} ${POLAR.left} ${POLAR.top}`}
            />
          ))}
          <span
            data-orbit-marker=""
            aria-hidden="true"
            className={`absolute size-[calc(32*100cqw/669.642)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-500 ${RING.marker}`}
          />

          <div
            aria-hidden="true"
            className={`pointer-events-none absolute grid w-[calc(290*100cqw/669.642)] -translate-x-1/2 -translate-y-1/2 place-items-center text-center ${RING.at}`}
          >
            {titles.map((title, index) => (
              <span
                key={index}
                dir="auto"
                data-orbit-title={index}
                className={`col-start-1 row-start-1 text-20 font-bold text-balance text-bg tablet:text-38 desktop:text-[length:calc(38*100cqw/669)] ${shown(index)}`}
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
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none aria-pressed:cursor-default focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bg ${index === 0 ? "[--f:1]" : "[--f:0]"} ${SLOT[index]} ${POLAR.angle} ${POLAR.left} ${POLAR.top} ${service ? `${SERVICE.rho} ${SERVICE.width}` : `${LOGO.rho} ${LOGO.width} ${LOGO.vars}`}`}
              >
                <span
                  data-orbit-face=""
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
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

        <GlassCard className="flex h-76.25 w-full max-w-88 shrink-0 flex-col justify-center tablet:h-117.75 tablet:max-w-136 desktop:mb-[calc(148*var(--scale-landscape))] desktop:h-[calc(471*var(--scale-landscape))] desktop:max-w-[calc(544*var(--scale-landscape))] desktop:rounded-[calc(32*var(--scale-landscape))] desktop:p-[calc(24*var(--scale-landscape))]">
          <div
            data-hero-copy=""
            aria-live={announce ? "polite" : "off"}
            className="flex flex-col gap-10.25 tablet:gap-20 desktop:gap-[calc(80*var(--scale-landscape))]"
          >
            <div
              dir="auto"
              className="flex flex-col gap-3 desktop:gap-[calc(12*var(--scale-landscape))]"
            >
              <h1 className="text-38 font-bold text-primary-300 desktop:text-[length:calc(38*var(--scale-landscape))]">
                {active ? active.title : hero.title}
              </h1>
              <span
                aria-hidden="true"
                className="h-1.25 w-35.5 rounded-full bg-primary-200 desktop:h-[calc(5*var(--scale-landscape))] desktop:w-[calc(142*var(--scale-landscape))]"
              />
            </div>
            <p className="text-16 font-regular text-bg tablet:text-28 tablet:font-medium desktop:text-[length:calc(28*var(--scale-landscape))]">
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
