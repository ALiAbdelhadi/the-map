# Figma Inventory — The Map (website)

Phase 0 recon. No code written. Every fact below was read through the Figma MCP
tools (`get_metadata`, `get_variable_defs`, `get_design_context`, `get_motion_context`,
`get_screenshot`). Nothing here is reconstructed from memory or guessed; items that
could not be resolved from the file are listed in `docs/figma-gaps.md`.

- **File:** `The Map website`
- **File key:** `jfNj5yN77f5lk3SULMAHjN`
- **URL:** https://www.figma.com/design/jfNj5yN77f5lk3SULMAHjN/The-Map-website
- **Figma account:** Ali Abdelhadi — team `Ali Abdel-Hadi's team` (tier: starter)
- **Recon date:** 2026-09-21
- **Reference renders:** `/private/tmp/claude-501/-Users-ali/9008f091-54d6-488a-b108-ce98f1e72d8e/scratchpad/shots/`
  (session scratchpad; re-exported from Figma at comparison time in Phase 5)

---

## 1. Document structure

One page: **UI** (`22:2`). Two top-level sections:

### 1.1 `NEW UI` (`853:19382`) — the deliverable screens

| Frame                 | Node id      | Size        | Notes                      |
| --------------------- | ------------ | ----------- | -------------------------- |
| The map English       | `853:19390`  | 1440 × 6549 | Desktop, LTR               |
| عربي                  | `1028:20692` | 1440 × 6549 | Desktop, RTL (full mirror) |
| iPad mini 5 - 1       | `853:19396`  | 768 × 8159  | Tablet, LTR                |
| iPhone 11 Pro / X - 1 | `853:19401`  | 375 × 6056  | Mobile, LTR                |

### 1.2 `Design System` (`845:18363`) — library

| Sub-section            | Node id      | Contents                                 |
| ---------------------- | ------------ | ---------------------------------------- |
| Icon                   | `756:15881`  | 30 icon components                       |
| Frame 2147225905       | `853:18554`  | Colour ramps (6 × 11 swatches)           |
| Frame 2147225904       | `853:18553`  | Type scale (92 text styles)              |
| Buttons                | `853:18568`  | `Button`, `Click here` — Default + Hover |
| Components             | `853:18942`  | Desktop component library (see §6)       |
| Arabic                 | `1028:21461` | Arabic variants of the same library      |
| Tablet                 | `1037:25822` | Tablet-specific copies of the library    |
| Phone                  | `1038:25088` | Phone-specific copies of the library     |
| Images & Illustrations | `853:18947`  | Raster illustration inventory            |
| Grid View & Prototype  | `853:18952`  | Layout grids per breakpoint              |

Counts across the page: 389 component/variant definitions, 396 frames, 247 text
nodes, 113 rectangles, 93 instances, 12 vectors.

---

## 2. Breakpoints and layout grids

Read from the `Grid View & Prototype` frames — exact values, not measured from pixels.

| Breakpoint                                     | Frame width | Margin | Content width | Columns | Column width | Gutter |
| ---------------------------------------------- | ----------- | ------ | ------------- | ------- | ------------ | ------ |
| Mobile (`iPhone 11 Pro / X - 2`, `1046:26898`) | 375         | 15.5   | 344           | 4       | 74           | 16     |
| Tablet (`iPad mini 5 - 2`, `1048:26907`)       | 768         | 32     | 704           | 8       | 74           | 16     |
| Desktop (`Desktop - 5`, `1048:26920`)          | 1440        | 80     | 1284          | 12      | 85           | 24     |

Only these three widths exist. There is no design above 1440 and no design between
375–768 or 768–1440 (see gaps).

Desktop page is composed as a stack of 1440 × 1024 screens plus a 1440 × 405 footer:

| y    | Node id      | Section                                             |
| ---- | ------------ | --------------------------------------------------- |
| 0    | `898:20164`  | Hero                                                |
| 1024 | `914:20635`  | Why Choose Us                                       |
| 2048 | `930:20466`  | Get the App Now                                     |
| 3072 | `963:20233`  | Service Areas                                       |
| 4096 | `989:20367`  | Become a Provider (component is named `Contact us`) |
| 5120 | `1007:20617` | Trust Built on Real Reviews                         |
| 6144 | `930:20465`  | Footer                                              |

