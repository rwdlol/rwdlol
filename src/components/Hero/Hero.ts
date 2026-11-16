import { esc } from "../../lib/html";
import { Button } from "../Button/Button";
import "./Hero.css";

export interface HeroProps {
  title: string;
  text: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function Hero({
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HeroProps): string {
  const primary =
    primaryLabel && primaryHref
      ? Button({ label: primaryLabel, href: primaryHref, size: "lg" })
      : "";
  const secondary =
    secondaryLabel && secondaryHref
      ? Button({
          label: secondaryLabel,
          href: secondaryHref,
          size: "lg",
          variant: "secondary",
        })
      : "";

  return `
    <section class="hero">
      <div class="container">
        <h1 class="hero__title">${esc(title)}</h1>
        <p class="hero__text">${esc(text)}</p>
        ${primary || secondary ? `<div class="hero__actions">${primary}${secondary}</div>` : ""}
      </div>
    </section>`;
}
