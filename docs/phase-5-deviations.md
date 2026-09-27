# Phase 5 — deviations from Figma

**Status:** English (`/en`) and Arabic (`/ar`, RTL) are both built and compared against
the Figma renders at 1440. `/` redirects to `/en`.

The English home page is built from the Figma frame `The map English` (`853:19390`).
Everything below is a place where what ships differs from that file, or where the
file did not answer the question. Nothing here was decided silently.

## Verification — screenshots, at last

Playwright is installed (approved) and `pnpm --filter www shoot <baseUrl> <outDir> [routes]`
captures the three designed widths against a production build. The script walks the page
to the bottom before capturing, because lazy-loaded images never fetch for an off-screen
full-page screenshot — without that, half the page photographs blank and looks broken.

Current run against a production server:

| Width | Page size                         | Horizontal overflow |
| ----- | --------------------------------- | ------------------- |
| 375   | 375 x 10,209                      | none                |
| 768   | 768 x 8,846                       | none                |
| 1440  | 1440 x 6,881 (Figma frame: 6,549) | none                |

Every section was then compared against the Figma renders by eye.

### What the first screenshot pass caught

Four real defects that no amount of HTML checking would have found:

1. **The nine hero orbit icons were the wrong artwork.** Phase 3 exported the `Service`,
   `Food`, `Medical`… nodes from the `Images & Illustrations` section — grey isometric
   map scenes. The orbit uses different artwork of the same name inside the hero
   (`888:20873`, `888:20869`, `888:20884`, `888:20692`, `888:20894`, `888:20908`,
   `888:20915`, `888:20919`, `891:19648`). All nine were re-exported at 3x.
2. **The logo rendered twice.** The `logo header` component export contains two
   overlapping copies. Re-exported from `1028:21561`, which holds one.
3. **The Why-Choose character covered the section in white.** Figma's node export
   flattens it onto white; the uploaded source behind the node is a proper cut-out.
   That source, cropped to the figure's alpha bounds, is what ships now.
4. **Mobile scrolled sideways** — the 415 px review card is now `max-w`, not fixed.

One apparent defect was **not** real: provider illustration, review portraits and two
social marks photographed blank. That was the screenshot script, not the page.

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

1. **Phone and tablet were both measured against their frames** — phone on
   2026-09-21, tablet on 2026-09-22 (see "Phone pass" and "Tablet pass" below). They now screenshot clean
   (no overflow, everything renders), but the 768 and 375 frames' nodes have still not
   been measured.
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
9. **The ring is the real asset now** (`Ellipse 1593`, `888:20654` → `orbit-ring.svg`,
   26 px, primary/500 → white). Still missing: the small node dots on the ring and the
   dark 32 px marker at its top.
10. **External links are `#`.** No App Store, Google Play or social URL exists in the
    file (gaps C4, C5). The email link uses the address Figma shows.
11. **Arabic page** — built. See "Arabic pass" below.
12. **Focus and skip-link styling are mine.** Figma specifies neither (gap S1).

## Arabic pass — comparing `/ar` against `عربي` (1028:20692) at 1440

Putting the two locales side by side against Figma exposed layout mistakes that were
wrong in **English too**, and were fixed for both:

| Section         | Was                                                                                                             | Now (Figma node)                                                                                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header          | logo and language switch swapped ends in Arabic; English nav wrapped to two lines                               | logo left and switch right in both frames, only the nav reverses; nav items never wrap (`1028:25400`)                                                                                     |
| Hero            | ring was a hand-drawn border; the nine orbit icons were opaque, so they cut notches into the ring               | the Figma ring asset; icons re-exported from their transparent sources, sized to the Figma boxes                                                                                          |
| Why Choose Us   | white glass card, dark chip, 48 px semibold title, small character                                              | Secondary-tinted card `rgb(5 35 76 / .5)` + blur, Secondary/500 chip, 56 px regular title, character ~86 % of the section, mirrored in Arabic (`1028:22136`)                              |
| Get the App     | tile and text in the wrong order; collapsed steps full width; store badges missing; screenshot crop approximate | text first (tile right in English, left in Arabic); collapsed steps are number pills; badges centred below; the exact `Screens` crop in container-query units (`936:20017`, `1029:27815`) |
| Service Areas   | full-colour background; single-line subtitle                                                                    | primary/300 at 80 % over the render; 741 px column (`974:20034`)                                                                                                                          |
| Badges / social | reversed in Arabic                                                                                              | kept left-to-right, as the Arabic frame has them (`1028:20758`, `1028:20763`)                                                                                                             |

Still different from the Arabic frame:

