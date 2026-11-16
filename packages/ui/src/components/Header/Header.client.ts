// Browser behaviour for the Header: the mobile menu button.
// Header.astro runs this automatically. Call it yourself only when you
// insert a Header with JavaScript (e.g. Storybook or innerHTML).

/** Menu button is shown below this width. Keep in sync with Header.css. */
const MOBILE_QUERY = "(max-width: 767.98px)";

export function initHeader(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(".header").forEach((header) => {
    if (header.classList.contains("header--js")) return; // already initialised

    const toggle = header.querySelector<HTMLButtonElement>(".header__toggle");
    const nav = header.querySelector<HTMLElement>(".header__nav");
    if (!toggle || !nav) return;

    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";
    const setOpen = (open: boolean) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("header__nav--open", open);
    };

    // Tells the CSS that JavaScript is running, so the menu can collapse on mobile.
    header.classList.add("header--js");

    toggle.addEventListener("click", () => setOpen(!isOpen()));

    // Escape closes the menu and returns focus to the button.
    header.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close the menu when the window grows to desktop size.
    const media = window.matchMedia(MOBILE_QUERY);
    const onMediaChange = (event: MediaQueryListEvent) => {
      if (!header.isConnected)
        return media.removeEventListener("change", onMediaChange);
      if (!event.matches) setOpen(false);
    };
    media.addEventListener("change", onMediaChange);
  });
}
