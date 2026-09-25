import Image from "next/image";

import { LanguageSwitch } from "@themap/ui/components/language-switch";
import { MobileMenu } from "@themap/ui/components/mobile-menu";
import { NavLink } from "@themap/ui/components/nav-link";
import { SiteFooter } from "@themap/ui/components/site-footer";
import { SiteHeader } from "@themap/ui/components/site-header";
import { SocialLink } from "@themap/ui/components/social-link";
import { StoreBadge } from "@themap/ui/components/store-badge";
import { AboutIcon } from "@themap/ui/icons/about";
import { AppIcon } from "@themap/ui/icons/app";
import { AppStoreIcon } from "@themap/ui/icons/app-store";
import { AreasIcon } from "@themap/ui/icons/areas";
import { ChooseIcon } from "@themap/ui/icons/choose";
import { ContactUsIcon } from "@themap/ui/icons/contact-us";
import { FacebookIcon } from "@themap/ui/icons/facebook";
import { InstagramIcon } from "@themap/ui/icons/instagram";
import { LanguageToggleArIcon } from "@themap/ui/icons/language-toggle-ar";
import { LanguageToggleEnIcon } from "@themap/ui/icons/language-toggle-en";
import { LogoWordmarkIcon } from "@themap/ui/icons/logo-wordmark";
import { MenuIcon } from "@themap/ui/icons/menu";

import type { SiteContent } from "../content/types";

const NAV_ICONS = {
  about: AboutIcon,
  choose: ChooseIcon,
  app: AppIcon,
  areas: AreasIcon,
  contact: ContactUsIcon,
} as const;

function NavItems({ content }: { content: SiteContent }) {
  return (
    <>
      {content.nav.map((item) => {
        const Icon = NAV_ICONS[item.icon];
        return (
          <NavLink key={item.href} href={item.href} icon={<Icon />}>
            {item.label}
          </NavLink>
        );
      })}
    </>
  );
}

function LocaleSwitch({ content }: { content: SiteContent }) {
  return (
    <LanguageSwitch
      current={content.locale}
      englishHref="/en"
      arabicHref="/ar"
      englishLabel={content.language.english}
      arabicLabel={content.language.arabic}
      englishFlag={<Image src="/svg/flag-english.svg" alt="" width={32} height={32} />}
      arabicFlag={<Image src="/svg/flag-arabic.svg" alt="" width={32} height={32} />}
      toggle={
        content.locale === "ar" ? (
          <LanguageToggleArIcon width={59} height={24} />
        ) : (
          <LanguageToggleEnIcon width={59} height={24} />
        )
      }
    />
  );
}

/**
 * Header, floating over the hero exactly as in Figma `888:20482` (y 88 on the
 * 1440 frame, 1357 wide).
 */
export function Header({ content }: { content: SiteContent }) {
  return (
    <div className="absolute inset-x-0 top-5 z-20 flex justify-center px-2 tablet:top-8.25 tablet:px-7.5 desktop:top-22 desktop:px-8">
      <SiteHeader
        className="max-w-header"
        homeHref={`/${content.locale}`}
        homeLabel={content.a11y.home}
        logo={
          <LogoWordmarkIcon width={178} height={40} className="h-full w-full text-primary-500" />
        }
        nav={<NavItems content={content} />}
        mainNavLabel={content.a11y.mainNav}
        languageSwitch={<LocaleSwitch content={content} />}
        drawer={
          <MobileMenu icon={<MenuIcon className="h-full w-full" />} label={content.a11y.menu}>
            <NavItems content={content} />
            <LocaleSwitch content={content} />
          </MobileMenu>
        }
      />
    </div>
  );
}

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
} as const;

/**
 * Footer, Figma `930:20465` (tablet `1037:32742`, phone `1041:29724`).
 *
 * Every frame: a 1 px top stroke painted with the primary/500 -> green/600 gradient
 * (blue on the left, green on the right, in the Arabic frame too) and the Footer
 * shadow; top corners 62 on the phone, 100 from the tablet up. CSS borders cannot
 * take a gradient on a rounded edge, so the outer box carries the gradient and the
 * inner panel sits 1 px lower with the same radius — the gradient shows only along
 * the top, tapering round the corners exactly like a top-only stroke.
 * Phone: 73 px above the column, and it overlaps the provider section by 51 px.
 * Tablet: 824 tall, the column 74 px down, a 408x92 logo.
 *
 * Watermark: `icon blue 2` (`1022:20737` / `1037:32743` / `1041:29725`) is the maze-pin
 * mark in primary/500 at 5 % opacity, drawn from a square image — 1662 on the 1440
 * frame, 853 on the tablet, 759 on the phone. The mark itself is `logo-mark.svg`
 * (the same artwork, vector), placed where the square puts it: phone 434 wide, 150
 * down, centre +8; tablet 488 wide, 131 down, centred; desktop 951 wide, 372 above
 * the top, centre +13. The Arabic frame (`1028:20725`) keeps the same physical
 * position, so it is placed with `left`, not a logical property.
 */
export function Footer({ content }: { content: SiteContent }) {
  return (
    <div className="relative -mt-12.75 w-full rounded-t-footer bg-gradient-to-r from-primary-500 to-green-600 pt-px shadow-footer tablet:mt-0 tablet:rounded-t-footer-wide">
      <div className="relative isolate flex w-full justify-center overflow-hidden rounded-t-footer bg-bg px-4 pt-18.25 pb-22.75 tablet:rounded-t-footer-wide tablet:px-8 tablet:pb-43.25 desktop:pb-23.25">
        <Image
          src="/svg/logo-mark.svg"
          alt=""
          width={165}
          height={197}
          className="pointer-events-none absolute top-37.5 left-1/2 -z-10 -ml-52.25 h-auto w-108.5 max-w-none opacity-5 tablet:top-32.75 tablet:-ml-61 tablet:w-122 desktop:-top-93 desktop:-ml-115.75 desktop:w-237.75"
        />
        <SiteFooter
          className="max-w-desktop gap-12"
          logo={
            <LogoWordmarkIcon
              width={310}
              height={70}
              className="h-15.25 w-auto text-primary-500 tablet:h-23 desktop:h-23"
            />
          }
          tagline={content.footer.tagline}
          downloadHeading={content.footer.downloadHeading}
          socialHeading={content.footer.socialHeading}
          storeBadges={
            <>
              <StoreBadge
                icon={<AppStoreIcon />}
                topLine={content.stores.apple.topLine}
                bottomLine={content.stores.apple.bottomLine}
                href={content.stores.apple.href}
              />
              <StoreBadge
                icon={<Image src="/svg/google-play.svg" alt="" width={24} height={24} />}
                topLine={content.stores.google.topLine}
                bottomLine={content.stores.google.bottomLine}
                href={content.stores.google.href}
              />
            </>
          }
          socialLinks={content.social.map((item) => {
            const Icon =
              item.id in SOCIAL_ICONS ? SOCIAL_ICONS[item.id as keyof typeof SOCIAL_ICONS] : null;
            return (
              <SocialLink key={item.id} href={item.href} label={item.label}>
                {Icon ? (
                  <Icon width={48} height={48} className="text-primary-500" />
                ) : (
                  <Image src={`/svg/${item.id}.svg`} alt="" width={48} height={48} />
                )}
              </SocialLink>
            );
          })}
        />
      </div>
    </div>
  );
}
