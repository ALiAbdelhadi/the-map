import Image from "next/image";

import { GlassCard } from "@themap/ui/components/glass-card";

import type { SiteContent } from "../../content/types";

/**
 * Hero.
 *
 * Figma `Hero section` `898:20007`, default variant `898:20006` (1440x1024):
 * fill primary/800, the map render `image 6651` behind it at 16 % opacity, a row
 * with 64 px gap holding the 669.642x767.626 orbit block and the 544x471 glass
 * card. Orbit positions are the Figma coordinates expressed as percentages of
 * that block, so the whole composition scales without re-measuring.
 *
 * The hero has ten variants in Figma — one per service — which swap the card
 * copy and the centre illustration. That is an interaction, so it lands in
 * Phase 6; this renders the default state.
 */

type OrbitItem = { id: string; left: number; top: number };

/** Percentages of the 669.642 x 767.626 orbit block, from `898:20006`. */
const ORBIT: OrbitItem[] = [
  { id: "real-estate", left: 4.19, top: 52.29 },
  { id: "blinkz", left: 13.11, top: 35.86 },
  { id: "service", left: 69.85, top: 19.36 },
  { id: "food", left: 12.83, top: 76.17 },
  { id: "needed", left: 73.3, top: 35.25 },
  { id: "special", left: 33.0, top: 90.65 },
  { id: "medical", left: 91.39, top: 53.62 },
  { id: "employee", left: 84.76, top: 75.67 },
  { id: "emergency", left: 63.7, top: 92.0 },
];

export function HeroSection({ content }: { content: SiteContent }) {
  const services = new Map(content.hero.services.map((service) => [service.id, service]));

  return (
    <section
      id="about"
      className="relative isolate flex w-full flex-col items-center justify-center overflow-hidden bg-primary-800 px-4 py-24 tablet:px-8 desktop:min-h-[1024px] desktop:py-0"
    >
      <Image
        src="/images/hero-map-scene.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-16"
      />

      <div className="flex w-full max-w-container-desktop flex-col items-center gap-16 desktop:flex-row-reverse desktop:justify-center">
        <div
          role="img"
          aria-label={content.hero.ringLabel}
          className="relative w-full max-w-[669px] shrink-0"
          style={{ aspectRatio: "669.642 / 767.626" }}
        >
          {/* `Ellipse 1593` (888:20654): 26 px ring, gradient primary/500 → white. */}
          <Image
            src="/svg/orbit-ring.svg"
            alt=""
            width={376}
            height={376}
            unoptimized
            className="absolute"
            style={{ left: "21.05%", top: "31%", width: "56.74%", height: "auto" }}
          />
          <Image
            src="/svg/logo-mark.svg"
            alt=""
            width={165}
            height={196}
            className="absolute"
            style={{ left: "35%", top: "1%", width: "25%", height: "auto" }}
          />
          {ORBIT.map((item) => {
            const service = services.get(item.id);
            if (!service) return null;
            return (
              <Image
                key={item.id}
                src={service.image}
                alt=""
                width={360}
                height={260}
                className="absolute"
                style={{ left: `${item.left}%`, top: `${item.top}%`, width: "11%", height: "auto" }}
              />
            );
          })}
        </div>

        <GlassCard className="w-full max-w-136 shrink-0">
          <div className="flex flex-col gap-20">
            <div dir="auto" className="flex flex-col gap-3">
              <h1 className="text-38 font-bold text-primary-300">{content.hero.title}</h1>
              <span aria-hidden="true" className="h-[5px] w-35.5 rounded-full bg-primary-200" />
            </div>
            <p className="text-28 font-medium text-bg">{content.hero.body}</p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
