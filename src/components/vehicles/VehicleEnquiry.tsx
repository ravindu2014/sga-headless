"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { whatsAppHref } from "@/lib/format";

type Props = {
  whatsapp: string;
  vehicleTitle: string;
  pageUrl: string;
};

const MAX_NAME_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;

export function VehicleEnquiry({ whatsapp, vehicleTitle, pageUrl }: Props) {
  const t = useTranslations("enquiry");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName) {
      setError(t("nameRequired"));
      return;
    }
    if (trimmedName.length > MAX_NAME_LENGTH) {
      setError(t("nameTooLong"));
      return;
    }
    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      setError(t("messageTooLong"));
      return;
    }
    if (!whatsapp.replace(/\D/g, "")) {
      setError(t("whatsappUnavailable"));
      return;
    }
    setError(null);
    const body = t("whatsappTemplate", {
      name: trimmedName,
      vehicle: vehicleTitle,
      url: pageUrl,
      message: trimmedMessage || t("defaultMessage"),
    });
    window.open(whatsAppHref(whatsapp, body), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
      <p className="text-body-sm text-on-surface-muted">{t("handoffHint")}</p>
      <div>
        <label htmlFor="enquiry-name" className="text-label text-on-surface">
          {t("nameLabel")}
        </label>
        <input
          id="enquiry-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={MAX_NAME_LENGTH}
          className="mt-1 w-full min-h-tap rounded-md border border-border px-3 text-body"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "enquiry-name-error" : undefined}
        />
        {error ? (
          <p id="enquiry-name-error" className="mt-1 text-body-sm text-error">
            {error}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="enquiry-message" className="text-label text-on-surface">
          {t("messageLabel")}
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={3}
          maxLength={MAX_MESSAGE_LENGTH}
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-body"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="inline-flex min-h-tap w-full items-center justify-center rounded-md bg-accent px-6 font-semibold text-body text-on-accent hover:bg-accent-hover"
      >
        {t("submit")}
      </button>
    </form>
  );
}