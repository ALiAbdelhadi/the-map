"use client";

import { type ReactNode, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { useSwapIn } from "../motion/use-swap-in";
import { ReviewCard } from "./review-card";

/**
 * Reviews row.
 *
 * Figma `Real Reviews` `1015:20920`: four variants, one per reviewer. Exactly
 * one card is expanded; the other three stay as 210x307 portraits. Row gap 68.
 */
export type Review = {
  id: string;
  name: string;
  rating: string;
  quote: string;
  photo: ReactNode;
};

export type ReviewCarouselProps = {
  reviews: Review[];
  /** 24x24 rating icon. */
  ratingIcon: ReactNode;
  /** 53x53 decorative quote mark. */
  quoteMark?: ReactNode;
  label: string;
  className?: string;
};

export function ReviewCarousel({
  reviews,
  ratingIcon,
  quoteMark,
  label,
  className,
}: ReviewCarouselProps) {
  const [expandedId, setExpandedId] = useState(reviews[0]?.id ?? "");
  const ref = useRef<HTMLUListElement>(null);
  useSwapIn(ref, "[data-review-expanded] > *", expandedId);

  return (
    <ul
      ref={ref}
      aria-label={label}
      className={cn("flex list-none items-center gap-17", className)}
    >
      {reviews.map((review) => (
        <li key={review.id} className="contents">
          <ReviewCard
            name={review.name}
            rating={review.rating}
            quote={review.quote}
            photo={review.photo}
            ratingIcon={ratingIcon}
            {...(quoteMark ? { quoteMark } : {})}
            expanded={expandedId === review.id}
            onExpand={() => {
              setExpandedId(review.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
