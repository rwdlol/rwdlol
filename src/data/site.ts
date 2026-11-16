// Content shared by the Astro pages AND the page stories in Storybook.
import type { NavLink } from "../components/Header/Header";
import type { CardProps } from "../components/Card/Card";

export const SITE_NAME = "City Services";

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavLink[] = [
  { label: "Legal notice", href: "/legal-notice" },
  { label: "Privacy", href: "/privacy" },
  { label: "Accessibility", href: "/accessibility" },
];

export const copyright = `© ${new Date().getFullYear()} ${SITE_NAME}`;

export const services: CardProps[] = [
  {
    title: "Parking permit",
    text: "Residents can apply for a parking permit online. You need your ID card and vehicle registration.",
    href: "/contact",
    linkLabel: "Ask about parking",
    headingLevel: 3,
  },
  {
    title: "Registering an address",
    text: "Moved recently? Book an appointment to register your new address within 14 days.",
    href: "/contact",
    linkLabel: "Book an appointment",
    headingLevel: 3,
  },
  {
    title: "Waste collection",
    text: "Check collection dates for your street and order additional bins.",
    href: "/contact",
    linkLabel: "Contact waste services",
    headingLevel: 3,
  },
];
