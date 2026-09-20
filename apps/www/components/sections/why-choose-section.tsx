import Image from "next/image";

import { GlassCard } from "@themap/ui/components/glass-card";
import { WhyChooseList } from "@themap/ui/components/why-choose-list";
import { AllInOneIcon } from "@themap/ui/icons/all-in-one";
import { ChooseIcon } from "@themap/ui/icons/choose";
import { EasyIcon } from "@themap/ui/icons/easy";
import { FastIcon } from "@themap/ui/icons/fast";
import { FlexibleIcon } from "@themap/ui/icons/flexible";
import { NearbyIcon } from "@themap/ui/icons/nearby";

import type { SiteContent } from "../../content/types";

/**
 * Why Choose Us.
 *
 * Figma `914:20605` / `914:20600` (1440x1024): two stacked renders —
 * `image 6658` (maze) and `image 6659` (character) — behind a glass card that
 * holds the title row (62 px chip + 40 px label) and five feature rows.
 */

const ICONS = {
  "all-in-one": AllInOneIcon,
  flexible: FlexibleIcon,
  nearby: NearbyIcon,
  fast: FastIcon,
  easy: EasyIcon,
} as const;

export function WhyChooseSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="why-us"
      className="relative isolate flex w-full items-center overflow-hidden px-4 py-24 tablet:px-8 desktop:min-h-[1024px] desktop:py-0"
    >
      <Image
        src="/images/why-choose-maze.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <Image
        src="/images/why-choose-character.webp"
        alt=""
        width={2880}
        height={2384}
        sizes="(min-width: 90rem) 60vw, 100vw"
        className="-z-10 absolute end-0 bottom-0 h-full w-auto max-w-none object-contain object-bottom"
      />

      <div className="flex w-full max-w-container-desktop justify-start">
        <GlassCard className="w-full max-w-152">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="flex size-15.5 items-center justify-center rounded-chip bg-secondary-950 p-3 text-bg">
                <ChooseIcon width={40} height={40} />
              </span>
              <h2 className="text-48 font-semibold text-bg">{content.whyChoose.title}</h2>
            </div>

            <WhyChooseList
              label={content.whyChoose.title}
              descriptionClassName="text-24 font-regular text-bg"
              features={content.whyChoose.features.map((feature) => {
                const Icon = ICONS[feature.id as keyof typeof ICONS];
                return {
                  id: feature.id,
                  label: feature.label,
                  description: feature.description,
                  icon: <Icon />,
                };
              })}
            />
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
