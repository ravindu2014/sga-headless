---
title: Serendib Global Auto — Stage 1 Website
template: prd
version: 1.1.0
status: final
created: "2026-11-22"
updated: "2026-11-22"
altitude: initiative
sources:
  - ../brief-sga-stage-1/brief-sga-stage-1.md
  - ../sources/stage-1-input.md
---

# Serendib Global Auto — Stage 1 Website

## Table of Contents

- [Document purpose](#document-purpose)
- [Vision](#vision)
- [Users and journeys](#users-and-journeys)
- [Glossary](#glossary)
- [Features and requirements](#features-and-requirements)
- [Rules](#rules)
- [Non-goals](#non-goals)
- [MVP scope](#mvp-scope)
- [Success metrics](#success-metrics)
- [Quality and constraints](#quality-and-constraints)
- [Experience and platform](#experience-and-platform)
- [Integrations and operations](#integrations-and-operations)
- [Data and compliance](#data-and-compliance)
- [Decisions](#decisions)
- [Open questions](#open-questions)

## Document purpose

**Audience:** product owner, UX, architecture, and implementation agents for initiative `sga-stage-1`.

**This PRD** states Stage 1 outcomes, user journeys, functional requirements, and constraints for a public marketing and vehicle catalogue site. It does not specify component APIs, Sanity schema field names, or deployment YAML—that belongs in architecture and epics.

**Inputs (canonical):**

| Artifact | Path |
|----------|------|
| Product brief | `_bmad-output/initiative-sga-stage-1/brief-sga-stage-1/brief-sga-stage-1.md` |
| Planning facts | `_bmad-output/initiative-sga-stage-1/sources/stage-1-input.md` |
| Brand logo | `assets/brand/SGA_Full_logo.jpg` |

**Downstream:** `bmad-ux` (visual and interaction spec), then `bmad-architecture`, then epic slicing by `bmad-agent-po`.

**Revisit:** After each epic lands, update this PRD to retire assumptions and close open questions.

## Vision

Serendib Global Auto will present a **trustworthy, bilingual (English and Sinhala) web presence** for a Sri Lankan vehicle import business. Visitors discover services and available stock, inspect vehicle details, and start a sales conversation—primarily via **WhatsApp**—without the business operating a custom inventory database in year one.

The site is **CMS-driven** (Sanity, project `n2zalqm8`), **static-exported** (Next.js), and deployed on **free-tier** GitHub + Cloudflare Pages infrastructure. The owner updates vehicles and copy in Sanity; production content reaches the public site through an agreed **build and publish** process.

## Users and journeys

**Primary users:** prospective vehicle buyers; business owner (content manager). **Secondary:** sales staff sharing links.

### UJ-1 — Discover and browse (Nimal, first-time visitor)

Nimal, 34, in Colombo, hears about SGA on Facebook and opens **https://serendibglobalauto.lk** on his phone. He lands on Home, sees featured vehicles and services overview, taps **Browse vehicles**, and scrolls the catalogue. He switches UI to **Sinhala**; page chrome and CMS-backed headings appear in Sinhala where translated. He taps a listing card and opens a vehicle detail page.

**Climax:** He can tell what the business does, what is for sale, and whether a unit is still available—without creating an account.

**Realizes:** FR-1–FR-6, FR-20–FR-24, FR-30–FR-32.

### UJ-2 — Enquire on a vehicle (Nimal, continued)

On the vehicle detail page, Nimal reads specs, gallery, and **Price on request** (no price set in CMS). He opens **Enquire**, enters his name and a short message; validation catches a blank name. He submits; the site opens **WhatsApp** to **+94719186125** with a pre-filled message including vehicle title and URL. He sends the chat manually.

**Climax:** Enquiry starts in WhatsApp with context—no false “saved to our system” message.

**Realizes:** FR-25–FR-29.

### UJ-3 — Understand import services (Sanduni, comparing dealers)

Sanduni, 28, researches import brokers. She opens **Services** and reads five offerings in order: auction bidding, export handling, import to Sri Lanka, customs clearance, delivery. She switches to English, then uses **Contact** for email and phone when she is not ready for WhatsApp.

**Realizes:** FR-7–FR-9, FR-33–FR-34.

### UJ-4 — Publish a listing (Owner, content manager)

The owner signs into **Sanity Studio**, creates a vehicle with title, make, model, year, specs, images, slug, availability, optional LKR price, featured flag, and English + Sinhala descriptions. They **publish**. After the site’s build/deploy pipeline runs, the vehicle appears in the catalogue and has a shareable URL.

**Climax:** Stock updates without a developer for routine listing changes.

**Realizes:** FR-35–FR-42, FR-50–FR-51.

### UJ-5 — Share a link (Staff)

Staff copies the vehicle detail URL from the address bar and pastes it into a customer WhatsApp chat. The customer opens the same static page.

**Realizes:** FR-22, FR-23.

## Glossary

| Term | Definition |
|------|------------|
| **Vehicle** | A CMS document representing one offered unit with identity, specs, media, availability, and optional price. |
| **Catalogue** | The vehicles listing page and its card grid/list. |
| **Publication** | Sanity content in `production` with published status, included in static build. |
| **Locale** | `en` (English) or `si` (Sinhala) UI and content variant. |
| **Price on request** | Display string when no numeric price is set (D-2). |
| **Enquiry** | User-initiated contact attempt via WhatsApp deep link or fallback channels—not persisted server-side in Stage 1. |
| **Static export** | HTML/JS/assets generated at build time; no SSR/API on origin in Stage 1. |
| **Featured vehicle** | Vehicle flagged in CMS for prominence on Home and/or catalogue ordering. |

## Features and requirements

Capabilities are ordered by dependency. Epics will likely align to these feature groups.

### F1 — Marketing pages (Home, About, Contact)

- **FR-1** A visitor can open **Home**, **About**, and **Contact** routes on mobile and desktop without horizontal scroll or broken layout.
- **FR-2** Home presents brand logo, primary CTA to catalogue, secondary CTA to contact, featured vehicles (when any), services summary, and trust-oriented CMS blocks (no fabricated testimonials or awards).
- **FR-3** About presents CMS-managed company information supplied by the owner.
- **FR-4** Contact shows WhatsApp **+94719186125**, phone **+94719186125**, email **serendibglobalauto@gmail.com**, and does **not** show a street address (D-3).
- **FR-5** Global header and footer appear on all public pages with navigation to Home, Vehicles, About, Services, Contact.
- **FR-6** Footer omits legal registration line until owner supplies text (OQ-5).

### F2 — Services

- **FR-7** Services page lists exactly five services in order (D-1): vehicle bidding on auction; exporting process handling; importing to Sri Lanka; custom clearance; delivery.
- **FR-8** Each service has CMS-managed title and description in **English and Sinhala** fields (or equivalent localization pattern).
- **FR-9** Agents do not invent detailed service claims beyond owner-provided CMS content.

### F3 — Vehicle catalogue and detail

- **FR-10** A visitor can open **Vehicles** and see all **published** vehicles with availability suitable for public display (unpublished or draft vehicles never appear).
- **FR-11** Each vehicle card shows at minimum: title, main image, key specs (year, make, model as configured), availability indicator, and price display per FR-12.
- **FR-12** When numeric price is absent, UI shows **Price on request** in the active locale; when LKR price is set, UI shows formatted LKR.
- **FR-13** Catalogue supports **simple filtering and/or sorting** only when implementable reliably on static client-side data (exact controls in UX); absence of filters is not a launch blocker.
- **FR-14** Each published vehicle has a **stable slug-based URL** for sharing.
- **FR-15** Vehicle detail shows image gallery, title, specifications, description, price rule (FR-12), availability, and enquiry CTA.
- **FR-16** Vehicle documents support CMS fields: title; make; model; year; mileage; transmission; fuel type; exterior colour; description; features/specifications; main image; gallery; availability status; featured flag; slug; optional LKR price.
- **FR-17** When catalogue has zero vehicles, Vehicles page shows a professional **empty state** with CTA to contact (A-5).

### F2b — FAQ

- **FR-18** A visitor can open **FAQ** with CMS-managed question and answer entries (OQ-8).
- **FR-19** Each FAQ item has English and Sinhala fields; missing Sinhala falls back to English per FR-23.
- **FR-19a** Launch FAQ copy is neutral owner-editable placeholders—not invented legal or customs guarantees.

### F4 — Internationalization (English + Sinhala)

- **FR-20** A visitor can switch between **English** and **Sinhala** via a persistent language control in the header (or equivalent accessible pattern).
- **FR-21** Switching language updates **UI chrome** (navigation, buttons, labels, validation messages) from app locale files and **CMS-backed** text from the matching locale field.
- **FR-22** Locale choice persists for the session (e.g. cookie or locale-prefixed path—architecture selects; both locales must be crawlable where SEO requires).
- **FR-23** When Sinhala content is missing for a CMS field, the site shows **English fallback** without broken layout; UX may indicate incomplete translation (A-7).
- **FR-24** Tamil is not offered in Stage 1 (D-4).
- **FR-24a** Stage 1 does **not** auto-translate CMS or page content via third-party machine-translation APIs at view time (D-10).

### F5 — Enquiry and contact actions

- **FR-25** Vehicle detail provides an enquiry action that collects at minimum name and message with client-side validation.
- **FR-26** Successful enquiry opens WhatsApp to **+94719186125** with a URL-encoded message including vehicle identifier/title and page URL when enquiring from detail.
- **FR-27** Contact page and vehicle enquiry copy state honestly that submission opens WhatsApp (or mailto/tel)—**no server-side storage** in Stage 1.
- **FR-28** Fallback **tel:** and **mailto:** links use configured phone and email (FR-4).
- **FR-29** Enquiry forms do not collect unnecessary sensitive data (e.g. national ID, card numbers).

### F6 — CMS (Sanity) and content administration

- **FR-35** Content types exist for site settings, navigation/footer, home, about, services, contact, **faq**, and vehicles as needed to satisfy FR-1–FR-19a.
- **FR-36** Owner can create, edit, unpublish, and delete vehicle documents in Sanity Studio without code changes.
- **FR-37** Owner can upload and replace vehicle images in Studio.
- **FR-38** Owner can mark vehicles featured and change availability and price fields.
- **FR-39** Localized strings for marketing and vehicle content are editable in Studio for English and Sinhala.
- **FR-40** Public site uses **read-only** access to published content; no write token in client or repository.
- **FR-41** Sanity project `n2zalqm8`, dataset `production`, hosted Studio on Sanity free tier.
- **FR-42** Initial Studio scaffold uses `clean` template per documented init command.

### F7 — SEO, accessibility, performance

- **FR-50** Each public route has unique title and meta description suitable for sharing.
- **FR-51** Open Graph tags reference canonical domain **serendibglobalauto.lk**.
- **FR-52** Site ships `sitemap.xml` and `robots.txt` appropriate for static export.
- **FR-53** Canonical URLs use **https://serendibglobalauto.lk** as base.
- **FR-54** Semantic HTML, keyboard-navigable header/footer, visible focus states, and alt text on informative images.
- **FR-55** Structured data only for factual, owner-provided information—no fake reviews or ratings.

### F8 — Engineering, CI, and deployment

- **FR-60** Codebase uses Next.js App Router, TypeScript, Tailwind CSS, static export compatible with Cloudflare Pages.
- **FR-61** Content fetch from Sanity occurs at **build time** wherever practical for vehicle routes and pages.
- **FR-62** Static vehicle detail routes are generated from published Sanity slugs.
- **FR-63** GitHub Actions on main runs install, lint, typecheck, and production build.
- **FR-64** Deployment target is Cloudflare Pages free tier; production deploy requires **explicit product owner approval** until configured.
- **FR-64a** **Auto-rebuild** runs when Sanity content is published (webhook or equivalent triggering CI/build).
- **FR-64b** **Manual rebuild/deploy** remains available (e.g. GitHub Actions workflow_dispatch or Cloudflare retry) for owner or developer use (D-11).
- **FR-65** Public repository must not commit secrets (`.env`, tokens); use GitHub/Cloudflare env configuration.
- **FR-66** Content access is behind a thin module boundary so UI components are not coupled to raw GROQ throughout (future portability).

## Rules

- **RULE-1** Stage 1 delivery is **static-first**: no SSR, Server Actions, or Next.js API routes unless product owner explicitly approves and cost implications are documented.
- **RULE-2** **$0 recurring** is the default for GitHub, Cloudflare Pages, and Sanity free tiers; paid services require prior approval with limits stated.
- **RULE-3** No **invented** company history, certifications, testimonials, awards, or misleading structured data.
- **RULE-4** Enquiry UX must **not** imply database persistence or automated CRM follow-up in Stage 1.
- **RULE-5** **No Sanity write tokens** in client bundles or public git history.
- **RULE-6** Bilingual requirement is **English + Sinhala only** for Stage 1.
- **RULE-7** **No live machine translation** of CMS body content in Stage 1; Sinhala is authored or falls back to English (D-10).

## Non-goals

- Inventory database, enquiry CRM, authenticated customers, payments, auctions on-site.
- Custom admin dashboard beyond Sanity Studio.
- Cloudflare D1/R2/Workers backend, dynamic inventory sync, document vaults (Stage 2+).
- Tamil or additional locales.
- Server-side form endpoints or paid form SaaS without approval.
- Physical address on public site until owner opts in.
- Complex catalogue rules engines, finance calculators, or live auction integration.

## MVP scope

**In scope:** FR-1–FR-66 and FR-64a/b; seven public page types (Home, Vehicles, Vehicle detail, About, Services, **FAQ**, Contact); EN/SI; WhatsApp enquiry; Sanity CMS; auto + manual rebuild; CI; architecture for Cloudflare deploy.

**Out of scope (Stage 1, with reason):**

| Item | Reason |
|------|--------|
| Legal footer line | OQ-5 deferred |
| Production deploy toggle | Awaits owner approval (FR-64) |
| Advanced catalogue filters | Only if simple static implementation is reliable |
| Stored enquiries | Cost and privacy scope; WhatsApp-first |

**Deferred to Stage 2+:** enquiry management, true inventory workflows, image CDN migration off Sanity CDN limits if hit, Tamil.

## Success metrics

| ID | Metric | Target | Validates |
|----|--------|--------|-----------|
| SM-1 | Core routes render on mobile + desktop | 100% pass manual responsive check | FR-1, FR-10 |
| SM-2 | Owner publish-to-site cycle | Documented path works end-to-end once | FR-36, FR-61 |
| SM-3 | Vehicle share URL stability | Slug URL opens correct detail after publish | FR-14, UJ-5 |
| SM-4 | WhatsApp enquiry with vehicle context | Works on iOS and Android major browsers | FR-26 |
| SM-5 | Language switch | EN↔SI on Home, Services, Vehicles, Detail without layout break | FR-20–FR-23 |
| SM-6 | CI green on main | Build job passes | FR-63 |
| SM-7 | Recurring infra cost | $0 on agreed free tiers at launch | RULE-2 |
| SM-8 | Lighthouse (mobile) performance | Performance ≥ 85 on Home and Vehicle detail (representative content) | FR-54, RULE performance |
| SM-9 | SEO artefacts present | sitemap, robots, canonical, OG | FR-50–FR-53 |

**Counter-metrics:** SM-8 must not be achieved by stripping necessary images or accessibility affordances.

## Quality and constraints

- **RULE-P1** Largest Contentful Paint on Home and Vehicle detail should target **&lt; 2.5s** on mid-tier mobile on 4G lab conditions where achievable with image sizing and static export.
- **RULE-P2** Vehicle images use responsive sizing and modern formats where the stack supports them without paid image SaaS.
- **RULE-S1** Dependency and secret scanning in CI where practical; no credentials in repo.
- **RULE-S2** Enquiry forms expose only data user voluntarily sends to WhatsApp/third-party client.
- **RULE-A1** Navigation and language switch operable by keyboard; colour contrast meets **WCAG 2.1 AA** for text and interactive elements (UX verifies against brand palette).
- **RULE-C1** Document free-tier limits for Sanity API bandwidth, Cloudflare build minutes, and GitHub Actions for public repos; escalate if approached.

## Experience and platform

- **Platform:** responsive web; primary mobile use (WhatsApp ecosystem).
- **Brand:** use supplied logo; flat UI contrasting glossy logo; navy/crimson palette from brand discovery in UX—not reimplemented here.
- **Tone:** professional, trustworthy, modern import dealer—no hype claims without CMS source.
- **Information architecture:** Home → Vehicles → Detail; Services and About for education; Contact for alternatives to WhatsApp.
- **CTA hierarchy:** browse vehicles (primary), contact/enquire (secondary), per `bmad-ux` spec.
- **Empty/error states:** defined in UX for no vehicles, failed image load, missing translation fallback.

## Integrations and operations

| System | Role |
|--------|------|
| **Sanity** (`n2zalqm8` / `production`) | Source of truth for content and vehicles; hosted Studio |
| **GitHub** | Public repo, Actions CI |
| **Cloudflare Pages** | Static hosting for Next export |

**Operations:** **Both** Sanity-triggered auto-rebuild on publish **and** manual rebuild/deploy path (D-11). Owner training: publish in Sanity → site updates after build (usually automatic); manual path for recovery or urgent redeploys.

## Data and compliance

- **Personal data:** enquiry name/message leaves the browser via WhatsApp/user agent—not stored on SGA infrastructure in Stage 1.
- **Retention:** no server-side enquiry retention.
- **Cookies:** locale persistence only if used; disclose in privacy copy when owner provides policy text (placeholder acceptable at launch if owner approves).
- **Accuracy:** vehicle availability and pricing disclaimers are owner-maintained in CMS.

## Decisions

| ID | Decision | Notes |
|----|----------|-------|
| D-1–D-5 | From brief | Services list, POA pricing, digital contact, EN+SI, legal footer deferred |
| D-6 | WhatsApp-first enquiry | Beats paid form backend for Stage 1 cost and honesty |
| D-7 | Sanity existing project | Reuse `n2zalqm8` rather than new project |
| D-8 | Sinhala fallback to English | Balances A-7 partial translation at launch |
| D-9 | Locale mechanism | Left to architecture (path prefix vs cookie) with SEO constraints in FR-22 |
| D-10 | **Two-layer Sinhala (OQ-6)** | **UI:** Sinhala strings ship in the app (locale files)—not auto-translated at runtime. **CMS:** owner enters English + Sinhala per field; empty Sinhala → English fallback. No MT API in Stage 1. |
| D-11 | **Dual deploy trigger (OQ-7)** | Auto-rebuild on Sanity publish **and** manual rebuild/deploy always available |
| D-12 | **FAQ in Stage 1 (OQ-8)** | Include FAQ page; CMS Q&A; neutral placeholders; reduces repeat WhatsApp questions on import basics |

## Open questions

| ID | Question | Owner | Blocks |
|----|----------|-------|--------|
| OQ-5 | Legal entity / registration footer text | Product owner | FR-6 only |

## Localization model (reference)

| Content type | English | Sinhala | Who maintains |
|--------------|---------|---------|----------------|
| Nav, buttons, form errors, empty states | App locale file | App locale file | Development team (professional Sinhala UI copy in repo) |
| Home, About, Services, FAQ, vehicles | CMS `en` field | CMS `si` field (optional) | **Owner in Sanity Studio** |
| Missing `si` in CMS | Shown | Falls back to `en` | Automatic (FR-23) |