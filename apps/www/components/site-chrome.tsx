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
      englishHref="/"
      arabicHref="/"
      englishLabel={content.language.english}
      arabicLabel={content.language.arabic}
      englishFlag={<Image src="/svg/flag-english.svg" alt="" width={32} height={32} />}
      arabicFlag={<Image src="/svg/flag-arabic.svg" alt="" width={32} height={32} />}
      toggle={<LanguageToggleEnIcon width={59} height={24} />}
    />
  );
}

/**
 * Header, floating over the hero exactly as in Figma `888:20482` (y 88 on the
 * 1440 frame, 1357 wide).
 */
export function Header({ content }: { content: SiteContent }) {
  return (
    <div className="absolute inset-x-0 top-5 z-20 flex justify-center px-4 tablet:px-8 desktop:top-22">
      <SiteHeader
        className="max-w-container-desktop"
        homeHref="/"
        homeLabel={content.a11y.home}
        logo={<LogoWordmarkIcon width={178} height={40} className="text-primary-500" />}
        nav={<NavItems content={content} />}
        languageSwitch={<LocaleSwitch content={content} />}
        drawer={
          <MobileMenu icon={<MenuIcon />} label={content.a11y.menu}>
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

/** Footer, Figma `930:20465` — the `icon blue 2` watermark sits behind it. */
export function Footer({ content }: { content: SiteContent }) {
  return (
    <div className="relative isolate flex w-full justify-center overflow-hidden rounded-t-card bg-bg px-4 py-16 tablet:px-8">
      <Image
        src="/images/footer-watermark.webp"
        alt=""
        width={2878}
        height={810}
        sizes="100vw"
        className="-z-10 absolute inset-0 h-full w-full object-cover"
      />
      <SiteFooter
        className="max-w-container-desktop gap-12"
        logo={<LogoWordmarkIcon width={310} height={70} className="text-primary-500" />}
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
  );
}
