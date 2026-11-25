---
title: 'Vehicle detail shows the photo beside the title, price, and enquiry'
type: feature
ticket: '2'
created: '2026-11-25'
status: built
baseline_revision: 'b1d81738a204c4754f13a4cf631fe7f9407a6181'
route: oneshot
route_source: auto
risk: medium
review: quick
review_source: pinned
lenses_ran: [quick]
review_loop_iteration: 0
context:
  - '{project-root}/_bmad-output/initiative-sga-stage-1/tickets/epic-vehicles/ux-vehicle-detail-layout/LAYOUT.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The vehicle page opens with a full-width title, then puts the photo, description, and specifications on the left and only the price and enquiry on the right. On the reference listing the photo is left and the name, price, specifications, and WhatsApp sit on the right, level with the photo.

**Approach:** Reorder the existing blocks. Desktop: left column is photo, gallery, description, features; right column is badges, title, year · make · model, price, specifications, enquiry, starting level with the photo. Phone: photo and gallery, then that right-hand stack, then description and features. Keep every size, the sticky enquiry offset, empty-spec omission, and the “nothing is saved” hint.

</frozen-after-approval>

## Implementation Notes

Oneshot: one page, well under 100 lines. Grid areas so phone order and desktop columns do not need duplicated markup. Price leaves the sticky box and sits above the specifications; only the enquiry stays sticky at `lg:top-[5.5rem]`.

Implemented in `src/app/[locale]/vehicles/[slug]/page.tsx`. Phone order is photo, rail, then description. Desktop places the rail in column 2 spanning both rows. `messages/si.json` nav FAQ label is included because the user asked to ship that wording with this change. Typecheck passed. At 1440×900 the photo top and the badge row both sit at about 104px, the title is 24px in the right column, spec cells are 6px 12px, and there is no horizontal overflow. At 390×844 the photo is above the title. This vehicle has no description and no published site settings, so the enquiry box and the description block are absent, which the story allows.

## Plan Change Log

## Review Triage Log

Quick review, five findings.

- medium, patch — enquiry sticky could not move because its parent ended at the card. The right column now stretches with the photo column, so the card can stick at `lg:top-[5.5rem]` while that column is taller.
- medium, patch — a spanning right column opened a gap between the gallery and the description. Description now sits in the left column under the photos.
- medium, patch — with no photo the description stayed on a lower row. It now starts at the top of the left column.
- low, patch — the enquiry form kept a top margin that stacked on the card padding. That margin is removed.
- false — the Sinhala FAQ label changes the header and footer. The user asked to ship that wording with this story.

## Verification

**Commands:**
- `npx tsc --noEmit` -- expected: exit 0

**Manual checks (if no CLI):**
- At 1440×900 the photo’s top aligns with the title, the title is in the right column, specifications are under the price and above the enquiry, and description is under the gallery.
- At 390×844 the photo is above the title, and the description is below the enquiry.
- Photo stays 16/10, title stays `text-headline`, spec cells stay `px-3 py-1.5`.
- No horizontal overflow on either width.
