import type { ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * A single review — one element for both states, so it can grow and shrink
 * smoothly instead of being swapped for another element.
 *
 * Figma `Real Reviews` (`1015:20920`; tablet `1037:27514`):
 * - expanded: 415 wide (tablet 315), primary/50 fill, 1 px primary/300 border,
 *   radius 17, Reviews shadow; the photo is a 107 px column (tablet 113) with a 1 px
 *   primary/500 border and the Click-here shadow; beside it, 14 px away, the name
 *   (24 px primary/400), the rating (16 px Natural/600), the quote (24 px, tablet
 *   14 px, primary/950) and the 53 px quote mark.
 * - collapsed: the photo alone, 210 wide (tablet 88), 307 tall (tablet 211).
 *
 * The widths live in classes; the carousel animates between them. The text column
 * has a fixed width, so it never re-wraps while the card grows — it fades in once
 * the card has room.
 */
export type ReviewCardProps = {
  id: string;
  name: string;
  /** Rating as written in Figma, e.g. "5/5". */
  rating: string;
  quote: string;
  /** Portrait, rendered by the caller (next/image in the app). */
  photo: ReactNode;
  /** 24x24 rating icon. */
  ratingIcon: ReactNode;
  /** 53x53 decorative quote mark. */
  quoteMark?: ReactNode;
  expanded: boolean;
  onExpand: () => void;
  className?: string;
};

export function ReviewCard({
  id,
  name,
  rating,
  quote,
  photo,
  ratingIcon,
  quoteMark,
  expanded,
  onExpand,
  className,
}: ReviewCardProps) {
  return (
    <div
      data-review={id}
      className={cn(
        "relative h-52.75 shrink-0 overflow-hidden rounded-review border border-primary-300 desktop:h-76.75",
        // One fill in both states, so a closing card never flashes white behind its photo.
        "bg-primary-50",
        expanded ? "w-78.75 shadow-review desktop:w-103.75" : "w-22 shadow-click desktop:w-52.5",
        className,
      )}
    >
      <button
        type="button"
        data-review-photo=""
        aria-label={name}
        aria-expanded={expanded}
        onClick={onExpand}
        className={cn(
          "absolute inset-y-0 start-0 overflow-hidden rounded-review",
          "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500",
          expanded
            ? "w-28.25 cursor-default border border-primary-500 bg-white shadow-click desktop:w-26.75"
            : "w-full cursor-pointer",
        )}
      >
        {photo}
      </button>

      <figure
        data-review-text=""
        aria-hidden={!expanded}
        className={cn(
          "absolute inset-y-0 start-31.75 flex w-32.75 flex-col justify-center gap-3 desktop:start-30.25 desktop:w-67.5",
          expanded ? "" : "invisible opacity-0",
        )}
      >
        <figcaption className="flex flex-col gap-2 desktop:gap-3.75">
          <span className="text-center text-24 font-regular text-primary-400">{name}</span>
          <span className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center">{ratingIcon}</span>
            <span className="text-16 font-regular text-natural-600">{rating}</span>
          </span>
        </figcaption>
        <blockquote className="text-center text-14 font-regular text-primary-950 desktop:text-24">
          {quote}
        </blockquote>
        {quoteMark ? (
          <span
            aria-hidden="true"
            className="absolute -end-11.25 bottom-0 flex size-13.25 desktop:static desktop:self-end"
          >
            {quoteMark}
          </span>
        ) : null}
      </figure>
    </div>
  );
}
