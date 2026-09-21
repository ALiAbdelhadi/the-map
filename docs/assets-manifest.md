# Asset manifest — The Map (website)

Phase 3. Every asset below was exported through the Figma MCP (`download_assets`) from
file `jfNj5yN77f5lk3SULMAHjN` and carries the node id it came from. Nothing was redrawn,
substituted or generated. No export failed.

Naming: kebab-case. Where a Figma layer name is auto-generated and meaningless
(`image 6651`, `image 6661`, `grok-video-5f61ff07-…`), the file takes a descriptive name and the
original Figma name is recorded in the table — the node id remains the link back to Figma.

## Icon components — `packages/ui/src/icons/*.tsx`

Monochrome icons, recoloured to `currentColor`, exported as React components.
Import path: `@themap/ui/icons/<name>`.

| Component              | Figma layer      | Node id      | Bytes |
| ---------------------- | ---------------- | ------------ | ----- |
| `about.tsx`            | About            | `870:18895`  | 14490 |
| `all-in-one.tsx`       | All-in-One       | `913:19666`  | 4630  |
| `apostrophe.tsx`       | apostrophe       | `1018:21071` | 2713  |
| `app-store.tsx`        | app store        | `942:20415`  | 2397  |
| `app.tsx`              | App              | `872:19123`  | 10748 |
| `areas.tsx`            | Areas            | `873:19261`  | 2890  |
| `arrow.tsx`            | arrow            | `888:18725`  | 877   |
| `choose.tsx`           | Choose           | `871:18981`  | 23411 |
| `contact-us.tsx`       | Contact us       | `874:19303`  | 5766  |
| `easy.tsx`             | Easy             | `914:19749`  | 5693  |
| `email.tsx`            | Email            | `998:20634`  | 6715  |
| `facebook.tsx`         | Facebook         | `1023:20831` | 1035  |
| `fast.tsx`             | Fast             | `914:19735`  | 1171  |
| `flexible.tsx`         | Flexible         | `914:19768`  | 8328  |
| `focus.tsx`            | focus            | `982:20133`  | 2485  |
| `full-flexibility.tsx` | Full Flexibility | `996:20571`  | 9775  |
| `income.tsx`           | Income           | `995:20668`  | 8093  |
| `instagram.tsx`        | instagram        | `1023:20822` | 1613  |
| `language.tsx`         | language         | `888:18663`  | 1968  |
| `menu.tsx`             | menu             | `1037:32817` | 1472  |
| `nearby.tsx`           | Nearby           | `913:19702`  | 5010  |
| `providers.tsx`        | providers        | `1102:26845` | 15399 |
| `ready-clients.tsx`    | Ready Clients    | `996:20604`  | 7959  |
| `service-provider.tsx` | Service provider | `998:20715`  | 10699 |
| `simple.tsx`           | Simple           | `996:20511`  | 6394  |
| `star.tsx`             | Star             | `1018:21060` | 3397  |
| `wider-reach.tsx`      | Wider Reach      | `996:20475`  | 7690  |

## Multicolour SVGs — `apps/www/public/svg/*.svg`

Kept as files, unmodified beyond removal of Figma's canvas artefacts (see Notes).

| File                              | Figma layer   | Node id      | Bytes |
| --------------------------------- | ------------- | ------------ | ----- |
| `flag-arabic.svg`                 | Arabic        | `888:18907`  | 31634 |
| `flag-english.svg`                | english       | `888:18823`  | 2576  |
| `google-play.svg`                 | google play   | `942:20455`  | 1156  |
| `illustration-provider-phone.svg` | 3628717_597 2 | `996:20823`  | 19338 |
| `linkedin.svg`                    | linkedin      | `1023:20998` | 2467  |
| `logo-wordmark.svg`               | logo header   | `870:18837`  | 28899 |
| `x.svg`                           | X             | `1023:20912` | 704   |

## Rasters — `apps/www/public/images/*.webp`

