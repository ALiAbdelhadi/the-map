import Image from "next/image";

import { AppStepper } from "@themap/ui/components/app-stepper";
import { BenefitPill } from "@themap/ui/components/benefit-pill";
import { ClickButton } from "@themap/ui/components/click-button";
import { GlassCard } from "@themap/ui/components/glass-card";
import { IconBadge } from "@themap/ui/components/icon-badge";
import { LanguageSwitch } from "@themap/ui/components/language-switch";
import { MobileMenu } from "@themap/ui/components/mobile-menu";
import { NavLink } from "@themap/ui/components/nav-link";
import { ReviewCarousel } from "@themap/ui/components/review-carousel";
import { SearchField } from "@themap/ui/components/search-field";
import { SiteFooter } from "@themap/ui/components/site-footer";
import { SiteHeader } from "@themap/ui/components/site-header";
import { SocialLink } from "@themap/ui/components/social-link";
import { StoreBadge } from "@themap/ui/components/store-badge";
import { WhyChooseList } from "@themap/ui/components/why-choose-list";
import { AboutIcon } from "@themap/ui/icons/about";
import { AllInOneIcon } from "@themap/ui/icons/all-in-one";
import { ApostropheIcon } from "@themap/ui/icons/apostrophe";
import { AppIcon } from "@themap/ui/icons/app";
import { AppStoreIcon } from "@themap/ui/icons/app-store";
import { AreasIcon } from "@themap/ui/icons/areas";
import { ArrowIcon } from "@themap/ui/icons/arrow";
import { ContactUsIcon } from "@themap/ui/icons/contact-us";
import { EasyIcon } from "@themap/ui/icons/easy";
import { FacebookIcon } from "@themap/ui/icons/facebook";
import { FastIcon } from "@themap/ui/icons/fast";
import { FlexibleIcon } from "@themap/ui/icons/flexible";
import { FocusIcon } from "@themap/ui/icons/focus";
import { IncomeIcon } from "@themap/ui/icons/income";
import { InstagramIcon } from "@themap/ui/icons/instagram";
import { LanguageToggleEnIcon } from "@themap/ui/icons/language-toggle-en";
import { MenuIcon } from "@themap/ui/icons/menu";
import { NearbyIcon } from "@themap/ui/icons/nearby";
import { StarIcon } from "@themap/ui/icons/star";
import { assertDevPage } from "../dev-only";