- **Provider section shows its final state.** Figma's page frame shows the first state of
  a five-step reveal (illustration only); the copy arrives through the variants. The
  reveal is motion — Phase 6. Rendering the first state would hide all the copy.
- **Hero orbit positions are the English ones.** The Arabic variant arranges the nine
  icons differently and rotates each; that arrangement has not been ported.
- **Footer has no gradient top stroke.** Figma draws a thin primary→green line along the
  footer's rounded top edge in both frames.
- **Arabic accessibility labels are authored**, listed in `docs/figma-copy-ar.md`.

## Phone pass — `/en` at 375 against `iPhone 11 Pro / X - 1` (`853:19401`), 2026-09-21

Every section was read with `get_design_context` on its phone node and rebuilt from
those values; tablet and desktop classes were moved behind `tablet:` so neither
changed (page heights 768: 8658 and 1440: 6881, before and after).

| Section           | Figma node   | Figma height | Before | After  |
| ----------------- | ------------ | ------------ | ------ | ------ |
| Hero              | `1041:26353` | 978          | 1414   | 979    |
| Why Choose Us     | `1041:27445` | 888          | 776    | 888    |
| Get the App       | `1041:27524` | 1286         | 1524   | 1293   |
| Service Areas     | `1041:27899` | 555          | 755    | 558    |
| Become a Provider | `1041:29641` | 1650         | 2685   | 1636   |
| Reviews           | —            | not in frame | 2175   | hidden |
| Page              | `853:19401`  | 6056         | 10194  | 6046   |

What changed, from the Figma values:

- **Header** `1040:26239`: 359x62 bar, radius 12, 8 px from the sides, logo 76x17,
  32 px menu button with an 18 px icon.
- **Hero**: ring 218 px, card 352x305 with a 16 px regular body and a 41 px title gap.
- **Why Choose Us**: 32 px title on one line, card hugs its content at x 8, character
  278 px tall standing below the card instead of behind it.
- **Get the App**: 24 px semibold badge title with a 24 px icon, 20/14 px step text,
  304 px tile, store badges stacked 24 px apart.
- **Service Areas**: 32 px title, 24 px medium subtitle, 341x65 search field.
- **Provider**: 20 px badge, 16 px body, 18/14 px email card, 14 px download line,
  badges stacked, 313 px pills with 16/14 px text in the phone order, illustration
  270 px below the pills.
- **Footer** `1041:29724`: radius 62, primary/500 top border and shadow (two new
  tokens, `--radius-footer` and `--shadow-footer`), one centred column with 16 px text,
  overlapping the provider section by 51 px.

Open points are in `docs/figma-gaps.md` → "Phone frame (375)". The Arabic phone page
uses the same layout (no Arabic phone frame exists in Figma); it was checked for
overflow and clipping only (375 x 6032, no horizontal overflow).

## Tablet pass — `/en` at 768 against `iPad mini 5 - 1` (`853:19396`), 2026-09-22

Every section was read with `get_design_context` / `get_metadata` on its tablet node;
tablet values sit behind `tablet:` and the 1440 values moved to `desktop:` where the
two differ, so neither the phone nor the 1440 layout changed.

| Section           | Figma node   | Figma height | Before | After |
| ----------------- | ------------ | ------------ | ------ | ----- |
| Hero              | `1037:29681` | 1439         | 1563   | 1438  |
| Why Choose Us     | `1037:26497` | 1024         | 767    | 1024  |
| Get the App       | `1037:29894` | 1561         | 1639   | 1568  |
| Service Areas     | `1037:30011` | 1166         | 704    | 1166  |
| Become a Provider | `1037:30184` | 1419         | 2223   | 1432  |
| Reviews           | `1037:32343` | 702          | 1172   | 702   |
| Page              | `853:19396`  | 8159         | 8754   | 8159  |

What changed, from the Figma values:

- **Header** `1037:23582`: 709x88, radius 12, 29 px from the sides and 33 px down,
  32 px menu button.
- **Hero**: the 1440 orbit (669.6 px) 120 px down, then the 544x471 card 32 px below.
- **Why Choose Us**: the 1440 type sizes (56 px title, 40 px rows), the 608 px card
  15 px down and 98 px in, the character (392 px) under it, the maze framed as in the
  frame; rows lost a hidden 4 px border, so they are Figma's 72 px everywhere.
- **Get the App**: 48 px semibold badge, 32 px subtitle, 46/32 px gaps, badges in a
  row 68 px apart; step text stays on one line.
- **Service Areas**: 100 px title, 48 px subtitle, section 1166 tall.
- **Provider**: 32 px badge, 24 px body, email card hugs its content, 24 px download
  line, and the five pills scattered around the 510 px illustration at Figma's
  positions (two with the 16 px padding Figma gives them).
