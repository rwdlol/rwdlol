import type { CardProps, AccordionItem } from "@rwdlol/ui";

export const services: CardProps[] = [
  {
    title: "Parking permit",
    text: "Residents can apply for a parking permit online. You need your ID card and vehicle registration.",
    href: "/demo/contact/",
    linkLabel: "Ask about parking",
    headingLevel: 3,
  },
  {
    title: "Registering an address",
    text: "Moved recently? Book an appointment to register your new address within 14 days.",
    href: "/demo/contact/",
    linkLabel: "Book an appointment",
    headingLevel: 3,
  },
  {
    title: "Waste collection",
    text: "Check collection dates for your street and order additional bins.",
    href: "/demo/contact/",
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