| File                                  | Figma layer                                       | Node id      | Output    | WebP       | Source      | Saving  |
| ------------------------------------- | ------------------------------------------------- | ------------ | --------- | ---------- | ----------- | ------- |
| `app-screen-documents.webp`           | documents 1                                       | `938:19979`  | 420x1273  | 47 KB      | 1890 KB     | 97%     |
| `app-screen-find-missing-people.webp` | Find missing people 1                             | `938:19980`  | 420x1435  | 31 KB      | 996 KB      | 97%     |
| `app-screen-meal-details.webp`        | Meal details 1                                    | `938:19981`  | 420x941   | 35 KB      | 1543 KB     | 98%     |
| `app-screen-new-order.webp`           | New Order 1                                       | `938:19975`  | 420x1218  | 28 KB      | 980 KB      | 97%     |
| `app-screen-search-results.webp`      | Search results 1                                  | `938:19977`  | 420x1176  | 43 KB      | 2695 KB     | 98%     |
| `app-screen-splash.webp`              | Splash3 1                                         | `938:19978`  | 420x910   | 19 KB      | 887 KB      | 98%     |
| `avatar-6661.webp`                    | image 6661                                        | `1018:21077` | 420x614   | 7 KB       | 303 KB      | 97%     |
| `avatar-6662.webp`                    | image 6662                                        | `1018:21083` | 420x614   | 7 KB       | 288 KB      | 97%     |
| `avatar-6663.webp`                    | image 6663                                        | `1018:21081` | 420x614   | 10 KB      | 335 KB      | 97%     |
| `avatar-6664.webp`                    | image 6664                                        | `1018:21079` | 420x614   | 10 KB      | 347 KB      | 97%     |
| `footer-watermark.webp`               | icon blue 2                                       | `1022:20737` | 2878x810  | 11 KB      | 99 KB       | 89%     |
| `hero-map-scene.webp`                 | image 6651                                        | `888:20922`  | 2880x2048 | 32 KB      | 625 KB      | 95%     |
| `illustration-blinkz.webp`            | Blinkz                                            | `903:20959`  | 538x294   | 2 KB       | 76 KB       | 97%     |
| `illustration-emergency.webp`         | Emergency                                         | `903:20963`  | 724x395   | 4 KB       | 147 KB      | 97%     |
| `illustration-employee.webp`          | Employee                                          | `903:20964`  | 646x352   | 4 KB       | 150 KB      | 97%     |
| `illustration-food.webp`              | Food                                              | `903:20961`  | 568x309   | 4 KB       | 136 KB      | 97%     |
| `illustration-medical.webp`           | Medical                                           | `903:20965`  | 746x406   | 7 KB       | 162 KB      | 96%     |
| `illustration-needed.webp`            | Needed                                            | `903:20966`  | 480x262   | 3 KB       | 81 KB       | 96%     |
| `illustration-real-estate.webp`       | Real estate                                       | `903:20960`  | 586x320   | 5 KB       | 150 KB      | 96%     |
| `illustration-service.webp`           | Service                                           | `903:20967`  | 458x250   | 2 KB       | 78 KB       | 97%     |
| `illustration-special.webp`           | special                                           | `903:20962`  | 644x351   | 4 KB       | 124 KB      | 96%     |
| `illustration-the-map.webp`           | The map                                           | `903:20968`  | 458x250   | 2 KB       | 88 KB       | 97%     |
| `service-areas-scene.webp`            | grok-video-5f61ff07-5c68-49b3-8197-a006c9d5e4b0 1 | `974:20033`  | 2880x2048 | 83 KB      | 465 KB      | 82%     |
| `why-choose-character.webp`           | image 6659                                        | `910:19508`  | 2880x2384 | 40 KB      | 1373 KB     | 97%     |
| `why-choose-maze.webp`                | image 6658                                        | `907:21017`  | 2880x2048 | 188 KB     | 3307 KB     | 94%     |
| **Total**                             |                                                   |              |           | **641 KB** | **16.9 MB** | **96%** |

## Totals

- 27 icon components, 168 KB of TSX
- 7 multicolour SVGs, 84 KB
- 25 WebP rasters, **641 KB** total (from 16.9 MB of Figma sources)

The heaviest single asset is `why-choose-maze.webp`. All rasters are served through
`next/image`, which resizes per device, so the delivered weight per breakpoint is lower
than the totals above.

## Density and encoding

| Group                                 | Export                                                         | Encoding                                    |
| ------------------------------------- | -------------------------------------------------------------- | ------------------------------------------- |
| Section backgrounds, footer watermark | Figma export at scale 2 (2880 px wide)                         | `cwebp -q 78 -m 6`                          |
| Review avatars                        | Figma export at scale 2 (420x614)                              | `cwebp -q 82 -m 6`                          |
| Hero service illustrations            | Figma export at scale 1 (already 2x their 130 px display size) | `cwebp -q 85 -m 6`                          |
| Phone mockup screens                  | original uploaded source (up to 1500x4096)                     | resized to 420 px wide, `cwebp -q 80 -m 6`  |
| `why-choose-character`                | original uploaded source 4876x4036                             | resized to 2880 px wide, `cwebp -q 78 -m 6` |

`cwebp` is a system tool (already installed at `/opt/homebrew/bin/cwebp`); no image
dependency was added to the project.

## Notes and deviations