- **Reviews**: 62 px heading, one row (315 px open card, 88 px portraits, 20 px
  gap), 14 px quote with the quote mark beside it.
- **Footer**: 408x92 logo, the column 74 px down, 824 tall.

The Reviews row was rebuilt at the same time (owner request): one element per card,
only widths animate, photos re-crop instead of stretching, and the text fades in once
the card has room. The three missing reviews (Menna, Mahmoud, Nourhan) and the Arabic
reviewer names were read from Figma (`1015:20920`, `1030:24297`) and added.

## Desktop pass — `/en` at 1440 against `The map English` (`853:19390`), 2026-09-22

The 1440 build had never been measured node by node before — only spot-checked by
eye during Phase 5. Doing it the same way as the tablet pass found one real,
site-wide bug and two smaller ones, all now fixed.

| Section | Figma node  | Figma height | Before | After |
| ------- | ----------- | ------------ | ------ | ----- |
| Page    | `853:19390` | 6549         | 6491   | 6552  |

What changed:

- **Every `max-w-container-*` class was dead.** `theme.css` defines the tokens as
  `--container-mobile` / `--container-tablet` / `--container-desktop`, but Tailwind
  v4 generates `max-w-mobile` / `max-w-tablet` / `max-w-desktop` from a
  `--container-*` namespace — not `max-w-container-*`. The class was never a real
  utility, so every section, and the header, rendered with `max-width: none` and
  simply filled its flex parent. This had gone unnoticed since Phase 4 because most
  sections' own content already has its own max-widths; the header was the visible
  case (1376 px wide instead of Figma's 1357). Renamed all eight call sites
  (`site-chrome.tsx` and six section files) to the real utility names.
- **Header container.** Figma's header instance is 1357 wide, centred with a ~41.5 px
  margin — narrower than the 1284 px content grid the sections share. Registered
  that as its own token, `--container-header` (node `888:20482`, no Figma variable),
  and pointed the header at `max-w-header` instead of `max-w-desktop`. It now
  measures 1357×88 at x 42/y 88 — Figma is x 41/y 88.373.
- **Footer.** The desktop logo was `h-17.5` (70 px); Figma's desktop logo (node
  `1023:21105`) is the same 92 px height as the tablet one. Changed to `h-23` to
  match. The desktop padding (`py-16`, 64/64) was a guess, never checked against
  Figma; the real content frame (`1023:20803`) sits 74 px down and 93 px up from the
  section edge, so it is now `pt-18.5 pb-23.25`. Together these close the footer's
  58 px shortfall against Figma's 405 px section height (now 408, 3 px off).

Everything else measured within 1–2 px of its Figma node once the container fix
landed (header, hero card, service areas heading/search/button, the reviews row,
the provider stage) — the standardised 1284 px grid sits 10–25 px narrower than a
few individual Figma frames (1307, 1249, 899) that were never drawn to the same
grid; that gap already existed by design (`figma-inventory.md` §"Layout") and is
unchanged by this pass.

## Hero orbit as a rigid dial — owner-approved, 2026-09-25

The owner, on a phone: the unselected icons were tiny, every click moved things
differently, and nothing said what had been chosen. Changes in
`apps/www/components/sections/hero-switcher.tsx`:

- **Rigid rotation instead of Figma's per-variant placements.** Figma places every item
  by hand in each of the ten variants, so between two variants each item moved and
  tilted by a different amount. Items now sit in ten slots 36° apart round one fixed
  centre (331, 423.8), dots on radius 175.5 and artwork on radius 265.7 — the means of
  Figma's default variant (`ORBIT[0]`). Choosing an item turns the whole set by one
  angle until it is at 12 o'clock. The dark 32 px marker is fixed at 12 o'clock. The
  other nine variants in `hero-orbit-data.ts` are no longer used for placement.
- **Upright items.** Figma tilts each item differently in every variant, so no single
  tilt is its own; the items stay upright so they read at every slot and do not spin
  during a turn. At 1440 the default state therefore differs from Figma in the tilts.
- **Bigger unselected items.** The Figma image fills are 1408x768 with wide transparent
  margins (the artwork is 42–64 % of the width). Each unselected item is now a 150x100
  box (was 120x65) with the image drawn at 156.7 % of the box width, so the artwork
  fills the box, which is also the tap target. 150 is the widest box that keeps
  neighbours apart: the slots at 144° and 180° are 156.2 apart horizontally. On screen:
  70x47 px at 375, 68x45 px at 320, 150x100 px at 768 and 1440. The logo in the ring is
  83x100 (Figma: 62 wide).
