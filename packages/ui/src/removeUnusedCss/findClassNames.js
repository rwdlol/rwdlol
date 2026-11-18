import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { listAllFilesIn } from "./buildFolder.js";

const thisFolder = path.dirname(fileURLToPath(import.meta.url));
const COMPONENTS_FOLDER = path.join(thisFolder, "..", "components");

export const CLASS_IN_SELECTOR = /\.(-?[_a-zA-Z][\w-]*)/g;

export async function findClassesInComponentCss() {
  const files = await listAllFilesIn(COMPONENTS_FOLDER);
  const componentClasses = new Set();
  for (const file of files) {
    if (!file.endsWith(".css")) continue;
    const css = await readFile(file, "utf8");
    for (const [, name] of css.matchAll(CLASS_IN_SELECTOR)) {
      componentClasses.add(name);
    }
  }
  return componentClasses;
}

function blockNameOf(className) {
  return className.split(/__|--/)[0];
}

export function findClassesInHtml(html) {
  const used = new Set();
  for (const [, doubleQuoted, singleQuoted] of html.matchAll(/\sclass=(?:"([^"]*)"|'([^']*)')/g)) {
    const classList = doubleQuoted ?? singleQuoted;
    for (const name of classList.split(/\s+/)) {
      if (name) used.add(name);
    }
  }
  return used;
}

export function findClassesInJs(js, componentClasses) {
  const blocks = new Set();
  for (const name of componentClasses) {
    blocks.add(blockNameOf(name));
  }

  const used = new Set();
  for (const block of blocks) {
    const jsMentionsBlock = js.includes(`${block}--`) || js.includes(`${block}__`);
    if (!jsMentionsBlock) continue;
    for (const name of componentClasses) {
      if (blockNameOf(name) === block) used.add(name);
    }
  }
  return used;
}
