interface AccordionPart {
  item: HTMLElement;
  trigger: HTMLButtonElement;
  panel: HTMLElement;
}

function findDirectParts(accordion: HTMLElement): AccordionPart[] {
  const items = accordion.querySelectorAll<HTMLElement>(":scope > .accordion__item");
  const parts: AccordionPart[] = [];
  for (const item of items) {
    parts.push({
      item,
      trigger: item.querySelector<HTMLButtonElement>(".accordion__trigger")!,
      panel: item.querySelector<HTMLElement>(".accordion__panel")!,
    });
  }
  return parts;
}

function showOrHidePanel(part: AccordionPart, open: boolean): void {
  part.trigger.setAttribute("aria-expanded", String(open));
  if (open) {
    part.panel.removeAttribute("hidden");
  } else {
    part.panel.setAttribute("hidden", "until-found");
  }
}

function indexToFocusForKey(key: string, current: number, last: number): number | undefined {
  if (key === "ArrowDown") return current === last ? 0 : current + 1;
  if (key === "ArrowUp") return current === 0 ? last : current - 1;
  if (key === "Home") return 0;
  if (key === "End") return last;
  return undefined;
}

function moveFocusWithArrowKeys(accordion: HTMLElement, triggers: HTMLButtonElement[]): void {
  accordion.addEventListener("keydown", (event) => {
    const current = triggers.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1) return;

    const target = indexToFocusForKey(event.key, current, triggers.length - 1);
    if (target === undefined) return;

    event.preventDefault();
    triggers[target].focus();
  });
}

function makeAccordionInteractive(accordion: HTMLElement): void {
  accordion.classList.add("accordion--js");
  const allowMultiple = accordion.hasAttribute("data-allow-multiple");
  const parts = findDirectParts(accordion);

  const openOrClose = (chosen: AccordionPart, open: boolean) => {
    if (open && !allowMultiple) {
      for (const other of parts) if (other !== chosen) showOrHidePanel(other, false);
    }
    showOrHidePanel(chosen, open);
  };

  for (const part of parts) {
    showOrHidePanel(part, part.item.dataset.open === "true");
    part.trigger.addEventListener("click", () => {
      openOrClose(part, part.trigger.getAttribute("aria-expanded") !== "true");
    });
    part.panel.addEventListener("beforematch", () => openOrClose(part, true));
  }

  moveFocusWithArrowKeys(accordion, parts.map((part) => part.trigger));
}

export function initAccordion(root: ParentNode = document): void {
  for (const accordion of root.querySelectorAll<HTMLElement>(".accordion")) {
    const alreadyInteractive = accordion.classList.contains("accordion--js");
    if (!alreadyInteractive) makeAccordionInteractive(accordion);
  }
}
