# Motion — Phase 6

All animation runs through GSAP (`gsap` 3.15, `@gsap/react` 2.1). Plugins are
registered once in `packages/ui/src/motion/gsap.ts` (client-only); every value lives in
`packages/ui/src/motion/tokens.ts`.

**Correction (2026-09-21): the file does specify timings.** `get_motion_context` returns
nothing because the file has no keyframe animation — but it has a full **prototype**:
every variant set carries `reactions` (trigger, destination variant, Smart Animate
transition, duration, easing). Those are only readable through the Plugin API
(`use_figma`, read-only — approved 2026-09-21). See "Prototype audit" below. The values in
`packages/ui/src/motion/tokens.ts` were proposals made before this was known, and most of
them differ from the prototype.

## Implemented — evidenced in Figma

| Motion                          | Figma evidence                                                                 | Implementation                                                                                                                                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviews heading types itself in | 11 variants, one character longer each — `1028:23286`, Arabic `1015:21041`     | `TypewriterHeading`: SplitText, one character per 60 ms (English) or one word per 240 ms (Arabic, so letters stay joined), on scroll, once                                                                        |
| Provider section builds up      | five variants: illustration alone → pills one by one → full copy — `998:20842` | `RevealGroup`: pills 1–5, then badge, email card, downloads, in that order (`data-reveal`), fade + 24 px rise, 120 ms apart, on scroll, once                                                                      |
| Stepper step opens              | three variants, one step open each — `963:20033`                               | `useSwapIn`: the newly opened step's text fades + rises 8 px                                                                                                                                                      |
| Review card expands             | four variants, one expanded each — `1015:20920`                                | `useSwapIn` on the expanded card's contents                                                                                                                                                                       |
| Why-Choose row selected         | six variants — `914:20605`                                                     | `useSwapIn` on the revealed panel                                                                                                                                                                                 |
| Hero service switcher           | ten variants — default + one per service — `898:20007`                         | `HeroSwitcher`: click/Enter on a ring icon turns the ring the short way (0.8 s, `power3.inOut`) so it reaches the top, shown large; scene and illustration crossfade, card copy swaps in. Reduced motion: instant |

Rules applied everywhere:

- only `opacity`, `translateY` and — for the typewriter only — `visibility` change.
  The heading is gradient text (`background-clip: text` on the parent), which paints
  every character whatever that character's opacity; `visibility` is what removes an
  un-typed character. It never affects layout.
- `gsap.matchMedia()` gates every animation on `prefers-reduced-motion: no-preference`.
  With reduced motion nothing is split and nothing is hidden.
- nothing is hidden by CSS: server-rendered content is complete without JavaScript;
  GSAP applies starting states only when it runs, and only to content below the fold or
  on interaction, so there is no flash and no layout shift.
- `useGSAP` with a scope ref everywhere; swap animations never run on first render.

## Verified in a real browser (production build, Playwright)

- typewriter, English: 0 → 1 → 6 → 12 → 23 of 23 characters visible at 0 / 50 / 300 /
  700 / 1600 ms; frames captured mid-type in both locales
- typewriter keeps the heading's accessible name: `aria-label="Trust Built on Real
Reviews"` / `"ثقة مبنية على تقييمات حقيقية"`
- provider: mid-reveal frame shows the illustration and first two pills with the copy
  still hidden — Figma's order; all eight reveal targets end at opacity 1
- stepper: opened step at opacity 0.59 after 90 ms, 1 after 690 ms
- reduced motion: heading not split, every reveal target at opacity 1 immediately
- no page or console errors

## Proposed, not built — needs your call

P1 (hero switcher) is built — see the table above. Deviations: the ring uses ten even 36° slots at the default variant's radius, because Figma places each variant's icons by hand at irregular spacing; the ring turning is inferred from the variants, not specified; no auto-cycle was built.

| #   | Evidence                                                                                                  | Why it isn't built                                                                                                                   |
| --- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| P2  | Why-Choose selected state shows a tooltip bubble with the feature's text and a curved arrow (`914:20602`) | The fade is built, but four English and five Arabic descriptions haven't been read out, and the bubble/arrow artwork isn't exported. |
| P3  | `Service Areas` title has a `Where We Operate` variant (`974:20059`)                                      | No trigger in the file — rotating headline, or a state after searching?                                                              |
| P4  | `Cursor` / `Click` components (`982:20292`, `997:21182`)                                                  | A guided pointer, but what it points at and when is not in the file.                                                                 |
| P5  | Hover states (nav, badges, buttons, feature rows)                                                         | They switch instantly. Figma has the end states but no transition; a short fade would be mine, not Figma's.                          |

