import Image from "next/image";

import { SearchField } from "@themap/ui/components/search-field";
import { AreasIcon } from "@themap/ui/icons/areas";
import { FocusIcon } from "@themap/ui/icons/focus";

import type { SiteContent } from "../../content/types";
import { AvailabilityButton } from "./availability-button";
import { ServiceAreasTitle } from "./service-areas-title";

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
