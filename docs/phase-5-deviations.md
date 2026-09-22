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
