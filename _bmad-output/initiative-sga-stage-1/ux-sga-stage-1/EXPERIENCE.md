---
name: Serendib Global Auto — Experience
status: final
created: "2026-11-22"
updated: "2026-11-22"
sources:
  - DESIGN.md
  - ../prd-sga-stage-1/prd-sga-stage-1.md
---

# Serendib Global Auto — Experience Spine (Stage 1)

## Foundation

Responsive **mobile-first web** (Next.js static export, Tailwind). No native app. Primary context: Sri Lankan buyers on **phone**, often continuing in **WhatsApp**.

Visual identity: `DESIGN.md` (`{colors.primary}`, `{colors.accent}`, typography stack with Noto Sans Sinhala).

**Locales:** `en` and `si`. URL pattern **`/{locale}/...`** (e.g. `/en/vehicles`, `/si/vehicles`) for crawlable static routes. Default locale **`en`**; redirect `/` → `/en` or locale picker—architecture chooses; UX requires both prefixes work.

**Content layers (D-10):** UI strings from app locale files; CMS body from Sanity per locale; missing `si` → show `en` with optional **“English”** fallback chip on that block only (not page-level alarm).

## Information Architecture

| Surface | Route (pattern) | Purpose |
|---------|-----------------|---------|
| Home | `/{locale}` | Hero, featured vehicles, services teaser, trust CTAs |
| Vehicles | `/{locale}/vehicles` | Catalogue grid, light filter/sort |
| Vehicle detail | `/{locale}/vehicles/{slug}` | Gallery, specs, price/POA, enquire |
| Services | `/{locale}/services` | Five services (D-1) in order |
| About | `/{locale}/about` | Company story (CMS) |
| FAQ | `/{locale}/faq` | CMS Q&A accordion |
| Contact | `/{locale}/contact` | Channels + short form → WhatsApp optional |

**Global chrome:** header (nav + lang), footer (nav, contact, no street address).

**Nav order:** Home · Vehicles · Services · About · FAQ · Contact.

→ Visual reference: `mockups/home.html` (hero + featured strip). Spines win on conflict.

## Voice and Tone

Aesthetic posture lives in `DESIGN.md`. Microcopy is **professional, clear, warm—not salesy**.

| Do | Don't |
|----|--------|
| “Price on request” / “මිල විමසීමට” | “Amazing deal!” |
| “Opens WhatsApp with your message” | “Submit” implying server save |
| “Available” / “Sold” from CMS status | Fake urgency timers |
| Short sentences in Sinhala UI files | Machine-translated import jargon without owner review |

## Component Patterns

| Pattern | Where | Behavior |
|---------|-------|----------|
| Language switch | Header | **Pill toggle** (`{components.lang-switch}`); `en` ↔ `si`; preserves path slug; persists choice when architecture uses cookie/locale storage |
| Vehicle card | Home, catalogue | **Micro-radius** (`{rounded.container}`) image + frame; **1.5rem gap** on white field; per-card border; hover = border only, no shadow |
| Filter bar | Catalogue | Optional chips: make, fuel, transmission, availability—static client filter only |
| Sort control | Catalogue | e.g. newest / price—if data supports; else omit |
| Enquiry panel | Vehicle detail | Name + message required; phone optional; CTA opens WhatsApp with encoded body |
| Contact channels | Contact, footer | `tel:`, `mailto:`, WhatsApp deep link |
| FAQ accordion | FAQ | One section open at a time on mobile; allow multiple on desktop optional |
| Featured strip | Home | Horizontal scroll on mobile, grid on desktop |
| CMS rich text | About, Services | Prose width max ~65ch |

## State Patterns

| State | Surface | Treatment |
|-------|---------|-----------|
| Catalogue empty | Vehicles | Headline + explain import-on-request + CTA Contact |
| No featured vehicles | Home | Hide strip or show “Browse all” only |
| Image load fail | Vehicle detail | Neutral placeholder + alt text from CMS |
| Sinhala missing | Any CMS block | Show English; optional small “English” chip |
| Form invalid | Enquiry | Inline errors; focus first error |
| Sold vehicle | Detail | Badge + enquiry still allowed if owner keeps publish (owner policy); default hide from catalogue if status sold |
| Filter no results | Vehicles | Clear filters CTA |

## Interaction Primitives

