import { esc, cx } from "../../lib/html";
import "./Alert.css";

export type AlertType = "info" | "success" | "warning" | "error";

export interface AlertProps {
  type?: AlertType;
  title: string;
  message?: string;
}

const ICONS: Record<AlertType, string> = {
  info: "ℹ",
  success: "✓",
  warning: "!",
  error: "✕",
};

export function Alert({ type = "info", title, message }: AlertProps): string {
  // Errors and warnings interrupt screen readers; info/success are announced politely.
  const role = type === "error" || type === "warning" ? "alert" : "status";

  return `
    <div class="${cx("alert", `alert--${type}`)}" role="${role}">
      <span class="alert__icon" aria-hidden="true">${ICONS[type]}</span>
      <div class="alert__content">
        <p class="alert__title">${esc(title)}</p>
        ${message ? `<p class="alert__message">${esc(message)}</p>` : ""}
      </div>
    </div>`;
}
