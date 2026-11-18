export class HeaderMinimal {
  header: HTMLElement;
  menuButton: HTMLButtonElement;

  constructor(header: HTMLElement) {
    this.header = header;
    this.menuButton = header.querySelector(".header-minimal__menu-button")!;

    this.menuButton.hidden = false;
    this.menuButton.addEventListener("click", () => this.toggle());
    this.header.addEventListener("keydown", (event) =>
      this.closeOnEscape(event),
    );
  }

  isOpen(): boolean {
    return this.menuButton.getAttribute("aria-expanded") === "true";
  }

  open(): void {
    this.menuButton.setAttribute("aria-expanded", "true");
  }

  close(): void {
    this.menuButton.setAttribute("aria-expanded", "false");
  }

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  closeOnEscape(event: KeyboardEvent): void {
    if (event.key === "Escape" && this.isOpen()) {
      this.close();
      this.menuButton.focus();
    }
  }
}
