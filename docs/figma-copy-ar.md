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
  `a11y.skipToContent`, `a11y.home`, `a11y.menu`, `language.switchLabel`. Authored,
  like their English counterparts — please review.
- Three reviewers (Menna Hamza, Mahmoud Ali, Nourhan Samir) exist in Figma only as
  English variant names; `/ar` uses those names for their collapsed cards.

## Oddities in the Arabic frame

- The Why Choose Us feature descriptions are not in the Arabic default variant, same
  as English — they belong to the selection interaction (Phase 6).
- `1028:22478` contains one stray English pill ("Wider Reach / Expand your presence
  across your city") alongside the five Arabic ones. Not used.
- The Arabic provider body is one sentence where the English has two. Used verbatim.
- Store badges stay in English in the Arabic frame; so they do on `/ar`.
