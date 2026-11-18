const HTML_ENTITY_FOR: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return "";
  return String(value).replace(/[&<>"']/g, (char) => HTML_ENTITY_FOR[char]);
}

export function joinClassNames(...names: Array<string | false | null | undefined>): string {
  const kept: string[] = [];
  for (const name of names) if (name) kept.push(name);
  return kept.join(" ");
}

export function makeAttributes(values: Record<string, string | number | boolean | undefined | null>): string {
  let html = "";
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined || value === null || value === false) continue;
    if (value === true) html += ` ${key}`;
    else html += ` ${key}="${escapeHtml(value)}"`;
  }
  return html;
}
