import { escapeHtml, joinClassNames, makeAttributes } from "../../helpers/htmlHelpers.ts";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

export function makeButtonHtml({
  label,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  fullWidth = false,
}: ButtonProps): string {
  const className = joinClassNames(
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && "btn--full",
  );

  if (href) {
    return `<a class="${className}" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
  }

  return `<button class="${className}"${makeAttributes({ type, disabled })}>${escapeHtml(label)}</button>`;
}
