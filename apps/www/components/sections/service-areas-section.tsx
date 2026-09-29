import Image from "next/image";

import { SearchField } from "@themap/ui/components/search-field";
import { AreasIcon } from "@themap/ui/icons/areas";
import { FocusIcon } from "@themap/ui/icons/focus";

import type { SiteContent } from "../../content/types";
import { AvailabilityButton } from "./availability-button";
import { ServiceAreasTitle } from "./service-areas-title";

/**
 * Service Areas.
 *
 * Figma `963:20233` / `1028:20709` (1440x1024): the `grok-video` render fills
 * the section, over it a centred column with an 80 px gap — a 100 px bold
 * Secondary/500 title, a 48 px semibold Natural/BG subtitle — then the 607 px
 * search field, then the 48 px tall Secondary/500 CTA with radius 37.
 *
 * Figma's title box is 90 px tall around the 100 px line; the heading keeps its
 * full line box (no clipped glyphs, Latin or Arabic) and gives back the 70 px
 * with negative margins so the column keeps Figma's rhythm. The 768 frame
 * (`1037:30012`) sets the column 326 px down rather than centring it.
 *
 * Responsive (2026-09-26): from 768 the English title is capped by the viewport
 * (`--text-area-title`) so the hover swap to the wider "Where We Operate" is never
 * clipped — 91 px at 768, Figma's 100 px from ~838. The Arabic titles fit at 100 px.
 * From 1023 to 1439 the section is the 1440 frame's height scaled with the viewport
 * (`--spacing-area-desktop`, 727 px at 1023); the column stays at its 1440 size, which
 * fits every width in that range.
 */
export function ServiceAreasSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="service-areas"
      className="relative isolate flex w-full justify-center overflow-hidden py-16.5 tablet:min-h-291.5 tablet:items-start tablet:px-3.5 tablet:pt-81.5 tablet:pb-0 desktop:min-h-area-desktop desktop:items-center desktop:py-0 wide:min-h-256"
    >
      <Image
        src="/images/service-areas-scene.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/*
        The Figma fill is a video (`974:20033`, 464x688 source, 6 s), 1441x2136 at
        y -346 in the 1024 tall frame: 346 / (2136 - 1024) = 31.1% down. The still
        above stays as the poster and as the reduced-motion fallback.
      */}
      <video
        src="/video/service-areas.mp4"
        poster="/images/service-areas-scene.webp"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 -z-20 size-full object-cover object-[50%_31.1%] motion-reduce:hidden"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary-300/80" />

      <form
        className="flex w-full max-w-185.25 flex-col items-center gap-8 tablet:gap-17"
        action="#"
      >
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center gap-20">
            <ServiceAreasTitle
              title={content.serviceAreas.title}
              titleAlt={content.serviceAreas.titleAlt}
              className="py-5 text-center text-32 font-bold text-secondary-500 tablet:-my-8.75 tablet:py-0 tablet:text-area-title tablet:rtl:text-100"
            />
            <p className="max-w-3xl px-3.5 text-center text-24 font-medium text-bg tablet:px-0 tablet:text-48 tablet:font-semibold">
              {content.serviceAreas.subtitle}
            </p>
          </div>

          {/* A 16 px gutter on the narrowest phones; at 375 the 341 px field fits as drawn. */}
          <div className="flex w-full justify-center px-4 tablet:px-0">
            <SearchField
              name="area"
              label={content.serviceAreas.searchLabel}
              placeholder={content.serviceAreas.searchPlaceholder}
              actionLabel={content.serviceAreas.locateLabel}
              icon={<AreasIcon />}
              actionIcon={<FocusIcon />}
              className="w-full max-w-85.25 tablet:max-w-151.75"
            />
          </div>
        </div>

        <AvailabilityButton>{content.serviceAreas.cta}</AvailabilityButton>
      </form>
    </section>
  );
}
