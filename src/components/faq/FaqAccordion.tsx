"use client";

import { useState } from "react";
import type { FaqItemDto } from "@/content";
import { LocaleText } from "@/components/cms/LocaleText";

type Props = {
  items: FaqItemDto[];
};

export function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items.length) {
    return null;
  }

  return (
    <ul className="divide-y divide-border border border-border rounded-container bg-surface">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <li key={index}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                className="flex w-full min-h-tap items-center justify-between gap-4 px-card-padding py-3 text-left text-title text-on-surface hover:text-primary"
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span>{item.question.value}</span>
                <span aria-hidden className="text-primary">
                  {open ? "−" : "+"}
                </span>
              </button>
            </h3>
            {open ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="border-t border-border px-card-padding pb-4 pt-2"
              >
                <LocaleText
                  value={item.answer}
                  className="max-w-prose text-body text-on-surface"
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}