# Smaller actions, outlined price on request, tighter specifications

Status: ready for build. Fits the existing flat navy and crimson UI. Measured against the type scale and `ux-sga-stage-1/DESIGN.md` (Price, Primary / secondary buttons) on 2026-11-25.

## Call-to-action labels

The crimson and outlined action buttons use body type at 16px. Drop the label to the next step, body small at 14px. That is 2px, and the button stays semibold.

The button itself stays 44px tall, with the same horizontal padding, corner, and colours. The menu, language switch, filter reset, and FAQ questions are not these buttons and stay as they are.

## Price on request

A rupee price stays the current price type: 20px, bold.

“Price on request” becomes a text chip, the same on the card and on the detail page:

- 14px, medium weight, colour `#475569` (the existing muted price colour)
- 1px outline `#D8DEE8`, the standard border, not the stronger one
- 4px corner, the same radius as buttons, not a pill
- padding 8px across and 2px down, hugging the words
- no fill

## Specification boxes

The value drops from 16px to 14px and stays medium. The label stays 13px. The cell padding drops from 12px by 6px to 10px by 4px. The border, corner, and two-column grid stay.

## Description rule

Where a description or features list sits under the photos, a 1px line in `#D8DEE8` sits between them. 16px of space above the line, 16px below it before the text. The line is the standard border, not the stronger one, and it is not a heading. The same rule sits above the description on a phone.
