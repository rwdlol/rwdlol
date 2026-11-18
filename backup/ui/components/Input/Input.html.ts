import { escapeHtml, joinClassNames, makeAttributes } from "../../helpers/htmlHelpers.ts";

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

export function makeInputHtml({
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
  const sharedAttributes = makeAttributes({
    id,
    name: name ?? id,
    placeholder,
    required,
    disabled,
    autocomplete,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": idsOfHintAndError(id, hint, error),
  });
  const className = joinClassNames("field__control", error && "field__control--error");

  let control = `<input class="${className}"${makeAttributes({ type, value })}${sharedAttributes} />`;
  if (multiline) {
    control = `<textarea class="${className}" rows="5"${sharedAttributes}>${escapeHtml(value)}</textarea>`;
  }

  const requiredMark = required ? ' <span class="field__required" aria-hidden="true">*</span>' : "";
  const hintHtml = hint ? `<p class="field__hint" id="${escapeHtml(`${id}-hint`)}">${escapeHtml(hint)}</p>` : "";
  const errorHtml = error ? `<p class="field__error" id="${escapeHtml(`${id}-error`)}">${escapeHtml(error)}</p>` : "";

  return `
    <div class="${joinClassNames("field", error && "field--error")}">
      <label class="field__label" for="${escapeHtml(id)}">${escapeHtml(label)}${requiredMark}</label>
      ${hintHtml}
      ${errorHtml}
      ${control}
    </div>`;
}
