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
      {
        id: "service",
        title: "Service",
        lead: "جميع الخدمات الماهرة التي تحتاجها، في منصة واحدة موثوقة.",
        body: "اعثر على سباكين، نجارين، كهربائيين ومقاولين موثوقين، واحجز الخدمة المناسبة خلال دقائق، أينما كنت .",
        image: "/images/illustration-service.webp",
        imageLarge: "/images/illustration-service-lg.webp",
        background: "/images/hero-bg-service.webp",
      },
      {
        id: "needed",
        title: "Needed",
        lead: "كل احتياجاتك اليومية في مكان واحد—دون الحاجة لمغادرة منزلك.",
        body: "اطلب من السوبرماركت، الصيدليات، المخابز، أو أي متجر قريب واستمتع بتوصيل سريع وموثوق إلى بابك في أي وقت .",
        image: "/images/illustration-needed.webp",
        imageLarge: "/images/illustration-needed-lg.webp",
        background: "/images/hero-bg-needed.webp",
      },
      {
        id: "medical",
        title: "Medical",
        lead: "رعايتك الصحية، ببساطة وسهولة.",
        body: "احجز مواعيد مع أطباء متخصصين، تتبع نتائج الفحوصات والتحاليل، وتابع صحتك مع الأطباء المتاحين بالقرب منك—كل ذلك في مكان واحد .",
        image: "/images/illustration-medical.webp",
        imageLarge: "/images/illustration-medical-lg.webp",
        background: "/images/hero-bg-medical.webp",
      },
      {
        id: "employee",
        title: "Employee",
        lead: "تحتاج متخصصًا؟ اعثر عليه فورًا.",
        body: "تواصل مع محامين، محاسبين، مهندسين، مصممين ومطورين ذوي خبرة، جاهزين لدعم احتياجاتك حسب التخصص والموقع .",
        image: "/images/illustration-employee.webp",
        imageLarge: "/images/illustration-employee-lg.webp",
        background: "/images/hero-bg-employee.webp",
      },
      {
        id: "emergency",
        title: "Emergency",
        lead: "في الحالات الطارئة، المساعدة أقرب مما تتصور.",
        body: "اطلب سيارة سحب، أبلغ عن شخص أو حيوان مفقود، اعثر على متبرعين بالدم، أو تواصل بسرعة مع الجهات المختصة عندما تكون كل ثانية مهمة .",
        image: "/images/illustration-emergency.webp",
        imageLarge: "/images/illustration-emergency-lg.webp",
        background: "/images/hero-bg-emergency.webp",
      },
      {
        id: "special",
        title: "Special",
        lead: "وقتك للمتعة، وليس للانتظار.",
        body: "اختر نشاطك المفضل، احجزه في ثوانٍ، ودع التطبيق يذكرك لتستمتع بتجربة ترفيهية سلسة ومنظمة من البداية للنهاية .",
        image: "/images/illustration-special.webp",
        imageLarge: "/images/illustration-special-lg.webp",
        background: "/images/hero-bg-special.webp",
      },
      {
        id: "food",
        title: "Food",
        lead: "خيارات أكثر، وطعم أفضل—مباشرة إلى بابك.",
        body: "استكشف الأطباق من المطاعم المحلية إلى الوجبات الشهيرة، تعرف على المكونات والأسعار والتقييمات، واستمتع بتجربة طعام أذكى وأكثر إرضاءً .",
        image: "/images/illustration-food.webp",
        imageLarge: "/images/illustration-food-lg.webp",
        background: "/images/hero-bg-food.webp",
      },
      {
        id: "real-estate",
        title: "Real estate",
        lead: "جميع أنواع العقارات في مكان واحد.",
        body: "استكشف العقارات السكنية، التجارية والترفيهية للإيجار أو التملك أو الحجز، مع تفاصيل واضحة وصور تساعدك على اتخاذ قرارك بثقة .",
        image: "/images/illustration-real-estate.webp",
        imageLarge: "/images/illustration-real-estate-lg.webp",
        background: "/images/hero-bg-real-estate.webp",
      },
      {
        id: "blinkz",
        title: "Blinkz",
        lead: "نقل أذكى وأسهل في أي وقت.",
        body: "احجز سيارات، دراجات نارية، وخيارات نقل متنوعة، مع خدمات الركوب الذكية وشحن البضائع—كل ذلك في تجربة سريعة وموثوقة .",
        image: "/images/illustration-blinkz.webp",
        imageLarge: "/images/illustration-blinkz-lg.webp",
        background: "/images/hero-bg-blinkz.webp",
      },
    ],
    homeLabel: "العودة إلى The Map",
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
