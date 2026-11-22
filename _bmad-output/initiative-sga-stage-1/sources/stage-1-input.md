# Stage 1 planning input (product owner)

Consolidated facts from discovery — not a PRD. Sofia/John lift requirements from here.

## Initiative

- Slug: `sga-stage-1`
- Canonical domain: `https://serendibglobalauto.lk`

## Brand assets

| Asset | Path |
|-------|------|
| Header logo (primary) | `assets/brand/sga_small_logo.jpg` |
| Full wordmark (optional marketing) | `assets/brand/SGA_Full_logo.jpg` (legacy; header uses small logo) |

### Derived brand palette (from logo — verify on implementation)

| Role | Approximate | Notes |
|------|-------------|--------|
| Primary navy | `#0B3D91`–`#1A4FA3` | “SERENDIB”, globe oceans, left swoosh |
| Accent crimson | `#C41E3A`–`#E31837` | “AUTO”, landmasses, right swoosh |
| Neutrals | White, light grey | Logo background; use for site surfaces |
| Chrome / highlight | Silver gradients | Decorative only — avoid heavy 3D on UI |

**UX note:** Logo is glossy and detailed; site UI should stay flat/clean so the mark reads clearly (per master prompt).

## CMS — Sanity.io

| Setting | Value |
|---------|--------|
| Provider | Sanity.io (hosted Studio) |
| Organization / project console | https://www.sanity.io/organizations/ox2ksa5wq/project/n2zalqm8 |
| Project ID | `n2zalqm8` |
| Dataset | `production` |
| Scaffold template | `clean` |

### Documented init command (for app/studio scaffold — not run until implementation story)

```bash
npm create sanity@latest -- --project n2zalqm8 --dataset production --template clean
```

**Secrets:** Use env vars for project ID and dataset on the public site. Never commit Sanity write tokens.

## Stack (Stage 1 — agreed)

Next.js static export, TypeScript, Tailwind, Sanity read-only at build time, Cloudflare Pages, GitHub Actions CI, $0 recurring target, WhatsApp enquiry pattern.

## Languages (Stage 1)

- **English** + **Sinhala** (UI switcher)
- **UI strings:** Sinhala in app locale files (built with the site)
- **CMS body copy:** owner enters English + Sinhala in Studio; no auto-translate APIs in Stage 1; empty Sinhala → English
- Tamil: not in Stage 1

## Contact (published on site)

| Channel | Value |
|---------|--------|
| WhatsApp | +94719186125 |
| Phone | +94719186125 |
| Email | serendibglobalauto@gmail.com |

**Physical address:** none — digital contact only (product owner decision 2026-11-22).

## Services (Stage 1 — product owner list)

1. Vehicle bidding on auction
2. Exporting process handling
3. Importing to Sri Lanka
4. Custom clearance
5. Delivery

## Pricing display

- Default when no price in CMS: **Price on request**
- Optional explicit LKR price per vehicle when set

## Footer / legal

- Legal entity or registration line: **not yet** — omit until owner provides text

## PRD

- `_bmad-output/initiative-sga-stage-1/prd-sga-stage-1/prd-sga-stage-1.md` (final 2026-11-22)

## UX (**approved** 2026-11-22 — implementation may start after epics)

- `DESIGN.md` — `_bmad-output/initiative-sga-stage-1/ux-sga-stage-1/DESIGN.md`
- `EXPERIENCE.md` — `_bmad-output/initiative-sga-stage-1/ux-sga-stage-1/EXPERIENCE.md`
- Home mock — `ux-sga-stage-1/mockups/home.html`

## Architecture

- `_bmad-output/initiative-sga-stage-1/architecture-sga-stage-1/architecture-sga-stage-1.md` (final 2026-11-22)

## Deploy / CMS ops

- Auto-rebuild when content published in Sanity **and** manual rebuild path (GitHub/Cloudflare)

## Pages

- FAQ included (CMS Q&A, bilingual fields)

## Still open

- Launch vehicle count at go-live (operational)
- OQ-5 legal footer line