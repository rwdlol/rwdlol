import { esc, attrs } from "@rwdlol/ui/lib/html.ts";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  siteName: string;
  brandHref?: string;
  links: NavLink[];
  currentPath?: string;
  menuLabel?: string;
  menuId?: string;
}

function withoutTrailingSlash(path: string): string {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed || "/";
}

function isSamePage(href: string, currentPath?: string): boolean {
  if (currentPath === undefined) return false;
  return withoutTrailingSlash(href) === withoutTrailingSlash(currentPath);
}

function renderNavItem(link: NavLink, currentPath?: string): string {
  const ariaCurrent = isSamePage(link.href, currentPath) ? "page" : undefined;
  return `
    <li>
      <a class="header__link"${attrs({ href: link.href, "aria-current": ariaCurrent })}>
        ${esc(link.label)}
      </a>
    </li>`;
}

export function Header({
  siteName,
  brandHref = "/",
  links,
  currentPath,
  menuLabel = "Menu",
  menuId = "header-menu",
}: HeaderProps): string {
  let navItems = "";
  for (const link of links) navItems += renderNavItem(link, currentPath);

  return `
    <header class="header">
      <div class="container header__inner">
        <a class="header__brand" href="${esc(brandHref)}">${esc(siteName)}</a>
        <button class="header__toggle" type="button" aria-expanded="false" aria-controls="${esc(menuId)}" aria-label="${esc(menuLabel)}">
          <span class="header__toggle-icon" aria-hidden="true"></span>
        </button>
        <nav class="header__nav" id="${esc(menuId)}" aria-label="Main navigation">
          <ul class="header__links">${navItems}</ul>
        </nav>
      </div>
    </header>`;
}
