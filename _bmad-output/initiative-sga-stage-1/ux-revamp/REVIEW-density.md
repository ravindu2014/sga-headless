---
status: epic-1-and-2-density-implemented
date: 2026-11-25
constraint: no application code until an epic is approved
benchmark: https://collectingcars.com/
supersedes-spacing: DESIGN.md section-y, catalogue-gap, and 3-column catalogue if this plan is approved. Brand colours stay.
---

# Full-site density and micro-UI plan (review)

## What this app actually contains

Public site only. Locales `/en` and `/si`. No auth, admin, bid flow, or modal. Sanity Studio (`studio/`) is the owner CMS and is **out of this revamp**.

| Route | File | Shared pieces |
|-------|------|----------------|
| `/` | `src/app/[locale]/page.tsx` | `MarketingHero`, `VehicleCard` → `VehicleSummaryCard` |
| `/vehicles` | `vehicles/page.tsx` | `VehicleCatalog`, `VehicleSummaryCard` |
| `/vehicles/[slug]` | `vehicles/[slug]/page.tsx` | `VehicleEnquiry`, spec grid |
| `/about` `/services` `/faq` `/contact` | matching `page.tsx` | `MarketingHero`, `FaqAccordion`, contact tiles |
| Any unknown path | `src/app/not-found.tsx` | none (unstyled shell) |
| Every page | `SiteShell` | `SiteHeader`, `MobileNav`, `LanguageSwitch`, `SiteFooter`, `SkipLink` |

Tokens today (`tailwind.config.ts`): `section-y` **3rem**, `catalogue-gap` **1.5rem**, `card-padding` **1rem**, header logo row **4rem** plus a second nav strap at **2.75rem**, cards **4:3** in a **3-column** grid, selects use `px-3` with the **native arrow flush to the border**.

## Stage 1 — Audit

| Surface | Density problem | Micro-UI defect |
|---------|-----------------|-----------------|
| Header | Two rows (logo 64px + strap 44px) eat the first screen | Strap is clear; logo row is tall for the job |
| Home hero | `py-section-y` (48px) and a 4:3 image push featured cars below the fold | — |
| Featured / catalogue cards | 4:3 photo plus a tall fact grid and a full-width button; 3 cards per row | Button and badges are clear |
| Filter bar | Four tall selects (`min-h-tap` 44px) wrap onto extra rows | Native chevron sits on the right border (`px-3` only) |
| Vehicle detail | Page starts with `py-section-y`; spec cells and gallery gaps are loose; sticky box uses `top-32` because the header is tall | Enquiry inputs match the same loose control style |
| About, services, FAQ, contact | Each opens with 48px vertical padding; services are 2 columns of padded cards; footer repeats `py-section-y` | FAQ chevron alignment is acceptable; contact tiles are sparse |
| Not found | Almost empty viewport | Uses raw `text-2xl`, not the type scale |
| Forms | Only `VehicleEnquiry` | Input `px-3`; no select there |

There is no dropdown component, table, or modal to restyle. The only `<select>` elements are the four filters in `VehicleCatalog.tsx`.

## Stage 1 — Stories

Brand navy and crimson stay. Tap targets stay at least 44px. Copy stays plain language in English and Sinhala. No Place Bid.

### Epic 1 — Shell and tokens

| ID | Story | Acceptance |
|----|--------|------------|
| 1.1 | One compact header | On 1440×900 the logo and the navy strap together are at most 88px tall. Labels and the active underline remain obvious. |
| 1.2 | Tighter page rhythm | `section-y` becomes 2rem, `catalogue-gap` 1rem, `card-padding` 0.75rem. Home, vehicles, about, services, FAQ, contact, and the footer all use those tokens. A 1440×900 home view shows the hero **and** the first featured card row. |
| 1.3 | Shared controls | One select class with `pl-3 pr-10` and a chevron that sits about 12px inside the edge. Inputs and buttons use the same horizontal padding. |

### Epic 2 — Catalogue density

| ID | Story | Acceptance |
|----|--------|------------|
| 2.1 | Four cards on desktop | At `lg`, the grid is 4 columns; image ratio becomes 16/10. Year, mileage, transmission, LKR, and **View details** stay readable. |
| 2.2 | One filter row | Make, Model, Year, Budget, and Reset sit on one row at 1440px. Reset still clears them. The chevron never touches the border. |

