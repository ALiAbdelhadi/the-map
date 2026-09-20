import Image from "next/image";

import { BenefitPill } from "@themap/ui/components/benefit-pill";
import { StoreBadge } from "@themap/ui/components/store-badge";
import { AppIcon } from "@themap/ui/icons/app";
import { AppStoreIcon } from "@themap/ui/icons/app-store";
import { EmailIcon } from "@themap/ui/icons/email";
import { FullFlexibilityIcon } from "@themap/ui/icons/full-flexibility";
import { IncomeIcon } from "@themap/ui/icons/income";
import { ReadyClientsIcon } from "@themap/ui/icons/ready-clients";
import { SimpleIcon } from "@themap/ui/icons/simple";
import { WiderReachIcon } from "@themap/ui/icons/wider-reach";

import type { SiteContent } from "../../content/types";

/**
 * Become a Provider — Figma calls this component `Contact us` (`998:20842`).
 *
 * Final state `998:20841` (1282x864): the badge (`997:21768`), a 22 px body, the
 * email card `998:20791` (fill rgb(5 35 76 / .5), padding 24, radius 50) with the
 * `info@Themap.com` pill, the 30 px download heading over the two store badges,
 * and five benefit pills scattered around the provider illustration.
 *
 * The pills are absolutely positioned and rotated ~1.1° around the illustration
 * on the 1440 frame. Here they are a list beside the illustration: their Figma
 * positions are tied to the 813x637 desktop box and do not survive a narrower
 * viewport. Recorded as a Phase 5 deviation.
 */

const ICONS = {
  "wider-reach": WiderReachIcon,
  income: IncomeIcon,
  simple: SimpleIcon,
  "ready-clients": ReadyClientsIcon,
  "full-flexibility": FullFlexibilityIcon,
} as const;

export function ProviderSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="become-a-provider"
      className="flex w-full justify-center bg-primary-50 px-4 py-24 tablet:px-8 desktop:min-h-[1024px] desktop:items-center desktop:py-0"
    >
      <div className="flex w-full max-w-container-desktop flex-col gap-8">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center justify-center gap-4 rounded-button border-4 border-primary-500 bg-secondary-500/10 px-6 py-3 shadow-card">
            <span className="flex size-12 items-center justify-center text-primary-700">
              <AppIcon width={48} height={48} />
            </span>
            <h2 className="text-48 font-semibold text-primary-700">{content.provider.badge}</h2>
          </div>
          <p className="max-w-186.75 text-22 font-regular text-primary-950">
            {content.provider.body}
          </p>
        </div>

        <div className="flex flex-col items-center gap-16 desktop:flex-row desktop:items-center">
          <div className="flex w-full flex-col gap-15.5 desktop:max-w-1/2">
            <div className="flex flex-col gap-6 rounded-search bg-surface-field p-6">
              <div className="flex flex-col gap-3">
                <p className="text-24 font-regular text-bg">{content.provider.email.title}</p>
                <p className="text-20 font-regular text-bg">{content.provider.email.subtitle}</p>
              </div>
              <a
                href={`mailto:${content.provider.email.address}`}
                className="flex items-center justify-center gap-2 self-start rounded-email bg-bg px-3 py-1 text-24 font-regular text-primary-500 underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <span className="flex size-6 items-center justify-center">
                  <EmailIcon width={24} height={24} />
                </span>
                {content.provider.email.address}
              </a>
            </div>

            <div className="flex flex-col items-center gap-6.5">
              <h3 className="text-30 font-semibold text-primary-950">
                {content.provider.downloadHeading}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-17">
                <StoreBadge
                  icon={<AppStoreIcon />}
                  topLine={content.stores.apple.topLine}
                  bottomLine={content.stores.apple.bottomLine}
                  href={content.stores.apple.href}
                />
                <StoreBadge
                  icon={<Image src="/svg/google-play.svg" alt="" width={24} height={24} />}
                  topLine={content.stores.google.topLine}
                  bottomLine={content.stores.google.bottomLine}
                  href={content.stores.google.href}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-6 desktop:max-w-1/2">
            <Image
              src="/svg/illustration-provider-phone.svg"
              alt={content.provider.illustrationAlt}
              width={626}
              height={471}
              className="h-auto w-full max-w-156.5"
            />
            <ul className="flex list-none flex-col gap-4">
              {content.provider.benefits.map((benefit) => {
                const Icon = ICONS[benefit.id as keyof typeof ICONS];
                return (
                  <li key={benefit.id}>
                    <BenefitPill
                      title={benefit.title}
                      description={benefit.description}
                      icon={<Icon />}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
