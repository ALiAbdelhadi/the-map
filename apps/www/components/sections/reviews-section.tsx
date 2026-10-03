import Image from "next/image";

import { ReviewCarousel } from "@themap/ui/components/review-carousel";
import { TypewriterHeading } from "@themap/ui/components/typewriter-heading";
import { ApostropheIcon } from "@themap/ui/icons/apostrophe";
import { StarIcon } from "@themap/ui/icons/star";

import type { SiteContent } from "../../content/types";

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
