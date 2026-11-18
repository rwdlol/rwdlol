import type { NavLink } from "@rwdlol/ui";

export interface SiteConfig {
  name: string;
  brandHref: string;
  nav: NavLink[];
  footerNav: NavLink[];
  copyright: string;
}

export const STORYBOOK_URL = import.meta.env.DEV
  ? "http://localhost:6006"
  : "/storybook/";

export const demoSite: SiteConfig = {
  name: "City Services",
  brandHref: "/demo/",
  nav: [
    { label: "Home", href: "/demo/" },
    { label: "Services", href: "/demo/#services" },
  ],
  footerNav: [{ label: "Back to rwd.lol", href: "/" }],
  copyright: `© ${new Date().getFullYear()} City Services`,
};
