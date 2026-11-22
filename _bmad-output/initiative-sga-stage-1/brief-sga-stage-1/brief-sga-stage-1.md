---
title: Serendib Global Auto — Stage 1 Website
template: brief
version: 1.1.0
status: final
created: "2025-11-22"
updated: "2026-11-22"
sources:
  - ../sources/stage-1-input.md
  - ../../initiative-sga-stage-1/.memlog.md
---

# Serendib Global Auto — Stage 1 Website

## Table of Contents

- [Executive summary](#executive-summary) — Stage 1 web presence, CMS, zero recurring cost target
- [Problem](#problem) — trust, discovery, enquiry friction without a proper site
- [Solution](#solution) — static marketing site + vehicle catalogue + WhatsApp enquiry
- [What makes it different](#what-makes-it-different) — owner-managed Sanity, no fake backend
- [Who it serves](#who-it-serves) — buyers, business owner, staff
- [Success criteria](#success-criteria) — measurable Stage 1 outcomes
- [Scope](#scope) — in/out boundary for Stage 1
- [Vision](#vision) — later inventory platform (not built now)
- [Decisions](#decisions) — product owner answers (2026-11-22)
- [Assumptions](#assumptions) — remaining items
- [Open questions](#open-questions) — deferred only

## Executive summary

Serendib Global Auto needs a professional public website that builds trust, showcases vehicles available for import and sale, and makes it easy for interested buyers to enquire—without committing to a costly inventory system in the first year.

Stage 1 is a responsive, production-ready marketing site at **https://serendibglobalauto.lk**, backed by **Sanity CMS** so the business owner can add and update vehicles, prices, and page content without developer help. The site will be built as a **static Next.js export**, deployed on **Cloudflare Pages** with **GitHub Actions** CI, targeting **$0 recurring** infrastructure on free tiers.

Enquiries will use validated forms that open **WhatsApp** with a pre-filled message, plus visible **email and phone** fallbacks. The site will support **English and Sinhala** in Stage 1. We will not claim to store enquiries in a database or invent company achievements the business has not provided.

## Problem

**Potential vehicle buyers** in Sri Lanka (and overseas Sri Lankan buyers) researching imports need to judge whether Serendib Global Auto is legitimate, see what is actually available, and start a conversation quickly. Without a focused website they rely on scattered social posts, word of mouth, or generic directories—slow, hard to compare stock, and weak on trust signals.

**The business owner** needs to present a consistent brand and update listings without paying for custom admin software or expensive hosting. Manually sending photos and specs on WhatsApp for every lead does not scale and makes the operation look informal compared to established dealers.

**Cost of the status quo:** missed enquiries when stock is invisible online, time lost repeating the same answers, and weaker credibility versus competitors who already publish inventory on the web.

*[ASSUMPTION: the owner has observed lost or delayed leads due to lack of a central catalogue; evidence would be enquiry logs or stated lead volume after launch.]*

## Solution

A **company website** that:

1. **Establishes trust** — professional home page, about and services content, real contact details, brand-aligned design using the supplied logo.
2. **Publishes a vehicle catalogue** — listing cards and detail pages driven by published Sanity content (make, model, year, specs, images, price or **price on request** when unset, availability, featured flag).
3. **Explains the import journey** — Services covering auction bidding, export handling, import to Sri Lanka, customs clearance, and delivery (owner-editable in CMS).
4. **Converts interest to contact** — prominent browse and contact CTAs; vehicle detail pages with enquiry actions; WhatsApp deep link to **+94719186125**, email **serendibglobalauto@gmail.com**, phone **+94719186125** (digital contact only—no street address on site for now).
5. **Stays maintainable** — content and vehicles edited in **Sanity hosted Studio** (project `n2zalqm8`, dataset `production`); site rebuilds from Git when content or code changes.

The experience is intentionally **static-first**: fast pages, inexpensive hosting, honest enquiry flow (no false “message sent to our CRM” messaging).

## What makes it different

| Alternative | Limitation for Stage 1 | Stage 1 choice |
|-------------|------------------------|----------------|
| Social media only | No structured catalogue, weak SEO, fragmented stock | Dedicated catalogue + SEO pages |
| Custom inventory / ERP now | Cost and complexity beyond year 1–2 needs | CMS-managed listings only |
| WordPress + plugins | Hosting, security, plugin sprawl | Static Next.js + Sanity |
| Form backend (paid SaaS) | Recurring cost, privacy scope | WhatsApp + public contact details |
| Competing dealer sites | Not owned brand story | Owner-controlled Sanity content |

The honest differentiator is not a proprietary algorithm—it is **credible presentation plus owner-controlled updates at near-zero run cost**, with a clear path to a richer platform later without throwing away the site.

## Who it serves

**Primary — prospective buyers**  
Individuals (and businesses) shopping for imported or available vehicles. They need to scan stock, read specifications, see photos, understand services, and contact the business on their preferred channel (especially WhatsApp in Sri Lanka).

**Primary — business owner / content manager**  
Updates vehicles, images, prices, availability, featured listings, and core page copy in Sanity without code changes for routine work.

**Secondary — staff assisting sales**  
Can share canonical vehicle URLs from the site instead of re-sending media bundles.

**Out of scope personas for Stage 1** — finance underwriters, customs agents, or internal warehouse staff; the site does not run their workflows yet.

## Success criteria

Criteria are checkable after launch (within ~90 days of go-live unless noted).

| ID | Criterion |
|----|-----------|
| SC-1 | Public site serves **Home, Vehicles, Vehicle detail, About, Services, Contact** on desktop and mobile without layout breakage. |
| SC-2 | Owner can **create, edit, unpublish** a vehicle in Sanity and see the change reflected on the site after the agreed build/deploy process. |
| SC-3 | Each published vehicle has a **stable URL** (slug-based) suitable for sharing on WhatsApp. |
| SC-4 | Vehicle enquiry flow **validates input** and opens WhatsApp with a **pre-filled message** including vehicle context when enquiring from a detail page. |
| SC-5 | **Contact details** on site match configured values: WhatsApp/phone **+94719186125**, email **serendibglobalauto@gmail.com**. |
| SC-6 | **Recurring infrastructure cost** for agreed stack remains **$0** on free tiers (GitHub public, Cloudflare Pages, Sanity Free) absent explicit approval of paid services. |
| SC-7 | CI on the main branch runs **install, lint, typecheck, production build** successfully. |
| SC-8 | Basic SEO artefacts present: page titles/descriptions, Open Graph, sitemap, robots.txt, canonical base **serendibglobalauto.lk**. |
| SC-9 | Visitor can switch **English ↔ Sinhala** for core marketing and vehicle content; untranslated CMS fields fall back gracefully (exact pattern in PRD/architecture). |
| SC-10 | Vehicles and catalogue UI show **Price on request** when no numeric price is set in CMS. |

**Stop / revisit signals:** If free-tier limits block builds or CMS usage, or enquiry volume justifies stored leads, revisit architecture in a **Stage 2** decision—not by silent scope creep in Stage 1.

## Scope

### In scope (Stage 1)

- Pages: **Home, Vehicles (catalogue), Vehicle detail, About, Services, Contact**; FAQ only if UX/PRD shows clear value.
- Sanity schemas for **site settings, home, about, services, vehicles, contact/navigation** as needed for owner self-service.
- Static generation of vehicle routes from **published** Sanity content.
- Simple catalogue **filter/sort** only where reliable on static data (no over-engineering).
- **WhatsApp-first enquiry** with email/phone fallbacks; contact values configurable via CMS and/or env.
- Brand use of **`assets/brand/SGA_Full_logo.jpg`**; UX to define flat UI palette derived from navy/crimson logo colours.
- **GitHub Actions** validation; **Cloudflare Pages** deployment approach documented and wired when owner approves production deploy.
- Accessibility and performance baseline: semantic HTML, keyboard-friendly nav, image alt text, responsive layout.
- **No invented** testimonials, certifications, awards, or structured data the business has not supplied.
- **Bilingual UI: English + Sinhala** (language switcher; localized CMS fields or equivalent—defined in architecture).
- **Services** content for: vehicle bidding on auction; exporting process handling; importing to Sri Lanka; custom clearance; delivery.

### Explicitly out of scope (Stage 1)

- Database-backed inventory, enquiry CRM, user accounts, payments.
- Custom admin dashboard (Sanity Studio is the admin).
- Server-side form submission, API routes, SSR, Server Actions, paid Workers (unless explicitly approved).
- Cloudflare D1/R2/Workers inventory features.
- **Tamil** (and languages beyond English + Sinhala) unless later approved.
- **Physical street address** on the public site (digital contact only for now).
- **Legal entity / registration footer line** until owner provides exact text.

### Stage 2+ parking lot (inform vision, not committed)

Dynamic inventory, enquiry management, image/document storage on R2, D1, Workers APIs—only after Stage 1 proves the content model and traffic patterns.

## Vision

If Stage 1 succeeds, Serendib Global Auto has a trusted digital storefront and a **content model** that can grow into a true inventory platform: live stock status, enquiry pipeline, document storage for import paperwork, and staff workflows—likely on Cloudflare data services—without replacing the public site wholesale.

That progression is **conditional** on business volume and budget; Stage 1 deliberately avoids building it prematurely.

## Decisions

Product owner answers recorded **2026-11-22** (supersedes prior assumptions where noted).

| ID | Decision |
|----|----------|
| D-1 | **Services** (in order): (1) Vehicle bidding on auction, (2) Exporting process handling, (3) Importing to Sri Lanka, (4) Custom clearance, (5) Delivery. |
| D-2 | When vehicle price is not set in CMS, display **Price on request** (listed LKR price still allowed when provided). |
| D-3 | **Contact: digital only** — no physical address on site for now. |
| D-4 | **Languages in Stage 1: English + Sinhala** (not Tamil in Stage 1). |
| D-5 | **Legal footer line:** not required yet; omit until owner supplies exact text. |

## Assumptions

| ID | Assumption | Affects |
|----|------------|---------|
| A-3 | Detailed service descriptions are owner/CMS content; agents supply structure and placeholders only | Services page |
| A-5 | Launch may start with zero or few vehicles; empty states must still look professional | Catalogue UX |
| A-6 | Same number used for WhatsApp and voice is intentional | Contact, enquiry copy |
| A-7 | Owner will provide or approve Sinhala translations for CMS-managed copy (or accept launch with partial Sinhala until filled) | i18n, content workflow |

## Open questions

| ID | Question | Owner action |
|----|----------|--------------|
| OQ-5 | Legal entity name or registration line in footer | Provide exact text when ready (deferred) |