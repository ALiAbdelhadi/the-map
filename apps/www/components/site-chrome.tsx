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
import { ProvidersIcon } from "@themap/ui/icons/providers";
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
  provider: ProvidersIcon,
} as const;

function NavItems({ content }: { content: SiteContent }) {
  return (
    <>
      {content.nav.map((item) => {
        const Icon = NAV_ICONS[item.icon];
        return (
          <NavLink key={item.href} href={item.href} icon={<Icon className="size-full" />}>
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

export function Header({ content }: { content: SiteContent }) {
  return (
    <div className="@container absolute inset-x-0 top-5 z-20 tablet:top-8.25 desktop:top-0">
      <div className="flex justify-center px-2 tablet:px-7.5 desktop:px-8 desktop:pt-[calc(88*var(--scale-landscape))]">
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
    </div>
  );
}

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
} as const;

export function Footer({ content }: { content: SiteContent }) {
  return (
    <div className="relative -mt-12.75 w-full rounded-t-footer bg-gradient-to-r from-primary-500 to-green-600 pt-px shadow-footer tablet:mt-0 tablet:rounded-t-footer-wide">
      <div className="relative isolate flex w-full justify-center overflow-hidden rounded-t-footer bg-bg px-4 pt-18.25 pb-16 tablet:rounded-t-footer-wide tablet:px-8">
        <Image
          src="/svg/logo-mark.svg"
          alt=""
          width={165}
          height={197}
          className="pointer-events-none absolute top-37.5 left-1/2 -z-10 -ml-52.25 h-auto w-108.5 max-w-none opacity-5 tablet:top-32.75 tablet:-ml-61 tablet:w-122 desktop:-top-footer-mark-top desktop:-ml-footer-mark-shift desktop:w-footer-mark"
        />
        <SiteFooter
          className="max-w-desktop"
          logo={
            <LogoWordmarkIcon
              width={310}
              height={70}
              className="h-15.25 w-auto text-primary-500 tablet:h-23 desktop:h-footer-logo"
            />
          }
          tagline={content.footer.tagline}
          downloadHeading={content.footer.downloadHeading}
          socialHeading={content.footer.socialHeading}
          storeBadges={
            <>
              <StoreBadge
                icon={<AppStoreIcon width={20} height={20} />}
                topLine={content.stores.apple.topLine}
                bottomLine={content.stores.apple.bottomLine}
                href={content.stores.apple.href}
              />
              <StoreBadge
                icon={<Image src="/svg/google-play.svg" alt="" width={20} height={20} />}
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
