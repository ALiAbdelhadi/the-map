import Image from "next/image";

import { AppStepper } from "@themap/ui/components/app-stepper";
import { StoreBadge } from "@themap/ui/components/store-badge";
import { AppIcon } from "@themap/ui/icons/app";
import { AppStoreIcon } from "@themap/ui/icons/app-store";

import type { SiteContent } from "../../content/types";

/**
 * Get the App Now.
 *
 * Figma `930:20466` / Arabic `1029:27815` (1440x1024): the 456 px text column and the
 * 565x565 phone-mockup tile sit 286 px apart — text first, so English has the tile
 * on the right and Arabic mirrors it to the left. The badge (`936:20234`) has a 4 px
 * primary/500 border, radius 12, `shadow`, a 48 px icon and a 48 px medium title in
 * primary/700; the subtitle is 32 px primary/950 and the stepper sits 72 px below.
 * The two store badges are centred under the row (`942:20453`).
 */

/**
 * The tile is Figma `Screens` variant 1 (`936:20017`): two 200 px columns of app
 * screenshots, the first scrolled up 1258 px, the second offset 143 px down. The
 * numbers are expressed in container-query units of the 565 px tile so the crop
 * holds at any size.
 */
const TILE = 565;
const cq = (px: number) => `${((px / TILE) * 100).toFixed(3)}cqw`;

const COLUMNS = [
  {
    left: 42,
    top: -1258,
    shots: [
      { src: "/images/app-screen-splash.webp", width: 420, height: 910 },
      { src: "/images/app-screen-new-order.webp", width: 420, height: 1218 },
      { src: "/images/app-screen-search-results.webp", width: 420, height: 1176 },
    ],
  },
  {
    left: 322,
    top: 143,
    shots: [
      { src: "/images/app-screen-meal-details.webp", width: 420, height: 941 },
      { src: "/images/app-screen-documents.webp", width: 420, height: 1273 },
      { src: "/images/app-screen-find-missing-people.webp", width: 420, height: 1435 },
    ],
  },
] as const;

export function GetAppSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="get-the-app"
      className="flex w-full justify-center bg-primary-100 px-4 py-24 tablet:px-8 desktop:min-h-256 desktop:items-center desktop:py-0"
    >
      <div className="flex w-full max-w-container-desktop flex-col items-center gap-12">
        <div className="flex w-full flex-col items-center gap-16 desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-71.5">
          <div className="flex w-full max-w-114 flex-col gap-18">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-center gap-4 self-start rounded-button border-4 border-primary-500 bg-gradient-to-r from-primary-200/30 to-secondary-600/30 px-6 py-3 shadow-card">
                <span className="flex size-12 shrink-0 items-center justify-center text-primary-700">
                  <AppIcon width={48} height={48} />
                </span>
                <h2 className="text-38 font-medium text-primary-700 desktop:text-48">
                  {content.getApp.badge}
                </h2>
              </div>
              <p className="text-24 font-regular text-primary-950 desktop:text-32">
                {content.getApp.subtitle}
              </p>
            </div>

            <AppStepper
              label={content.getApp.badge}
              steps={content.getApp.steps}
              className="max-w-108.25"
            />
          </div>

          <div
            role="img"
            aria-label={content.getApp.screensAlt}
            dir="ltr"
            className="@container relative aspect-square w-full max-w-141.25 shrink-0 overflow-hidden rounded-tile bg-primary-700"
          >
            {COLUMNS.map((column) => (
              <div
                key={column.left}
                className="absolute flex flex-col"
                style={{ left: cq(column.left), top: cq(column.top), width: cq(200), gap: cq(24) }}
              >
                {column.shots.map((shot) => (
                  <Image
                    key={shot.src}
                    src={shot.src}
                    alt=""
                    width={shot.width}
                    height={shot.height}
                    sizes="(min-width: 90rem) 200px, 36vw"
                    className="h-auto w-full rounded-screen"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div dir="ltr" className="flex flex-wrap items-center justify-center gap-12">
          <StoreBadge
            icon={<AppStoreIcon />}
            topLine={content.stores.apple.topLine}
            bottomLine={content.stores.apple.bottomLine}
            href={content.stores.apple.href}
          />
          <StoreBadge
            icon={<Image src="/svg/google-play.svg" alt="" width={24} height={24} unoptimized />}
            topLine={content.stores.google.topLine}
            bottomLine={content.stores.google.bottomLine}
            href={content.stores.google.href}
          />
        </div>
      </div>
    </section>
  );
}