/**
 * Dev-only component sheet.
 *
 * Renders every Phase 4 component in every state Figma defines. Copy shown here
 * is lifted from the Figma nodes named in each component's doc comment; where a
 * variant's copy has not been read out of Figma yet it is left empty rather than
 * invented, and Phase 5 fills it in.
 */

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 border-t border-natural-200 pt-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-24 font-semibold">{title}</h2>
        {note ? <p className="text-14 text-natural-600">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Dark({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-6 rounded-card bg-secondary-500 p-6">
      {children}
    </div>
  );
}

const REVIEWS = [
  {
    id: "ahmed",
    name: "Ahmed Omar",
    rating: "5/5",
    quote: "The app helped me find trusted service providers quickly. Great experience overall.",
    photo: (
      <Image
        src="/images/avatar-6660.webp"
        alt=""
        width={214}
        height={614}
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    id: "menna",
    name: "Menna Hamza",
    rating: "",
    quote: "",
    photo: (
      <Image
        src="/images/avatar-6662.webp"
        alt=""
        width={420}
        height={614}
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    id: "mahmoud",
    name: "Mahmoud Ali",
    rating: "",
    quote: "",
    photo: (
      <Image
        src="/images/avatar-6663.webp"
        alt=""
        width={420}
        height={614}
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    id: "nourhan",
    name: "Nourhan Samir",
    rating: "",
    quote: "",
    photo: (
      <Image
        src="/images/avatar-6664.webp"
        alt=""
        width={420}
        height={614}
        className="h-full w-full object-cover"
      />
    ),
  },
];

const FEATURES = [
  {
    id: "all-in-one",
    label: "All-in-One",
    description: "All the services you need in one app.",
    icon: <AllInOneIcon />,
  },
  { id: "flexible", label: "Flexible", description: "", icon: <FlexibleIcon /> },
  { id: "nearby", label: "Nearby", description: "", icon: <NearbyIcon /> },
  { id: "fast", label: "Fast", description: "", icon: <FastIcon /> },
  { id: "easy", label: "Easy", description: "", icon: <EasyIcon /> },
];

const STEPS = [
  {
    title: "Choose Your Store",
    description: "Tap on App Store or Google Play based on your device.",
  },
  { title: "Tap Install", description: "Tap “Install” and wait for the download to complete." },
  {
    title: "Get Started",
    description: "Create your account and start using the services instantly.",
    compactDescription: true,
  },
];

const NAV = [
  { label: "About", href: "#about", icon: <AboutIcon />, current: true },
  { label: "Why Us", href: "#why", icon: <AppIcon />, current: false },
  { label: "Get the App", href: "#app", icon: <AppIcon />, current: false },
  { label: "Service Areas", href: "#areas", icon: <AreasIcon />, current: false },
  { label: "Become a Provider", href: "#provider", icon: <ContactUsIcon />, current: false },
];

const STORE_BADGES = (
  <>
    <StoreBadge
      icon={<AppStoreIcon />}
      topLine="Download On the"
      bottomLine="Apple Store"
      href="#apple"
    />
    <StoreBadge
      icon={<Image src="/svg/google-play.svg" alt="" width={24} height={24} />}
      topLine="Download On the"
      bottomLine="Google Play"
      href="#google"
    />
  </>
);

const SOCIAL_LINKS = (
  <>
    <SocialLink href="#facebook" label="Facebook">
      <FacebookIcon width={48} height={48} className="text-primary-500" />
    </SocialLink>
    <SocialLink href="#instagram" label="Instagram">
      <InstagramIcon width={48} height={48} className="text-primary-500" />
    </SocialLink>
    <SocialLink href="#x" label="X">
      <Image src="/svg/x.svg" alt="" width={48} height={48} />
    </SocialLink>
    <SocialLink href="#linkedin" label="LinkedIn">
      <Image src="/svg/linkedin.svg" alt="" width={48} height={48} />
    </SocialLink>
  </>
);

const LANGUAGE_SWITCH = (
  <LanguageSwitch
    current="en"
    englishHref="/en"
    arabicHref="/ar"
    englishLabel="English"
    arabicLabel="العربية"
    englishFlag={<Image src="/svg/flag-english.svg" alt="" width={32} height={32} />}
    arabicFlag={<Image src="/svg/flag-arabic.svg" alt="" width={32} height={32} />}
    toggle={<LanguageToggleEnIcon width={59} height={24} />}
  />
);

export default function ComponentsPage() {
  assertDevPage();

  return (
    <main className="mx-auto flex max-w-desktop flex-col gap-12 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-38 font-bold text-primary-500">Components</h1>
        <p className="text-16 text-natural-600">
          Every Phase 4 component, in the states Figma defines. Dev only. Hover and focus states are
          live — tab through the page to see focus rings.
        </p>
      </header>

      <Section
        title="Header"
        note="Figma 888:20482 / 1028:25400. Nav collapses to the drawer below 1440."
      >
        <div className="rounded-card bg-secondary-800 p-6">
          <SiteHeader
            homeHref="/"
            homeLabel="The Map — home"
            logo={<Image src="/svg/logo-wordmark.svg" alt="" width={178} height={40} />}
            nav={NAV.map((item) => (
              <NavLink key={item.label} href={item.href} icon={item.icon} current={item.current}>
                {item.label}
              </NavLink>
            ))}
            languageSwitch={LANGUAGE_SWITCH}
            drawer={
              <MobileMenu icon={<MenuIcon />} label="Menu">
                {NAV.map((item) => (
                  <NavLink
                    key={item.label}
                    href={item.href}
                    icon={item.icon}
                    current={item.current}
                  >
                    {item.label}
                  </NavLink>
                ))}
                {LANGUAGE_SWITCH}
              </MobileMenu>
            }
          />
        </div>
      </Section>

      <Section
        title="Nav item"
        note="Default, hover (primary/400 fill), current (1 px white border) — 870:18937-9."
      >
        <Dark>
          <NavLink href="#one" icon={<AboutIcon />}>
            Default
          </NavLink>
          <NavLink href="#two" icon={<AboutIcon />} current>
            Current
          </NavLink>
          <span className="text-14 text-bg/70">Hover any item to see the primary/400 fill.</span>
        </Dark>
      </Section>

      <Section
        title="Buttons"
        note="Click here 996:20963 / 997:21147 · store badge 942:20434 / 942:20433."
      >
        <div className="flex flex-wrap items-center gap-6">
          <ClickButton arrow={<ArrowIcon width={17} height={26} />}>Click here</ClickButton>
          {STORE_BADGES}
        </div>
      </Section>

      <Section
        title="Glass surfaces"
        note="Hero card 888:19276 · header bar 1028:25400 · provider pill 995:20699."
      >
        <div className="flex flex-wrap gap-6 rounded-card bg-secondary-800 p-6">
          <GlassCard className="w-103.75">
            <div className="flex flex-col gap-3">
              <p className="text-38 font-bold text-primary-300">The Map</p>
              <p className="text-28 font-medium text-bg">Hero card surface.</p>
            </div>
          </GlassCard>
          <BenefitPill
            title="Increase Your Income"
            description="Grow your earnings with daily requests."
            icon={<IncomeIcon />}
          />
        </div>
      </Section>

      <Section title="Icon badge" note="911:19545 — primary/400, primary/600 on hover.">
        <Dark>
          <IconBadge>
            <AllInOneIcon />
          </IconBadge>
          <IconBadge tone="hover">
            <AllInOneIcon />
          </IconBadge>
          <IconBadge iconSize={22}>
            <IncomeIcon />
          </IconBadge>
        </Dark>
      </Section>

      <Section
        title="Why Choose Us list"
        note="914:20605 — select a row to reveal its description."
      >
        <div className="rounded-card bg-secondary-500 p-6">
          <WhyChooseList
            label="Why choose us"
            features={FEATURES}
            descriptionClassName="text-24 font-regular text-bg"
          />
        </div>
      </Section>

      <Section title="Get the App stepper" note="963:20033 — one step open at a time.">
        <div className="w-108.25 rounded-card bg-secondary-800 p-6">
          <AppStepper label="How to get the app" steps={STEPS} />
        </div>
      </Section>

      <Section title="Search field" note="984:20299-301 — focus adds the 3 px primary/500 border.">
        <form className="rounded-card bg-primary-300 p-6">
          <SearchField
            name="location"
            label="Search by location"
            placeholder="Search by location"
            icon={<AreasIcon />}
            actionIcon={<FocusIcon />}
            actionLabel="Use my current location"
            className="w-151.75"
          />
        </form>
      </Section>

      <Section title="Reviews" note="1015:20920 — one card expanded, the rest collapsed.">
        <ReviewCarousel
          label="What people say"
          reviews={REVIEWS}
          ratingIcon={<StarIcon width={24} height={24} className="text-primary-500" />}
          quoteMark={<ApostropheIcon width={53} height={53} className="text-secondary-200" />}
        />
      </Section>

      <Section title="Footer" note="1023:20803.">
        <SiteFooter
          logo={<Image src="/svg/logo-wordmark.svg" alt="" width={310} height={92} />}
          tagline="Your smart way to explore everything around you. A faster, clearer experience to reach what you need with confidence."
          downloadHeading="Download The Map app for iOS and Android."
          storeBadges={STORE_BADGES}
          socialHeading="Stay Connected With Us."
          socialLinks={SOCIAL_LINKS}
        />
      </Section>
    </main>
  );
}