- **The chosen service is lifted.** It shows the same 300 px of artwork, but sits
  56 frame px higher than before (box bottom 8 px above its neighbours' tops) so it no
  longer overlaps the items beside it.
- **New element: the chosen title inside the ring.** It shows `hero.title` ("The Map")
  by default and the chosen service's title after that. It is bold, `text-bg`, 20 px on
  phones and 38 px from tablet up, and cross-fades and rises in on change. It is
  `aria-hidden`; the card's `aria-live` announcement is unchanged. Figma has no such
  element.
- **Affordance.** `cursor-pointer`; hover (mouse only) and keyboard focus scale an item
  to 1.08 and brighten it to 112 %; a press dips it to 0.96 (GSAP, 0.2 s). The chosen
  item gets no hover lift. The buttons keep `aria-pressed` and the service title (or
  "Back to The Map") as their accessible name.
- **Phone orbit box.** It is now `w-full max-w-78` instead of a fixed `w-78`, so at
  320 it shrinks to 304 px and no longer overflows the 8 px gutters.
- `/ar` uses the same geometry and turn direction as `/en`, as before. The Arabic
  Figma set is identical.

## Hero auto-advance (owner, 2026-09-26)

The orbit now advances to the next item every 20 s (reverses "no auto-advance",
2026-09-22). Same turn as a click; silent to screen readers; pauses on hover, focus,
hidden tab, hero under 50 % in view and smooth scroll; off with reduced motion; the
countdown restarts from zero after any change or resume. Details: docs/motion.md.

## Footer bottom padding — owner-approved 2026-09-26

The Figma frames leave 91 / 173 / 93 px under the social row (phone / tablet /
desktop) versus 73 px on top. It now leaves 64 px at every width.

## Why Choose row balance — owner-approved 2026-09-26

Figma's row padding (px 20, py 4) plus the 4 px selected stroke drawn inside the row left
the 48 px icon chip 0 px from the stroke top and bottom on phones but 16 px from its
start. Standing owner approval to fix Figma's own spacing: the chip is now concentric
with the pill. Phones: `py-3 ps-3 pe-6` — 8 px clear gap to the stroke on top, bottom
and start, 20 px inside the stroke after the label; the row is 72 px tall (was 56), the
gap between rows drops 24 → 8 so pitch stays 80, and the list takes `-my-2 ms-2` so the
card height, chip x/y and the title-icon alignment are unchanged (the ring now starts 12 px
left of the chip instead of 20). Tablet/desktop: start padding 20 → 12 (`ps-3`, top/bottom
were already 8), end padding stays 20, list `ms-2` keeps chip x; rows stay 72 px, pitch 96.
Logical properties throughout, so Arabic mirrors. No motion, colour or size tokens changed.

## Responsive 1023–1439 — Reviews and footer — owner-approved 2026-09-26

Figma has no frame between 768 and 1440. From 1023 (the new `desktop:` breakpoint) both
sections are the 1440 frame scaled by viewport ÷ 1440 — `min(<Figma px>, <Figma px> × 100vw / 1440)`,
the `review-*` / `footer-*` tokens in `theme.css` (agent D block) — so 1440 and wider are
unchanged (pixel-identical to the pre-change baselines at 1440 and 1920, EN and AR).

- Reviews: card widths (415 / 210), height 307, row gap 68, photo column, text column,
  name and quote size (24 → 17 at 1023), quote mark, subheading (48 → 34, width 1229) and the
  vertical rhythm (70 / 48 / 180, section height 1024) all scale together, so the open card
  shows the same wrap as at 1440. Not scaled: the 62 px heading (fits from 1023 and is the
  tablet size too) and the 16 px rating with its 24 px icon (readability floor).
- Footer: column gaps (48 EN / 82 AR), logo height, tagline width (493 / 445) and text,
  download-line width and the 24 px headings scale; the watermark keeps its 1440 placement
  scaled. Store badges (56 tall) and social marks (48) keep their size as tap targets, so
  when the download column is narrower than the two badges side by side (below ~1435 EN,
  ~1320 AR) the badges stack 12 px apart (the Arabic frame's badge spacing) under the
  download line, both aligned to the column's start edge. At 1440+ the column stays centred
  as in Figma.

## Responsive 1023–1439 — header and hero — owner-approved 2026-09-26

- **Nav row from 1023, not a drawer.** Figma draws the inline nav only at 1440. From 1023 the
  header shows the full row (five links with icons + language switch), nothing hidden; the drawer
  is used below 1023 only. Every header length is the 1440 value times `--scale-landscape`
  (`min(1px, (100cqw − 64px) / 1376)`, theme.css, measured on the header's full-bleed wrapper):
  exactly 1 px at 1440 and above, 0.697 px at 1023 (label 16.7 px, logo 124×28, flags 22 px,
  bar 61 px tall). The divisor is the 1440 content box (1440 − 2×32), not 1440, because the bar
  content is 1352 of the 1357 px bar at 1440: scaling by `vw/1440` would overflow a 959 px bar at
  1023 by ~2 px, this unit leaves 1.7 % spare at every width.
- **Hit areas decoupled from the scaled pills.** At 1023 the nav pill is 33 px tall; the 44 px
  target is a centred `::before` on each link (and the flag/track links keep 44 px boxes with
  negative margins that follow the scaled art), so the bar keeps Figma's proportions instead of
  growing to 44 px pills.
- **Hero 1023–1439 is the 1440 frame reduced.** Section height (1024), orbit box (669.642 wide),
  card (544×471, padding 24, radius 32, 148 above the bottom), the 64 gap, title 38 / body 28 and
  the underline all use the same unit on the hero section's container (713 px tall at 1023 —
  fits an iPad-landscape 768 px viewport). The ring title inside the orbit follows the orbit's own
  width (`38 × 100cqw / 669`).

## Responsive 1023–1439 — Why Choose Us / Get the App Now — owner-approved 2026-09-26

No Figma frame exists between 768 and 1440; these are design-judgement fills.

- **Why Choose Us, 1023–1439:** the 1440 composition (card at the start, pill + arrow
  beside it, character at the end) reduced as one piece. The section gets
  `desktop:frame-scaled` (theme.css, agent B block), which re-bases `--spacing`, the 32/40/56
  type, `--leading-row`, `--leading-title` and `--radius-card` on `--frame-px`
  = min(1px, 100vw / 1440). Card, pill, arrow, section height (1024 × s) and gaps all scale by
  s = W / 1440 (0.71 at 1023: labels 28 px, rows 51 px tall, description 23 px). The card's
  GSAP shift per variant is scaled by the same factor. JS breakpoint (maze placement set,
  stacked-pill height tween) moved from 90rem to 63.9375rem (1023) to match the CSS. Exact from 1440 up.
- **Why Choose Us, tablet 768–1022:** the card column is the 768 frame's (768 wide, card 98 px
  in), centred, instead of hugging the start edge as the tablet widens.
- **Get the App Now, 1023–1439:** the two-column row. The text column keeps 456 px and the
  1440 type (scaling it would put the step bodies under 14 px); the tile shrinks linearly
  565 → 440 px (`--container-app-tile`, cqw of the content column) and the gap 263 → 64 px.
  Exact from 1440 up.

## Responsive 1023–1439 — Service Areas + Become a Provider — owner-approved 2026-09-26

- **Service Areas title (768 up)** — the 100 px title is capped by the viewport
  (`--text-area-title` = min(100 px, (100vw − 28 px) / 8.1)) so the hover swap to the
  wider "Where We Operate" (8.02 em) is never clipped: 91 px at 768, 98 at 820, Figma's 100
  from ~838. Arabic keeps 100 px (its titles fit). Fixes the 802 px title clipped at 768–830.
- **Service Areas height (1023–1439)** — the 1440 frame's 1024 px height scaled with the
  viewport (`--spacing-area-desktop` = 100vw × 1024 / 1440, 727 px at 1023); the column keeps
  its 1440 sizes, which fit. 1440 up unchanged.
- **Provider build-up stage (1023–1439)** — now plays from 1023 (was 1440 only;
  `STAGE_MEDIA` = 63.9375rem, same as `desktop:`). The stage is the 1440 drawing scaled
  as one piece: it redefines the spacing step and its 24 / 20 px text in
  `--provider-stage-unit` = min(4 px, (100vw − 48 px) / 335), so its 1340 px of pills stay
  inside the viewport with 24 px margins; the smallest text is 14.6 px at 1023. Below 1440
  the stage is centred on its pills instead of sitting 118 px into the container.
- **Provider final state (1023–1439)** — not the 1440 row. The pills' 16 / 14 px text fixes
  their widths, so the 813 px pill box cannot scale down without taking text under 14 px,
  and beside the email card it needs ~1300 px. It stacks instead: badge and body as at
  1440, then the email card and the downloads side by side (the heading centred and
  balanced over two lines), then the 1440 pill box at its drawn size, centred on its pills
  (EN 44 px left; AR 54 px right and 106 px up, where Figma's Arabic box starts empty).
