import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { findClassesInHtml, findClassesInJs } from "./findClassNames.js";
import { findInlineScripts, findJsImports, findScriptUrls, findStylesheetLinks } from "./findPageFiles.js";
import { removeUnusedRules } from "./removeUnusedRules.js";

async function readAllJsOfPage(html, folder) {
  let js = findInlineScripts(html);
  const filesToRead = findScriptUrls(html).map(folder.urlToFile);
  const alreadyRead = new Set();

  while (filesToRead.length > 0) {
    const file = filesToRead.shift();
    if (alreadyRead.has(file)) continue;
    alreadyRead.add(file);

    const code = await folder.readText(file);
    js += `\n${code}`;
    for (const importPath of findJsImports(code)) {
      filesToRead.push(path.resolve(path.dirname(file), importPath));
    }
  }
  return js;
}

export async function findUsedClasses(html, componentClasses, safelist, folder) {
  const js = await readAllJsOfPage(html, folder);
  return new Set([...safelist, ...findClassesInHtml(html), ...findClassesInJs(js, componentClasses)]);
}

export function cleanStyleTags(html, componentClasses, usedClasses, stats) {
  return html.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/g, (_, openTag, css, closeTag) => {
    const cleanCss = removeUnusedRules(css, componentClasses, usedClasses);
    stats.before += css.length;
    stats.after += cleanCss.length;
    return openTag + cleanCss + closeTag;
  });
}

async function writePageCssFile(css, firstLinkFile, stats) {
  const hash = createHash("sha256").update(css).digest("base64url").slice(0, 10);
  const file = path.join(path.dirname(firstLinkFile), `page.${hash}.css`);
  if (!stats.written.has(hash)) {
    await writeFile(file, css);
    stats.written.set(hash, file);
  }
  return file;
}

export async function mergeStylesheetLinks(html, componentClasses, usedClasses, stats, folder) {
  const links = findStylesheetLinks(html);
  if (links.length === 0) return html;

  const cssParts = [];
  for (const link of links) {
    const file = folder.urlToFile(link.href);
    stats.originalCss.add(file);
    cssParts.push(await folder.readText(file));
  }
  const allCss = cssParts.join("\n");
  const cleanCss = removeUnusedRules(allCss, componentClasses, usedClasses);
  stats.before += allCss.length;
  stats.after += cleanCss.length;

  const [firstLink, ...otherLinks] = links;
  const pageCssFile = await writePageCssFile(cleanCss, folder.urlToFile(firstLink.href), stats);
  const newFirstTag = firstLink.tag.replace(firstLink.href, folder.fileToUrl(pageCssFile));

  let result = html.replace(firstLink.tag, () => newFirstTag);
  for (const link of otherLinks) {
    result = result.replace(link.tag, () => "");
  }
  return result;
}
