import Image from "next/image";

import { AppStepper } from "@themap/ui/components/app-stepper";
import { AppIcon } from "@themap/ui/icons/app";

import type { SiteContent } from "../../content/types";

/**
 * Get the App Now.
 *
 * Figma `930:20466` / `1029:27809` (1440x1024): a row with a 286 px gap between
 * the 565x565 phone-mockup tile (fill primary/700, radius 33) and a 456 px
 * column. The badge is `936:20234`: 4 px primary/500 border, radius 12, px 24,
 * py 12, `shadow`, 48 px icon, 48 px title in primary/700. Subtitle is 32 px
 * regular primary/950. The stepper sits 72 px below.
 */
export function GetAppSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="get-the-app"
      className="flex w-full justify-center bg-primary-100 px-4 py-24 tablet:px-8 desktop:min-h-[1024px] desktop:items-center desktop:py-0"
    >
      <div className="flex w-full max-w-container-desktop flex-col items-center gap-16 desktop:flex-row desktop:justify-between desktop:gap-71.5">
        <div className="order-2 grid w-full max-w-141.25 shrink-0 grid-cols-2 gap-6 overflow-hidden rounded-[33px] bg-primary-700 p-10.5 desktop:order-1 desktop:aspect-square desktop:h-141.25">
          <div className="flex flex-col gap-6">
            <Image
              src="/images/app-screen-search-results.webp"
              alt={content.getApp.screensAlt}
              width={420}
              height={1176}
              className="w-full rounded-[20px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 pt-9">
            <Image
              src="/images/app-screen-meal-details.webp"
              alt=""
              width={420}
              height={941}
              className="w-full rounded-[20px] object-cover"
            />
          </div>
        </div>

        <div className="order-1 flex w-full max-w-114 flex-col gap-18 desktop:order-2">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center gap-4 self-start rounded-button border-4 border-primary-500 bg-primary-200/30 px-6 py-3 shadow-card">
              <span className="flex size-12 items-center justify-center text-primary-700">
                <AppIcon width={48} height={48} />
              </span>
              <h2 className="text-48 font-semibold text-primary-700">{content.getApp.badge}</h2>
            </div>
            <p className="text-32 font-regular text-primary-950">{content.getApp.subtitle}</p>
          </div>

          <AppStepper
            label={content.getApp.badge}
            steps={content.getApp.steps}
            className="max-w-108.25"
          />
        </div>
      </div>
    </section>
  );
}
