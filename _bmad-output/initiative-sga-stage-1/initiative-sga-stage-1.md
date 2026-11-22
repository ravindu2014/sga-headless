---
type: initiative
title: Serendib Global Auto — Stage 1 Website
parent: none
status: in-progress
sources:
  - prd-sga-stage-1/prd-sga-stage-1.md
  - ux-sga-stage-1/DESIGN.md
  - ux-sga-stage-1/EXPERIENCE.md
  - architecture-sga-stage-1/architecture-sga-stage-1.md
  - sources/stage-1-input.md
companions:
  - ux-sga-stage-1/DESIGN.md
  - ux-sga-stage-1/EXPERIENCE.md
  - architecture-sga-stage-1/architecture-sga-stage-1.md
refined: true
risk: medium
---

# Serendib Global Auto — Stage 1 Website

## Description

Deliver a bilingual, static-exported public website for Serendib Global Auto: CMS-managed vehicles and pages, WhatsApp-first enquiry, and free-tier CI/hosting—per approved PRD, UX, and architecture.

## Outcome

Prospective buyers can browse stock and contact the business online; the owner updates content in Sanity without developers for routine publishing.

## Requirements

1. **R1 (SM-1, FR-1):** Core routes (Home, Vehicles, Vehicle detail, About, Services, FAQ, Contact) render responsively on mobile and desktop.
2. **R2 (FR-10–FR-17, SM-3):** Published vehicles appear in a catalogue with stable slug URLs, detail pages, Price on request when unset, and professional empty state.
3. **R3 (FR-7–FR-9, FR-18–FR-19, D-1, D-12):** Services and FAQ content matches agreed scope and is CMS-editable (EN/SI fields).
4. **R4 (FR-20–FR-24, SM-5, D-10):** English and Sinhala via `/[locale]/` routes, UI message files, and CMS fields with English fallback—no runtime MT.
5. **R5 (FR-25–FR-29, SM-4, RULE-4):** Enquiry opens WhatsApp/tel/mailto honestly; no server-side enquiry storage.
6. **R6 (FR-35–FR-42, SM-2):** Owner can publish vehicles and page content in Sanity (`n2zalqm8` / `production`) and see updates after build/deploy.
7. **R7 (FR-50–FR-55, SM-9):** SEO and accessibility baseline (metadata, sitemap, robots, canonical, semantic HTML, WCAG AA target).
8. **R8 (FR-60–FR-66, AD-1–AD-2):** Next.js static export, TypeScript, Tailwind, thin content layer—no SSR/API in Stage 1.
9. **R9 (FR-63, SM-6):** GitHub Actions runs install, lint, typecheck, production build on main.
10. **R10 (FR-64, FR-64a–b, D-11, AD-7):** Cloudflare Pages deploy path documented; auto-rebuild on Sanity publish plus manual rebuild available (production connect awaits owner approval).
11. **R11 (FR-4–FR-6, stage-1-input):** Contact details and digital-only address policy on site; legal footer omitted until OQ-5.
12. **R12 (AD-9, UX approved):** Visual implementation matches approved DESIGN.md and EXPERIENCE.md (flat layout, micro-radius containers, pill language switch, `sga_small_logo.jpg`).

## Constraints

1. **C1 (RULE-1, AD-1):** Static export only; no SSR, Server Actions, or API routes unless explicitly approved.
2. **C2 (RULE-2, SM-7):** Default infrastructure remains free-tier GitHub, Cloudflare Pages, Sanity Free.
3. **C3 (RULE-3):** No invented testimonials, awards, or misleading structured data.
4. **C4 (RULE-5, AD-6):** No Sanity write tokens in client or public git.
5. **C5 (RULE-6–7, D-10):** EN+SI only; no Tamil; no live CMS machine translation.
6. **C6 (RULE-S1, FR-65):** Secrets only in CI/host env—not committed.

## Done when

1. SM-1–SM-7 targets met on a staging or approved production URL at `serendibglobalauto.lk`.
2. Owner completes one full loop: publish vehicle in Sanity → site rebuild → vehicle visible and shareable.
3. CI green on `main`; deploy runbook exists in repo.
4. UX spot-check against DESIGN.md on Home, Vehicles, Detail (owner sign-off).
5. No open **OQ-5** blocker for launch (legal line may remain omitted by decision).

## Boundaries

- **Out:** inventory DB, CRM, Tamil, stored enquiries, production deploy without owner approval (FR-64).
- **Touch point:** Sanity hosted Studio — owner; epic `epic-sanity-studio`.
- **Touch point:** Cloudflare Pages / GitHub — epic `epic-deploy-ops`.
- **Tracer path:** foundation → sanity schemas → chrome/pages → vehicles → enquiry/SEO/deploy.

## References

- prd — `_bmad-output/initiative-sga-stage-1/prd-sga-stage-1/prd-sga-stage-1.md`
- design — `_bmad-output/initiative-sga-stage-1/ux-sga-stage-1/DESIGN.md`
- experience — `_bmad-output/initiative-sga-stage-1/ux-sga-stage-1/EXPERIENCE.md`
- architecture — `_bmad-output/initiative-sga-stage-1/architecture-sga-stage-1/architecture-sga-stage-1.md`

## Notes

- Open question: **OQ-5** — legal footer text (owner); does not block engineering.
- Decision: 2026-11-22 — UX approved; five-epic slice for Stage 1.