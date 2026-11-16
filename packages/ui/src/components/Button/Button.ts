import { esc, cx, attrs } from "../../lib/html";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** If set, renders a link (<a>) that looks like a button. */
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  label,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  fullWidth = false,
}: ButtonProps): string {
  const className = cx(
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && "btn--full",
  );

  if (href) {
    return `<a class="${className}" href="${esc(href)}">${esc(label)}</a>`;
  }

  return `<button class="${className}"${attrs({ type, disabled })}>${esc(label)}</button>`;
}
