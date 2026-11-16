import type { NavLink } from "../components/Header/Header";
import type { CardProps } from "../components/Card/Card";

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

/** The main website: www.rwd.lol */
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

/** The demo website built from the components: www.rwd.lol/demo */
export const demoSite: SiteConfig = {
  name: "City Services",
  brandHref: "/demo",
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

export const services: CardProps[] = [
  {
    title: "Parking permit",
    text: "Residents can apply for a parking permit online. You need your ID card and vehicle registration.",
    href: "/demo/contact",
    linkLabel: "Ask about parking",
    headingLevel: 3,
  },
  {
    title: "Registering an address",
    text: "Moved recently? Book an appointment to register your new address within 14 days.",
    href: "/demo/contact",
    linkLabel: "Book an appointment",
    headingLevel: 3,
  },
  {
    title: "Waste collection",
    text: "Check collection dates for your street and order additional bins.",
    href: "/demo/contact",
    linkLabel: "Contact waste services",
    headingLevel: 3,
  },
];
