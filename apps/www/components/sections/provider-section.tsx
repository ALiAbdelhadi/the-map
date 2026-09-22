import Image from "next/image";

import { BenefitPill } from "@themap/ui/components/benefit-pill";
import { GradientBorder } from "@themap/ui/components/gradient-border";
import { StoreBadge } from "@themap/ui/components/store-badge";
import { AppIcon } from "@themap/ui/icons/app";
import { AppStoreIcon } from "@themap/ui/icons/app-store";
import { EmailIcon } from "@themap/ui/icons/email";
import { FullFlexibilityIcon } from "@themap/ui/icons/full-flexibility";
import { IncomeIcon } from "@themap/ui/icons/income";
import { ReadyClientsIcon } from "@themap/ui/icons/ready-clients";
import { SimpleIcon } from "@themap/ui/icons/simple";
import { WiderReachIcon } from "@themap/ui/icons/wider-reach";
import { prototype } from "@themap/ui/motion/tokens";

import type { SiteContent } from "../../content/types";
import { BadgeBorder } from "./badge-border";
import { ProviderShowcase, type StagePill } from "./provider-showcase";

/**
 * Become a Provider — Figma calls this component `Contact us` (`998:20842`).
 *
 * Final state `998:20841` (1282x864): the badge (`997:21768`), a 22 px body, the
 * email card `998:20791` (fill rgb(5 35 76 / .5), padding 24, radius 50) with the
 * `info@Themap.com` pill, the 30 px download heading over the two store badges,
 * and five benefit pills scattered around the provider illustration.
 *
 * Motion: on the 1440 frame the section builds up from the illustration alone and
 * opens on `Click here` — see ProviderShowcase. The email card gains a gradient
 * stroke on hover (`998:20790`, 0.3 s ease-out).
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

/*
 * The phone frame (`1041:29327`) lists the pills Wider Reach, Income, Simple, Full
 * Flexibility, Ready Clients — the last two swapped against the desktop order.
 */
const PHONE_ORDER: Record<string, string> = {
  "wider-reach": "order-1 tablet:order-none",
  income: "order-2 tablet:order-none",
  simple: "order-3 tablet:order-none",
  "full-flexibility": "order-4 tablet:order-none",
  "ready-clients": "order-5 tablet:order-none",
};

/*
 * The 768 frame (`1037:32101`) scatters the pills around the illustration in a
 * 706x637 box: Full Flexibility (343, 118), Ready Clients (0, 174), Increase Your
 * Income (340, 238, turned 1.1°), Wider Reach (4, 287), Simple & Organized System
 * (438, 353, turned 1.1°); the illustration is 510 wide at (67, 279).
 */
const TABLET_PLACE: Record<string, string> = {
  "full-flexibility": "tablet:absolute tablet:start-85.75 tablet:top-29.5 desktop:static",
  "ready-clients": "tablet:absolute tablet:start-0 tablet:top-43.5 desktop:static",
  income:
    "tablet:absolute tablet:start-85 tablet:top-59.5 tablet:rotate-[1.1deg] desktop:static desktop:rotate-0",
  "wider-reach": "tablet:absolute tablet:start-1 tablet:top-71.75 desktop:static",
  simple:
    "tablet:absolute tablet:start-109.5 tablet:top-88.25 tablet:rotate-[1.1deg] desktop:static desktop:rotate-0",
};

