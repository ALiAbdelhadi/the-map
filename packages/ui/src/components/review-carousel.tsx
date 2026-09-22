"use client";

import { type ReactNode, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { Flip, gsap, useGSAP } from "../motion/gsap";
import { prototype } from "../motion/tokens";
import { ReviewCard } from "./review-card";

/**
 * Reviews row.
 *
 * Figma `Real Reviews` `1015:20920`: four variants, one per reviewer. Exactly
 * one card is expanded; the other three stay as 210x307 portraits. Row gap 68.
 *
 * Motion: a click on a portrait expands it — the cards keep their order and slide
 * to their new widths (a Flip, 0.5 s strong ease-in-out), and the review text fades
 * in once the card has room. Nothing changes by itself (approved 2026-09-22).
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
    if (id === expandedId) return;
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
        ...figmaTween(prototype.reviews.click),
      });
      gsap.fromTo(
        "[data-review-expanded] > div:last-child",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, ...figmaTween(prototype.hover.border), delay: 0.25 },
      );
    },
    { scope: ref, dependencies: [expandedId] },
  );

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
