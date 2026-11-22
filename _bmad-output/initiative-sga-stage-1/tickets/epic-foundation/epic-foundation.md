---
id: 1
type: epic
title: Platform foundation
parent: initiative-sga-stage-1
covers: [R8, R9, R12]
sources:
  - ../../initiative-sga-stage-1.md
  - ../../architecture-sga-stage-1/architecture-sga-stage-1.md
  - ../../ux-sga-stage-1/DESIGN.md
refined: true
risk: medium
---

# Platform foundation

## Description

Scaffold the repo for Stage 1: Next.js App Router static export, TypeScript, Tailwind mapped to DESIGN tokens, `next-intl` with `[locale]` segment, `src/content/` Sanity client boundary, GitHub Actions CI, and brand assets in `public/brand/`.

## Outcome

`npm run build` produces `out/` on CI; locales `en` and `si` route; no secrets in repo.

## Requirements

1. **R8 (parent R8, AD-1–2):** `output: 'export'` configured; content reads only via `src/content/`.
2. **R9 (parent R9):** CI workflow runs install, lint, typecheck, build.
3. **R12 (parent R12, AD-9):** Tailwind theme reflects DESIGN.md colors, micro-radius container, catalogue gap.

## Done when

1. CI passes on default branch with empty/placeholder pages for both locales.
2. Architecture AD-1–3, AD-6 demonstrated in repo layout.
3. Logo served from `public/brand/sga_small_logo.jpg`.

## Boundaries

- No Sanity schemas (epic 2).
- No vehicle or marketing page content (epics 3–4).

## References

- parent — `initiative-sga-stage-1.md` Requirements
- architecture — `architecture-sga-stage-1/architecture-sga-stage-1.md` AD-1–AD-3, AD-6, AD-9
- design — `ux-sga-stage-1/DESIGN.md`