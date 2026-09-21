# Motion — Phase 6

All animation runs through GSAP (`gsap` 3.15, `@gsap/react` 2.1). Plugins are
registered once in `packages/ui/src/motion/gsap.ts` (client-only); every value lives in
`packages/ui/src/motion/tokens.ts`.

**None of the timings are from Figma.** The file has no keyframes, durations or
easings (`get_motion_context` returns nothing — gap M1). Its motion evidence is
structural: variant sets that step from one state to the next. So _what_ moves is
Figma's; _how fast_ is a proposal, in one file, easy to tune.

## Implemented — evidenced in Figma

| Motion                          | Figma evidence                                                                 | Implementation                                                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviews heading types itself in | 11 variants, one character longer each — `1028:23286`, Arabic `1015:21041`     | `TypewriterHeading`: SplitText, one character per 60 ms (English) or one word per 240 ms (Arabic, so letters stay joined), on scroll, once   |
| Provider section builds up      | five variants: illustration alone → pills one by one → full copy — `998:20842` | `RevealGroup`: pills 1–5, then badge, email card, downloads, in that order (`data-reveal`), fade + 24 px rise, 120 ms apart, on scroll, once |
| Stepper step opens              | three variants, one step open each — `963:20033`                               | `useSwapIn`: the newly opened step's text fades + rises 8 px                                                                                 |
| Review card expands             | four variants, one expanded each — `1015:20920`                                | `useSwapIn` on the expanded card's contents                                                                                                  |
| Why-Choose row selected         | six variants — `914:20605`                                                     | `useSwapIn` on the revealed panel                                                                                                            |

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

| #   | Evidence                                                                                                  | Why it isn't built                                                                                                                                                                                                                                                                                                             |
| --- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P1  | Hero has 10 variants, one per service, each swapping the card copy and centre illustration (`898:20007`)  | The trigger isn't specified (click an orbit icon? auto-cycle? both?), whether the orbit rotates isn't specified, and the nine per-service copies in two languages haven't been read out yet. Proposal: clicking an orbit icon selects it, with an optional slow auto-cycle that stops on interaction and under reduced motion. |
| P2  | Why-Choose selected state shows a tooltip bubble with the feature's text and a curved arrow (`914:20602`) | The fade is built, but four English and five Arabic descriptions haven't been read out, and the bubble/arrow artwork isn't exported.                                                                                                                                                                                           |
| P3  | `Service Areas` title has a `Where We Operate` variant (`974:20059`)                                      | No trigger in the file — rotating headline, or a state after searching?                                                                                                                                                                                                                                                        |
| P4  | `Cursor` / `Click` components (`982:20292`, `997:21182`)                                                  | A guided pointer, but what it points at and when is not in the file.                                                                                                                                                                                                                                                           |
| P5  | Hover states (nav, badges, buttons, feature rows)                                                         | They switch instantly. Figma has the end states but no transition; a short fade would be mine, not Figma's.                                                                                                                                                                                                                    |
