import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#FFFFFF",
        },
        "on-background": "#0F172A",
        "on-surface": "#1E293B",
        "on-surface-muted": "#64748B",
        primary: {
          DEFAULT: "#0F3D7A",
          hover: "#1A4FA3",
        },
        "on-primary": "#FFFFFF",
        accent: {
          DEFAULT: "#C41E3A",
          hover: "#A31830",
        },
        "on-accent": "#FFFFFF",
        border: {
          DEFAULT: "#D8DEE8",
          strong: "#B8C2D0",
        },
        success: "#15803D",
        warning: "#B45309",
        error: "#B91C1C",
        "focus-ring": "#1A4FA3",
        "price-muted": "#475569",
        lang: {
          track: "#EEF1F6",
        },
        badge: {
          available: { bg: "#DCFCE7", text: "#15803D" },
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "var(--font-noto-sinhala)",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        display: [
          "2.25rem",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "display-mobile": [
          "1.75rem",
          { lineHeight: "1.25", fontWeight: "700" },
        ],
        headline: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        title: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        label: [
          "0.8125rem",
          {
            lineHeight: "1.4",
            letterSpacing: "0.02em",
            fontWeight: "500",
          },
        ],
        price: ["1.25rem", { lineHeight: "1.3", fontWeight: "700" }],
      },
      borderRadius: {
        container: "0.1875rem",
        sm: "0.125rem",
        DEFAULT: "0.125rem",
        md: "0.25rem",
        lg: "0.25rem",
        xl: "0.375rem",
      },
      spacing: {
        "page-gutter-mobile": "1rem",
        "page-gutter-desktop": "1.5rem",
        "section-y": "3rem",
        "card-padding": "1rem",
        "catalogue-gap": "1.5rem",
      },
      maxWidth: {
        content: "72rem",
      },
      minHeight: {
        tap: "2.75rem",
      },
    },
  },
  plugins: [],
};

export default config;