import type { SiteContent } from "./types";

/**
 * Arabic copy, lifted verbatim from the Arabic frame `عربي` (1028:20692) and the
 * Arabic component set (1028:21461) of Figma file jfNj5yN77f5lk3SULMAHjN.
 *
 * Node references: nav 1028:21471–1028:21475 · hero card I1028:26386 ·
 * Why Choose Us 1028:22136 · Get the App 1029:27815, steps 1030:24656/24652/24648 ·
 * Service Areas 1028:20709 · provider 1028:22478 · reviews 1015:21033, 1028:20722,
 * 1028:23154 · footer 1028:20726.
 *
 * Not from Figma — accessibility labels the design has no text for (the English
 * equivalents are also authored, see docs/phase-5-deviations.md): `hero.ringLabel`,
 * `getApp.screensAlt`, `serviceAreas.locateLabel`, `provider.illustrationAlt`,
 * `a11y.*`, `language.switchLabel`.
 *
 * The store badges stay in English: the Arabic frame uses the same English badges.
 * Only Ahmed Omar has an Arabic name in Figma; the other three reviewers exist only as
 * the English variant names, and are used as such.
 */
export const ar: SiteContent = {
  locale: "ar",
  dir: "rtl",
  nav: [
    { label: "من نحن", href: "#about", icon: "about" },
    { label: "لماذا نحن", href: "#why-us", icon: "choose" },
    { label: "حمّل التطبيق", href: "#get-the-app", icon: "app" },
    { label: "أماكن خدماتنا", href: "#service-areas", icon: "areas" },
    { label: "كن مقدم خدمة", href: "#become-a-provider", icon: "contact" },
  ],
  hero: {
    title: "The Map",
    body: "في The Map, رؤيتنا هي تقديم منصة ذكية تساعد الناس على حياة أسهل وأكثر تنظيمًا. هدفنا هو جمع الخدمات الأساسية في مكان واحد، لتوفير الوقت وجعل كل ما تحتاجه في متناول يدك .",
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
    ringLabel: "خدمات The Map",
  },
  whyChoose: {
    title: "لماذا نحن؟",
    features: [
      { id: "all-in-one", label: "كل ما تحتاجه هنا", description: "" },
      { id: "flexible", label: "تناسب مع احتياجاتك", description: "" },
      { id: "nearby", label: "في محيطك", description: "" },
      { id: "fast", label: "بسرعة فائقة", description: "" },
      { id: "easy", label: "بسيط وسلس", description: "" },
    ],
  },
  getApp: {
    badge: "حمّل التطبيق الآن",
    subtitle: "ابدأ رحلتك في ثوانٍ واستمتع بكل الخدمات من هاتفك.",
    steps: [
      { title: "اختر متجرك", description: "اختر المتجر المناسب لهاتفك لتحميل التطبيق" },
      { title: "اضغط للتثبيت", description: "اضغط على “تثبيت” وانتظر حتى يكتمل التحميل" },
      {
        title: "ابدأ الآن",
        description: "أنشئ حسابك وابدأ استخدام الخدمات فورًا.",
        compactDescription: true,
      },
    ],
    screensAlt: "لقطات من تطبيق The Map",
  },
  serviceAreas: {
    title: "مناطق الخدمة",
    subtitle: "تعرف على المناطق التي تغطيها خدماتنا بالقرب منك.",
    searchLabel: "ابحث بحسب منطقتك",
    searchPlaceholder: "ابحث بحسب منطقتك",
    locateLabel: "استخدم موقعي الحالي",
    cta: "تحقق من التوافر",
  },
  provider: {
    badge: "لماذا تنضم إلينا كمقدم خدمة؟",
    body: "ابدأ اليوم كمزود خدمة واحصل على طلبات يومية من محيطك.",
    email: {
      title: "أرسل لنا بريدًا إلكترونيًا موضحًا نوع خدمتك.",
      subtitle: "سيتواصل معك فريقنا لاستكمال التفاصيل.",
      address: "info@Themap.com",
    },
    downloadHeading: "حمّل تطبيق مقدمي الخدمات وابدأ استقبال الطلبات فورًا.",
    benefits: [
      { id: "wider-reach", title: "انتشار أوسع", description: "وسع نشاطك داخل مدينتك بسهولة." },
      { id: "income", title: "ضاعف أرباحك", description: "ارفع أرباحك من طلبات يومية جديدة." },
      { id: "simple", title: "نظام سهل ومنظم", description: "إدارة كل شغلك في مكان واحد." },
      { id: "ready-clients", title: "عملاء جاهزون", description: "نوصلك بعملاء يبحثون عنك الآن." },
      { id: "full-flexibility", title: "مرونة كاملة", description: "اشتغل في الوقت اللي يناسبك." },
    ],
    illustrationAlt: "هاتف يعرض إحصائيات مقدم الخدمة",
  },
  reviews: {
    heading: "ثقة مبنية على تقييمات حقيقية",
    subheading: "تجارب حقيقية من مستخدمين فعليين تعكس جودة خدماتنا وتساعدك على اتخاذ قرارك بثقة.",
    items: [
      {
        id: "ahmed-omar",
        name: "أحمد عمر",
        rating: "5/5",
        quote: "التطبيق ساعدني ألاقي مقدمي خدمات موثوقين بسرعة، وكانت تجربة ممتازة بشكل عام.",
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
    tagline: "طريقتك الذكية لاستكشاف كل ما حولك. تجربة أسرع وأكثر وضوحًا لتصل إلى ما تحتاجه بثقة.",
    downloadHeading: "حمّل تطبيق TheMap لأجهزة iOS وAndroid",
    socialHeading: "ابقَ على تواصل معنا",
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
  language: { english: "English", arabic: "العربية", switchLabel: "تغيير اللغة" },
  a11y: {
    skipToContent: "انتقل إلى المحتوى",
    home: "The Map — الصفحة الرئيسية",
    menu: "القائمة",
  },
};
