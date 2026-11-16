const SAME_BREAKPOINT_AS_HEADER_MOBILE_CSS = "(max-width: 767.98px)";

function closeMenuOnEscape(header: HTMLElement, toggle: HTMLButtonElement, setOpen: (open: boolean) => void): void {
  header.addEventListener("keydown", (event) => {
    const menuIsOpen = toggle.getAttribute("aria-expanded") === "true";
    if (event.key === "Escape" && menuIsOpen) {
      setOpen(false);
      toggle.focus();
    }
  });
}

function closeMenuWhenWindowGetsWide(header: HTMLElement, setOpen: (open: boolean) => void): void {
  const mobileWidth = window.matchMedia(SAME_BREAKPOINT_AS_HEADER_MOBILE_CSS);
  const onWidthChange = (event: MediaQueryListEvent) => {
    if (!header.isConnected) {
      mobileWidth.removeEventListener("change", onWidthChange);
      return;
    }
    if (!event.matches) setOpen(false);
  };
  mobileWidth.addEventListener("change", onWidthChange);
}

function makeMenuButtonWork(header: HTMLElement): void {
  const toggle = header.querySelector<HTMLButtonElement>(".header__toggle");
  const nav = header.querySelector<HTMLElement>(".header__nav");
  if (!toggle || !nav) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("header__nav--open", open);
  };

  header.classList.add("header--js");
  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  closeMenuOnEscape(header, toggle, setOpen);
  closeMenuWhenWindowGetsWide(header, setOpen);
}

export function initHeader(root: ParentNode = document): void {
  for (const header of root.querySelectorAll<HTMLElement>(".header")) {
    const alreadyInteractive = header.classList.contains("header--js");
    if (!alreadyInteractive) makeMenuButtonWork(header);
  }
}
