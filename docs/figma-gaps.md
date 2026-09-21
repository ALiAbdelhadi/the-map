# Figma Gaps — The Map (website)

Everything the design file does not answer. Nothing here will be invented, filled
with a placeholder, or substituted silently. Each item is either a question for the
client/designer or an explicit proposal awaiting approval.

Status: `BLOCKING` = a phase cannot complete without it. `PROPOSE` = I will suggest
an option at the phase where it lands and wait for a yes.

---

## Content and copy

| #   | Gap                                                                                                                    | Where                  | Status                                                                                                                                                               |
| --- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | No body copy for the Why Choose Us features — labels only (All-in-One, Flexible, Nearby, Fast, Easy)                   | `911:19600`            | **RESOLVED (Phase 3)** — the copy exists in the section's variants; only All-in-One has been read out so far, the rest are lifted when Phase 6 wires the interaction |
| C2  | Full Arabic body copy exists per node but the Arabic reviews heading is only visible mid-typewriter                    | `1028:20692`           | Resolved in Phase 5 by reading each node; no translation by me                                                                                                       |
| C3  | No legal pages (privacy, terms), no cookie notice                                                                      | —                      | PROPOSE                                                                                                                                                              |
| C4  | Real App Store / Google Play URLs not in the file                                                                      | footer, Get the App    | **STILL BLOCKING** — the store badges link to `#` in the built page                                                                                                  |
| C5  | Real social URLs (Facebook, Instagram, X, LinkedIn) not in the file                                                    | footer                 | **STILL BLOCKING** — the four social links point at `#` in the built page                                                                                            |
| C6  | `info@Themap.com` is the only contact channel shown; unclear if it is the real address                                 | `998:20792`            | **PARTLY RESOLVED (Phase 5)** — the page links `mailto:info@Themap.com` as Figma shows. Confirm it is the real address                                               |
| C7  | The covered-areas dataset (which cities/areas) does not exist anywhere in the file                                     | Service Areas          | BLOCKING for Phase 5                                                                                                                                                 |
| C8  | Nav label conflict: desktop says "Become a Provider", mobile drawer says "Contact us", component is named `Contact us` | header vs `1038:26925` | BLOCKING — one label must win                                                                                                                                        |

## Typography and localisation

| #   | Gap                                                                                     | Status                                                                                                            |
| --- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| T1  | Arabic frames use `Baloo 2`, which has no Arabic glyphs — no Arabic typeface was chosen | **RESOLVED (Phase 2)** — Baloo Bhaijaan 2 approved and loaded via `next/font`. Deviation from Figma, by approval  |
| T2  | `lineHeight: 100` (1.0) on all 92 styles contradicts the rendered multi-line paragraphs | **RESOLVED (Phase 2)** — no text node uses it; every node checked renders `leading-[normal]`. Tokens use `normal` |
| T3  | `letterSpacing: -2 %` applied uniformly, including 12 px                                | **KEPT AS-IS (Phase 2)** — tokenised `-0.02em` at every size; flagged, not changed                                |

## Tokens

| #   | Gap                                                                                                 | Status                                                                                                                                                     |
| --- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| K1  | No spacing variables — every gap/padding is a raw number                                            | **RESOLVED (Phase 2)** — all measured values are multiples of 4 plus three sub-grid values (2, 7, 9); one base token `--spacing: 0.25rem` derives them all |
| K2  | No radius variables — raw values 13/24/38/80 observed                                               | **RESOLVED (Phase 2)** — seven named radius tokens (12/32/37/38/56/80/114), each carrying its source node id                                               |
| K3  | `gradient Cart` and `Gradient Service provider` resolve to empty strings                            | **RESOLVED (Phase 2)** — neither is a gradient. Flat translucent fills: `rgb(254 254 254 / .1)` (888:19276), `rgb(5 35 76 / .8)` (995:20699)               |
| K4  | `GLASS` effect has no CSS definition — only `radius`                                                | **RESOLVED (Phase 2)** — `--blur-glass: 13px` used as `backdrop-blur-glass` over those surface colours. An approximation of Figma's glass, flagged         |
| K5  | `Natural/500` is `#000000`, breaking the neutral ramp (400 `#999999`, 600 `#666666`, 950 `#0D0D0D`) | **KEPT AS-IS (Phase 2)** — ramp tokenised verbatim under Figma's own spelling (`natural-*`); never use `natural-500` as a mid neutral                      |

## Responsive

| #   | Gap                                                                                  | Status                                                                                                                                                          |
| --- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R1  | No design above 1440 — behaviour of the 1284 container on wide screens undefined     | PROPOSE: centre and cap at `--container-desktop` (1284). Token exists; the behaviour is still unapproved                                                        |
| R2  | Nothing designed between 375–768 and 768–1440                                        | **BLOCKING for Phase 5** — only `tablet` (768) and `desktop` (1440) breakpoints exist, so 1024–1439 renders the tablet layout. Confirm, or add a mid breakpoint |
| R3  | Reviews section missing from the 375 mobile frame                                    | BLOCKING — include (adapted) or omit on mobile?                                                                                                                 |
| R4  | Four parallel component libraries (Components / Arabic / Tablet / Phone) may diverge | Built as one responsive set; divergences reported as deviations                                                                                                 |

## Interaction states not designed

