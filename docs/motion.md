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

## Direction change — approved by the owner, 2026-09-22

The site no longer plays the Figma prototype's loops. Owner's brief: nothing animates
by itself; every change answers a click or a hover (or plays once as a section
scrolls into view); motion must be smooth; icons must stay in proportion; every
section must hold up at 375, 768 and 1440. Motion philosophy: `emil-design-eng`.

| Component                                | Now                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero                                     | click only; rebuilt 2026-09-25 as a rigid dial: ten slots 36° apart round one fixed centre (from Figma's default variant), and choosing an item turns the whole set by one angle, the short way round, over 0.7 s (strong ease-in-out) until it stops under the fixed 32 px marker at 12 o'clock. Unselected items stay upright and never tilt or reshuffle. The chosen service grows to 300 px at the top; the others are 150 px boxes cropped to their artwork. The chosen title sits inside the ring and cross-fades and rises in, then the card copy rises in. Hover (mouse) and keyboard focus lift an item to 1.08 and brighten it in 0.2 s; a press dips it to 0.96. Reduced motion: every change is instant and nothing scales |
| Why Choose Us                            | click, plus autoplay every 10 s (owner-approved 2026-09-29, see below); maze zoom and card move 0.8 s; the feature pill rises in 0.2 s later; clicking the selected row goes back. Hover fades the row fill in 0.25 s (mouse only, never on the selected row). Below 1440 the pill sits under the card                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Stepper                                  | click, plus autoplay every 10 s (owner-approved 2026-09-26, see below) with a progress line in the open pill; rebuilt 2026-09-22 without Flip: the real widths and heights animate 0.5 s (strong ease-in-out) — the opening pill widens over its text, the steps below glide — the text settles in, then the rocket flies in under the pill corner, clear of the text. On phone the open step fills the column and its text wraps, so nothing leaves the screen                                                                                                                                                                                                                                                                                                                                                                          |
| Reviews                                  | click only; rebuilt 2026-09-22 without Flip: one element per card, widths animate 0.5 s, photos are never stretched; the old quote fades out first and the new one slides in once the card has room                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| App screens tile                         | auto-loops the five positions forever and back, 0.8 s pause each end, once first scrolled into view (owner-approved third `docs/figma-gaps.md` D1 exception, 2026-09-27; see below)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Typewriter                               | types once, 45 ms per character, when the heading comes into view; the line keeps its final width so nothing jumps; the caret fades out at the end                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Service Areas title                      | swaps to "Where We Operate" while hovered (roll, 0.4 s) and back                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Gradient strokes (badge, provider pills) | change on hover only (0.3 s)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Phone menu                               | opens from 95 % and 6 px up, fading in 0.25 s (ease-out), and closes the same way — no longer grows from 20 %                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Provider (1440)                          | build-up plays once in view (staggered, shorter distances); `Click here` opens the full section, which stays; the hand leans in on hover instead of pulsing                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Easing                                   | `UI_OUT` cubic-bezier(0.23, 1, 0.32, 1) and `UI_IN_OUT` cubic-bezier(0.77, 0, 0.175, 1) — no spring overshoot                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

Everything below this section records the Figma prototype and the earlier port of it.

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
- **Hero auto-advance (owner-approved 2026-09-26, reverses the 2026-09-22 "click only";
  amended 2026-09-27):** the ring turns to the next item (logo → … → Blinkz → logo)
  every 20 s, with the same turn as a click. The 20 s restart after every change, a
  visitor's click included. It waits — and restarts from zero on resume — while
  keyboard focus (`:focus-visible`) is inside the ring or card, the tab is hidden, a
  smooth scroll is running or the hero is less than half in view, and it advances only
  once the previous turn has ended. Never with reduced motion. It no longer pauses
  just because the mouse rests on the ring or card (dropped 2026-09-27, owner-reported
  it froze the ring for good): clicking a service icon leaves the pointer sitting there
  with nowhere else to go, and unlike the stepper the ring has no other affordance for
  a visitor to read while paused, so the trade favors always-on motion over a hover
  pause. See "Reliability (2026-09-27)" below for the accompanying focus-gating fix.
- **Stepper autoplay (owner-approved 2026-09-26, reverses the 2026-09-22 "click only"):**
  the next step opens (1 → 2 → 3 → 1) every 10 s (`STEPPER_AUTOPLAY_SECONDS` in
  `packages/ui/src/motion/tokens.ts`) through the same path, and the same 0.5 s
  open/close and rocket, as a click. A 4 px line inside the open pill's bottom padding
  (Natural/BG on a 25 % Natural/BG track, `aria-hidden`) fills linearly over the 10 s by
  animating its width, starting at the inline-start edge, so it runs right-to-left in
  Arabic; the line is the timer. Every change, a visitor's click included, empties it and
  starts again from zero. It freezes — and resumes where it stopped — while a mouse is
  over the stepper, keyboard focus (`:focus-visible`) is inside it, the tab is hidden or
  less than half of the stepper is in view; a mouse click's focus does not pause it
  (hover covers that). It never cuts into a running open/close tween. With reduced
  motion there is no autoplay and no line; clicks still switch instantly. Silent to
  screen readers (no live region); the buttons keep `aria-expanded`.
- **Why Choose Us autoplay (owner-approved 2026-09-29, revised the same day):** every
  10 s (`WHY_CHOOSE_AUTOPLAY_SECONDS`) the next feature is chosen, through the same 0.8 s
  maze/card move as a click: the default on load, then All-in-One → Flexible → Nearby →
  Fast → Easy → All-in-One, forever. No progress line and no hover or focus pause (owner:
  keep it always running); it waits only while the tab is hidden or less than half of
  the card is in view, and a click restarts the count. Shares the stepper's timer
  (`packages/ui/src/motion/use-autoplay.ts`, `pauseOnInteraction: false`). The stepper's
  hover pause now survives a change made while the mouse is inside. None with reduced
  motion; silent to screen readers.
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
| Hero section `898:20007`                       | **auto-cycles** The Map → Service → Needed → Medical → Employee → Emergency → special → Food → Real estate → Blinkz → The Map, every 0.8 s; click any icon jumps there; 0.3 s `EASE_OUT`      | click, plus a slow auto-advance every 20 s (owner-approved 2026-09-26, same order and same 0.7 s turn; see below); 0.8 s `power3.inOut` |
| Why Choose Us `914:20605`                      | **auto-cycles** default → All-in-One → Flexible → Nearby → Fast → Easy → default, 0.8 s delay, 1.022 s `GENTLE` spring (last step 0.744 s `QUICK`); click row 0.3 s `EASE_OUT`; hover instant | click only; 0.35 s `power2.out` fade                      |
| Screens `936:20018` (app tile)                 | **auto-cycles** 5 screens, 0.8 s delay, 1.25 s `SLOW` spring                                                                                                                                  | auto-loops forever, 0.8 s delay, `figmaTween` `SLOW` spring (owner-approved 2026-09-27; see below) |
| Get the App Now badge `936:20234`              | loops between 2 variants, 0.8 s, 0.3 s `EASE_IN_AND_OUT` / `EASE_IN_AND_OUT_BACK`                                                                                                             | static                                                    |
| Get the App stepper `963:20033`                | **auto-advances** 1 → 2 → 3 (0.8 s, 1.022 s `GENTLE`), 3 → 1 after 0.4 s (0.248 s `QUICK`); click 1.022 s `GENTLE`                                                                            | click, plus autoplay 1 → 2 → 3 → 1 every 10 s (owner-approved 2026-09-26, same 0.5 s open/close as a click; see below) |
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

## Reliability (2026-09-27)

- `MotionRefresh` (`packages/ui/src/motion/motion-refresh.ts`, mounted once in
  `app/[lang]/layout.tsx`) calls a debounced `ScrollTrigger.refresh()` after the
  things ScrollTrigger does not watch itself: `document.fonts.ready` / font
  `loadingdone`, late images or any other change of the page height
  (ResizeObserver on `body`), crossings of the 768 / 1023 / 1440 breakpoints, a
  bfcache restore (`pageshow` with `persisted`) and a language switch.
- `revealOnce` (`packages/ui/src/motion/reveal.ts`) is the helper for `once`
  reveals: when the page loads, reloads or jumps past a trigger, `onEnter` still
  fires, and the helper tells the caller to jump to the end state instead of
  playing the reveal off-screen.
- The GSAP ticker keeps its default `lagSmoothing(500, 33)`: after a hidden tab,
  tweens resume where they stood instead of skipping to the end.
- `morphSizes` kills a size morph that is still running before it measures the
  next target, so quick repeated changes do not measure a mid-tween size.
- `prefersReducedMotion()` in `gsap.ts` reads `(prefers-reduced-motion: reduce)`.
- Hero orbit, Why Choose Us tip/ring, stepper panel/rocket and the mobile menu use
  `overwrite: true` on their fades: `"auto"` spares a tween still in its delay, so
  a fast second click let the old title / rocket fade back in over the new one.
  The stepper's closing fades start from where they stand and clear their inline
  styles at the end.
- Why Choose Us: a resize stops a running maze/card move and re-places both for the
  new width (the card shift differs per breakpoint and direction).
- Mobile menu: crossing to 1023+ closes it at once (the drawer is CSS-hidden there
  and kept the page scroll-locked); a tap on the toggle while it closes reopens it.
- App screens: loops forever (`repeat: -1, yoyo: true`, 0.8 s `repeatDelay`) once an
  `IntersectionObserver` first finds the tile ≥ 50 % in view; the same observer plus
  a `visibilitychange` listener pause/resume it — hidden tab or scrolled below 50 %
  holds it, no other gating. Third D1 exception, approved 2026-09-27.
- Reviews heading typewriter and the provider stage use `revealOnce`: loaded or
  jumped past, the heading is typed out in full and the stage shows its end state.
  A partly typed heading in a full-page screenshot is the reveal mid-play (27
  characters × 45 ms), not a stuck state.
- Provider section: a breakpoint change now reverts the stage (`useGSAP`
  `revertOnUpdate`); before, crossing below 1023 after the stage had played left
  the full section at `visibility: hidden`. After "Click here" the full section
  stays open across resizes instead of replaying the stage.
- Review carousel: a card change cancels every text fade still pending, so a fast
  run of clicks no longer lets a closed card's text fade in over its photo.
- Gradient border and Service Areas title: the "skip the first run" guards survive
  React's strict-mode double run; the border's tweens use `overwrite: "auto"`.
- Hero auto-advance froze for good after any click (owner-reported): a mouse click
  focuses the clicked button without making `:focus-visible` match, but the ring's
  `focusin` handler paused on any focus, and its `pointerenter`/`pointerleave` pause
  never lifted because the cursor has nowhere to go but rest on the ring after a
  click — the two together blocked the timer forever. Fixed by dropping the pointer
  pause and gating `focusin`/`focusout` on `:focus-visible`, matching the stepper's
  existing pattern; only genuine keyboard focus pauses the ring now.
