import { esc, cx, attrs } from "../../lib/html";

export interface InputProps {
  /** Must be unique on the page; connects <label> and <input>. */
  id: string;
  label: string;
  name?: string;
  type?: "text" | "email" | "tel" | "password" | "number" | "date";
  value?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  /** Helps browsers autofill, e.g. "name", "email", "tel". */
  autocomplete?: string;
  /** Renders a <textarea> instead of an <input>. */
  multiline?: boolean;
}

export function Input({
  id,
  label,
  name,
  type = "text",
  value = "",
  placeholder,
  hint,
  error,
  required = false,
  disabled = false,
  autocomplete,
  multiline = false,
}: InputProps): string {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  const shared = attrs({
    id,
    name: name ?? id,
    placeholder,
    required,
    disabled,
    autocomplete,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": describedBy,
  });
  const className = cx("field__control", error && "field__control--error");

  const control = multiline
    ? `<textarea class="${className}" rows="5"${shared}>${esc(value)}</textarea>`
    : `<input class="${className}"${attrs({ type, value })}${shared} />`;

  return `
    <div class="${cx("field", error && "field--error")}">
      <label class="field__label" for="${esc(id)}">
        ${esc(label)}${required ? ' <span class="field__required" aria-hidden="true">*</span>' : ""}
      </label>
      ${hint ? `<p class="field__hint" id="${esc(hintId)}">${esc(hint)}</p>` : ""}
      ${error ? `<p class="field__error" id="${esc(errorId)}">${esc(error)}</p>` : ""}
      ${control}
    </div>`;
}
