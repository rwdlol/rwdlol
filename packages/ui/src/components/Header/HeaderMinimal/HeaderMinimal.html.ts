import { escapeHtml } from "../../../helpers/htmlHelpers.ts";

export interface HeaderMinimalLink {
  label: string;
  href: string;
}

export interface HeaderMinimalProps {
  siteName: string;
  links: HeaderMinimalLink[];
  currentPath?: string;
}

function removeSlashAtEnd(path: string): string {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

function isCurrentPage(href: string, currentPath?: string): boolean {
  if (currentPath === undefined) return false;
  return removeSlashAtEnd(href) === removeSlashAtEnd(currentPath);
}

function makeLinkHtml(link: HeaderMinimalLink, currentPath?: string): string {
  let ariaCurrent = "";
  if (isCurrentPage(link.href, currentPath)) {
    ariaCurrent = ' aria-current="page"';
  }
  return `<li><a class="header-minimal__link" href="${escapeHtml(link.href)}"${ariaCurrent}>${escapeHtml(link.label)}</a></li>`;
}

export function makeHeaderMinimalHtml({ siteName, links, currentPath }: HeaderMinimalProps): string {
  let linksHtml = "";
  for (const link of links) {
    linksHtml += makeLinkHtml(link, currentPath);
  }

  return `
    <header class="header-minimal">
      <div class="header-minimal__inner">
        <a class="header-minimal__brand" href="/">${escapeHtml(siteName)}</a>
        <button class="header-minimal__menu-button" type="button" aria-expanded="false" aria-controls="header-minimal-nav" hidden>
          Menu
        </button>
        <nav class="header-minimal__nav" id="header-minimal-nav" aria-label="Main navigation">
          <ul class="header-minimal__links">${linksHtml}</ul>
        </nav>
      </div>
    </header>`;
}
