---
id: 3
type: story
title: Action labels are slightly smaller and price on request is outlined
parent: epic-vehicles
covers: [R2, R12]
refined: true
risk: low
hitl: false
after: []
---

# Action labels are slightly smaller and price on request is outlined

## Description

Call-to-action labels step down one size, and “Price on request” on a vehicle card becomes a small outlined chip. A listed rupee price stays the larger price type. This keeps the card readable without making the buttons or the missing price shout.

## Requirements

Verify: on the home page and the catalogue, at 1440px and at 390px, the action label is 14px inside a 44px-tall button, and “Price on request” is a 14px outlined chip.

1. **Smaller action label** (R12)
   **Given** a crimson or outlined action button
   **When** the page is shown
   **Then** its label is 14px and semibold
   **And** the button is still 44px tall, in the same colour, with the same corner

2. **Outlined price on request** (R2)
   **Given** a vehicle with no rupee price
   **When** its card is shown
   **Then** “Price on request” is 14px, medium, in the muted price colour, inside a 1px standard outline with a 4px corner and no fill
   **And** a vehicle that has a rupee price still shows that price at the current price size

## Boundaries

- Must not change: the menu, the language switch, the filter reset, FAQ questions, card photo ratio, catalogue columns, or the detail-page layout.
- Must not change: tap targets below 44px.

## References

- parent — `_bmad-output/initiative-sga-stage-1/tickets/epic-vehicles/epic-vehicles.md`, Outcome
- design — `_bmad-output/initiative-sga-stage-1/tickets/epic-vehicles/ux-type-tighten/TYPE.md`
- design — `_bmad-output/initiative-sga-stage-1/ux-sga-stage-1/DESIGN.md`, Price and Primary / secondary buttons

## Notes

- Decision (2026-11-25): only the “Price on request” wording gets the outline. A rupee amount stays the price type.
