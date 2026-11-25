---
id: 1
type: story
title: Desktop content column matches Collecting Cars
parent: epic-site-chrome-pages
covers: [R1]
refined: true
risk: low
hitl: false
after: []
---

# Desktop content column matches Collecting Cars

## Description

On a wide screen the header, navigation, page content, and footer share one content column as wide as the Collecting Cars landing page. Phone and tablet layout stay as they are.

## Acceptance criteria

1. At 1440px and at 1920px, the shared column’s inner width matches Collecting Cars: the screen width minus 72px on each side, and it stops growing once the outer column is 1920px (inner width 1776px).
2. Below 1264px the side padding is unchanged: 16px on phones, 24px from the tablet breakpoint. Stacking, tap targets, and the mobile menu are unchanged.
3. Narrow reading columns stay narrow. Type sizes, card proportions, catalogue columns, and the vehicle detail split stay as they are.

## Boundaries

- Do not change padding, stacking, or the menu below 1264px.
- Do not change type, card proportions, catalogue columns, or where detail-page blocks sit.
- Do not add auction controls, countdowns, or photo tabs.
