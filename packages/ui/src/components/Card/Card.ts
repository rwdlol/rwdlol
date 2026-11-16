import { esc } from "../../lib/html";
import { Button } from "../Button/Button";

export interface CardProps {
  title: string;
  text: string;
  /** Optional link shown at the bottom of the card. */
  href?: string;
  linkLabel?: string;
  /** Heading level, so the card fits the page outline (accessibility). */
  headingLevel?: 2 | 3 | 4;
}

export function Card({
  title,
  text,
  href,
  linkLabel = "Read more",
  headingLevel = 3,
}: CardProps): string {
  const h = `h${headingLevel}`;

  return `
    <article class="card">
      <${h} class="card__title">${esc(title)}</${h}>
      <p class="card__text">${esc(text)}</p>
      ${
        href
          ? `<div class="card__footer">${Button({ label: linkLabel, href, variant: "secondary", size: "sm" })}</div>`
          : ""
      }
    </article>`;
}
