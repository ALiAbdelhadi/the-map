# The Map — website

Marketing site for The Map, built from a Figma design.
Turborepo + pnpm · Next.js 16 (App Router) · React 19 · TypeScript 6 · Tailwind CSS v4.

## Requirements

- Node 24.14.1 (`.nvmrc`; anything ≥ 20.9 works)
- pnpm 10.33.2 (pinned via `packageManager`)

## Getting started

```bash
nvm use
pnpm install
cp apps/www/.env.example apps/www/.env.local
pnpm dev
```

The site runs at http://localhost:3000.

## Commands

| Command          | What it does                    |
| ---------------- | ------------------------------- |
| `pnpm dev`       | start dev servers               |
| `pnpm build`     | production build                |
| `pnpm lint`      | ESLint across the workspace     |
| `pnpm typecheck` | TypeScript across the workspace |
| `pnpm format`    | Prettier write                  |

## Workspace

```
apps/www                    the site
packages/ui                 components + design tokens
packages/typescript-config  shared tsconfigs
packages/eslint-config      shared ESLint flat configs
docs/                       Figma inventory, gaps, asset manifest
```

## Design source

Figma is the single source of truth: file key `jfNj5yN77f5lk3SULMAHjN`
([The Map website](https://www.figma.com/design/jfNj5yN77f5lk3SULMAHjN/The-Map-website)).
What the design file does not answer is tracked in `docs/figma-gaps.md`.
Working conventions live in `CLAUDE.md`.
