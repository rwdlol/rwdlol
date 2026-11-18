import { escapeHtml } from "../../helpers/htmlHelpers.ts";
import type { NavLink } from "../Header/Header.html.ts";

export interface FooterProps {
  links: NavLink[];
  copyright: string;
}

export function makeFooterHtml({ links, copyright }: FooterProps): string {
  let items = "";
  for (const link of links) {
    items += `<li><a class="footer__link" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`;
  }

  return `
    <footer class="footer">
      <div class="container footer__inner">
        <nav aria-label="Footer navigation">
          <ul class="footer__links">${items}</ul>
        </nav>
        <p class="footer__copyright">${escapeHtml(copyright)}</p>
      </div>
    </footer>`;
}
