import Image from "next/image";

import { ReviewCarousel } from "@themap/ui/components/review-carousel";
import { TypewriterHeading } from "@themap/ui/components/typewriter-heading";
import { ApostropheIcon } from "@themap/ui/icons/apostrophe";
import { StarIcon } from "@themap/ui/icons/star";

import type { SiteContent } from "../../content/types";

/**
 * Reviews.
 *
 * Figma `1007:20617` / `1028:20718` (1440x1024): the column starts 70 px down; a
 * 48 px gap between the 62 px gradient heading (primary/500 -> green/600,
 * `1015:21009`) and the 48 px Natural/300 subheading, then the review row 481 px
 * below the heading — 180 px under the subheading. The 768 frame (`1037:32343`)
 * has 90 px above and below and 62 px over the row. The subheading is start-aligned in
 * the English frames (`1008:20620`, tablet `1037:32347`) and centred in the Arabic
 * one (`1028:20722`); there is no Arabic tablet frame, so Arabic stays centred.
 *
 * The heading types itself once when it scrolls into view — see TypewriterHeading.
 *
 * 1023–1439 (no Figma frame): the 1440 composition scaled by viewport ÷ 1440 through
 * the `review-*` tokens (theme.css, agent D), exact at 1440 and capped above. The
 * 62 px heading is not scaled — it already fits, and it is the tablet size too.
 *
 * The phone frame (`853:19401`) has no Reviews section — the footer follows the
 * provider section directly — so it is not rendered below the tablet breakpoint.
 */
export function ReviewsSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="reviews"
      className="hidden w-full justify-center bg-bg px-4 py-24 tablet:flex tablet:px-8 tablet:py-22.5 desktop:min-h-review-frame desktop:items-start desktop:pt-review-top desktop:pb-0"
    >
      <div className="flex w-full max-w-desktop flex-col items-center gap-12 tablet:gap-15.5 desktop:gap-review-stack">
        <div className="flex w-full flex-col items-center gap-12 desktop:gap-review-intro">
          <TypewriterHeading
            className="text-center text-38 font-semibold tablet:text-62"
            textClassName="bg-gradient-to-r from-primary-500 to-green-600 bg-clip-text text-transparent"
          >
            {content.reviews.heading}
          </TypewriterHeading>
          <p className="w-full max-w-307.25 text-start text-32 rtl:text-center font-medium text-natural-300 tablet:max-w-165.25 desktop:max-w-review-sub desktop:text-review-sub">
            {content.reviews.subheading}
          </p>
        </div>

        <ReviewCarousel
          label={content.reviews.heading}
          className="w-full justify-center"
          ratingIcon={<StarIcon width={24} height={24} className="text-primary-500" />}
          quoteMark={
            <ApostropheIcon width={53} height={53} className="size-full text-secondary-200" />
          }
          reviews={content.reviews.items.map((review) => ({
            id: review.id,
            name: review.name,
            rating: review.rating,
            quote: review.quote,
            photo: (
              <Image
                src={review.photo}
                alt=""
                width={420}
                height={614}
                className="h-full w-full object-cover"
              />
            ),
          }))}
        />
      </div>
    </section>
  );
}
