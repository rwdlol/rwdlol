import { escapeHtml, joinClassNames } from "../../helpers/htmlHelpers.ts";

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

export function makeAlertHtml({ type = "info", title, message }: AlertProps): string {
  const role = type === "error" || type === "warning" ? "alert" : "status";

  return `
    <div class="${joinClassNames("alert", `alert--${type}`)}" role="${role}">
      <span class="alert__icon" aria-hidden="true">${ICONS[type]}</span>
      <div class="alert__content">
        <p class="alert__title">${escapeHtml(title)}</p>
        ${message ? `<p class="alert__message">${escapeHtml(message)}</p>` : ""}
      </div>
    </div>`;
}
