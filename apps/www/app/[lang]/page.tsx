import { notFound } from "next/navigation";

import { Footer, Header } from "../../components/site-chrome";
import { GetAppSection } from "../../components/sections/get-app-section";
import { HeroSection } from "../../components/sections/hero-section";
import { ProviderSection } from "../../components/sections/provider-section";
import { ReviewsSection } from "../../components/sections/reviews-section";
import { ServiceAreasSection } from "../../components/sections/service-areas-section";
import { WhyChooseSection } from "../../components/sections/why-choose-section";
import { getContent, hasLocale } from "../../content";

/**
 * The Map — home page, rendered once per locale (`/en`, `/ar`).
 *
 * Section order and geometry follow the Figma frame `The map English`
 * (`853:19390`): hero, Why Choose Us, Get the App Now, Service Areas,
 * Become a Provider, Reviews, footer. The header floats over the hero.
 */
export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const content = getContent(lang);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-50 focus:rounded-button focus:bg-secondary-500 focus:px-4 focus:py-2 focus:text-16 focus:text-bg"
      >
        {content.a11y.skipToContent}
      </a>

      <div className="relative">
        <Header content={content} />
        <main id="main">
          <HeroSection content={content} />
          <WhyChooseSection content={content} />
          <GetAppSection content={content} />
          <ServiceAreasSection content={content} />
          <ProviderSection content={content} />
          <ReviewsSection content={content} />
        </main>
        <Footer content={content} />
      </div>
    </>
  );
}
