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
 *   14 px, primary/950) and the 53 px quote mark. The name is start-aligned (left in
 *   English, right in Arabic `1030:24246`); the quote is centred. The quote mark
 *   sits at the quote's bottom end: on the 1440 frame it overlaps the quote's last
 *   24 px in English and follows it with no gap in Arabic (`1030:24261`); on the
 *   tablet frame it hangs past the text column, its bottom level with the quote's.
 * - collapsed: the photo alone, 210 wide (tablet 88), 307 tall (tablet 211).
 *
 * 1023–1439: every size above except the 16 px rating is the 1440 value scaled by
 * viewport ÷ 1440 (`review-*` tokens), so the card is the 1440 card reduced.
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
        "relative h-52.75 shrink-0 overflow-hidden rounded-review border border-primary-300 desktop:h-review-h",
        // One fill in both states, so a closing card never flashes white behind its photo.
        "bg-primary-50",
        expanded
          ? "w-78.75 shadow-review desktop:w-review-open"
          : "w-22 shadow-click desktop:w-review-closed",
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
          "absolute inset-y-0 start-0 overflow-hidden rounded-review select-none",
          "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500",
          expanded
            ? "w-28.25 cursor-default border border-primary-500 bg-white shadow-click desktop:w-review-photo"
            : "w-full cursor-pointer",
        )}
      >
        {photo}
      </button>

      <figure
        data-review-text=""
        aria-hidden={!expanded}
        className={cn(
          "absolute inset-y-0 start-31.75 flex w-32.75 flex-col justify-center gap-3 desktop:start-review-text-start desktop:w-review-text desktop:gap-review-text-gap",
          expanded ? "" : "invisible opacity-0",
        )}
      >
        <figcaption className="flex flex-col gap-2 desktop:gap-review-caption-gap">
          <span className="text-start text-24 font-regular text-primary-400 desktop:text-review-body">
            {name}
          </span>
          <span className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center">{ratingIcon}</span>
            <span className="text-16 font-regular text-natural-600">{rating}</span>
          </span>
        </figcaption>
        <blockquote className="text-center text-14 font-regular text-primary-950 desktop:text-review-body">
          {quote}
        </blockquote>
        {quoteMark ? (
          <span
            aria-hidden="true"
            className="absolute -end-11.25 bottom-2 flex size-13.25 desktop:static desktop:-mt-review-mark-pull desktop:size-review-mark desktop:self-end desktop:rtl:-mt-review-mark-pull-ar"
          >
            {quoteMark}
          </span>
        ) : null}
      </figure>
    </div>
  );
}