Header (`888:20482`) is an instance floating over the hero at y ≈ 88, width 1357.

---

## 3. Design tokens

### 3.1 Colour — real Figma variables (66)

Six ramps, 11 steps each (`50, 100…900, 950`). Every value below is a Figma
variable, not a raw fill.

**primary** (`CSK - #087DFD`): 50 `#E6F2FF` · 100 `#CCE5FF` · 200 `#9ACAFE` · 300 `#67B0FE` ·
400 `#3596FD` · 500 `#087DFD` · 600 `#0263CA` · 700 `#014A98` · 800 `#013165` · 900 `#001933` · 950 `#000C19`

**Secondary**: 50 `#E7F0FD` · 100 `#CFE2FC` · 200 `#9FC5F9` · 300 `#6FA7F6` · 400 `#408AF2` ·
500 `#05234C` · 600 `#0D57BF` · 700 `#094190` · 800 `#062C60` · 900 `#031630` · 950 `#020B18`

**green**: 50 `#E5FFF3` · 100 `#CCFFE7` · 200 `#99FFCF` · 300 `#66FFB8` · 400 `#33FFA0` ·
500 `#30FF9E` · 600 `#00CC6D` · 700 `#009952` · 800 `#006636` · 900 `#00331B` · 950 `#001A0E`

**yellow**: 50 `#FFFCE5` · 100 `#FFF9CC` · 200 `#FFF399` · 300 `#FFED66` · 400 `#FFE733` ·
500 `#FFE521` · 600 `#CCB400` · 700 `#998700` · 800 `#665A00` · 900 `#332D00` · 950 `#1A1700`

**Natural** (neutral): 50 `#F2F2F2` · 100 `#E6E6E6` · 200 `#CCCCCC` · 300 `#B3B3B3` · 400 `#999999` ·
500 `#000000` · 600 `#666666` · 700 `#4D4D4D` · 800 `#333333` · 900 `#1A1A1A` · 950 `#0D0D0D`

**Error**: 50 `#FEE9E7` · 100 `#FCD3CF` · 200 `#F9A69F` · 300 `#F77A6E` · 400 `#F44D3E` ·
500 `#F34232` · 600 `#C11A0B` · 700 `#911408` · 800 `#600D06` · 900 `#300703` · 950 `#180301`

Semantic aliases that are also variables: `Natural/BG` `#FEFEFE`, `Why Choose cart`
`#05234C`, `Get the App Now` `#05234C`, `contact cart` `#05234C`.

Two gradient variables exist but resolve to **empty strings** through the MCP:
`gradient Cart`, `Gradient Service provider`. Their raw stops must be extracted per
node in Phase 2 and registered as tokens with the source node id.

### 3.2 Typography — real Figma variables (92)

Single family: **Baloo 2**. Four weights × 23 sizes (12→56 px, step 2):

- Regular 400, Medium 500, Semi Bold 600, Bold 700
- `lineHeight: 100` on every style (Figma reports 100 % — i.e. 1.0)
- `letterSpacing: -2` on every style. Resolved as **percent**, not px:
  `get_design_context` on a 24 px node emits `tracking-[-0.48px]` = −2 % of 24.
  Tokenise as `-0.02em`.

### 3.3 Effects — real Figma variables

| Variable                  | Definition                                                                      |
| ------------------------- | ------------------------------------------------------------------------------- |
| `Navbar`                  | `GLASS, radius 0`                                                               |
| `Cart hero section`       | `GLASS, radius 13`                                                              |
| `Cart Hover Hero section` | `GLASS, radius 13`                                                              |
| `shadow`                  | `GLASS radius 13` + drop `#231F201A 2,2 blur 4` + drop `#0000001A −2,−2 blur 4` |
| `Reviews`                 | drop `#054B971A 2,2 blur 9` + drop `#054B971A −2,−2 blur 9`                     |
| `Click here`              | drop `#054B9752 0,4 blur 5`                                                     |

`GLASS` is Figma's glass effect; the CSS equivalent (`backdrop-filter: blur()`
plus translucent fill) has to be derived per surface and recorded as a token with
its source node id.