## Prototype audit — Figma reactions vs. what is built (2026-09-21)

Read with `use_figma` (read-only) from the English desktop component sets; the Arabic,
tablet and phone copies carry the same reactions. Flow start: `Flow 4` on `853:19390`.
`AFTER 0.8s` is Figma's "After delay" trigger: the variant advances by itself. Every
transition is Smart Animate.

| Component (set)                                | Figma prototype                                                                                                                                                                               | Built                                                     |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Hero section `898:20007`                       | **auto-cycles** The Map → Service → Needed → Medical → Employee → Emergency → special → Food → Real estate → Blinkz → The Map, every 0.8 s; click any icon jumps there; 0.3 s `EASE_OUT`      | click only, no auto-cycle; 0.8 s `power3.inOut`           |
| Why Choose Us `914:20605`                      | **auto-cycles** default → All-in-One → Flexible → Nearby → Fast → Easy → default, 0.8 s delay, 1.022 s `GENTLE` spring (last step 0.744 s `QUICK`); click row 0.3 s `EASE_OUT`; hover instant | click only; 0.35 s `power2.out` fade                      |
| Screens `936:20018` (app tile)                 | **auto-cycles** 5 screens, 0.8 s delay, 1.25 s `SLOW` spring                                                                                                                                  | static (two screenshots)                                  |
| Get the App Now badge `936:20234`              | loops between 2 variants, 0.8 s, 0.3 s `EASE_IN_AND_OUT` / `EASE_IN_AND_OUT_BACK`                                                                                                             | static                                                    |
| Get the App stepper `963:20033`                | **auto-advances** 1 → 2 → 3 (0.8 s, 1.022 s `GENTLE`), 3 → 1 after 0.4 s (0.248 s `QUICK`); click 1.022 s `GENTLE`                                                                            | click only; 0.35 s fade                                   |
| Choose Your Store step `950:20377`             | Action → 3D after 0.2 s (0.417 s `SLOW`) → number after 0.4 s (1.022 s `GENTLE`)                                                                                                              | not built                                                 |
| Service Areas title `974:20059`                | loops "Service Areas" ↔ "Where We Operate" through two in-between variants: 0.8 s hold, 1.022 s `GENTLE`, 0.1 s steps at 0.128 s — answers P3                                                 | not built (P3)                                            |
| Search by location `984:20302`                 | hover → 1.022 s `GENTLE`; click cycles 3 states; contains the Cursor loop                                                                                                                     | static                                                    |
| Cursor `982:20292` / Click `997:21182`         | loop between 2 variants every 0.8 s (1.022 s `GENTLE` / 0.3 s `EASE_OUT`) — answers P4: a pointer that animates on the search field and the provider "Click here"                             | not built (P4)                                            |
| Contact us (provider) `998:20842`              | auto sequence 0.8 s apart, 0.3 s `EASE_IN_AND_OUT`: cart hide → cart 1 → cart 5 hide → cart 5 …; each Service provider Cart loops 2 variants every 0.8 s                                      | once-on-scroll reveal, 120 ms stagger, 0.6 s `power2.out` |
| Real Reviews `1015:20920`                      | **auto-cycles** Ahmed → Menna → Mahmoud → Nourhan → Ahmed, 0.8 s, 0.3 s `EASE_IN_AND_OUT`; click a portrait jumps                                                                             | click only                                                |
| Trust Built heading `1028:23286`               | 11 variants, 0.8 s each (≈ 8.8 s to type), 0.3 s `EASE_IN_AND_OUT`, **loops** back to empty                                                                                                   | 60 ms per character, once                                 |
| Button `942:20435`                             | hover 1.25 s `SLOW` spring                                                                                                                                                                    | instant (P5)                                              |
| Click here `996:20962`, Themap.com `998:20792` | hover 0.3 s `EASE_OUT`                                                                                                                                                                        | instant (P5)                                              |
| Header, nav, language, social, logo            | hover and click instant                                                                                                                                                                       | instant — matches                                         |
| Mobile menu `1038:26925`                       | open/close 0.3 s `EASE_IN_AND_OUT`                                                                                                                                                            | check                                                     |

Not yet done: the exact `GENTLE` / `QUICK` / `SLOW` spring parameters must be taken from
Figma's documentation (not memory) before they are ported to GSAP. Nothing above is
implemented yet — this is the audit only.
