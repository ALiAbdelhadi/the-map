import Image from "next/image";

import { AppStepper } from "@themap/ui/components/app-stepper";
import { StoreBadge } from "@themap/ui/components/store-badge";
import { AppIcon } from "@themap/ui/icons/app";
import { AppStoreIcon } from "@themap/ui/icons/app-store";

import type { SiteContent } from "../../content/types";
import { AppScreens } from "./app-screens";
import { BadgeBorder } from "./badge-border";

export function GetAppSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="get-the-app"
      className="flex w-full justify-center bg-primary-100 px-1.5 py-17 tablet:px-8 tablet:py-18 desktop:min-h-256 desktop:items-center desktop:py-0"
    >
      <div className="@container flex w-full max-w-desktop flex-col items-center gap-14 tablet:gap-19 desktop:gap-14">
        <div className="flex w-full flex-col items-center gap-11.5 desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-16">
          <div className="flex w-full max-w-114 flex-col gap-8 px-1.5 tablet:px-0 desktop:shrink-0 desktop:gap-18">
            <div className="flex flex-col gap-8">
              <div className="relative flex items-center justify-center gap-4 self-start rounded-button bg-gradient-to-r from-primary-200/30 to-secondary-600/30 px-6 py-3 shadow-card">
                <BadgeBorder />
                <span className="flex size-6 shrink-0 items-center justify-center text-primary-700 tablet:size-12">
                  <AppIcon width={48} height={48} className="h-full w-full" />
                </span>
                <h2 className="text-24 font-semibold whitespace-nowrap text-primary-700 tablet:text-48 desktop:font-medium">
                  {content.getApp.badge}
                </h2>
              </div>
              <p className="text-24 font-regular text-primary-950 tablet:text-32">
                {content.getApp.subtitle}
              </p>
            </div>

            <AppStepper
              label={content.getApp.badge}
              steps={content.getApp.steps}
              rocket={
                <Image
                  src="/images/step-rocket.webp"
                  alt=""
                  width={172}
                  height={172}
                  className="size-full"
                />
              }
              className="max-w-108.25"
            />
          </div>

          <AppScreens label={content.getApp.screensAlt} />
        </div>

        <div
          dir="ltr"
          className="flex flex-col items-center justify-center gap-6 tablet:flex-row tablet:flex-wrap tablet:gap-17"
        >
          <StoreBadge
            icon={<AppStoreIcon width={20} height={20} />}
            topLine={content.stores.apple.topLine}
            bottomLine={content.stores.apple.bottomLine}
            href={content.stores.apple.href}
          />
          <StoreBadge
            icon={<Image src="/svg/google-play.svg" alt="" width={20} height={20} unoptimized />}
            topLine={content.stores.google.topLine}
            bottomLine={content.stores.google.bottomLine}
            href={content.stores.google.href}
          />
        </div>
      </div>
    </section>
  );
}
