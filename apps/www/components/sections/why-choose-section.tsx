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
      className="relative isolate flex w-full flex-col items-center overflow-hidden px-2 pt-22.5 pb-9.5 tablet:flex-row tablet:items-stretch tablet:justify-center tablet:px-8 tablet:py-24 desktop:min-h-256 desktop:items-center desktop:py-0"
    >
      <Image
        src="/images/why-choose-maze.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/*
        Figma layers `image 6659` (the character) over `image 6658` (the maze).
        Figma's node export flattens the character onto white; the uploaded source
        behind that node is a cut-out with real alpha, so that is what ships —
        cropped to the figure's alpha bounds (216x659 of 1408x768). The crop removes
        empty pixels only; no artwork was altered.
      */}

      <div className="flex w-full max-w-container-desktop justify-start">
        <GlassCard surface="field" className="w-fit tablet:w-full tablet:max-w-152">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2 ps-5 py-1 tablet:gap-4 tablet:ps-0 tablet:py-0">
              <span className="flex size-15.5 shrink-0 items-center justify-center rounded-chip bg-secondary-500 p-2 text-bg">
                <ChooseIcon width={40} height={40} />
              </span>
              <h2 className="text-32 font-regular whitespace-nowrap text-bg tablet:text-40 desktop:text-56">
                {content.whyChoose.title}
              </h2>
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

      {/*
        Phone frame (`1041:27445`): the character stands below the card, in flow,
        278 px tall, its head 44 px over the card — drawn over it. From the
        tablet frame up it stands behind the card at the section's end.
      */}
      <Image
        src="/images/why-choose-character.webp"
        alt=""
        width={216}
        height={659}
        sizes="(min-width: 90rem) 20vw, 35vw"
        className="pointer-events-none relative -mt-11 h-69.5 w-auto tablet:absolute tablet:end-[12%] tablet:bottom-[2%] tablet:-z-10 tablet:mt-0 tablet:h-[86%] rtl:-scale-x-100"
      />
    </section>
  );
}
