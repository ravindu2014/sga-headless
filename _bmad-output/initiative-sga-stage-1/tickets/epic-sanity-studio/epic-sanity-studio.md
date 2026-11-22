---
id: 2
type: epic
title: Sanity CMS
parent: initiative-sga-stage-1
covers: [R6, R3]
sources:
  - ../../initiative-sga-stage-1.md
  - ../../architecture-sga-stage-1/architecture-sga-stage-1.md
  - ../../sources/stage-1-input.md
refined: true
risk: medium
---

# Sanity CMS

## Description

Initialize Sanity Studio (`clean` template) for project `n2zalqm8` dataset `production`. Define schemas for site settings, pages, services, FAQ, vehicles with localized fields per AD-4.

## Outcome

Owner can open Studio and create draft/publish documents matching PRD FR-16 and FR-35–39.

## Requirements

1. **R6 (parent R6, AD-4–5):** Studio connected; vehicle and page types publishable.
2. **R3 (parent R3):** Services order and FAQ structure supported in schema.

## Done when

1. Sample vehicle and home document publish successfully.
2. Read-only build can fetch published docs via content layer.
3. No write token in web app bundle.

## Boundaries

- Public pages not wired (epic 3+).

## References

- parent — `initiative-sga-stage-1.md`
- architecture — `architecture-sga-stage-1/architecture-sga-stage-1.md` AD-4, AD-5, AD-6

## Notes

- Decision: 2026-11-22 — nine stories planned (1.1–2.9); epic 2 starts after epic-foundation story 1.3 content layer exists.