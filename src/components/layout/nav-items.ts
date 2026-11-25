export const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/vehicles", key: "vehicles" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]["key"];

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
