import type { NavLink } from "@rwdlol/ui";

export const STORYBOOK_URL = import.meta.env.DEV
  ? "http://localhost:6006"
  : "/storybook/";

export interface SiteConfig {
  name: string;
  brandHref: string;
  nav: NavLink[];
  footerNav: NavLink[];
  copyright: string;
}

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
    { label: "Contact", href: "/demo/contact/" },
  ],
  footerNav: [
    { label: "Legal notice", href: "/demo/#legal-notice" },
    { label: "Privacy", href: "/demo/#privacy" },
    { label: "Accessibility", href: "/demo/#accessibility" },
    { label: "← Back to rwd.lol", href: "/" },
  ],
  copyright: `© ${year} City Services (demo)`,
};
