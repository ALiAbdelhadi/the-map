import type { ReactNode } from "react";

export type SiteContent = {
  locale: "en" | "ar";
  dir: "ltr" | "rtl";
  nav: { label: string; href: string; icon: "about" | "app" | "areas" | "choose" | "provider" }[];
  hero: {
    title: string;
    body: string;
    services: {
      id: string;
      title: string;
      lead: string;
      body: string;
      image: string;
      background: string;
    }[];
    homeLabel: string;
    ringLabel: string;
  };
  whyChoose: {
    title: string;
    features: { id: string; label: string; description: string }[];
  };
  getApp: {
    badge: string;
    subtitle: string;
    steps: { title: string; description: string; compactDescription?: boolean }[];
    screensAlt: string;
  };
  serviceAreas: {
    title: string;
    titleAlt: string;
    subtitle: string;
    searchLabel: string;
    searchPlaceholder: string;
    locateLabel: string;
    cta: string;
  };
  provider: {
    badge: string;
    body: string;
    email: { title: string; subtitle: string; address: string };
    downloadHeading: string;
    benefits: { id: string; title: string; description: string }[];
    illustrationAlt: string;
    clickHere: string;
  };
  reviews: {
    heading: string;
    subheading: string;
    items: { id: string; name: string; rating: string; quote: string; photo: string }[];
  };
  footer: {
    tagline: string;
    downloadHeading: string;
    socialHeading: string;
  };
  stores: {
    apple: { topLine: string; bottomLine: string; href: string };
    google: { topLine: string; bottomLine: string; href: string };
  };
  social: { id: "facebook" | "instagram" | "x" | "linkedin"; label: string; href: string }[];
  language: { english: string; arabic: string; switchLabel: string };
  a11y: { skipToContent: string; home: string; menu: string; mainNav: string };
  children?: ReactNode;
};