export function ProviderSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="become-a-provider"
      className="flex w-full justify-center bg-primary-50 px-4 py-21.25 tablet:px-7.5 tablet:py-23.75 desktop:min-h-256 desktop:items-center desktop:py-0"
    >
      <ProviderShowcase
        clickHere={content.provider.clickHere}
        illustration={
          <Image
            src="/svg/illustration-provider-phone.svg"
            alt=""
            width={626}
            height={471}
            className="h-full w-full"
          />
        }
        pills={content.provider.benefits.map((benefit) => {
          const Icon = ICONS[benefit.id as keyof typeof ICONS];
          return {
            id: benefit.id as StagePill["id"],
            pill: (
              <BenefitPill
                title={benefit.title}
                description={benefit.description}
                icon={<Icon />}
              />
            ),
          };
        })}
        full={
          <div className="flex w-full max-w-container-desktop flex-col gap-8">
            <div className="flex flex-col items-start gap-6">
              <div className="relative flex w-full items-center justify-center gap-4 rounded-button border-4 border-transparent bg-secondary-500/10 px-6 py-3 shadow-card tablet:w-auto">
                <BadgeBorder />
                <span className="flex size-6 items-center justify-center text-primary-700 tablet:size-12">
                  <AppIcon width={48} height={48} className="h-full w-full" />
                </span>
                <h2 className="text-20 font-semibold whitespace-nowrap text-primary-700 tablet:text-32 desktop:text-48 desktop:whitespace-normal">
                  {content.provider.badge}
                </h2>
              </div>
              <p className="max-w-186.75 text-16 font-regular text-primary-950 tablet:max-w-129.5 tablet:text-24 desktop:max-w-186.75 desktop:text-22">
                {content.provider.body}
              </p>
            </div>

            <div className="flex flex-col items-center gap-16 tablet:gap-0 desktop:flex-row desktop:items-center desktop:gap-16">
              <div className="flex w-full flex-col gap-15.5 desktop:max-w-1/2">
                <div className="relative flex flex-col gap-6 rounded-search bg-surface-field p-6 tablet:self-start desktop:self-auto">
                  <GradientBorder
                    mode="hover"
                    width="p-0.5"
                    states={[
                      null,
                      [
                        [0, "var(--color-primary-500)"],
                        [1, "var(--color-green-600)"],
                      ],
                    ]}
                    steps={[prototype.hover.card, prototype.hover.card]}
                  />
                  <div className="flex flex-col gap-3">
                    <p className="text-18 font-regular text-bg tablet:text-24">
                      {content.provider.email.title}
                    </p>
                    <p className="text-14 font-regular text-bg tablet:text-20">
                      {content.provider.email.subtitle}
                    </p>
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

                <div className="flex flex-col items-center gap-6.5 tablet:self-start desktop:self-auto">
                  <h3 className="text-14 font-semibold text-primary-950 tablet:text-24 desktop:text-30">
                    {content.provider.downloadHeading}
                  </h3>
                  <div
                    dir="ltr"
                    className="flex flex-col items-center justify-center gap-6.25 tablet:flex-row tablet:flex-wrap tablet:gap-17"
                  >
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

              <div className="flex w-full flex-col items-center gap-0 tablet:relative tablet:-mt-18.25 tablet:block tablet:h-159.25 tablet:w-176.5 desktop:static desktop:mt-0 desktop:flex desktop:h-auto desktop:w-full desktop:max-w-1/2 desktop:gap-6">
                <Image
                  src="/svg/illustration-provider-phone.svg"
                  alt={content.provider.illustrationAlt}
                  width={626}
                  height={471}
                  className="order-2 -mt-4 h-auto w-full max-w-67.5 tablet:absolute tablet:start-16.75 tablet:top-69.75 tablet:mt-0 tablet:w-127.5 tablet:max-w-none desktop:static desktop:order-none desktop:w-full desktop:max-w-156.5"
                />
                <ul className="order-1 flex list-none flex-col gap-3.5 tablet:absolute tablet:inset-0 tablet:block desktop:static desktop:order-none desktop:flex desktop:gap-4">
                  {content.provider.benefits.map((benefit) => {
                    const Icon = ICONS[benefit.id as keyof typeof ICONS];
                    return (
                      <li
                        key={benefit.id}
                        className={`${PHONE_ORDER[benefit.id] ?? ""} ${TABLET_PLACE[benefit.id] ?? ""}`}
                      >
                        <BenefitPill
                          title={benefit.title}
                          description={benefit.description}
                          icon={<Icon />}
                          compact={benefit.id === "income" || benefit.id === "simple"}
                          className="h-25.75 w-78.25 tablet:h-auto tablet:w-max desktop:w-auto"
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        }
      />
    </section>
  );
}
