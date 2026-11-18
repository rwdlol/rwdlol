import { escapeHtml } from "../../helpers/htmlHelpers.ts";
import { makeButtonHtml } from "../Button/Button.html.ts";

export interface CardProps {
  title: string;
  text: string;
  href?: string;
  linkLabel?: string;
  headingLevel?: 2 | 3 | 4;
}

function makeCardLinkHtml(href: string, linkLabel: string): string {
  const button = makeButtonHtml({ label: linkLabel, href, variant: "secondary", size: "sm" });
  return `<div class="card__footer">${button}</div>`;
}

export function makeCardHtml({
  title,
  text,
  href,
  linkLabel = "Read more",
  headingLevel = 3,
}: CardProps): string {
  const heading = `h${headingLevel}`;

  let link = "";
  if (href) {
    link = makeCardLinkHtml(href, linkLabel);
  }

  return `
    <article class="card">
      <${heading} class="card__title">${escapeHtml(title)}</${heading}>
      <p class="card__text">${escapeHtml(text)}</p>
      ${link}
    </article>`;
}
