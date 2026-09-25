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
 * Phone (`1041:29726`): one centred column, 16 px tagline and download line, the
 * store badges stacked 32 px apart.
 * Arabic 1440 (`1028:20726`): the tagline is 445 wide, the badges sit 12 px apart,
 * and the social column is 216 wide — marks 8 px apart, heading at its start edge.
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
  "bg-gradient-to-r from-primary-500 to-green-600 bg-clip-text font-regular text-transparent";

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
      <div className="flex flex-col items-center gap-8 tablet:items-start">
        {logo}
        <p className="max-w-68 text-center text-16 font-regular text-primary-950 tablet:max-w-123.25 tablet:text-start tablet:text-24 desktop:rtl:max-w-111.25">
          {tagline}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-7.75">
        <p className={cn(GRADIENT_TEXT, "max-w-72.75 text-16 tablet:max-w-108.75 tablet:text-24")}>
          {downloadHeading}
        </p>
        <div
          dir="ltr"
          className="flex flex-col items-start gap-8 tablet:flex-row tablet:flex-wrap tablet:gap-12 desktop:rtl:gap-3"
        >
          {storeBadges}
        </div>
      </div>

      <div className="flex w-60 flex-col items-center justify-center gap-8 desktop:rtl:w-54">
        <p className={cn(GRADIENT_TEXT, "text-center text-24 desktop:rtl:self-end")}>
          {socialHeading}
        </p>
        <div dir="ltr" className="flex w-full items-center gap-4 rtl:justify-end desktop:rtl:gap-2">
          {socialLinks}
        </div>
      </div>
    </footer>
  );
}