### 3.4 Spacing, radii, sizes — **no variables exist**

Nothing in the file defines spacing or radius as a variable. Observed raw values
that must be extracted per node and registered as tokens with a source node id:
header radius 80, nav pill radius 38, button 194 × 56 and 165 × 58, card radii
seen at 13–24, icon sizes 24 / 32 / 48 / 56 / 66 / 76.

---

## 4. Fonts

| Family  | Weights used       | Script | Source                            |
| ------- | ------------------ | ------ | --------------------------------- |
| Baloo 2 | 400, 500, 600, 700 | Latin  | Google Fonts (`next/font/google`) |

The Arabic frames use **the same `Baloo 2` family** (confirmed in
`get_design_context` on the Arabic header, `1028:25400` — `font-['Baloo_2:Regular']`).
Baloo 2 has no Arabic glyphs, so the Arabic rendering in the file is a Figma
fallback, not a chosen typeface. This is a blocking design decision for the Arabic
build — see gaps.

---

## 5. Assets

### 5.1 Icons — 30 components in `Icon` (`756:15881`)

`About` `Choose` `App` `Areas` `Contact us` `language` `arrow` `english`
`Arabic` `All-in-One` `Nearby` `Fast` `Easy` `Flexible` `app store` `google play`
`focus` `Income` `Wider Reach` `Simple` `Full Flexibility` `Ready Clients` `Email`
`Service provider` `Facebook` `instagram` `X` `menu` `Star` `apostrophe`

`linkedin` (`1023:21000`) and `providers` (`1102:26845`) live outside the Icon
section. Most are monochrome line icons → React components using `currentColor`.
`google play`, `Facebook`, `instagram` and the UK/Egypt flags are multicolour → ship as SVG.

### 5.2 Raster illustrations

- 9 service illustrations, each present at two sizes (hero orbit ~130 px and
  library ~600 px): `Service` `Needed` `Medical` `Employee` `Emergency` `special`
  `Food` `Real estate` `Blinkz`, plus `The map` (`903:20968`)
- 4 review avatars: `image 6661`–`image 6664` (`1018:21077`, `1018:21079`, `1018:21081`, `1018:21083`)
- Section backgrounds: 3D map scene (hero), 3D maze + character (Why Choose Us),
  blue character + mascot (Service Areas), isometric phone/pie illustration
  (Become a Provider), `icon blue 2` watermark (footer, 5 uses),
  `grok-video-5f61ff07-…` (`974:20033`, 1441 × 2136, 4 uses)
- App UI screenshots inside the phone mockups (`Screens`, `936:20018`, 626 × 3043)
- Logos: `logo blue 2`, `logo white 2`, `icon white 2`, `icon white 3`, `logo header`

Exact byte sizes and the full node-id map are produced in Phase 3
(`docs/assets-manifest.md`). The hero and Why-Choose backgrounds are large
photographic-style 3D renders and will dominate page weight — budget and WebP
density are a Phase 3 decision point.

---

## 6. Components and states

From `Components` (`853:18942`), with Arabic / Tablet / Phone duplicates in their
own sections.

