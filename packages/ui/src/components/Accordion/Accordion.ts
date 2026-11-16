import { esc } from "../../lib/html";

export interface AccordionItem {
  title: string;
  /** Plain text. Blank lines start a new paragraph. */
  content: string;
  /** Open when the page loads. */
  open?: boolean;
}

export interface AccordionProps {
  /** Unique on the page. Used to connect buttons and panels. */
  id: string;
  items: AccordionItem[];
  /** Heading level of each item title, so it fits the page outline. Default: 3 */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Allow several items to be open at once. Default: false (opening one closes the others) */
  allowMultiple?: boolean;
}

const paragraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${esc(p)}</p>`)
    .join("");

export function Accordion({ id, items, headingLevel = 3, allowMultiple = false }: AccordionProps): string {
  const h = `h${headingLevel}`;

  // Without JavaScript every panel is shown, so all content stays readable.
  // initAccordion() (Accordion.client.ts) then collapses the items that aren't `open`.
  const rows = items
    .map((item, index) => {
      const triggerId = `${id}-trigger-${index}`;
      const panelId = `${id}-panel-${index}`;
      return `
        <div class="accordion__item" data-open="${item.open ? "true" : "false"}">
          <${h} class="accordion__heading">
            <button class="accordion__trigger" type="button" id="${esc(triggerId)}" aria-expanded="true" aria-controls="${esc(panelId)}">
              <span class="accordion__title">${esc(item.title)}</span>
              <span class="accordion__icon" aria-hidden="true"></span>
            </button>
          </${h}>
          <div class="accordion__panel" id="${esc(panelId)}" role="region" aria-labelledby="${esc(triggerId)}">
            ${paragraphs(item.content)}
          </div>
        </div>`;
    })
    .join("");

  return `<div class="accordion" id="${esc(id)}"${allowMultiple ? " data-allow-multiple" : ""}>${rows}</div>`;
}