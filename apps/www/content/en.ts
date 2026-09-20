import type { SiteContent } from "./types";

/**
 * English copy, lifted verbatim from the Figma file jfNj5yN77f5lk3SULMAHjN.
 *
 * Node references: nav 888:20482 · hero card 888:19266/888:19268 ·
 * Why Choose Us 911:19547 · Get the App 936:20102/950:20363 ·
 * Service Areas 974:20059/982:20226 · provider 997:21768/998:20751 ·
 * reviews 1015:21030/1014:20669 · footer 1023:20739/1023:21020/1023:20741.
 *
 * External URLs are `#`: the real App Store, Google Play and social links do not
 * exist anywhere in the Figma file (docs/figma-gaps.md C4, C5).
 */
export const en: SiteContent = {
  locale: "en",
  dir: "ltr",
  nav: [
    { label: "About", href: "#about", icon: "about" },
    { label: "Why Us", href: "#why-us", icon: "choose" },
    { label: "Get the App", href: "#get-the-app", icon: "app" },
    { label: "Service Areas", href: "#service-areas", icon: "areas" },
    { label: "Become a Provider", href: "#become-a-provider", icon: "contact" },
  ],
  hero: {
    title: "The Map",
    body: "At The Map, our vision is to provide a smart platform that helps people live easier and more organized lives. Our goal is to bring essential services together in one place, saving you time and keeping everything within your reach.",
    services: [
      { id: "service", label: "Service", image: "/images/illustration-service.webp" },
      { id: "needed", label: "Needed", image: "/images/illustration-needed.webp" },
      { id: "medical", label: "Medical", image: "/images/illustration-medical.webp" },
      { id: "employee", label: "Employee", image: "/images/illustration-employee.webp" },
      { id: "emergency", label: "Emergency", image: "/images/illustration-emergency.webp" },
      { id: "special", label: "special", image: "/images/illustration-special.webp" },
      { id: "food", label: "Food", image: "/images/illustration-food.webp" },
      { id: "real-estate", label: "Real estate", image: "/images/illustration-real-estate.webp" },
      { id: "blinkz", label: "Blinkz", image: "/images/illustration-blinkz.webp" },
    ],
    ringLabel: "Services on The Map",
  },
  whyChoose: {
    title: "Why Choose Us",
    features: [
      {
        id: "all-in-one",
        label: "All-in-One",
        description: "All the services you need in one app.",
      },
      { id: "flexible", label: "Flexible", description: "" },
      { id: "nearby", label: "Nearby", description: "" },
      { id: "fast", label: "Fast", description: "" },
      { id: "easy", label: "Easy", description: "" },
    ],
  },
  getApp: {
    badge: "Get the App Now",
    subtitle: "Start your journey in seconds and enjoy all services from your phone.",
    steps: [
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
    ],
    screensAlt: "Screens from The Map app",
  },
  serviceAreas: {
    title: "Service Areas",
    subtitle: "Explore the areas where our services are available in your city.",
    searchLabel: "Search by location",
    searchPlaceholder: "Search by location",
    locateLabel: "Use my current location",
    cta: "Check Availability",
  },
  provider: {
    badge: "Why Join as a Service Provider",
    body: "Join us as a service provider and receive daily requests from nearby clients. Increase your income, expand your customer base, and work with full flexibility.",
    email: {
      title: "Send us an email with your service type",
      subtitle: "Our team will contact you to complete the details",
      address: "info@Themap.com",
    },
    downloadHeading: "Download the Provider App and start receiving requests",
    benefits: [
      {
        id: "wider-reach",
        title: "Wider Reach",
        description: "Expand your presence across your city",
      },
      {
        id: "income",
        title: "Increase Your Income",
        description: "Grow your earnings with daily requests",
      },
      {
        id: "simple",
        title: "Simple & Organized System",
        description: "Manage all your work in one place",
      },
      {
        id: "ready-clients",
        title: "Ready Clients",
        description: "Connect with clients actively looking for you",
      },
      {
        id: "full-flexibility",
        title: "Full Flexibility",
        description: "Set your own schedule and accept requests",
      },
    ],
    illustrationAlt: "A phone showing provider analytics",
  },
  reviews: {
    heading: "Trust Built on Real Reviews",
    subheading:
      "Genuine user experiences that reflect our service quality and help you decide with confidence.",
    items: [
      {
        id: "ahmed-omar",
        name: "Ahmed Omar",
        rating: "5/5",
        quote:
          "The app helped me find trusted service providers quickly. Great experience overall.",
        photo: "/images/avatar-6660.webp",
      },
      {
        id: "menna-hamza",
        name: "Menna Hamza",
        rating: "",
        quote: "",
        photo: "/images/avatar-6662.webp",
      },
      {
        id: "mahmoud-ali",
        name: "Mahmoud Ali",
        rating: "",
        quote: "",
        photo: "/images/avatar-6663.webp",
      },
      {
        id: "nourhan-samir",
        name: "Nourhan Samir",
        rating: "",
        quote: "",
        photo: "/images/avatar-6664.webp",
      },
    ],
  },
  footer: {
    tagline:
      "Your smart way to explore everything around you. A faster, clearer experience to reach what you need with confidence.",
    downloadHeading: "Download The Map app for iOS and Android.",
    socialHeading: "Stay Connected With Us.",
  },
  stores: {
    apple: { topLine: "Download On the", bottomLine: "Apple Store", href: "#" },
    google: { topLine: "Download On the", bottomLine: "Google Play", href: "#" },
  },
  social: [
    { id: "facebook", label: "Facebook", href: "#" },
    { id: "instagram", label: "Instagram", href: "#" },
    { id: "x", label: "X", href: "#" },
    { id: "linkedin", label: "LinkedIn", href: "#" },
  ],
  language: { english: "English", arabic: "العربية", switchLabel: "Change language" },
  a11y: {
    skipToContent: "Skip to content",
    home: "The Map — home",
    menu: "Menu",
  },
};
