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

const year = new Date().getFullYear();

export const mainSite: SiteConfig = {
  name: "Rawand",
  brandHref: "/",
  nav: [
    { label: "Home", href: "/" },
    { label: "Demo", href: "/demo/" },
    { label: "Storybook", href: STORYBOOK_URL },
  ],
  footerNav: [
    { label: "Demo", href: "/demo/" },
    { label: "Storybook", href: STORYBOOK_URL },
  ],
  copyright: `© ${year} Rawand`,
};

export const demoSite: SiteConfig = {
  name: "City Services",
  brandHref: "/demo/",
  nav: [
    { label: "Home", href: "/demo/" },
    { label: "Services", href: "/demo/#services" },
  ],
  footerNav: [{ label: "Back to rwd.lol", href: "/" }],
  copyright: `© ${year} City Services`,
};
