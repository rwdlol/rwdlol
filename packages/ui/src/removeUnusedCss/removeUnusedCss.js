import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { listAllFilesIn, openBuildFolder } from "./buildFolder.js";
import { cleanStyleTags, findUsedClasses, mergeStylesheetLinks } from "./cleanPageCss.js";
import { findClassesInComponentCss } from "./findClassNames.js";

async function deleteStylesheetsNothingLinksTo(folder, stats) {
  const allFiles = await listAllFilesIn(folder.outDir);
  let allJs = "";
  for (const file of allFiles) {
    if (/\.m?js$/.test(file)) allJs += await readFile(file, "utf8");
  }

  const writtenFiles = [...stats.written.values()];
  for (const file of stats.originalCss) {
    const stillUsed = writtenFiles.includes(file) || allJs.includes(path.basename(file));
    if (!stillUsed) await rm(file, { force: true });
  }
}

function logSummary(logger, pageCount, stats) {
  const pages = Math.max(pageCount, 1);
  const kbBefore = (stats.before / 1024 / pages).toFixed(1);
  const kbAfter = (stats.after / 1024 / pages).toFixed(1);

  let output = "styles inlined";
  if (stats.written.size > 0) {
    output = `${stats.written.size} stylesheet(s)`;
  }
  logger.info(`${pageCount} page(s) → ${output}. CSS per page: ${kbBefore} kB → ${kbAfter} kB on average.`);
}

export async function removeUnusedCss({ outDir, base, safelist, logger }) {
  const folder = openBuildFolder(outDir, base);
  const componentClasses = await findClassesInComponentCss();
  const allFiles = await listAllFilesIn(outDir);
  const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
  const stats = { originalCss: new Set(), written: new Map(), before: 0, after: 0 };

  for (const htmlFile of htmlFiles) {
    let html = await folder.readText(htmlFile);
    const usedClasses = await findUsedClasses(html, componentClasses, safelist, folder);
    html = cleanStyleTags(html, componentClasses, usedClasses, stats);
    html = await mergeStylesheetLinks(html, componentClasses, usedClasses, stats, folder);
    await writeFile(htmlFile, html);
  }

  await deleteStylesheetsNothingLinksTo(folder, stats);
  logSummary(logger, htmlFiles.length, stats);
}
