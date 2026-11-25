---
id: 2
type: story
title: "Vehicle detail shows the photo beside the title, price, and enquiry"
parent: epic-vehicles
covers: [R2]
sources: []
companions:
  - _bmad-output/initiative-sga-stage-1/tickets/epic-vehicles/ux-vehicle-detail-layout/LAYOUT.md
after: []
refined: true
hitl: false
risk: medium
---

# Vehicle detail shows the photo beside the title, price, and enquiry

## Description

On a desktop vehicle page the photo is on the left and the name, price, specifications, and WhatsApp enquiry are on the right, in the same places as the reference listing. Sizes stay as they are. This serves the epic’s detail page: a buyer can see the car and the way to ask about it without a title band pushing the photo down.

## Requirements

Verify: at 1440×900 and at 390×844, compare a vehicle page with the position table in the layout note. Photo ratio, title size, specification cell padding, price size, and enquiry control sizes match the page before this story.

1. **Desktop columns** (R2)
   **Given** a vehicle page at desktop width
   **When** it is shown
   **Then** the main photo and gallery are in the left column
   **And** the badges, title, year · make · model line, price, specifications, and WhatsApp enquiry are in the right column, starting level with the top of the photo
   **And** the title is not in a full-width band above both columns

2. **Right column order** (R2)
   **Given** the right column
   **When** it is read from top to bottom
   **Then** the order is badges, title, year · make · model, price, specifications, enquiry

3. **Description under the photos** (R2)
   **Given** a vehicle with a description or features
   **When** the page is shown at desktop width
   **Then** that text sits in the left column under the gallery, beside the lower part of the right column

4. **Phone stack** (R2)
   **Given** a narrow viewport
   **When** the page is shown
   **Then** the photo and gallery come first
   **And** then badges, title, year · make · model, price, specifications, and enquiry
   **And** description and features come after that stack

5. **Sizes stay** (R2)
   **Given** the same vehicle before and after this story
   **When** the page is shown
   **Then** the photo ratio, title size, specification cell padding, price size, and enquiry control sizes are unchanged
   **And** empty specification values are still omitted
   **And** the enquiry still says nothing is saved on this website

6. **Missing pieces** (R2)
   **Given** a vehicle with no photo, no description, or no published site settings
   **When** the page is shown
   **Then** the remaining blocks keep the same order
   **And** the price and specifications still sit in the right column on desktop
   **And** the enquiry is absent until a WhatsApp number is published

## Boundaries

- Must not change: catalogue cards, filters, header, footer, or which vehicle fields are shown
- Must not change: enquiry validation, the WhatsApp handoff, or the “nothing is saved” hint
- Must not add: a bid button, a countdown, photo category tabs, save, share, VIN, or a seller block

## References

- parent — `_bmad-output/initiative-sga-stage-1/tickets/epic-vehicles/epic-vehicles.md`, Done when
- design — `_bmad-output/initiative-sga-stage-1/tickets/epic-vehicles/ux-vehicle-detail-layout/LAYOUT.md`
- benchmark — https://collectingcars.com/for-sale/2014-nissan-r35-gt-r-4, desktop and phone positions measured 2026-11-25

## Notes

- Decision: 2026-11-25 — only where each block sits changes. Proportions and sizes stay.
- Decision: 2026-11-25 — do not copy auction-only parts of the reference page.
- Risk: medium — this is the page a buyer uses to ask about a car. Hiding the enquiry would cost that ask.