- **Tap/click** primary navigation pattern (no keyboard shortcuts required).
- **Focus visible** on all interactive elements `{colors.focus-ring}`.
- **Smooth scroll** to enquiry section from sticky “Enquire” on detail (mobile).
- **External links** — WhatsApp, tel, mailto open in system handlers; no in-app browser assumptions.
- **Banned:** fake chat widgets, auto-playing video heroes, cookie walls before content, infinite scroll catalogue, **gradients**, **card drop shadows**, **large** corner radius on vehicle/hero media (keep `{rounded.container}` only).

## Accessibility Floor

- WCAG **2.1 AA** target; contrast verified for navy/crimson on white (crimson buttons: white text only).
- Skip link “Skip to main content”.
- Language switch exposes `lang` attribute on `<html>` per route.
- Gallery: keyboard operable next/prev; images have CMS alt text (required in Studio).
- Form errors linked with `aria-describedby`.
- Reduced motion: no mandatory parallax; respect `prefers-reduced-motion`.

## Responsive & Platform

| Breakpoint | Behavior |
|------------|----------|
| `< md` | Hamburger nav; single-column catalogue; sticky bottom bar on vehicle detail optional (Enquire + WhatsApp) |
| `md–lg` | 2-col catalogue; full nav may wrap |
| `≥ lg` | Full horizontal nav; vehicle detail 2-col; footer multi-column |

Touch targets ≥ **44×44px**. Test on iOS Safari and Chrome Android for WhatsApp handoff.

## Inspiration & Anti-patterns

- **Reference (tone, not copy):** modern OEM/dealer sites—large photography, generous whitespace, spec tables.
- **Reject:** dark-only “luxury” theme (hurts outdoor mobile readability); spinning globe loaders; comparison with fake competitor prices; testimonial carousel unless owner supplies quotes.
- **Reject:** cluttering home with every service icon—use one Services section + CTA.

## Internationalization (product-specific)

| Content | Source |
|---------|--------|
| Nav labels, buttons, validation | `messages/en.json`, `messages/si.json` |
| Page & vehicle body | Sanity `en` / `si` fields |
| Price POA string | Localized in JSON |
| WhatsApp prefill | Bilingual template strings; vehicle title in active locale |

Switching language does not auto-translate user-typed enquiry text.

## Key Flows

### Flow 1 — Nimal browses on mobile (UJ-1)

1. Nimal opens `/si` from a Facebook link.
2. Home loads: hero headline (Sinhala UI), **Browse vehicles** crimson CTA.
3. He scrolls featured vehicles; taps a card → `/si/vehicles/{slug}`.
4. **Climax:** Specs and photos answer “is this real stock?” without login.
5. Missing Sinhala description shows English with small chip; he switches to English if preferred.

### Flow 2 — Nimal enquires (UJ-2)

1. On detail, taps **Enquire**.
2. Enters name; leaves message blank → inline error.
3. Fills message; taps **Continue in WhatsApp**.
4. **Climax:** WhatsApp opens with vehicle title + URL in body; banner had said message is not stored on site.
5. He sends chat manually.

### Flow 3 — Sanduni reads services (UJ-3)

1. `/en/services` — five blocks in D-1 order with icons optional (simple numbered list acceptable).
2. FAQ linked at bottom for process questions.
3. Contact for email if not ready for WhatsApp.

### Flow 4 — Owner publishes (UJ-4)

*(Studio UX is Sanity default; public site behavior only.)*
After publish, auto-rebuild updates site within documented SLA; owner can trigger manual rebuild if impatient.

## Page layout notes (for implementation)

### Home

1. Hero: headline + sub + primary CTA catalogue + secondary contact  
2. Featured vehicles (0–6)  
3. Services summary (5 titles) + link  
4. Trust band: contact channels (no fake stats)  
5. Final CTA band

### Vehicle detail

Gallery → title → price/POA → availability → spec grid → description → features list → enquiry panel → related optional (omit if no data)

### Services

Intro paragraph → five service sections (anchor nav optional on desktop)

### FAQ

Accordion list; link to Contact for unanswered questions

### Contact

Phone, email, WhatsApp cards + minimal form mirroring enquiry rules

## Open items (non-blocking)

- Sticky mobile enquiry bar yes/no during build (recommended yes).
- Footer **light flat only** per `DESIGN.md` (revised).
- Privacy policy page—add when owner provides text (not in Stage 1 FR set unless requested).