| Component                        | Node id                    | Variants / states found                                                                                 | Missing states                                       |
| -------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Header                           | `888:20297`                | desktop bar; Arabic mirror (`1028:25400`)                                                               | scrolled/sticky state                                |
| Header action (nav item)         | `870:18940`                | `About`, `Why Us`, `Get the App`, `Service Areas`, `Contact us`; Default + Hover                        | active/current-page state                            |
| language                         | `888:18664`                | `EN`, `Ar`                                                                                              | —                                                    |
| languageToogle                   | `888:18955`                | Default + Hover + `choose`                                                                              | —                                                    |
| menu (mobile/tablet drawer)      | `1038:26925`, `1037:25660` | closed (white) + open (blue) + panel                                                                    | close animation, focus trap not expressible in Figma |
| logo header                      | `870:18837`                | single                                                                                                  | —                                                    |
| Cart (hero glass card)           | `888:19277`                | Default + Hover                                                                                         | —                                                    |
| Hero section                     | `898:20007`                | 9 orbiting service icons                                                                                | —                                                    |
| Why Choose Us                    | `914:20605`                | title + 5 items                                                                                         | —                                                    |
| Why Choose features              | `911:19600`                | `All-in-One`, `Flexible`, `Nearby`, `Fast`, `Easy`; `Defult`, `hover`, `Select`                         | feature body copy (labels only)                      |
| Get the App section              | `963:20033`                | 3 variants: step 1 / 2 / 3 expanded                                                                     | —                                                    |
| Choose Your Store                | `950:20377`                | numbered step pill                                                                                      | —                                                    |
| Screens (phone mockups)          | `936:20018`                | 5 screens                                                                                               | —                                                    |
| Service Areas                    | `974:20059`                | title variants `Service Areas`, `Where We Operate`                                                      | —                                                    |
| Search by location               | `984:20302`                | default, focus (blue ring), typing (caret)                                                              | results / empty / error state                        |
| Click (cursor)                   | `997:21182`                | pointer affordance                                                                                      | —                                                    |
| Contact us (= Become a Provider) | `998:20842`                | 5 progressive states, ending with email capture                                                         | success / validation states                          |
| Service provider Cart            | `995:20700`                | `Wider Reach`, `Full Flexibility`, `Ready Clients`, `Simple & Organized System`, `Increase Your Income` | —                                                    |
| Themap.com                       | `998:20792`                | email/domain chip                                                                                       | —                                                    |
| Real Reviews                     | `1015:20920`               | 4 variants: `Ahmed Omar`, `Menna Hamza`, `Mahmoud Ali`, `Nourhan Samir` (collapsed + expanded)          | —                                                    |
| Trust Built on Real Reviews      | `1028:23286`               | 11 variants — typewriter, one character per frame                                                       | —                                                    |
| Button                           | `942:20435`                | Default + Hover (194 × 56)                                                                              | disabled, focus-visible, loading                     |
| Click here                       | `996:20962`                | Default + Hover (165 × 58)                                                                              | disabled, focus-visible                              |
| social media                     | `1023:20847` + siblings    | Facebook, instagram, X, linkedin; Default + Hover                                                       | —                                                    |

### Page composition (all breakpoints)

Header → Hero → Why Choose Us → Get the App Now → Service Areas →
Become a Provider → Trust Built on Real Reviews → Footer.

The Reviews section is present on desktop and tablet but **absent from the 375
mobile frame**.

---

## 7. Motion

`get_motion_context` (recursive, on the desktop frame) returns `{"nodes": []}` —
there are **no Figma keyframe animations** in the file. All motion evidence is
structural, encoded as variant sets:

| Evidence                                                                      | What it implies                                       | Confidence                                      |
| ----------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------- |
| `Trust Built on Real Reviews` — 11 variants adding one character at a time    | typewriter reveal of the heading, blue→green gradient | high                                            |
| `Contact us` — 5 states revealing benefit bubbles one by one around the phone | scroll-driven staged reveal                           | high                                            |
| `Get the App section` — 3 variants, one step expanded each                    | accordion/stepper, one open at a time                 | high                                            |
| `Real Reviews` — collapsed image vs expanded card                             | hover (desktop) / active (touch) expansion            | high                                            |
| `Search by location` — default/focus/typing                                   | input focus transition                                | high                                            |
| Hover variants on Button, Click here, nav items, social icons, Cart           | hover transitions                                     | high                                            |
| Hero: 9 service icons orbiting a ring with node dots                          | orbital/rotation motion                               | medium — the ring is drawn, the rotation is not |
| `Service Areas` title `Service Areas` ↔ `Where We Operate`                    | rotating/swapping headline                            | medium                                          |
| `Cursor` / `Click` components                                                 | a pointer that moves to a target                      | medium                                          |

A `Prototype TheMAP` frame exists (`1048:26936`) but is a label only — the MCP
exposes no prototype flows or transitions. Durations and easings are **not** in
the file; they will be proposed in Phase 6, not invented earlier.

---

## 8. Copy (as it exists in the file)

English, verbatim:

- Nav: About · Why Us · Get the App · Service Areas · Become a Provider
- Hero: "The Map" / "At The Map, our vision is to provide a smart platform that
  helps people live easier and more organized lives. Our goal is to bring essential
  services together in one place, saving you time and keeping everything within your reach."
