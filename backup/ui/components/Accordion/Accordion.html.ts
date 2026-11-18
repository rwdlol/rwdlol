import { escapeHtml } from "../../helpers/htmlHelpers.ts";

export interface AccordionItem {
  title: string;
  content: string;
  open?: boolean;
}

export interface AccordionProps {
  id: string;
  items: AccordionItem[];
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  allowMultiple?: boolean;
}

function textToParagraphs(text: string): string {
  let html = "";
  for (const paragraph of text.split(/\n\s*\n/)) {
    const trimmed = paragraph.trim();
    if (trimmed) html += `<p>${escapeHtml(trimmed)}</p>`;
  }
  return html;
}

function renderItemOpenUntilScriptRuns(
  accordionId: string,
  item: AccordionItem,
  index: number,
  headingTag: string,
): string {
  const triggerId = escapeHtml(`${accordionId}-trigger-${index}`);
  const panelId = escapeHtml(`${accordionId}-panel-${index}`);
  const startsOpen = item.open ? "true" : "false";

  return `
    <div class="accordion__item" data-open="${startsOpen}">
      <${headingTag} class="accordion__heading">
        <button class="accordion__trigger" type="button" id="${triggerId}" aria-expanded="true" aria-controls="${panelId}">
          <span class="accordion__title">${escapeHtml(item.title)}</span>
          <span class="accordion__icon" aria-hidden="true"></span>
        </button>
      </${headingTag}>
      <div class="accordion__panel" id="${panelId}" role="region" aria-labelledby="${triggerId}">
        ${textToParagraphs(item.content)}
      </div>
    </div>`;
}

export function makeAccordionHtml({ id, items, headingLevel = 3, allowMultiple = false }: AccordionProps): string {
  const headingTag = `h${headingLevel}`;

  let rows = "";
  items.forEach((item, index) => {
    rows += renderItemOpenUntilScriptRuns(id, item, index, headingTag);
  });

  const allowMultipleAttribute = allowMultiple ? " data-allow-multiple" : "";
  return `<div class="accordion" id="${escapeHtml(id)}"${allowMultipleAttribute}>${rows}</div>`;
}
