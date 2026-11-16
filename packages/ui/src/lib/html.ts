/**
 * Small helpers for building HTML strings safely.
 * Components return strings so they work in BOTH Storybook (browser)
 * and Astro (server, where there is no `document`).
 */

const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape text so user/content data can never inject HTML. */
export function esc(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return "";
  return String(value).replace(/[&<>"']/g, (char) => ESCAPE_MAP[char]);
}

/** Join CSS class names, skipping empty values. */
export function cx(...names: Array<string | false | null | undefined>): string {
  return names.filter(Boolean).join(" ");
}

/**
 * Build an attribute string from an object.
 * attrs({ id: 'x', disabled: true, hidden: false }) -> ' id="x" disabled'
 */
export function attrs(
  values: Record<string, string | number | boolean | undefined | null>,
): string {
  return Object.entries(values)
    .map(([key, value]) => {
      if (value === undefined || value === null || value === false) return "";
      if (value === true) return ` ${key}`;
      return ` ${key}="${esc(value)}"`;
    })
    .join("");
}
