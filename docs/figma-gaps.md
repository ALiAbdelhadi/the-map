# Figma Gaps — The Map (website)

Everything the design file does not answer. Nothing here will be invented, filled
with a placeholder, or substituted silently. Each item is either a question for the
client/designer or an explicit proposal awaiting approval.

Status: `BLOCKING` = a phase cannot complete without it. `PROPOSE` = I will suggest
an option at the phase where it lands and wait for a yes.

---

## Content and copy

| #   | Gap                                                                                                                    | Where                  | Status                                                         |
| --- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------- |
| C1  | No body copy for the Why Choose Us features — labels only (All-in-One, Flexible, Nearby, Fast, Easy)                   | `911:19600`            | PROPOSE — ship labels only unless copy is supplied             |
| C2  | Full Arabic body copy exists per node but the Arabic reviews heading is only visible mid-typewriter                    | `1028:20692`           | Resolved in Phase 5 by reading each node; no translation by me |
| C3  | No legal pages (privacy, terms), no cookie notice                                                                      | —                      | PROPOSE                                                        |
| C4  | Real App Store / Google Play URLs not in the file                                                                      | footer, Get the App    | BLOCKING for Phase 5 links                                     |
| C5  | Real social URLs (Facebook, Instagram, X, LinkedIn) not in the file                                                    | footer                 | BLOCKING for Phase 5 links                                     |
| C6  | `info@Themap.com` is the only contact channel shown; unclear if it is the real address                                 | `998:20792`            | BLOCKING for Phase 5                                           |
| C7  | The covered-areas dataset (which cities/areas) does not exist anywhere in the file                                     | Service Areas          | BLOCKING for Phase 5                                           |
| C8  | Nav label conflict: desktop says "Become a Provider", mobile drawer says "Contact us", component is named `Contact us` | header vs `1038:26925` | BLOCKING — one label must win                                  |

## Typography and localisation

| #   | Gap                                                                                     | Status                                                                                                       |
| --- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| T1  | Arabic frames use `Baloo 2`, which has no Arabic glyphs — no Arabic typeface was chosen | BLOCKING for Phase 2. Nearest sibling is Baloo Bhaijaan 2 (same superfamily, Arabic + Latin); needs sign-off |
| T2  | `lineHeight: 100` (1.0) on all 92 styles contradicts the rendered multi-line paragraphs | PROPOSE per-role line-heights in Phase 2, listed as a deviation                                              |
| T3  | `letterSpacing: -2 %` applied uniformly, including 12 px                                | PROPOSE keeping as-is; flagged, not changed                                                                  |

## Tokens

| #   | Gap                                                                                                 | Status                                                                        |
| --- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| K1  | No spacing variables — every gap/padding is a raw number                                            | Extract per node, register with source node id (Phase 2)                      |
| K2  | No radius variables — raw values 13/24/38/80 observed                                               | Same                                                                          |
| K3  | `gradient Cart` and `Gradient Service provider` resolve to empty strings                            | Extract raw stops per node (Phase 2)                                          |
| K4  | `GLASS` effect has no CSS definition — only `radius`                                                | Derive `backdrop-filter` + fill per surface, record source node               |
| K5  | `Natural/500` is `#000000`, breaking the neutral ramp (400 `#999999`, 600 `#666666`, 950 `#0D0D0D`) | PROPOSE: tokenise the ramp verbatim, never use `Natural/500` as a mid neutral |

## Responsive

| #   | Gap                                                                                  | Status                                                          |
| --- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| R1  | No design above 1440 — behaviour of the 1284 container on wide screens undefined     | PROPOSE: centre and cap at 1284                                 |
| R2  | Nothing designed between 375–768 and 768–1440                                        | PROPOSE: fluid interpolation between the three designed widths  |
| R3  | Reviews section missing from the 375 mobile frame                                    | BLOCKING — include (adapted) or omit on mobile?                 |
| R4  | Four parallel component libraries (Components / Arabic / Tablet / Phone) may diverge | Built as one responsive set; divergences reported as deviations |

## Interaction states not designed

| #   | Gap                                                                                             | Status                                                              |
| --- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| S1  | No focus-visible state on any interactive element                                               | PROPOSE in Phase 4 (accessibility requirement, cannot ship without) |
| S2  | No disabled or loading state for Button / Click here                                            | PROPOSE                                                             |
| S3  | Search by location: no results, empty, or error state; "Check Availability" has no result state | BLOCKING for Phase 5 behaviour                                      |
| S4  | Provider email capture: no validation, success or error state                                   | BLOCKING for Phase 5 behaviour                                      |
| S5  | No active/current nav item state                                                                | PROPOSE                                                             |
| S6  | Header has no scrolled/sticky state although it floats over the hero                            | PROPOSE                                                             |
| S7  | No 404, no loading, no empty states                                                             | PROPOSE                                                             |
| S8  | Mobile drawer: no close/overlay/scroll-lock spec                                                | PROPOSE                                                             |

## Assets

| #   | Gap                                                                                                                   | Status                                                                                  |
| --- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| A1  | `grok-video-5f61ff07-…` (1441 × 2136) is an AI-generated image used as a section background and bleeds past its frame | Flag — confirm it is final art                                                          |
| A2  | Hero and Why Choose Us backgrounds are large 3D renders; total page weight not yet measured                           | Reported with numbers in Phase 3                                                        |
| A3  | Arabic header reuses the `Areas` icon for three different nav items                                                   | BLOCKING — correct icons needed, or I ship the English mapping and report the deviation |
| A4  | No favicon, no app icon, no OG/social share image in the file                                                         | PROPOSE                                                                                 |
| A5  | Phone mockup screens are flattened app screenshots — unclear whether they are final                                   | Flag                                                                                    |

## Motion

| #   | Gap                                                                                                 | Status                                                 |
| --- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| M1  | `get_motion_context` returns no keyframes; no durations, easings or delays anywhere                 | All timing proposed in Phase 6, never invented earlier |
| M2  | Hero orbit ring is drawn but its rotation is not specified (direction, speed, on-scroll or ambient) | PROPOSE                                                |
| M3  | `Service Areas` ↔ `Where We Operate` title swap — trigger unspecified                               | PROPOSE                                                |
| M4  | `Cursor` / `Click` components imply a guided pointer, purpose unspecified                           | PROPOSE                                                |
| M5  | No prototype flows exposed by the MCP; the `Prototype TheMAP` frame is a label only                 | Ask whether prototype links exist elsewhere            |

## Data

| #   | Gap                                                         | Status                            |
| --- | ----------------------------------------------------------- | --------------------------------- |
| D1  | Where do provider submissions go — inbox, CRM, or database? | BLOCKING for the Phase 7 decision |
| D2  | Must the covered-areas list be editable without a deploy?   | BLOCKING for the Phase 7 decision |
| D3  | Are the four reviews fixed forever, or moderated content?   | BLOCKING for the Phase 7 decision |
| D4  | Analytics / consent requirements unknown                    | PROPOSE                           |
