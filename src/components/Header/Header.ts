import { esc, attrs } from "../../lib/html";
import "./Header.css";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  siteName: string;
  links: NavLink[];
  /** Path of the current page, e.g. "/contact". Marks the active link. */
  currentPath?: string;
}

export function Header({ siteName, links, currentPath }: HeaderProps): string {
  const items = links
    .map((link) => {
      const isCurrent = link.href === currentPath;
      return `
        <li>
          <a class="header__link"${attrs({ href: link.href, "aria-current": isCurrent ? "page" : undefined })}>
            ${esc(link.label)}
          </a>
        </li>`;
    })
    .join("");

  return `
    <header class="header">
      <div class="container header__inner">
        <a class="header__brand" href="/">${esc(siteName)}</a>
        <nav aria-label="Main navigation">
          <ul class="header__links">${items}</ul>
        </nav>
      </div>
    </header>`;
}
