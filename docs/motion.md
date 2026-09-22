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

## Implemented — the Figma prototype, 2026-09-21

Every timing now comes from the prototype reactions and lives in
`packages/ui/src/motion/tokens.ts` (`prototype`), with Figma's easing types turned
into GSAP eases in `packages/ui/src/motion/figma-easing.ts`. "After delay" is
`useAfterDelay` (`packages/ui/src/motion/use-after-delay.ts`): the timer starts when
a state has finished arriving, as in Figma.

| Component                                                        | What plays                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero `898:20007`                                                 | auto-cycles the ten states in ring order every 0.8 s; click jumps; 0.3 s ease-out. Every item, the ring and each item's dot move to the exact place, size and angle Figma gives them in each variant (`hero-orbit-data.ts`, read from `898:20007`); the chosen service grows from 120 px to ~560 px at the top |
| Why Choose Us `914:20605` / `1038:25190`                         | auto-cycles default → five features → default; maze zooms per variant, character leaves, selected row gets the gradient stroke, the feature pill appears (with the arrow at 768+, under the card on the phone); `GENTLE` / `QUICK` / 0.3 s ease-out; clicking the selected row returns instantly               |
| Screens `936:20018`                                              | five column positions, 1.25 s `SLOW`, looping                                                                                                                                                                                                                                                                  |
| Get the App Now badge `936:20234` (also in the provider section) | gradient stroke swaps and swaps back (0.3 s ease-in-out / ease-in-and-out-back)                                                                                                                                                                                                                                |
| Stepper `963:20033` / `950:20377`                                | 1 → 2 → 3 (`GENTLE`), 3 → 1 after 0.4 s (`QUICK`), Flip between layouts; the rocket slides in 0.2 s after a step opens (`SLOW` 0.417 s)                                                                                                                                                                        |
| Service Areas title `974:20059`                                  | "Service Areas" ↔ "Where We Operate": out over 1.022 s, in from the left 0.1 s later in 0.128 s                                                                                                                                                                                                                |
| Search field `984:20302` / Cursor `982:20292`                    | hover/focus fades in a 3 px gradient stroke (`GENTLE`); empty and focused shows Figma's cursor, blinking to 6 % every 0.8 s                                                                                                                                                                                    |
| Provider `998:20842` (1440 only)                                 | cart hide → cart 1 → cart 5 hide → cart 5, then `Click here` opens the full section, which returns to cart hide 0.8 s later; hand pulses (`997:21182`)                                                                                                                                                         |
| Pills `995:20700`                                                | primary → green stroke flips every 0.8 s                                                                                                                                                                                                                                                                       |
| Real Reviews `1015:20920`                                        | expanded card moves on every 0.8 s; click jumps; Flip, 0.3 s ease-in-out                                                                                                                                                                                                                                       |
| Typewriter `1028:23286` / `1015:21041`                           | the 11 variants verbatim, one every 0.8 s, cross-fading 0.3 s, looping                                                                                                                                                                                                                                         |
| Hovers                                                           | store badges 1.25 s `SLOW`; email card stroke and `Click here` 0.3 s ease-out                                                                                                                                                                                                                                  |
| Phone menu `1038:26925`                                          | opens and closes out of the toggle, 0.3 s ease-in-out                                                                                                                                                                                                                                                          |

### Where the web page differs from the prototype, on purpose

- **Reduced motion:** nothing auto-plays; every section shows its default state and
  the provider section shows its full content.
- **Timers wait** while a component is off-screen or the tab is hidden, and while
  keyboard focus is inside it (WCAG 2.2.2). The provider's full state also waits
  while the pointer is in the section, so the copy does not vanish mid-read.
- **Announcements:** the hero card is announced only when the visitor picks a
  service; the auto-advance is silent. The typewriter and the Service Areas title
  keep their full text as the accessible name.
- **Provider sequence runs at 1440 only.** The tablet set (`1037:26838`) has no
  `cart 5` variant and the phone symbol has no sequence; both show the full
  section with the looping pill strokes.
- **Provider final state** keeps the pills as a list, not scattered around the
  illustration (Phase 5 deviation 3).
- **Spring and back-ease numbers** are not published by Figma — see gap M6.

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

All of the above is now built — see "Implemented".
