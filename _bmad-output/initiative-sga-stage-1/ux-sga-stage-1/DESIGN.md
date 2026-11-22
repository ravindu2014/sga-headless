---
name: Serendib Global Auto
description: Visual identity for Stage 1 — flat, premium automotive import brand; square media containers; logo asset only may read 3D.
status: final
created: "2026-11-22"
updated: "2026-11-22"
sources:
  - ../prd-sga-stage-1/prd-sga-stage-1.md
  - ../brief-sga-stage-1/brief-sga-stage-1.md
  - imports/sga_small_logo.jpg
colors:
  background: '#FFFFFF'
  surface: '#FFFFFF'
  surface-muted: '#FFFFFF'
  on-background: '#0F172A'
  on-surface: '#1E293B'
  on-surface-muted: '#64748B'
  primary: '#0F3D7A'
  on-primary: '#FFFFFF'
  primary-hover: '#1A4FA3'
  accent: '#C41E3A'
  on-accent: '#FFFFFF'
  accent-hover: '#A31830'
  border: '#D8DEE8'
  border-strong: '#B8C2D0'
  success: '#15803D'
  warning: '#B45309'
  error: '#B91C1C'
  focus-ring: '#1A4FA3'
  price-muted: '#475569'
typography:
  display:
    fontFamily: Inter, Noto Sans Sinhala, system-ui, sans-serif
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: '-0.02em'
  display-mobile:
    fontFamily: Inter, Noto Sans Sinhala, system-ui, sans-serif
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: '1.25'
  headline:
    fontFamily: Inter, Noto Sans Sinhala, system-ui, sans-serif
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: '1.3'
  title:
    fontFamily: Inter, Noto Sans Sinhala, system-ui, sans-serif
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: '1.4'
  body:
    fontFamily: Inter, Noto Sans Sinhala, system-ui, sans-serif
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter, Noto Sans Sinhala, system-ui, sans-serif
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
  label:
    fontFamily: Inter, Noto Sans Sinhala, system-ui, sans-serif
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: '0.02em'
  price:
    fontFamily: Inter, Noto Sans Sinhala, system-ui, sans-serif
    fontSize: 1.25rem
    fontWeight: '700'
    lineHeight: '1.3'
rounded:
  none: '0'
  sm: 0.125rem
  DEFAULT: 0.125rem
  md: 0.25rem
  lg: 0.25rem
  xl: 0.375rem
  container: 0.1875rem
  full: 9999px
spacing:
  '1': 0.25rem
  '2': 0.5rem
  '3': 0.75rem
  '4': 1rem
  '6': 1.5rem
  '8': 2rem
  '12': 3rem
  '16': 4rem
  page-gutter-mobile: 1rem
  page-gutter-desktop: 1.5rem
  section-y: 3rem
  card-padding: 1rem
  catalogue-gap: 1.5rem
components:
  button-primary:
    background: '{colors.accent}'
    color: '{colors.on-accent}'
    hoverBackground: '{colors.accent-hover}'
    radius: '{rounded.md}'
    minHeight: 2.75rem
    paddingX: '{spacing.6}'
  button-secondary:
    background: transparent
    color: '{colors.primary}'
    border: '1px solid {colors.border-strong}'
    hoverBackground: '{colors.surface-muted}'
    radius: '{rounded.md}'
    minHeight: 2.75rem
  button-ghost:
    background: transparent
    color: '{colors.on-surface}'
    hoverBackground: '{colors.surface-muted}'
  link:
    color: '{colors.primary}'
    hoverColor: '{colors.primary-hover}'
    underline: hover
  site-header:
    height: 4rem
    background: '{colors.surface}'
    borderBottom: '1px solid {colors.border}'
  vehicle-card:
    background: '{colors.surface}'
    border: '1px solid {colors.border}'
    radius: '{rounded.container}'
    imageRadius: '{rounded.container}'
    imageRatio: '4/3'
    shadow: none
    hoverShadow: none
    hoverBorder: '{colors.border-strong}'
  hero-media:
    radius: '{rounded.container}'
    border: '1px solid {colors.border}'
    background: '{colors.surface}'
  gallery-image:
    radius: '{rounded.container}'
  badge-available:
    background: '#DCFCE7'
    color: '{colors.success}'
  badge-sold:
    background: '{colors.surface-muted}'
    color: '{colors.on-surface-muted}'
  badge-featured:
    background: '{colors.primary}'
    color: '{colors.on-primary}'
  input:
    border: '1px solid {colors.border}'
    radius: '{rounded.md}'
    focusRing: '2px solid {colors.focus-ring}'
    minHeight: 2.75rem
  lang-switch:
    trackBackground: '#EEF1F6'
    radius: '{rounded.full}'
    padding: '0.25rem'
    segmentRadius: '{rounded.full}'
    activeBackground: '{colors.surface}'
    activeColor: '{colors.primary}'
    inactiveColor: '{colors.on-surface}'
---

# Serendib Global Auto — Design System (Stage 1)

## Brand & Style

Serendib Global Auto should feel **premium, modern, and trustworthy**—appropriate for a Sri Lankan vehicle import business with global reach. The **entire site UI is flat**: solid fills, **no gradients**, **no drop shadows**, **no faux depth** on sections or cards. The header logo (`assets/brand/sga_small_logo.jpg`) may read metallic in the asset itself; do not echo that with UI chrome.

**Containers** (vehicle cards, hero media, gallery images, service tiles, FAQ blocks, image placeholders) use a **micro radius** `{rounded.container}` (**3px / 0.1875rem**)—reads as square but avoids a harsh, robotic clip. **Buttons and inputs** use `{rounded.sm}`–`{rounded.md}`; **badges** stay pill `{rounded.full}`.

