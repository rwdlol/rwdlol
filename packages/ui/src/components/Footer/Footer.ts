import { esc } from "@rwdlol/ui/lib/html.ts";
import type { NavLink } from "@rwdlol/ui/components/Header/Header.ts";

export interface FooterProps {
  links: NavLink[];
  copyright: string;
}

export function Footer({ links, copyright }: FooterProps): string {
  const items = links
    .map(
      (link) =>
        `<li><a class="footer__link" href="${esc(link.href)}">${esc(link.label)}</a></li>`,
    )
    .join("");

  return `
    <footer class="footer">
      <div class="container footer__inner">
        <nav aria-label="Footer navigation">
          <ul class="footer__links">${items}</ul>
        </nav>
        <p class="footer__copyright">${esc(copyright)}</p>
      </div>
    </footer>`;
}
