import Image from "next/image";

import { SearchField } from "@themap/ui/components/search-field";
import { AreasIcon } from "@themap/ui/icons/areas";
import { FocusIcon } from "@themap/ui/icons/focus";

import type { SiteContent } from "../../content/types";

/**
 * Service Areas.
 *
 * Figma `963:20233` / `1028:20709` (1440x1024): the `grok-video` render fills
 * the section, over it a centred column with an 80 px gap — a 100 px bold
 * Secondary/500 title, a 48 px semibold Natural/BG subtitle — then the 607 px
 * search field, then the 48 px tall Secondary/500 CTA with radius 37.
 */
export function ServiceAreasSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="service-areas"
      className="relative isolate flex w-full justify-center overflow-hidden px-4 py-24 tablet:px-8 desktop:min-h-[1024px] desktop:items-center desktop:py-0"
    >
      <Image
        src="/images/service-areas-scene.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary-300/80" />

      <form className="flex w-full max-w-185.25 flex-col items-center gap-17" action="#">
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center gap-20">
            <h2 className="text-center text-56 font-bold text-secondary-500 desktop:text-[100px]">
              {content.serviceAreas.title}
            </h2>
            <p className="max-w-3xl text-center text-32 font-semibold text-bg desktop:text-48">
              {content.serviceAreas.subtitle}
            </p>
          </div>

          <SearchField
            name="area"
            label={content.serviceAreas.searchLabel}
            placeholder={content.serviceAreas.searchPlaceholder}
            actionLabel={content.serviceAreas.locateLabel}
            icon={<AreasIcon />}
            actionIcon={<FocusIcon />}
            className="w-full max-w-151.75"
          />
        </div>

        <button
          type="submit"
          className="flex h-12 items-center justify-center rounded-chip bg-secondary-500 px-6 py-0.5 text-16 font-regular text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg"
        >
          {content.serviceAreas.cta}
        </button>
      </form>
    </section>
  );
}