| #   | Gap                                                                                             | Status                                                                                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| S1  | No focus-visible state on any interactive element                                               | **RESOLVED (Phase 4)** — every interactive component has a `focus-visible` outline in a token colour. Not in Figma; added because the components are unusable by keyboard without it                   |
| S2  | No disabled or loading state for Button / Click here                                            | PROPOSE                                                                                                                                                                                                |
| S3  | Search by location: no results, empty, or error state; "Check Availability" has no result state | BLOCKING for Phase 5 behaviour                                                                                                                                                                         |
| S4  | Provider email capture: no validation, success or error state                                   | BLOCKING for Phase 5 behaviour                                                                                                                                                                         |
| S5  | No active/current nav item state                                                                | **RESOLVED (Phase 4)** — Figma's `choose` variant (`870:18937`) is the current-item state; rendered with `aria-current`                                                                                |
| S6  | Header has no scrolled/sticky state although it floats over the hero                            | PROPOSE                                                                                                                                                                                                |
| S7  | No 404, no loading, no empty states                                                             | PROPOSE                                                                                                                                                                                                |
| S8  | Mobile drawer: no close/overlay/scroll-lock spec                                                | **PARTLY RESOLVED (Phase 4)** — Escape closes, focus moves into the panel and back to the toggle, focus is trapped while open. No overlay or scroll lock: neither is in Figma, so neither was invented |

## Assets

| #   | Gap                                                                                                                   | Status                                                                                                                                            |
| --- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | `grok-video-5f61ff07-…` (1441 × 2136) is an AI-generated image used as a section background and bleeds past its frame | **PARTLY RESOLVED (Phase 3)** — exported and in use as the Service Areas background. Still flagged: confirm this AI-generated render is final art |
| A2  | Hero and Why Choose Us backgrounds are large 3D renders; total page weight not yet measured                           | **RESOLVED (Phase 3)** — 25 WebP rasters, 641 KB total; heaviest is `why-choose-maze.webp` at 192 KB                                              |
| A3  | Arabic header reuses the `Areas` icon for three different nav items                                                   | BLOCKING — correct icons needed, or I ship the English mapping and report the deviation                                                           |
| A4  | No favicon, no app icon, no OG/social share image in the file                                                         | PROPOSE                                                                                                                                           |
| A5  | Phone mockup screens are flattened app screenshots — unclear whether they are final                                   | **PARTLY RESOLVED (Phase 3)** — exported from the original uploaded sources (up to 1500x4096). Still flagged: confirm the screenshots are final   |

## Verification

| #   | Gap                                                                                                              | Status                                                                                              |
| --- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| V1  | No browser tooling in this session, so the per-breakpoint visual comparison Phase 5 calls for cannot be produced | **BLOCKING** — needs Playwright as a dev dependency (outside the fixed stack, so it needs approval) |

## Motion

| #   | Gap                                                                                                                                                                       | Status                                                                                                                                                                                                           |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| M1  | `get_motion_context` returns no keyframes; no durations, easings or delays anywhere                                                                                       | **Reopened 2026-09-21** — the prototype `reactions` do specify triggers, durations and easings (read via `use_figma`, read-only). Audit in `docs/motion.md` → "Prototype audit"; implementation pending approval |
| M2  | Hero orbit ring is drawn but its rotation is not specified (direction, speed, on-scroll or ambient)                                                                       | **PROPOSED (Phase 6, P1)** — see `docs/motion.md`                                                                                                                                                                |
| M3  | `Service Areas` ↔ `Where We Operate` title swap — trigger unspecified (answered 2026-09-21: after-delay loop, see motion.md)                                              | **PROPOSED (Phase 6, P3)** — see `docs/motion.md`                                                                                                                                                                |
| M4  | `Cursor` / `Click` components imply a guided pointer, purpose unspecified (answered 2026-09-21: 0.8 s loops, see motion.md)                                               | **PROPOSED (Phase 6, P4)** — see `docs/motion.md`                                                                                                                                                                |
| M5  | No prototype flows exposed by the MCP; the `Prototype TheMAP` frame is a label only (answered 2026-09-21: `Flow 4` starts at `853:19390`; reactions read via `use_figma`) | Ask whether prototype links exist elsewhere                                                                                                                                                                      |

## Phone frame (375) — open points from the 2026-09-21 phone pass

| #   | Gap                                                                                                                  | Status                                                                               |
| --- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| P1  | Header sits at y 41, directly under a mock iOS status bar (`1038:24994`) that a web page does not have               | Header kept 20 px from the top (unchanged); needs a decision                         |
| P2  | Phone frame has **no Reviews section**                                                                               | Hidden below 768 to match; confirm this is intended and not a missing frame          |
| P3  | `Screens` tile shows variant 2 on the phone page (different crop), variant 1 on desktop; it auto-cycles in prototype | Tile shows the variant 1 crop scaled to 304 px; the cycle belongs to the motion work |
| P4  | Hero orbit: phone icons are hand-placed and rotated per icon; the pin is ~105 px wide                                | Desktop's even 36° wheel scaled so the ring is 218 px (exact); pin renders ~95 px    |
| P5  | Footer watermark is `icon blue 2` at 759 px / 5 % on the phone                                                       | The desktop watermark raster is reused                                               |
| P6  | Step 1 is followed by an empty 86 px `business-startup 1` slot (`I1041:27796;1038:25424;1038:25401`)                 | Reproduced as spacing (56 px); the slot has no fill — probably a missing image       |
| P7  | Provider pills: two of five use a 24/16 chip instead of 32/22, and the border is a green gradient                    | All five use 32/22 and the primary/500 border                                        |

## Data

| #   | Gap                                                         | Status                            |
| --- | ----------------------------------------------------------- | --------------------------------- |
| D1  | Where do provider submissions go — inbox, CRM, or database? | BLOCKING for the Phase 7 decision |
| D2  | Must the covered-areas list be editable without a deploy?   | BLOCKING for the Phase 7 decision |
| D3  | Are the four reviews fixed forever, or moderated content?   | BLOCKING for the Phase 7 decision |
| D4  | Analytics / consent requirements unknown                    | PROPOSE                           |
