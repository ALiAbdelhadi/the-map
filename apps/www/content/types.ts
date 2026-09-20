import type { ReactNode } from "react";

/** Every string the page renders. Values are lifted verbatim from Figma. */
export type SiteContent = {
  locale: "en" | "ar";
  dir: "ltr" | "rtl";
  nav: { label: string; href: string; icon: "about" | "app" | "areas" | "choose" | "contact" }[];
  hero: {
    /** Card heading — the default hero state, Figma 888:19266. */
    title: string;
    body: string;
    /** The nine services orbiting the ring, Figma 898:20006. */
    services: { id: string; label: string; image: string }[];
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
  a11y: { skipToContent: string; home: string; menu: string };
  children?: ReactNode;
};
