import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { classesInHtml, classesInJs } from "@rwdlol/ui/integration/classes.js";
import { inlineScripts, jsImports, scriptSources, stylesheetLinks } from "@rwdlol/ui/integration/pageAssets.js";
import { purge } from "@rwdlol/ui/integration/purge.js";

async function readAllJsOfPage(html, folder) {
  let js = inlineScripts(html);
  const queue = scriptSources(html).map(folder.urlToFile);
  const seen = new Set();
  while (queue.length > 0) {
    const file = queue.shift();
    if (seen.has(file)) continue;
    seen.add(file);
    const code = await folder.read(file);
    js += `\n${code}`;
    for (const spec of jsImports(code)) queue.push(path.resolve(path.dirname(file), spec));
  }
  return js;
}

export async function findUsedClasses(html, owned, safelist, folder) {
  const js = await readAllJsOfPage(html, folder);
  return new Set([...safelist, ...classesInHtml(html), ...classesInJs(js, owned)]);
}

export function purgeStyleTags(html, owned, used, stats) {
  return html.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/g, (_, open, css, close) => {
    const purged = purge(css, owned, used);
    stats.before += css.length;
    stats.after += purged.length;
    return open + purged + close;
  });
}

export async function mergeStylesheetLinks(html, owned, used, stats, folder) {
  const links = stylesheetLinks(html);
  if (links.length === 0) return html;

  const parts = [];
  for (const link of links) {
    const file = folder.urlToFile(link.href);
    stats.originalCss.add(file);
    parts.push(await folder.read(file));
  }
  const merged = parts.join('\n');
  const purged = purge(merged, owned, used);
  stats.before += merged.length;
  stats.after += purged.length;

  const hash = createHash('sha256').update(purged).digest('base64url').slice(0, 10);
  const pageCssFile = path.join(path.dirname(folder.urlToFile(links[0].href)), `page.${hash}.css`);
  if (!stats.written.has(hash)) {
    await writeFile(pageCssFile, purged);
    stats.written.set(hash, pageCssFile);
  }

  const [first, ...rest] = links;
  const firstPointingToPageCss = first.tag.replace(first.href, folder.fileToUrl(pageCssFile));
  let result = html.replace(first.tag, () => firstPointingToPageCss);
  for (const link of rest) result = result.replace(link.tag, () => '');
  return result;
}
