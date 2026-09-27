import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type SiteFooterProps = {
  logo: ReactNode;
  tagline: string;
  downloadHeading: string;
  storeBadges: ReactNode;
  socialHeading: string;
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
        "flex flex-col items-center gap-12 desktop:flex-row desktop:items-center desktop:justify-end desktop:gap-footer-gap desktop:rtl:gap-footer-gap-ar",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-8 tablet:items-start desktop:gap-footer-intro">
        {logo}
        <p className="max-w-68 text-center text-16 font-regular text-primary-950 tablet:max-w-123.25 tablet:text-start tablet:text-24 desktop:max-w-footer-tagline desktop:text-footer desktop:rtl:max-w-footer-tagline-ar">
          {tagline}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-7.75 desktop:max-w-footer-download desktop:items-start wide:items-center">
        <p
          className={cn(
            GRADIENT_TEXT,
            "max-w-72.75 text-16 tablet:max-w-108.75 tablet:text-24 desktop:max-w-footer-download desktop:text-footer",
          )}
        >
          {downloadHeading}
        </p>
        <div
          dir="ltr"
          className="flex flex-col items-start gap-8 desktop:flex-row desktop:flex-wrap desktop:gap-12 desktop:gap-y-3 desktop:rtl:justify-end desktop:rtl:gap-3"
        >
          {storeBadges}
        </div>
      </div>

      <div className="flex w-60 flex-col items-center justify-center gap-8 desktop:rtl:w-54">
        <p
          className={cn(
            GRADIENT_TEXT,
            "text-center text-24 desktop:text-footer desktop:rtl:self-start",
          )}
        >
          {socialHeading}
        </p>
        <div dir="ltr" className="flex w-full items-center gap-4 rtl:justify-end desktop:rtl:gap-2">
          {socialLinks}
        </div>
      </div>
    </footer>
  );
}
