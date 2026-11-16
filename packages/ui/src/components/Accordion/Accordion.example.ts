import { Accordion, type AccordionProps } from "@rwdlol/ui/components/Accordion/Accordion.ts";
import { initAccordion } from "@rwdlol/ui/components/Accordion/Accordion.client.ts";

export const exampleAccordionArgs: AccordionProps = {
  id: "faq",
  headingLevel: 3,
  allowMultiple: false,
  items: [
    {
      title: "How long does processing take?",
      content: "Most applications are processed within 10 working days.",
      open: true,
    },
    {
      title: "Which documents do I need?",
      content: "Your ID card and proof of address.\n\nFor a parking permit, also bring your vehicle registration.",
    },
    {
      title: "Can I apply for someone else?",
      content: "Yes, with a signed power of attorney.",
    },
  ],
};

export function renderAccordionLikeAstroDoes(args: AccordionProps): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.style.maxWidth = "720px";
  wrapper.innerHTML = Accordion(args);
  initAccordion(wrapper);
  return wrapper;
}