- Why Choose Us: All-in-One · Flexible · Nearby · Fast · Easy
- Get the App Now: "Start your journey in seconds and enjoy all services from your phone."
  1 "Choose Your Store" / "Tap on App Store or Google Play based on your device."
  2 "Tap Install" / "Tap 'Install' and wait for the download to complete."
  3 "Get Started" / "Create your account and start using the services instantly."
- Service Areas: "Explore the areas where our services are available in your city."
  · placeholder "Search by location" · button "Check Availability"
- Become a Provider: "Why Join as a Service Provider" / "Join us as a service provider
  and receive daily requests from nearby clients. Increase your income, expand your
  customer base, and work with full flexibility." · "Send us an email with your service
  type" · `info@Themap.com` · "Download the Provider App and start receiving requests"
  · bubbles: Wider Reach · Full Flexibility · Ready Clients · Simple & Organized System
  · Increase Your Income
- Reviews: "Trust Built on Real Reviews" / "Genuine user experiences that reflect our
  service quality and help you decide with confidence." · Ahmed Omar 5/5 "The app helped
  me find trusted service providers quickly. Great experience overall." · Menna Hamza ·
  Mahmoud Ali · Nourhan Samir
- Footer: "Your smart way to explore everything around you. A faster, clearer experience
  to reach what you need with confidence." · "Download The Map app for iOS and Android."
  · "Stay Connected With Us." · Apple Store / Google Play badges · Facebook, Instagram, X, LinkedIn

Arabic, verbatim (nav): من نحن · لماذا نحن · حمّل التطبيق · أماكن خدماتنا · كن مقدم خدمة.
Section headings read from the Arabic render: لماذا نحن؟ · حمّل التطبيق الآن · مناطق الخدمة · the reviews heading renders mid-typewriter as ثقة مبنية على ت — its full string is in the last variant and will be read per node in Phase 5, not reconstructed here.
Full Arabic body copy is in the file per node and will be lifted verbatim in Phase 5 —
nothing will be translated or written by me.

---

## 9. Data needs and database recommendation

| Surface              | Interaction                                               | Needs persistence?                                          |
| -------------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| Nav, language toggle | client routing + locale switch                            | no                                                          |
| Hero, Why Choose Us  | static                                                    | no                                                          |
| Get the App          | accordion + store links                                   | no                                                          |
| Service Areas        | location search + "Check Availability"                    | a **dataset of covered areas**; no writes                   |
| Become a Provider    | email capture ("send us an email with your service type") | one write per submission — or none, if it stays a `mailto:` |
| Reviews              | 4 fixed reviews, named, no pagination                     | no                                                          |
| Footer               | static links                                              | no                                                          |

**Recommendation: no database.** Nothing in the design shows auth, a dashboard, a
list that grows, an admin surface, or content that changes without a deploy. The
covered-areas list is a small static dataset (JSON in the repo) until someone needs
to edit it without a deploy. The only real write is the provider email capture,
which the design itself presents as an email address — so a transactional email
send (or a plain `mailto:`) covers it.

Add Neon + Prisma (`packages/db`) **only** if you answer yes to one of:

1. provider submissions must be stored and reviewed in a back office, or
2. the covered-areas list must be editable by a non-developer, or
3. reviews become dynamic/moderated rather than the four fixed cards.

I will not scaffold `packages/db` without that approval.

---

## 10. Design-file problems

1. **No spacing or radius variables.** Every gap, padding and radius is a raw number
   on a node. Tokenising them means extracting per node and annotating the source id.
2. **Two gradient variables return empty values** (`gradient Cart`,
   `Gradient Service provider`) — raw stops must be read from the nodes.
3. **`letterSpacing: -2` applied to all 92 text styles**, including 12 px. At −2 %
   this is mild, but it is uniform rather than optical, and `lineHeight: 100` (1.0)
   on every style will clip Arabic ascenders/descenders and multi-line Latin text.
   The rendered frames already show multi-line paragraphs using looser leading than
   the token claims — the token layer and the frames disagree.
