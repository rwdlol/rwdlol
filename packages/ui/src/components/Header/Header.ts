import { esc, attrs } from "../../lib/html";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  siteName: string;
  /** Where the site name links to. Default: "/" */
  brandHref?: string;
  links: NavLink[];
  /** Path of the current page, e.g. "/contact/". Marks the active link. */
  currentPath?: string;
  /** Accessible name of the mobile menu button. Default: "Menu" */
  menuLabel?: string;
}

/** "/demo/" and "/demo" are the same page: compare without trailing slash. */
const normalise = (path: string) => path.replace(/\/+$/, "") || "/";

export function Header({
  siteName,
  brandHref = "/",
  links,
  currentPath,
  menuLabel = "Menu",
}: HeaderProps): string {
  const items = links
    .map((link) => {
      const isCurrent = currentPath !== undefined && normalise(link.href) === normalise(currentPath);
      return `
        <li>
          <a class="header__link"${attrs({ href: link.href, "aria-current": isCurrent ? "page" : undefined })}>
            ${esc(link.label)}
          </a>
        </li>`;
    })
    .join("");

  // The toggle button stays hidden until initHeader() runs (Header.client.ts).
  // Without JavaScript the links are simply always visible.
  return `
    <header class="header">
      <div class="container header__inner">
        <a class="header__brand" href="${esc(brandHref)}">${esc(siteName)}</a>
        <button class="header__toggle" type="button" aria-expanded="false" aria-controls="header-menu" aria-label="${esc(menuLabel)}">
          <span class="header__toggle-icon" aria-hidden="true"></span>
        </button>
        <nav class="header__nav" id="header-menu" aria-label="Main navigation">
          <ul class="header__links">${items}</ul>
        </nav>
      </div>
    </header>`;
}