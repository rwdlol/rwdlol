import { esc, cx, attrs } from "../../lib/html";

export interface InputProps {
  id: string;
  label: string;
  name?: string;
  type?: "text" | "email" | "tel" | "url" | "search" | "password" | "number" | "date";
  value?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  autocomplete?: string;
  multiline?: boolean;
}

function idsOfHintAndError(id: string, hint?: string, error?: string): string | undefined {
  const ids: string[] = [];
  if (hint) ids.push(`${id}-hint`);
  if (error) ids.push(`${id}-error`);
  if (ids.length === 0) return undefined;
  return ids.join(" ");
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
  const sharedAttributes = attrs({
    id,
    name: name ?? id,
    placeholder,
    required,
    disabled,
    autocomplete,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": idsOfHintAndError(id, hint, error),
  });
  const className = cx("field__control", error && "field__control--error");

  let control = `<input class="${className}"${attrs({ type, value })}${sharedAttributes} />`;
  if (multiline) {
    control = `<textarea class="${className}" rows="5"${sharedAttributes}>${esc(value)}</textarea>`;
  }

  const requiredMark = required ? ' <span class="field__required" aria-hidden="true">*</span>' : "";
  const hintHtml = hint ? `<p class="field__hint" id="${esc(`${id}-hint`)}">${esc(hint)}</p>` : "";
  const errorHtml = error ? `<p class="field__error" id="${esc(`${id}-error`)}">${esc(error)}</p>` : "";

  return `
    <div class="${cx("field", error && "field--error")}">
      <label class="field__label" for="${esc(id)}">${esc(label)}${requiredMark}</label>
      ${hintHtml}
      ${errorHtml}
      ${control}
    </div>`;
}
