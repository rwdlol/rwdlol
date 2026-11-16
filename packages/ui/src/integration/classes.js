import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { listFilesIn } from "@rwdlol/ui/integration/files.js";

const COMPONENTS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'components');
export const CLASS_IN_SELECTOR = /\.(-?[_a-zA-Z][\w-]*)/g;

export async function findClassesInComponentCss() {
  const files = await listFilesIn(COMPONENTS_DIR);
  const owned = new Set();
  for (const file of files) {
    if (!file.endsWith('.css')) continue;
    const css = await readFile(file, 'utf8');
    for (const [, name] of css.matchAll(CLASS_IN_SELECTOR)) owned.add(name);
  }
  return owned;
}

export function blockNameOf(className) {
  return className.split(/__|--/)[0];
}

export function classesInHtml(html) {
  const used = new Set();
  for (const [, doubleQuoted, singleQuoted] of html.matchAll(/\sclass=(?:"([^"]*)"|'([^']*)')/g)) {
    const classList = doubleQuoted ?? singleQuoted;
    for (const name of classList.split(/\s+/)) {
      if (name) used.add(name);
    }
  }
  return used;
}

export function classesInJs(js, owned) {
  const used = new Set();
  const blocks = new Set();
  for (const name of owned) blocks.add(blockNameOf(name));

  for (const block of blocks) {
    const blockIsInJs = js.includes(`${block}--`) || js.includes(`${block}__`);
    if (!blockIsInJs) continue;
    for (const name of owned) {
      if (blockNameOf(name) === block) used.add(name);
    }
  }
  return used;
}
