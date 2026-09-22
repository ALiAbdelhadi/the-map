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
      {
        id: "service",
        title: "Service",
        lead: "All the skilled services you need, in one trusted platform.",
        body: "Find verified plumbers, carpenters, electricians, and builders, and book the right service in minutes—right where you are.",
        image: "/images/orbit-service.webp",
        background: "/images/hero-bg-service.webp",
      },
      {
        id: "needed",
        title: "Needed",
        lead: "All your daily needs in one place—without leaving your home.",
        body: "Order from supermarkets, pharmacies, bakeries, or any nearby store and enjoy fast, reliable delivery right to your door, anytime.",
        image: "/images/orbit-needed.webp",
        background: "/images/hero-bg-needed.webp",
      },
      {
        id: "medical",
        title: "Medical",
        lead: "Your healthcare, made simple and accessible.",
        body: "Book appointments with specialized doctors, track your tests and scans, and follow up on your health with available doctors near you—all in one place.",
        image: "/images/orbit-medical.webp",
        background: "/images/hero-bg-medical.webp",
      },
      {
        id: "employee",
        title: "Employee",
        lead: "Need a professional? Find one instantly.",
        body: "Connect with experienced lawyers, accountants, engineers, designers, and developers ready to support your needs based on expertise and location.",
        image: "/images/orbit-employee.webp",
        background: "/images/hero-bg-employee.webp",
      },
      {
        id: "emergency",
        title: "Emergency",
        lead: "In emergencies, help is closer than you think.",
        body: "Request a tow truck, report a missing person or animal, find blood donors, or quickly contact the proper authorities when every second matters.",
        image: "/images/orbit-emergency.webp",
        background: "/images/hero-bg-emergency.webp",
      },
      {
        id: "special",
        title: "Special",
        lead: "Your time is for fun—not waiting.",
        body: "Pick your favorite activity, book it in seconds, and let the app remind you so you can enjoy a smooth, organized entertainment experience from start to finish.",
        image: "/images/orbit-special.webp",
        background: "/images/hero-bg-special.webp",
      },
      {
        id: "food",
        title: "Food",
        lead: "More choices, better taste—delivered to you.",
        body: "From local spots to popular meals, explore ingredients, prices, and reviews, and enjoy a smarter, more satisfying food experience.",
        image: "/images/orbit-food.webp",
        background: "/images/hero-bg-food.webp",
      },
      {
        id: "real-estate",
        title: "Real estate",
        lead: "All types of real estate in one place.",
        body: "Explore residential, commercial, and recreational properties for rent, ownership, or booking, with clear details and visuals to help you choose confidently.",
        image: "/images/orbit-real-estate.webp",
        background: "/images/hero-bg-real-estate.webp",
      },
      {
        id: "blinkz",
        title: "Blinkz",
        lead: "Smarter, easier transportation anytime.",
        body: "Book cars, motorcycles, and various transport options, with smart ride services and cargo shipping—all in one fast, reliable experience.",
        image: "/images/orbit-blinkz.webp",
        background: "/images/hero-bg-blinkz.webp",
      },
    ],
    homeLabel: "Back to The Map",
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
      { id: "flexible", label: "Flexible", description: "Flexible solutions for every need." },
      { id: "nearby", label: "Nearby", description: "Services available near your location." },
      { id: "fast", label: "Fast", description: "Quick booking and instant access." },
      { id: "easy", label: "Easy", description: "Simple and user-friendly experience." },
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
    titleAlt: "Where We Operate",
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
    // Figma keeps this English in the Arabic frame too (1028:22477).
    clickHere: "Click here",
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
