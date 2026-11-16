// Browser behaviour for the Accordion.
// Header.astro runs this automatically. Call it yourself only when you
// insert an Accordion with JavaScript (e.g. Storybook or innerHTML).

export function initAccordion(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(".accordion").forEach((accordion) => {
    if (accordion.classList.contains("accordion--js")) return; // already initialised
    accordion.classList.add("accordion--js");

    const allowMultiple = accordion.hasAttribute("data-allow-multiple");
    const items = [...accordion.querySelectorAll<HTMLElement>(".accordion__item")];
    const triggers = items.map((item) => item.querySelector<HTMLButtonElement>(".accordion__trigger")!);

    const setOpen = (item: HTMLElement, open: boolean) => {
      const trigger = item.querySelector<HTMLButtonElement>(".accordion__trigger")!;
      const panel = item.querySelector<HTMLElement>(".accordion__panel")!;
      trigger.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
    };

    // Start state: collapse everything that isn't marked as open.
    items.forEach((item) => setOpen(item, item.dataset.open === "true"));

    items.forEach((item, index) => {
      triggers[index].addEventListener("click", () => {
        const open = triggers[index].getAttribute("aria-expanded") !== "true";
        if (open && !allowMultiple) {
          items.forEach((other) => other !== item && setOpen(other, false));
        }
        setOpen(item, open);
      });
    });

    // Keyboard: ↓ ↑ move between titles, Home/End jump to first/last.
    accordion.addEventListener("keydown", (event) => {
      const current = triggers.indexOf(document.activeElement as HTMLButtonElement);
      if (current === -1) return;
      const last = triggers.length - 1;
      const target = {
        ArrowDown: current === last ? 0 : current + 1,
        ArrowUp: current === 0 ? last : current - 1,
        Home: 0,
        End: last,
      }[event.key];
      if (target === undefined) return;
      event.preventDefault();
      triggers[target].focus();
    });
  });
}