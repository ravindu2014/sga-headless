---
id: 1
type: bug
title: Sinhala pages show English
parent: none
covers: []
after: []
assignee: ""
refined: true
hitl: false
risk: medium
severity: P1
---

# Sinhala pages show English

## Description

Opening the Sinhala home page shows English navigation, buttons, and headings. The page title stays Sinhala. Sinhala should be the language of the whole page, and the language control should stay on Sinhala with a link back to English.

## Reproduction

1. Open https://sga-headless.pages.dev/si (checked 2026-11-25).
2. Read the page title, the navigation, the featured heading, and the language control.

Actual: the title is "මුල් පිටුව". The navigation, "Featured vehicles", "View details", and "Price on request" are English. The English language control is marked current and its link is `/en/si`.

Expected: those labels are Sinhala, the Sinhala control is current, and the English control links to `/en`.

## Cause Hypothesis

A static export renders both languages in one build. Message lookups that do not name a language reuse the first language's catalogue, which is English. Lookups that name Sinhala, such as the page title, stay Sinhala. The language control then treats the page as English, so its English link includes both prefixes.

## Acceptance Criteria

1. **Sinhala pages are Sinhala**
   **Given** the exported Sinhala home page
   **When** it is opened
   **Then** the navigation, featured heading, view-details label, and price-on-request label are Sinhala
   **And** the Sinhala language control is current and the English control links to `/en`
2. **English pages stay English**
   **Given** the exported English home page
   **When** it is opened
   **Then** those same labels are English and the Sinhala control links to `/si`
3. **The build checks both**
   **Given** the static export check
   **When** it runs
   **Then** it fails if the Sinhala home page is missing its Sinhala labels or contains an `/en/si` link, and it fails if the English home page is missing its English labels

## References

- ingest — `_bmad-output/notes/sinhala-language.md`, Key points
- live — `https://sga-headless.pages.dev/si`, checked 2026-11-25

## Notes

- The hero line can still show its English source with an English chip when the Sinhala field is empty in the content studio. That chip is not this bug.
