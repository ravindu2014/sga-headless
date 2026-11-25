---
status: epic-a-b-and-c-implemented
date: 2026-11-25
benchmark: https://collectingcars.com/
constraint: no application code until an epic/story is approved
---

# UX revamp — mini-PRD and implementation plan (review)

## Product truth (codebase today)

Stage 1 is a **static Next.js export** of a **Sanity vehicle catalogue**. Buyers browse, filter client-side, and **enquire on WhatsApp**. There is **no** bid engine, live auction clock, chassis code, auction grade, or categorized gallery.

| Capability | Today | Revamp ask |
|------------|--------|------------|
| Routes | Home, Vehicles, Detail, Services, About, FAQ, Contact (`src/app/[locale]/`) | Same routes |
| Nav | Text links, color-only active state (`SiteHeader.tsx`) | High-contrast strap, labels + icons |
| Cards | Whole card is the link; year/make/model, fuel, transmission, LKR or POA (`VehicleCard.tsx`) | Explicit CTAs, mileage, engine CC |
| Filters | Make, fuel, transmission; hidden until options exist (`VehicleCatalog.tsx`) | Always-visible Make, Model, Year, Budget |
| Detail | One gallery + spec list + WhatsApp (`vehicles/[slug]/page.tsx`, `VehicleEnquiry.tsx`) | Tabs, spec matrix, sticky inquire/bid |
| CMS fields | title, slug, make, model, year, mileage, transmission, fuel, colour, images, availability, featured, priceLkr (`studio/schemaTypes/documents/vehicle.ts`) | Chassis, grade, auction grade, engine CC, gallery categories, auction status — **not in schema** |

**UX rule for this revamp:** Collecting Cars structure and contrast, **without** hiding controls. **Do not invent bidding** until a later epic adds schema and a real action. Until then, the second CTA stays **View details** / **WhatsApp**, not **Place Bid**.

Approved Stage 1 tokens stay the brand: navy `#0F3D7A`, crimson `#C41E3A`, flat UI, micro-radius containers (`_bmad-output/.../DESIGN.md`, `tailwind.config.ts`). Polish is contrast, labels, and scan order — not a new palette.

## Mini-PRD — UX rules

1. **Nav strap.** Sticky bar with a distinct fill (navy or bordered white + navy underline). Every item has a visible label. Icons are supplementary. Active item uses underline or pill, not color alone. Mobile keeps the drawer but shows the same labels.
2. **Listing cards.** Fixed 4:3 photo. Badge uses existing availability (`available` / `sold` / `unavailable`) plus optional `featured`. Show **year, mileage (km) when present, transmission, price in LKR or “Price on request”**. Primary button **View details**. Do not add **Place Bid** until bidding exists.
3. **Vehicle detail.** Keep gallery + sticky enquiry. Group specs in a two-column definition list using fields we already have (year, make, model, mileage, transmission, fuel, colour). Gallery tabs (`Exterior` / `Interior` / `Auction sheet`) and chassis/grade rows wait on CMS fields.
4. **Filters.** Always show labeled controls: Make, Model, Year, and a Budget band derived from `priceLkr` (including “Price on request”). **Reset** clears all. Filtering stays client-side on the static page — no new API.

## Epics and stories

### Epic A — Navigation shell (do first)

| ID | Story | AC | Files |
|----|--------|----|--------|
| A1 | Contrast nav strap | Given desktop, the primary nav sits on a strap that is visually separate from the page; active route has underline or filled pill plus text | `src/components/layout/SiteHeader.tsx`, `src/app/globals.css` or `tailwind.config.ts` if a `nav-strap` token is added |
| A2 | Labels stay primary | Icons may appear; removing icons still leaves understandable labels (EN + SI message keys) | `SiteHeader.tsx`, `src/messages/en.json`, `src/messages/si.json`, `MobileNav.tsx` |

### Epic B — Discovery (cards + filters)

| ID | Story | AC | Files |
|----|--------|----|--------|
| B1 | Scan line on the card | Card shows year, mileage when set, transmission, and LKR/POA without opening the detail page | `VehicleCard.tsx`; pass `mileage` on `VehicleSummaryDto` in `src/content/types.ts` and `mapVehicleSummary` in `vehicles.ts` (data mapping only, same GROQ fields) |
| B2 | Explicit View details | Card image/title still link; a visible button says View details and goes to the same slug. No Place Bid | `VehicleCard.tsx`, `VehicleCatalog.tsx` |
| B3 | Always-on filters | Make, Model, Year, Budget, and Reset are visible even with one vehicle. Empty result uses existing empty copy | `VehicleCatalog.tsx`, `vehicles/page.tsx`, message keys under `vehicles` |

### Epic C — Detail clarity (existing data only)

| ID | Story | AC | Files |
|----|--------|----|--------|
| C1 | Spec matrix | Specs render as a two-column list a non-technical reader can scan; missing values are omitted, not blank rows | `src/app/[locale]/vehicles/[slug]/page.tsx` |
| C2 | Sticky enquire | On large screens the WhatsApp box stays in view while the gallery scrolls; copy still says the site does not store the enquiry | `VehicleEnquiry.tsx`, detail page layout (already `lg:sticky`) |

### Epic D — Deferred (needs a product decision + Sanity schema)

Not in the first implementation wave.

| ID | Story | Why deferred |
|----|--------|----------------|
| D1 | `LIVE AUCTION` badge and Place Bid | No auction status or bid endpoint |
| D2 | Gallery tabs Exterior / Interior / Auction sheet | Gallery images have no category |
| D3 | Chassis code, grade, auction grade, engine CC | Fields absent from `vehicle.ts` schema and GROQ |

## Phase 2 — file plan (no behaviour change to deploy or Sanity fetch)

| Change | Touch | Leave alone |
|--------|--------|-------------|
| Nav | `SiteHeader.tsx`, `MobileNav.tsx`, nav strings | Routing in `src/i18n/routing.ts`, pages |
| Cards | `VehicleCard.tsx`, summary DTO + mapper for mileage | `generateStaticParams`, webhook, `rebuild.yml` |
| Filters | `VehicleCatalog.tsx` client state only | Sanity queries except adding mileage to the summary mapper |
| Detail | `[slug]/page.tsx` markup/order | `VehicleEnquiry` validation and `wa.me` URL shape |
| Tokens | Optional `nav-strap` background in `tailwind.config.ts` using existing navy | Do not introduce gradients or card shadows (current DESIGN.md) |

**Suggested first story after approval:** **A1 + A2** (navigation), then **B3** (filters), then **B1–B2**, then **C1–C2**. Epic D only after you confirm auction scope.

## Approval

Reply with the epic or story id to implement (for example `A1` or `Epic B`). No application code until then.
