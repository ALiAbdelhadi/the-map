import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getContent, hasLocale, LOCALES } from "../../content";
import { baloo2, balooBhaijaan2 } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const content = getContent(lang);
  return {
    title: "The Map",
    description: content.footer.tagline,
    alternates: { languages: { en: "/en", ar: "/ar" } },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const content = getContent(lang);

  return (
    <html
      lang={content.locale}
      dir={content.dir}
      className={`${baloo2.variable} ${balooBhaijaan2.variable}`}
    >
      <body
        className={`bg-bg text-secondary-500 antialiased ${
          content.locale === "ar" ? "font-arabic" : "font-sans"
        }`}
      >
        {children}
      </body>
    </html>
  );
}
