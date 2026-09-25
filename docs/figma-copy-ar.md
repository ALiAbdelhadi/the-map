# Arabic copy lifted from Figma

Every Arabic string on `/ar` is read verbatim through the Figma MCP from the Arabic
frame `عربي` (`1028:20692`) and the Arabic component set (`1028:21461`). The live
source is `apps/www/content/ar.ts`; this file records where each group came from.

| Group                                                                     | Node                                               |
| ------------------------------------------------------------------------- | -------------------------------------------------- |
| Nav                                                                       | `1028:21471`–`1028:21475`                          |
| Hero card                                                                 | `I1028:26386;1028:21550`, `I1028:26386;1028:21552` |
| Why Choose Us title + five labels                                         | `1028:22136`                                       |
| Get the App badge + subtitle                                              | `1029:27994`, `1029:27819`                         |
| Steps 1 / 2 / 3                                                           | `1030:24656`, `1030:24652`, `1030:24648`           |
| Service Areas                                                             | `1028:20709`                                       |
| Become a Provider (badge, body, email card, download heading, five pills) | `1028:22478`                                       |
| Reviews heading (last typewriter variant)                                 | `1015:21033`                                       |
| Reviews subheading                                                        | `1028:20722`                                       |
| Ahmed Omar's review                                                       | `1028:23154`                                       |
| Footer                                                                    | `1028:20726`                                       |

The five provider pills were matched to their icons by reading which icon sits next
to each Arabic title in `1028:22478` — not by translating the English.

## Not from Figma

- Accessibility labels the design has no text for: `hero.ringLabel`,
  `getApp.screensAlt`, `serviceAreas.locateLabel`, `provider.illustrationAlt`,
  `a11y.skipToContent`, `a11y.home`, `a11y.menu`, `a11y.mainNav`,
  `language.switchLabel`. Authored, like their English counterparts — please review.
- `a11y.mainNav` (AR "القائمة الرئيسية", EN "Main") — the `<nav aria-label>` on the
  desktop nav landmark in `packages/ui/src/components/site-header.tsx` was hardcoded
  English before 2026-09-25; it is now content-driven from `SiteContent.a11y.mainNav`
  for both locales. No Figma node carries this string; it is a pure accessibility
  label like the others in this list.
- Three reviewers (Menna Hamza, Mahmoud Ali, Nourhan Samir) exist in Figma only as
  English variant names; `/ar` uses those names for their collapsed cards.
- The eight hero orbit service card titles (الخدمات, الاحتياجات, الرعاية الطبية,
  المتخصصون, الطوارئ, الترفيه, الطعام, العقارات) — translated by Claude on
  2026-09-25 at the owner's request, PENDING OWNER REVIEW; see Oddities below for
  the EN→AR mapping. "Blinkz" is unchanged (brand name).

## Oddities in the Arabic frame

- The Why Choose Us feature descriptions are not in the Arabic default variant, same
  as English — they belong to the selection interaction (Phase 6).
- `1028:22478` contains one stray English pill ("Wider Reach / Expand your presence
  across your city") alongside the five Arabic ones. Not used.
- The Arabic provider body is one sentence where the English has two. Used verbatim.
- Store badges stay in English in the Arabic frame; so they do on `/ar`.
- **Hero orbit service card titles are English in the Arabic frame.** Checked the
  `Hero section Arabic` component set (`1028:21614`, variants `1028:21667`
  "Service" through `1028:22083` "Blinkz") and its English counterpart
  (`898:20004` and siblings): in both languages the swapped `Cart` instance inside
  each per-service variant keeps the literal text node `"The Map"` — Figma has
  never actually overridden the card title per service, in either locale, only the
  lead/body text differs and only on the Arabic side. A rendered screenshot of the
  Arabic "Service" variant (`1028:21667`) confirms this visually: the card shows
  `Service` in Latin letters even though the paragraph below it is Arabic. So there
  is no Arabic source for the nine service titles ("Service", "Needed", "Medical",
  "Employee", "Emergency", "Special", "Food", "Real estate", "Blinkz") used as the
  hero card heading and as `aria-label`s on `/ar`. Per the "never invent copy" rule,
  these had stayed English on `/ar` pending owner-supplied Arabic titles.

  **Update, 2026-09-25 — PENDING OWNER REVIEW.** At the owner's explicit request,
  Claude translated the eight non-brand titles below. These are not sourced from
  Figma and have not yet been confirmed by the owner as final copy.

  | EN            | AR              |
  | ------------- | --------------- |
  | Service       | الخدمات         |
  | Needed        | الاحتياجات      |
  | Medical       | الرعاية الطبية  |
  | Employee      | المتخصصون       |
  | Emergency     | الطوارئ         |
  | Special       | الترفيه         |
  | Food          | الطعام          |
  | Real estate   | العقارات        |

  "Blinkz" was kept as-is — it's a brand name, not translated.
  `apps/www/content/ar.ts` `hero.services[].title` now carries these Arabic values.

## Typographic corrections

The following punctuation in `apps/www/content/ar.ts` was corrected from what the
Figma text nodes literally contain — words are untouched, only the marks below:

- **Latin comma → Arabic comma (`،`)**: `hero.body`, `"في The Map, رؤيتنا"` →
  `"في The Map، رؤيتنا"`. The Figma text node (`I1028:26386;1028:21552` /
  `1028:21552` / `1028:21558`) literally contains a Latin `,` here because "The Map"
  is itself Latin text embedded in the Arabic sentence, but Arabic typographic
  convention uses `،` for the sentence-level pause, not the Latin `,` — the source
  text mixes scripts without adjusting the punctuation for it.
- **Trailing " ." → "."**: every sentence in the Figma Arabic text nodes ends with a
  space before the full stop (e.g. `"...أينما كنت ."`). This is not Arabic
  typographic practice — Arabic, like Latin script, sets the terminal punctuation
  flush against the last word. Fixed in `hero.body`, all nine `hero.services[].body`
  strings, and all five `whyChoose.features[].description` strings (14 strings
  total). No wording changed, only the removed space before the period.

No `؟` corrections were needed — the Arabic copy has no question marks.
