"use client";

import { type ReactNode, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { prototype } from "../motion/tokens";
import { ReviewCard } from "./review-card";

/**
 * Reviews row.
 *
 * Figma `Real Reviews` `1015:20920` (tablet `1037:27514`): four cards, one per
 * reviewer, exactly one expanded; row gap 68 (tablet 20).
 *
 * Motion, rebuilt 2026-09-22: a click on a portrait expands it. Each card is a single
 * element in both states, so only widths move — the card and its photo column slide
 * from their old widths to their new ones (0.5 s strong ease-in-out), the photos
 * re-crop with object-cover instead of stretching, the old review text fades out
 * at once and the new one fades in once its card has room. Widths are measured
 * before and after the change and handed back to the classes when the move ends,
 * so the layout stays responsive.
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

type Widths = Map<Element, number>;

function measure(root: HTMLElement): Widths {
  const widths: Widths = new Map();
  root.querySelectorAll("[data-review], [data-review-photo]").forEach((el) => {
    widths.set(el, el.getBoundingClientRect().width);
  });
  return widths;
}

export function ReviewCarousel({
  reviews,
  ratingIcon,
  quoteMark,
  label,
  className,
}: ReviewCarouselProps) {
  const [expandedId, setExpandedId] = useState(reviews[0]?.id ?? "");
  const ref = useRef<HTMLUListElement>(null);
  const before = useRef<{ widths: Widths; from: string } | null>(null);

  const expand = (id: string) => {
    if (id === expandedId || !ref.current) return;
    before.current = { widths: measure(ref.current), from: expandedId };
    setExpandedId(id);
  };

  useGSAP(
    () => {
      const root = ref.current;
      const saved = before.current;
      before.current = null;
      if (!root || !saved || !window.matchMedia(MOTION_OK).matches) return;

      const move = figmaTween(prototype.reviews.click);
      const after = measure(root);
      for (const [el, width] of after) {
        const start = saved.widths.get(el);
        if (start === undefined || start === width) continue;
        gsap.fromTo(el, { width: start }, { width, ...move, clearProps: "width" });
      }

      const oldText = root.querySelector(`[data-review='${saved.from}'] [data-review-text]`);
      const newText = root.querySelector(`[data-review='${expandedId}'] [data-review-text]`);
      gsap.fromTo(oldText, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15, ease: "none" });
      gsap.fromTo(
        newText,
        { autoAlpha: 0, x: 12 },
        { autoAlpha: 1, x: 0, ...figmaTween(prototype.hover.border), delay: move.duration * 0.55 },
      );
    },
    { scope: ref, dependencies: [expandedId] },
  );

  return (
    <ul
      ref={ref}
      aria-label={label}
      className={cn("flex list-none items-center gap-5 desktop:gap-17", className)}
    >
      {reviews.map((review) => (
        <li key={review.id} className="contents">
          <ReviewCard
            id={review.id}
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
