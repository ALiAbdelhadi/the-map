import type { ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * Site footer.
 *
 * Figma `Frame 2147226013` `1023:20803` on the 1440 frame: three columns with a
 * 48 px gap. Column 1 is the logo over a 24 px paragraph (Natural/950, 493 wide);
 * column 2 is a gradient 24 px line (primary/500 -> green/600) over the two store
 * badges with a 48 px gap; column 3 is a centred gradient line over the four
 * social marks with a 16 px gap.
 */
export type SiteFooterProps = {
  /** Logo artwork. */
  logo: ReactNode;
  tagline: string;
  downloadHeading: string;
  /** The two store badges. */
  storeBadges: ReactNode;
  socialHeading: string;
  /** The four social links. */
  socialLinks: ReactNode;
  className?: string;
};

const GRADIENT_TEXT =
  "bg-gradient-to-r from-primary-500 to-green-600 bg-clip-text text-24 font-regular text-transparent";

export function SiteFooter({
  logo,
  tagline,
  downloadHeading,
  storeBadges,
  socialHeading,
  socialLinks,
  className,
}: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "flex flex-col items-center gap-12 desktop:flex-row desktop:items-center desktop:justify-end",
        className,
      )}
    >
      <div className="flex flex-col items-start gap-8">
        {logo}
        <p className="max-w-123.25 text-24 font-regular text-primary-950">{tagline}</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-7.75">
        <p className={cn(GRADIENT_TEXT, "max-w-108.75")}>{downloadHeading}</p>
        <div className="flex flex-wrap items-start gap-12">{storeBadges}</div>
      </div>

      <div className="flex w-60 flex-col items-center justify-center gap-8">
        <p className={cn(GRADIENT_TEXT, "text-center")}>{socialHeading}</p>
        <div className="flex w-full items-center gap-4">{socialLinks}</div>
      </div>
    </footer>
  );
}
