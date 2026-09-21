"use client";

import { type ReactNode, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { Flip, useGSAP } from "../motion/gsap";
import { prototype } from "../motion/tokens";
import { useAfterDelay } from "../motion/use-after-delay";
import { ReviewCard } from "./review-card";

/**
 * Reviews row.
 *
 * Figma `Real Reviews` `1015:20920`: four variants, one per reviewer. Exactly
 * one card is expanded; the other three stay as 210x307 portraits. Row gap 68.
 *
 * Motion: each variant hands on to the next reviewer after 0.8 s (Nourhan back to
 * Ahmed), and a click on a portrait jumps there — both a 0.3 s ease-in-out Smart
 * Animate, in which the cards keep their order and slide to their new widths.
 * That is a Flip from the old layout to the new one.
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
  const layout = useRef<Flip.FlipState | null>(null);

  const expand = (id: string) => {
    if (ref.current) layout.current = Flip.getState(ref.current.querySelectorAll("[data-flip-id]"));
    setExpandedId(id);
  };

  useGSAP(
    () => {
      const state = layout.current;
      layout.current = null;
      if (!state || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      Flip.from(state, {
        targets: ref.current?.querySelectorAll("[data-flip-id]") ?? [],
        fade: true,
        ...figmaTween(prototype.reviews.click),
      });
    },
    { scope: ref, dependencies: [expandedId] },
  );

  useAfterDelay(ref, {
    key: expandedId,
    wait: prototype.reviews.auto.duration + prototype.reviews.auto.delay,
    onFire: () => {
      const index = reviews.findIndex((review) => review.id === expandedId);
      const next = reviews[(index + 1) % reviews.length];
      if (next) expand(next.id);
    },
  });

  return (
    <ul
      ref={ref}
      aria-label={label}
      className={cn("flex list-none items-center gap-17", className)}
    >
      {reviews.map((review) => (
        <li key={review.id} className="contents">
          <ReviewCard
            flipId={review.id}
            name={review.name}
            rating={review.rating}
            quote={review.quote}
            photo={review.photo}
            ratingIcon={ratingIcon}
            {...(quoteMark ? { quoteMark } : {})}
            expanded={expandedId === review.id}
            onExpand={() => {
              expand(review.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