1. **Figma's component exports carry canvas artefacts.** Exporting an icon _component_
   returns the icon plus the grey section backdrop (`fill="#7E7E7E"`), two enormous
   section-frame paths with coordinates like `-8189 -1188`, and the purple `#9747FF`
   component boundary. Every SVG was cleaned of exactly those four artefacts — nothing
   inside the artwork was edited, redrawn or re-pathed. The cleaner is
   `clean-svg.mjs` in this session's scratchpad; it drops the backdrop rect, any path
   whose coordinates fall outside the viewBox, the `#9747FF` boundary, and the now-empty
   `<g id="Design System">` / `<g id="Icon">` wrappers.
2. **Monochrome vs multicolour** was decided by counting artwork colours after excluding
   `<defs>`, `<mask>` and `<clipPath>` (mask fills are plumbing, not artwork — without that
   exclusion `choose` was misread as multicolour).
3. **`linkedin.svg` and `x.svg` are two-tone brand marks** (blue disc + white glyph). They
   stay as SVG files rather than becoming `currentColor` components.
4. **Four of the six phone-mockup screens export as empty 149-byte PNGs** because they are
   hidden in the variant that was exported. The original uploaded source images were used
   instead — higher fidelity, and the reason those files carry real screenshots.
5. **Avatar-to-reviewer mapping is unknown.** Figma names them `image 6661`–`image 6664`; the
   review component variants are named after people (Ahmed Omar, Menna Hamza, Mahmoud Ali,
   Nourhan Samir). Which avatar belongs to which review is resolved in Phase 4 from the
   variant contents, not guessed here.
6. **`flag-arabic.svg` is 31 KB** — the largest SVG, a detailed flag. Flagged rather than
   simplified, since simplifying it would change the artwork.
7. **No favicon, app icon or OG image exists in the Figma file** (gap A4). None was invented.
8. Library-only assets that no page uses (`logo blue 2`, `logo white 2`, `icon white 2`,
   `icon white 3`, `image 6645`, and the small orbit-sized copies of the nine service
   illustrations) were not exported. The orbit uses the same artwork as the large copies.

## Verification

- All 34 exported vectors were rendered to PNG and checked on one contact sheet: every icon
  shows real artwork, none is blank or contains a grey artefact box.
- The dev sheet at `/dev/assets` renders all 27 icon components (light and dark), all
  7 SVGs and all 25 rasters; it returned HTTP 200 and every asset URL served
  (checked `hero-map-scene.webp` = 33,252 bytes and `logo-wordmark.svg` = 28,899 bytes).
- No browser screenshot was taken — there is no browser tooling in this session. Visual
  confirmation against Figma is yours to make on `/dev/assets`.

## Addendum — assets added in Phase 4

Building the components surfaced three assets the Phase 3 sweep had missed, because
they only appear inside component variants rather than in the Images section.

| File                                           | Figma layer         | Node id      | Notes                                                                                                                                                                            |
| ---------------------------------------------- | ------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/www/public/images/avatar-6660.webp`      | image 6660          | `1009:20646` | The portrait used by the **expanded** review card. Phase 3 exported only the four collapsed portraits (`image 6661`–`6664`); the expanded card uses a fifth image. 214x614, 7 KB |
| `packages/ui/src/icons/language-toggle-en.tsx` | languageToogle · EN | `888:18953`  | 59x24 toggle artwork, monochrome, recoloured to `currentColor`                                                                                                                   |
| `packages/ui/src/icons/language-toggle-ar.tsx` | languageToogle · Ar | `888:18954`  | as above, Arabic state                                                                                                                                                           |

Raster total is now **692 KB** across 26 WebP files.

## Addendum — corrections made in Phase 5

The first screenshot pass showed three assets were wrong.

| File                                                                                            | Was                                                                                               | Now                                                                                                                               | Node                                                                                                                |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `illustration-{service,needed,medical,employee,emergency,special,food,real-estate,blinkz}.webp` | the grey isometric map scenes from the `Images & Illustrations` section (`903:20959`–`903:20967`) | the hero's own orbit artwork, exported at 3x                                                                                      | `888:20873`, `888:20869`, `888:20884`, `888:20692`, `888:20894`, `888:20908`, `888:20915`, `888:20919`, `891:19648` |
| `logo-wordmark`                                                                                 | an SVG containing two overlapping copies of the logo (`870:18837`)                                | a single `currentColor` icon component                                                                                            | `1028:21561`                                                                                                        |
| `why-choose-character.webp`                                                                     | the node export, flattened onto opaque white                                                      | the uploaded source cut-out, cropped to the figure's alpha bounds (216x659 of 1408x768) — empty pixels removed, artwork untouched | `910:19508`                                                                                                         |

`illustration-the-map.webp` was deleted: the hero's default state shows the logo mark
(`888:20656`, now `logo-mark.svg`), not that scene.

Raster total after the corrections: **25 WebP files, 646 KB.**
