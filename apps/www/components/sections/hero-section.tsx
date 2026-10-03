import type { SiteContent } from "../../content/types";
import { HeroSwitcher } from "./hero-switcher";

export function HeroSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="about"
      className="@container relative isolate w-full overflow-hidden bg-primary-800"
    >
      <HeroSwitcher hero={content.hero} />
    </section>
  );
}
