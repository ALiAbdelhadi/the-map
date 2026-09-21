# The Map — website

Marketing site for The Map, implemented from an existing Figma design.

## Role and authority

Figma is the single source of truth for design. No design decisions are made in
this repo. Where the Figma file is silent (motion timing, missing states, Arabic
typeface), the gap is recorded in `docs/figma-gaps.md` and an option is proposed
and approved before it is implemented — never filled in silently.

- Figma file: `The Map website`
- File key: `jfNj5yN77f5lk3SULMAHjN`
- URL: https://www.figma.com/design/jfNj5yN77f5lk3SULMAHjN/The-Map-website

## Hard rules

1. Read Figma **only** through the Figma MCP tools (`get_metadata`,
   `get_variable_defs`, `get_design_context`, `get_motion_context`,
   `get_screenshot`). If they are unavailable or fail, stop and say so. Never
   reconstruct a design from memory or from a screenshot alone.
2. No design value — colour, font, size, spacing, radius, shadow, blur — may exist
   outside the token layer in `packages/ui/src/styles/theme.css`. Every token traces
   to a Figma variable. Where Figma has no variable, extract the raw value and
   register it as a token with a comment naming the source node id.
3. Never invent copy, images or icons. Anything missing goes to `docs/figma-gaps.md`.
4. Work in phases. At the end of each phase: `pnpm typecheck`, `pnpm lint`,
   `pnpm build`, commit with a conventional commit, summarise what was done and
   every deviation from Figma, then stop for approval.
5. Ask before adding any dependency outside the fixed stack.
6. Report deviations honestly. Never claim "pixel-perfect" without a per-breakpoint
   visual comparison against Figma renders.
7. Do not rely on memory for the APIs of Next.js, Tailwind, Prisma or GSAP. Check the
   current official docs before writing config or installing.

## Stack (fixed — do not substitute)

- Turborepo + pnpm workspaces
- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 6 (strict)
- Tailwind CSS v4, CSS-first config via `@theme`. **No `tailwind.config.js`.**
- GSAP + `@gsap/react` (`useGSAP`) for **all** animation — added in Phase 6
- Neon Postgres + Prisma **only** if approved (see `docs/figma-inventory.md` §9)

### Pinned versions and why

- `typescript` is pinned to **6.0.3**, not 7.x: `typescript-eslint@8.70` declares
  `typescript >=4.8.4 <6.1.0`, so TS 7 breaks `eslint-config-next/typescript`.
- `eslint` is pinned to **9.39.5**, not 10.x: `eslint-plugin-react@7.37.5`
  (a transitive dependency of `eslint-config-next`) crashes on ESLint 10 with
  `contextOrFilename.getFilename is not a function`.
- `baseUrl` is not set in any tsconfig — TS 6 deprecates it. `paths` resolve
  relative to the tsconfig file instead.

## Layout

```
apps/www                    Next.js app (the site)
packages/ui                 components + token layer + assets
packages/typescript-config  base / nextjs / react-library tsconfigs
packages/eslint-config      base / next / react-library flat configs
docs/                       figma-inventory.md, figma-gaps.md, assets-manifest.md
```

`packages/ui` is a just-in-time package: it exports TypeScript source and
`apps/www` transpiles it via `transpilePackages` in `next.config.ts`.

## Commands

| Command          | What it does                    |
| ---------------- | ------------------------------- |
| `pnpm dev`       | all dev servers via turbo       |
| `pnpm build`     | production build                |
| `pnpm lint`      | ESLint, `--max-warnings 0`      |
| `pnpm typecheck` | `tsc --noEmit` in every package |
| `pnpm format`    | Prettier write                  |

Node is pinned in `.nvmrc` (24.14.1); the package manager is pinned in
`package.json` (`pnpm@10.33.2`).

## Styling rules

- One CSS entry point: `apps/www/app/globals.css`. It imports Tailwind, imports the
  token layer from `packages/ui`, and declares `@source "../../../packages/ui/src"`
  so Tailwind scans the component package (its automatic detection does not).
- Tokens are defined once, in `packages/ui/src/styles/theme.css`, inside `@theme`.
- No arbitrary values in components when a token exists. No inline hex, px font
  sizes or ad-hoc shadows anywhere.

## Code conventions

- Server Components by default. `"use client"` only where interaction requires it.
- Semantic HTML, `focus-visible` states, keyboard support, correct ARIA.
- Bilingual: English (LTR) and Arabic (RTL) from one component set. Never hardcode
  a direction; use logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start`, `end`).
- No animation outside GSAP, and none before Phase 6.
- Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).

## Phase status

- [x] Phase 0 — recon (`docs/figma-inventory.md`, `docs/figma-gaps.md`)
- [x] Phase 1 — monorepo scaffold
- [x] Phase 2 — design tokens + fonts + `/dev/tokens`
- [x] Phase 3 — assets
- [x] Phase 4 — components
- [x] Phase 5 — pages, English and Arabic (`/en`, `/ar`)
- [ ] Phase 6 — GSAP motion
- [ ] Phase 7 — database (only if approved)
