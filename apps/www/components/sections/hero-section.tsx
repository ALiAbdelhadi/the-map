import type { SiteContent } from "../../content/types";
import { HeroSwitcher } from "./hero-switcher";

/**
 * Hero.
 *
 * Figma `Hero section` `898:20007` (1440x1024): fill primary/800 behind a scene,
 * the 669.642x767.626 orbit block and the 544x471 glass card, 64 px apart. The ten
 * variants — the default and one per service — are driven by HeroSwitcher.
 *
 * The section is the query container for `--scale-landscape` (theme.css): from 1023 to
 * 1440 the whole composition is the 1440 frame reduced by it.
 */
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
