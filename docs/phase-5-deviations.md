# Phase 5 — deviations from Figma

The English home page is built from the Figma frame `The map English` (`853:19390`).
Everything below is a place where what ships differs from that file, or where the
file did not answer the question. Nothing here was decided silently.

## Verification status — read this first

**No per-breakpoint visual comparison has been made.** There is no browser tooling in
this session, so I cannot render the page and compare it against the Figma renders.
What has been verified is structural, not visual:

- the production server returns 261,698 characters of server-rendered HTML for `/`
- all six sections are present by id, in the Figma order, plus `<header>`, `<nav>`,
  `<footer>` and a skip link
- all 20 images referenced by the page resolve (spot-checked through `next/image`:
  `hero-map-scene.webp` served, optimised to 28.7 KB)
- typecheck, lint and production build pass

A true comparison needs a headless browser to screenshot 375 / 768 / 1440 and diff
against the Figma exports. That means adding Playwright as a dev dependency, which is
outside the fixed stack — it needs approval before I add it.

## Measured against Figma (desktop, 1440)

| Section           | Figma                                                                                                                                              | Built                                                                                                     |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Hero              | `898:20006` — fill primary/800, `image 6651` at 16 % opacity, row gap 64, orbit block 669.642x767.626, card 544x471 radius 32 padding 24           | same, with the nine orbit positions converted to percentages of the orbit block so the composition scales |
| Why Choose Us     | `914:20600` — `image 6658` + `image 6659`, glass card, 62 px chip, 48 px title, five 40 px rows                                                    | same                                                                                                      |
| Get the App       | `1029:27809` — row gap 286, 565x565 tile radius 33 fill primary/700, 456 px column gap 72, badge 4 px primary/500 radius 12, title 48, subtitle 32 | same; the tile shows two of the six app screenshots                                                       |
| Service Areas     | `1028:20709` — column gap 68, title 100 px bold Secondary/500, subtitle 48 semibold, search 607, CTA 48 tall radius 37                             | same                                                                                                      |
| Become a Provider | `998:20841` — badge, 22 px body, email card radius 50, 30 px download heading, store badges gap 68, five pills                                     | same, except pill placement (below)                                                                       |
| Reviews           | `1007:20617` — 48 px gap, 62 px gradient heading, 48 px Natural/300 subheading, review row                                                         | same                                                                                                      |
| Footer            | `1023:20803` — three columns gap 48, watermark behind                                                                                              | same                                                                                                      |

## Deviations

1. **Tablet and mobile are adaptations, not measurements.** The 768 and 375 frames
   were read as whole-page renders in Phase 0 but their nodes have not been measured.
   Below 1440 the page uses the desktop composition reflowed (single column, fluid
   widths, smaller type at the two sizes Figma shows). Every number there is mine, not
   Figma's, until the frames are measured node by node.
2. **1024–1439 px renders the tablet layout.** Figma designs nothing between 768 and
   1440 (gap R2). No mid breakpoint was invented.
3. **Provider benefit pills are a list, not scattered.** In Figma the five pills are
   absolutely positioned and rotated ~1.1° around the 813x637 illustration. Those
   coordinates only hold at 1440; the pills are rendered as a list beside the
   illustration at every width.
4. **The hero renders its default state only.** Figma's ten hero variants swap the
   card copy and the centre illustration per service — an interaction, so it belongs to
   Phase 6. The orbit images are decorative here, not buttons.
5. **Why Choose Us tooltips are empty except All-in-One.** Only that one variant's copy
   has been read out of Figma; the other four panels render empty rather than invented
   text.
6. **Reviews show one full review.** Ahmed Omar's card carries its rating and quote from
   `1014:20669`; the other three variants' copy has not been read yet, so those cards
   render as the collapsed portraits Figma shows in the default state.
7. **The typewriter heading renders complete.** Figma's 11 variants spell
   "Trust Built on Real Reviews" one character at a time; that is motion, so Phase 6
   animates it.
8. **Orbit icons are not rotated.** The Arabic dump gives a rotation per service; the
   English variant's metadata does not, so the icons render upright rather than guessed.
9. **The ring is drawn with a border, not the Figma ellipse asset.** `Ellipse 1593` is a
   gradient stroke; it renders here as a 16 px primary/200 ring. Replace with the
   exported asset once the gradient stops are read.
10. **External links are `#`.** No App Store, Google Play or social URL exists in the
    file (gaps C4, C5). The email link uses the address Figma shows.
11. **The Arabic page is not built.** Four of its nine string groups have not been read
    out of Figma yet; the ones that have are in `docs/figma-copy-ar.md`. Shipping half a
    page would mean inventing the rest.
12. **Focus and skip-link styling are mine.** Figma specifies neither (gap S1).
