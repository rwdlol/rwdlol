import { escapeHtml } from "../../helpers/htmlHelpers.ts";
import { makeButtonHtml } from "../Button/Button.html.ts";

export interface HeroProps {
  title: string;
  text: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

function makeHeroButtonsHtml({ primaryLabel, primaryHref, secondaryLabel, secondaryHref }: HeroProps): string {
  let buttons = "";

  if (primaryLabel && primaryHref) {
    buttons += makeButtonHtml({ label: primaryLabel, href: primaryHref, size: "md" });
  }

  if (secondaryLabel && secondaryHref) {
    buttons += makeButtonHtml({ label: secondaryLabel, href: secondaryHref, size: "md", variant: "secondary" });
  }

  if (buttons === "") {
    return "";
  }
  return `<div class="hero__actions">${buttons}</div>`;
}

export function makeHeroHtml(props: HeroProps): string {
  return `
    <section class="hero">
      <div class="container">
        <h1 class="hero__title">${escapeHtml(props.title)}</h1>
        <p class="hero__text">${escapeHtml(props.text)}</p>
        ${makeHeroButtonsHtml(props)}
      </div>
    </section>`;
}
