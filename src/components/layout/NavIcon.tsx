import type { NavKey } from "./nav-items";

type Props = { name: NavKey };

/** Decorative. The visible label next to the icon carries the meaning. */
export function NavIcon({ name }: Props) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    className: "h-4 w-4 shrink-0",
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
        </svg>
      );
    case "vehicles":
      return (
        <svg {...common}>
          <path d="M4 15h16M6 15l1.2-4.2A2 2 0 0 1 9.1 9h5.8a2 2 0 0 1 1.9 1.8L18 15" />
          <circle cx="7.5" cy="15.5" r="1.5" />
          <circle cx="16.5" cy="15.5" r="1.5" />
        </svg>
      );
    case "services":
      return (
        <svg {...common}>
          <path d="M8 7h8v10H8zM10 7V5h4v2M10 12h4" />
        </svg>
      );
    case "about":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3" />
          <path d="M6 19c1.2-2.5 3.2-3.5 6-3.5s4.8 1 6 3.5" />
        </svg>
      );
    case "faq":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.8.3-1.2.8-1.2 1.6V14" />
          <path d="M12 17h.01" />
        </svg>
      );
    case "contact":
      return (
        <svg {...common}>
          <path d="M6 5h4l1.5 3-2 1.2a12 12 0 0 0 5.3 5.3L16 13l3 1.5V18a1 1 0 0 1-1 1A13 13 0 0 1 5 6a1 1 0 0 1 1-1z" />
        </svg>
      );
  }
}