4. **`Natural/500` is `#000000`** while `Natural/400` is `#999999` and `Natural/600`
   is `#666666`. The ramp is broken at 500; `Natural/950` (`#0D0D0D`) is lighter than
   `Natural/500`. Using `Natural/500` as a "mid" neutral will produce pure black.
5. **Layer naming is mostly auto-generated** — `Frame 2147225956`, `Desktop - 2` (×11),
   `Group` (×36), `Property 1=Frame 2147226017`. Section identity had to be recovered
   from screenshots, not names.
6. **`Contact us` is actually "Become a Provider."** The component, the desktop nav
   label and the mobile drawer label disagree: nav says "Become a Provider", drawer
   says "Contact us", component is named `Contact us`. There is no contact form anywhere.
7. **Arabic header reuses the wrong icon.** Three of five Arabic nav items point at the
   same `Areas` SVG (`21ecd816-…`) — verified in `get_design_context` on `1028:25400`.
8. **Arabic has no Arabic typeface** — it inherits `Baloo 2`, which has no Arabic glyphs.
9. **Four duplicated component libraries** (Components / Arabic / Tablet / Phone) rather
   than one responsive set. They will be built as one responsive, locale-agnostic
   component library; any divergence between the four copies is a deviation I will report
   rather than silently pick a winner.
10. **Reviews section missing at 375.**
11. **No breakpoint above 1440** and nothing between the three fixed widths.
12. **Missing interaction states across the board**: no focus-visible anywhere, no
    disabled or loading buttons, no input error/success, no search results state, no
    active nav item, no 404/empty/loading page.
13. **Frame 3 of the desktop page is a 1441 × 2136 rectangle named `grok-video-…`**
    bleeding outside its 1024-tall screen — an AI-generated image placeholder used as
    a section background.

---

## 11. Proposed monorepo structure

```
the-map-website/
├─ apps/
│  └─ web/                     # Next.js App Router, [locale] segment (en | ar)
├─ packages/
│  ├─ ui/                      # components + @theme token layer + assets
│  ├─ typescript-config/
│  └─ eslint-config/
├─ docs/                       # figma-inventory.md, figma-gaps.md, assets-manifest.md
├─ turbo.json  pnpm-workspace.yaml  .nvmrc  CLAUDE.md  README.md
```

`packages/db` only on approval (§9).

## 12. Proposed component list (bottom-up)

**Primitives** — Button, ClickHereButton, IconButton, TextInput (SearchInput),
Icon, Logo, GlassCard, StoreBadge, SocialIcon, SectionHeading, StepPill.

**Composites** — Header, NavItem, LanguageToggle, MobileMenu, HeroOrbit,
WhyChooseList + WhyChooseItem, AppStepper, PhoneMockup, AreaSearch, ProviderBenefits,
ProviderEmailCapture, ReviewCard, ReviewsRow, TypewriterHeading, Footer.

**Sections** — Hero, WhyChooseUs, GetTheApp, ServiceAreas, BecomeAProvider,
Reviews, Footer.

## 13. Proposed phase plan

| Phase | Output                                                                          | Gate                               |
| ----- | ------------------------------------------------------------------------------- | ---------------------------------- |
| 1     | Turborepo + pnpm + Next.js + TS strict + Tailwind v4 + CLAUDE.md                | typecheck/lint/build, commit, stop |
| 2     | `@theme` tokens, `next/font` Baloo 2 (+ Arabic face once chosen), `/dev/tokens` | same                               |
| 3     | Assets: WebP rasters, optimised SVGs, icon components, `assets-manifest.md`     | same                               |
| 4     | `packages/ui` components, all Figma variants, a11y, no animation                | same                               |
| 5     | Pages EN + AR (RTL), per-breakpoint comparison + deviation list                 | same                               |
| 6     | GSAP: only the motion evidenced in §7, `matchMedia` + reduced-motion            | same                               |
| 7     | Database — only if §9 is approved                                               | same                               |

## 14. Note on design authority

Per the project rules, Figma is the single source of truth and I make no design
decisions. The repo has no design system yet, so this file plus the Figma variables
**are** the design brief; no aesthetic direction is being chosen, invented or
substituted. Where the file is silent (motion timing, missing states, Arabic
typeface), I will propose options and wait — never fill the gap silently.