**Flat does not mean flush-mounted tiles.** Catalogue and featured grids use **generous whitespace** (`{spacing.catalogue-gap}`) between cards. The **page and grid area stay white** in empty columns—never a tinted or grey “grid gutter” behind unfilled cells. Each card is its own bordered rectangle; gaps are open background, not divider paint.

Posture: **confident dealer**; **clarity over decoration**; photography carries emotion.

## Colors

- **Primary navy** (`{colors.primary}`) — navigation active states, headings accents, links, secondary buttons. Maps to logo oceans and “SERENDIB” blue.
- **Accent crimson** (`{colors.accent}`) — **primary CTAs** (Browse vehicles, Enquire, WhatsApp actions). Maps to logo red; use sparingly so CTAs stay visible.
- **Surfaces** — single flat canvas `{colors.background}` and `{colors.surface}` both **#FFFFFF**; separate sections with **1px borders or whitespace only**, never tinted bands or gradients.
- **Neutrals** — body text `{colors.on-surface}`; meta/specs `{colors.on-surface-muted}`; dividers `{colors.border}`.
- **Semantic** — success for “Available”; muted badge for “Sold” / unavailable; error for form validation only.
- **Do not** use red+navy gradient fills on large UI blocks (reserved for logo).

## Typography

- **Inter** for Latin UI; **Noto Sans Sinhala** in stack for Sinhala script (same sizes/weights).
- **Display** — hero headlines only (one per page).
- **Headline** — section titles (Services, Featured vehicles).
- **Title** — vehicle card titles, FAQ questions.
- **Body / body-sm** — descriptions, specs lists, footer.
- **Price** — vehicle price or “Price on request” line; POA uses `{colors.price-muted}` weight via body-sm + label styling in implementation.
- Avoid all-caps except short labels (e.g. “NEW”, “FEATURED” badge).

## Layout & Spacing

- **Mobile-first**; content max-width **72rem** centered on large screens.
- **Gutters** — `{spacing.page-gutter-mobile}` / `{spacing.page-gutter-desktop}`.
- **Section vertical rhythm** — `{spacing.section-y}` between major home sections.
- **Catalogue** — responsive grid: 1 col (`<640px`), 2 col (`md`), 3 col (`lg`); **gap** `{spacing.catalogue-gap}`; grid `background` matches `{colors.background}`; partial last rows leave trailing space white.
- **Vehicle detail** — gallery full-width on mobile; specs + enquiry in a single column below; desktop two-column (gallery left, sticky summary card right on `lg+`).

## Elevation & Depth

- **No elevation language** in Stage 1: zero box-shadow on cards, headers, and dropdowns.
- **Hover** — border darkens (`{components.vehicle-card.hoverBorder}`) or text underline only; no lift, scale, or shadow.
- **Header** — sticky optional; **border-bottom only** on `{colors.border}`.
- **Modals** — flat panel, square corners, dim overlay flat `rgba(15, 23, 42, 0.5)` without blur gimmicks.

## Shapes

- **Containers** — `{rounded.container}` on vehicle cards, card images, hero media, gallery frames, service tiles, FAQ panels (subtle corner soften, not rounded-rectangle).
- **Controls** — `{rounded.sm}`–`{rounded.md}` on buttons and inputs; `{rounded.full}` only on small badges (Featured, Available).
- **Language switch** — **pill toggle** (`{components.lang-switch}`): grey track, white active segment, primary text on active (original pattern).
- **Logo** — `sga_small_logo.jpg` in header; max height **40px**, preserve aspect ratio; no CSS drop-shadow on the image.

## Components

### Site header

Logo left; nav center/right (collapses to **hamburger + drawer** on `<lg`). **Language switch** (`{components.lang-switch}`) always visible in header. CTA button **Contact** or **Browse** as `{components.button-secondary}`.

### Vehicle card

Image top `{components.vehicle-card.imageRatio}`; below: title, year • make • model line, 2–3 spec chips (fuel, transmission), price or POA, availability badge. Entire card clickable except explicit enquiry icon if present.

### Primary / secondary buttons

Min tap target **44px** height. Primary = crimson; secondary = navy outline. WhatsApp actions use primary style with optional WhatsApp icon (monochrome).

### Enquiry form (detail + contact)

Labels above fields; inline error text `{colors.error}`; helper text explains WhatsApp handoff honestly.

### FAQ

Accordion pattern: question `{typography.title}`; answer `{typography.body}`; dividers between items.

### Footer

**Flat light footer only** — white background, top border, navy text; **no** full-width navy gradient band in Stage 1. Columns: nav repeat, contact.

### Empty states

Neutral illustration optional; headline + one sentence + primary CTA to Contact / WhatsApp.

## Do's and Don'ts

| Do | Don't |
|----|--------|
| Let vehicle photography dominate color on catalogue pages | Grey page tints, gradients, or “card float” shadows |
| Use crimson for one primary action per viewport section | Paint entire sections red or blue |
| Micro-radius (`{rounded.container}`) on cards and media | Large corner radius (8px+) on vehicle tiles; sharp 0px clip on photos |
| Keep Sinhala and English typography equally readable | Shrink Sinhala below 16px body |
| Show logo crisply on white/near-white header | Apply CSS filters to the logo |
| Use honest microcopy for WhatsApp handoff | Imply “message saved” or CRM capture |
| Indicate unavailable content with subtle “English” fallback chip when Sinhala CMS field empty | Show broken squares or empty blocks |