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
      className="relative isolate flex w-full justify-center overflow-hidden px-4 py-24 tablet:px-8 desktop:min-h-256 desktop:items-center desktop:py-0"
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
      <Image
        src="/images/why-choose-character.webp"
        alt=""
        width={216}
        height={659}
        sizes="(min-width: 90rem) 20vw, 35vw"
        className="-z-10 pointer-events-none absolute end-[12%] bottom-[2%] h-[62%] w-auto tablet:h-[86%] rtl:-scale-x-100"
      />

      <div className="flex w-full max-w-container-desktop justify-start">
        <GlassCard surface="field" className="w-full max-w-152">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="flex size-15.5 shrink-0 items-center justify-center rounded-chip bg-secondary-500 p-2 text-bg">
                <ChooseIcon width={40} height={40} />
              </span>
              <h2 className="text-40 font-regular text-bg desktop:text-56">
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
    </section>
  );
}
