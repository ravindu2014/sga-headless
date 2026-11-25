# Desktop content width

Status: ready for build. Measured 2026-11-25 on the Collecting Cars landing page, https://collectingcars.com/.

## What to match

The landing-page shell is centered, `width: 100%`, `max-width: 120rem` (1920px). Side padding is `1.5rem` (24px) until the viewport is 1264px wide, then `4.5rem` (72px).

| Viewport | Their content column (inner) |
| --- | --- |
| 1440px | 1296px (screen minus 72px each side) |
| 1920px and wider | 1776px, then it stops growing |

The phone shell uses 24px of side padding. Ours stays at 16px. This task does not adopt their phone padding.

## Ours, after the change

- The shared content column cap becomes `120rem` (1920px). Padding stays inside that cap, so the inner width at 1920px is 1776px.
- From 1264px up, that column’s side padding becomes `4.5rem` (72px). Header, navigation, page content, and footer use the same column.
- Below 1264px nothing moves: phones keep 16px, and the tablet gutter stays 24px.
- Narrow reading columns (about, FAQ, contact intro) stay on the prose measure.
- Type, cards, catalogue columns, the vehicle detail split, and the mobile menu stay as they are.
