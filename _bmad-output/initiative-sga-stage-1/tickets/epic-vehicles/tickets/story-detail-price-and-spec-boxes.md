---
id: 4
type: story
title: Detail price on request matches the card and specifications sit tighter
parent: epic-vehicles
covers: [R2, R12]
refined: true
risk: low
hitl: false
after: []
---

# Detail price on request matches the card and specifications sit tighter

## Description

On the vehicle page, “Price on request” uses the same outlined chip as the card. The specification boxes shrink a little with their type, and a thin rule separates the photos from the description underneath.

## Requirements

Verify: on a vehicle page at 1440px and at 390px, the price-on-request chip matches the card, each specification cell is shorter, and a description is divided from the photos by a 1px line.

1. **Same price chip** (R2)
   **Given** a vehicle with no rupee price
   **When** its page is shown
   **Then** “Price on request” matches the card chip: 14px, medium, muted price colour, 1px standard outline, 4px corner, no fill
   **And** a rupee price still uses the current price size

2. **Smaller specification boxes** (R12)
   **Given** a vehicle with specifications
   **When** the boxes are shown
   **Then** each value is 14px and medium, the label stays 13px, and the cell padding is 10px by 4px
   **And** the border, corner, and two-column desktop grid stay

3. **Thin rule above the description** (R2)
   **Given** a vehicle with a description or a features list
   **When** the page is shown on desktop or on a phone
   **Then** a 1px standard line sits between the photos and that text, with 16px of space on each side of the line
   **And** a vehicle with neither has no line

## Boundaries

- Must not change: where the photo, title, price, specifications, and enquiry sit.
- Must not change: the enquiry wording, or empty specifications appearing as boxes.
- Must not change: photo ratio or title size.

## References

- parent — `_bmad-output/initiative-sga-stage-1/tickets/epic-vehicles/epic-vehicles.md`, Outcome
- design — `_bmad-output/initiative-sga-stage-1/tickets/epic-vehicles/ux-type-tighten/TYPE.md`
- design — `_bmad-output/initiative-sga-stage-1/ux-sga-stage-1/DESIGN.md`, Price

## Notes

- Decision (2026-11-25): the line uses the standard border, not the stronger border, and it is not a heading.
