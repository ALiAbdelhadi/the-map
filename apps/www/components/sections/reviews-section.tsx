import Image from "next/image";

import { ReviewCarousel } from "@themap/ui/components/review-carousel";
import { TypewriterHeading } from "@themap/ui/components/typewriter-heading";
import { ApostropheIcon } from "@themap/ui/icons/apostrophe";
import { StarIcon } from "@themap/ui/icons/star";

import type { SiteContent } from "../../content/types";

/**
 * Reviews.
 *
 * Figma `1007:20617` (1440x1024): a 48 px gap between the 62 px gradient
 * heading (primary/500 -> green/600, `1015:21009`) and the 48 px Natural/300
 * subheading, then the review row 481 px down.
 *
 * The heading types itself once when it scrolls into view — see TypewriterHeading.
 *
 * The phone frame (`853:19401`) has no Reviews section — the footer follows the
 * provider section directly — so it is not rendered below the tablet breakpoint.
 */
export function ReviewsSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="reviews"
      className="hidden w-full justify-center bg-bg px-4 py-24 tablet:flex tablet:px-8 desktop:min-h-256 desktop:items-center desktop:py-0"
    >
      <div className="flex w-full max-w-container-desktop flex-col items-center gap-12">
        <div className="flex w-full flex-col items-center gap-12">
          <TypewriterHeading
            className="text-center text-38 font-semibold desktop:text-62"
            textClassName="bg-gradient-to-r from-primary-500 to-green-600 bg-clip-text text-transparent"
          >
            {content.reviews.heading}
          </TypewriterHeading>
          <p className="max-w-307.25 text-center text-32 font-medium text-natural-300 desktop:text-48">
            {content.reviews.subheading}
          </p>
        </div>

        <ReviewCarousel
          label={content.reviews.heading}
          className="w-full flex-wrap justify-center gap-8 desktop:flex-nowrap desktop:gap-17"
          ratingIcon={<StarIcon width={24} height={24} className="text-primary-500" />}
          quoteMark={<ApostropheIcon width={53} height={53} className="text-secondary-200" />}
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
