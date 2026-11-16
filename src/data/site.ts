import type { NavLink, CardProps, AccordionItem } from "@rwdlol/ui";

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

export const faq: AccordionItem[] = [
  {
    title: "How long does processing take?",
    content:
      "Most applications are processed within 10 working days. You will get an email as soon as a decision has been made.",
    open: true,
  },
  {
    title: "Which documents do I need?",
    content:
      "Your ID card and proof of address.\n\nFor a parking permit, also bring your vehicle registration.",
  },
  {
    title: "Can I apply for someone else?",
    content:
      "Yes. You need a signed power of attorney and a copy of their ID card.",
  },
];
