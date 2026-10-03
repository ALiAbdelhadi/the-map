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

const ICONS = {
  "wider-reach": WiderReachIcon,
  income: IncomeIcon,
  simple: SimpleIcon,
  "ready-clients": ReadyClientsIcon,
  "full-flexibility": FullFlexibilityIcon,
} as const;

const PHONE_ORDER: Record<string, string> = {
  "wider-reach": "order-1 tablet:order-none",
  income: "order-2 tablet:order-none",
  simple: "order-3 tablet:order-none",
  "full-flexibility": "order-4 tablet:order-none",
  "ready-clients": "order-5 tablet:order-none",
};

const PLACE: Record<string, string> = {
  "full-flexibility":
    "tablet:absolute tablet:start-85.75 tablet:top-29.5 desktop:start-81.75 desktop:top-0 desktop:rtl:start-51.5 desktop:rtl:top-26.75",
  "ready-clients":
    "tablet:absolute tablet:-start-1.25 tablet:top-43.5 desktop:start-6.25 desktop:top-20 desktop:rtl:start-126.25 desktop:rtl:top-28",
  income:
    "my-0.75 rotate-[1.1deg] tablet:absolute tablet:my-0 tablet:start-85.5 tablet:top-59.5 desktop:start-134.5 desktop:top-35.25 desktop:rotate-0 desktop:rtl:start-26.5 desktop:rtl:top-59",
  "wider-reach":
    "tablet:absolute tablet:start-1 tablet:top-71.75 desktop:start-36.5 desktop:top-47.25 desktop:rtl:start-132 desktop:rtl:top-56.25",
  simple:
    "my-0.75 rotate-[1.1deg] tablet:absolute tablet:my-0 tablet:start-110 tablet:top-88.25 desktop:start-158.25 desktop:top-78.75 desktop:rotate-0 desktop:rtl:start-25 desktop:rtl:top-95",
};

const COMPACT = new Set(["income", "simple"]);

export function ProviderSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="become-a-provider"
      className="flex w-full justify-center overflow-x-clip bg-primary-50 px-4 py-21.25 tablet:px-7.5 tablet:py-23.75 desktop:items-center desktop:py-0 wide:min-h-256"
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
                variant="stage"
              />
            ),
          };
        })}
        full={
          <div className="flex w-full max-w-desktop flex-col gap-8 desktop:max-wide:py-23.75">
            <div className="flex flex-col items-start gap-6">
              <div className="relative flex w-full items-center justify-center gap-4 rounded-button bg-secondary-500/10 px-6 py-3 shadow-card tablet:w-auto">
                <BadgeBorder />
                <span className="flex size-6 items-center justify-center text-primary-700 tablet:size-12">
                  <AppIcon width={48} height={48} className="h-full w-full" />
                </span>
                <h2 className="text-20 font-semibold text-primary-700 tablet:text-32 tablet:whitespace-nowrap desktop:text-48 desktop:whitespace-normal">
                  {content.provider.badge}
                </h2>
              </div>
              <p className="max-w-186.75 text-16 font-regular text-primary-950 tablet:max-w-129.5 tablet:text-24 desktop:max-w-186.75 desktop:text-22">
                {content.provider.body}
              </p>
            </div>

            <div className="flex flex-col items-center gap-16 tablet:gap-0 desktop:max-wide:gap-16 wide:relative wide:h-159.25 wide:flex-row wide:items-center">
              <div className="@container flex w-full flex-col gap-15.5 desktop:max-wide:flex-row desktop:max-wide:items-center desktop:max-wide:justify-between desktop:max-wide:gap-8 wide:w-177.25 wide:rtl:w-132.25">
                <div className="relative flex w-full max-w-112.5 flex-col gap-6 rounded-search desktop:max-wide:w-auto desktop:max-wide:shrink-0 desktop:max-wide:self-center bg-surface-field p-4 @email-card:p-6">
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

                <div className="flex flex-col items-center gap-6.5 self-start desktop:self-auto">
                  <h3 className="text-14 font-semibold text-primary-950 tablet:text-24 desktop:text-30 desktop:max-wide:text-center desktop:max-wide:text-balance desktop:rtl:text-24">
                    {content.provider.downloadHeading}
                  </h3>
                  <div
                    dir="ltr"
                    className="flex flex-col items-center justify-center gap-6.25 tablet:flex-row tablet:flex-wrap tablet:gap-17"
                  >
                    <StoreBadge
                      icon={<AppStoreIcon width={20} height={20} />}
                      topLine={content.stores.apple.topLine}
                      bottomLine={content.stores.apple.bottomLine}
                      href={content.stores.apple.href}
                    />
                    <StoreBadge
                      icon={<Image src="/svg/google-play.svg" alt="" width={20} height={20} />}
                      topLine={content.stores.google.topLine}
                      bottomLine={content.stores.google.bottomLine}
                      href={content.stores.google.href}
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col items-center gap-0 tablet:relative tablet:-mt-18.25 tablet:block tablet:h-159.25 tablet:w-176.5 desktop:mt-0 desktop:w-203.25 desktop:max-wide:rtl:-mt-26.5 desktop:max-wide:-translate-x-11 desktop:rtl:w-201.25 desktop:max-wide:rtl:translate-x-13.5 wide:pointer-events-none wide:absolute wide:end-0 wide:top-0">
                <Image
                  src="/svg/illustration-provider-phone.svg"
                  alt={content.provider.illustrationAlt}
                  width={626}
                  height={471}
                  className="order-2 -mt-4 h-auto w-full max-w-67.5 tablet:absolute tablet:start-16.75 tablet:top-69.75 tablet:mt-0 tablet:w-127.5 tablet:max-w-none desktop:start-46.75 desktop:top-41.5 desktop:w-156.5 desktop:rtl:start-43.75 desktop:rtl:top-53.5"
                />
                <ul className="order-1 flex w-full max-w-79.25 list-none flex-col gap-3 tablet:absolute tablet:inset-0 tablet:block tablet:max-w-none">
                  {content.provider.benefits.map((benefit) => {
                    const Icon = ICONS[benefit.id as keyof typeof ICONS];
                    return (
                      <li
                        key={benefit.id}
                        className={`wide:pointer-events-auto ${PHONE_ORDER[benefit.id] ?? ""} ${PLACE[benefit.id] ?? ""}`}
                      >
                        <BenefitPill
                          title={benefit.title}
                          description={benefit.description}
                          icon={<Icon />}
                          variant={COMPACT.has(benefit.id) ? "compact" : "default"}
                          className="min-h-25.75 w-full max-w-79.25 tablet:min-h-0 tablet:w-max tablet:max-w-none"
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
