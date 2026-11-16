import { esc } from "@rwdlol/ui/lib/html.ts";
import { Button } from "@rwdlol/ui/components/Button/Button.ts";

export interface CardProps {
  title: string;
  text: string;
  href?: string;
  linkLabel?: string;
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