### Epic 3 — Detail page

| ID | Story | Acceptance |
|----|--------|------------|
| 3.1 | Fold shows the car and the action | On 1440×900 the title, main photo, price, and WhatsApp box are visible together. Specs stay a two-column list with empty fields omitted. |
| 3.2 | Sticky box clears the shorter header | The enquiry box sticks below the new header. The hint still says nothing is saved on the site. |

### Epic 4 — Secondary pages and leftovers

| ID | Story | Acceptance |
|----|--------|------------|
| 4.1 | Services, FAQ, contact, about | Services use 3 columns from `md`. FAQ rows and contact tiles use the new padding. No page keeps the old 3rem section padding. |
| 4.2 | Not found | Uses the same header, type scale, and a link back to vehicles. |
| 4.3 | Footer | Three columns remain, with the smaller vertical padding, and the same nav labels. |

## Stage 2 — Rules (apply everywhere, not per page)

| Token | Now | Proposed |
|-------|-----|----------|
| `section-y` | 3rem | 2rem |
| `catalogue-gap` | 1.5rem | 1rem |
| `card-padding` | 1rem | 0.75rem |
| Header stack | 4rem + 2.75rem | 3.25rem logo row + 2.25rem strap (≤ 88px) |
| Catalogue columns | 1 / 2 / 3 | 1 / 2 / **4** |
| Card image | 4/3 | 16/10 |
| Select | `px-3` | `pl-3 pr-10`, chevron inset 0.75rem |
| Input / button padding-x | mixed | 0.75rem |
| Sticky detail offset | `top-32` | match the shorter header (~`top-24`) |

**Files, in epic order**

1. `tailwind.config.ts`, `SiteHeader.tsx`, `MobileNav.tsx`, `LanguageSwitch.tsx`, `SiteFooter.tsx`, `globals.css` only if a chevron utility is needed
2. `VehicleSummaryCard.tsx`, `VehicleCatalog.tsx`, `vehicles/page.tsx`, `page.tsx` (home grid)
3. `vehicles/[slug]/page.tsx`, `VehicleEnquiry.tsx`
4. `MarketingHero.tsx`, `about/page.tsx`, `services/page.tsx`, `faq/page.tsx`, `FaqAccordion.tsx`, `contact/page.tsx`, `not-found.tsx`

Do not change Sanity queries, routing, webhook, or enquiry validation.

## Stage 3 — Visual rules

- **Strap.** Keep the navy bar, white labels, icon beside the word, and the white underline on the active item. Reduce strap height; do not drop labels.
- **Cards.** One line for make and model. Specs in a single compact row (year · km · transmission), then the price, then the crimson **View details** button. Badges stay pills.
- **Spec table.** Keep the bordered two-column cells. Cut cell padding from the current loose rhythm to `px-3 py-1.5`.
- **Selects.** `appearance-none`, `bg-no-repeat`, chevron SVG positioned `right-3 center`, `pr-10`. The arrow must not meet the border. Same radius as inputs (`rounded-md`).
- **Alignment.** Icons stay `h-4 w-4` and vertically centered with the label. Badges do not wrap under the title on a normal card width.

## Stage 5 — QA checklist (after implementation)

View each URL at **1440×900** and at **390×844**. No horizontal scroll.

| Page | Density | Clarity | Micro-UI |
|------|---------|---------|----------|
| `/en` and `/si` | Hero plus first card row visible | Strap labels in that language; Browse vehicles visible | — |
| `/vehicles` | Four cards on desktop; filters on one row | Make, Model, Year, Budget, Reset, View details | Chevron inset on all four selects |
| `/vehicles/{slug}` | Photo and WhatsApp box on the first screen | Specs labeled; WhatsApp hint present | Inputs share padding with filters |
| `/services` `/faq` `/about` `/contact` | More than one block visible without a huge blank band | Section title and first action or question visible | FAQ row and contact tiles align to the card padding |
| Not found | Message sits in the normal shell | Link to vehicles | Uses site type scale |

Empty filter result, a card with no mileage, and a card with no photo still look aligned.

## Approval

Reply with the epic to build first (**1**, **2**, **3**, or **4**). No application code until then.
