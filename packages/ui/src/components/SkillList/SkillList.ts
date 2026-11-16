import { esc } from "../../lib/html";

export interface SkillListProps {
  title: string;
  items: string[];
  headingLevel?: 2 | 3 | 4;
}

export function SkillList({
  title,
  items,
  headingLevel = 3,
}: SkillListProps): string {
  const h = `h${headingLevel}`;
  const listItems = items
    .map((item) => `<li class="skill-list__item">${esc(item)}</li>`)
    .join("");

  return `
    <div class="skill-list">
      <${h} class="skill-list__title">${esc(title)}</${h}>
      <ul class="skill-list__items">${listItems}</ul>
    </div>`;
}
