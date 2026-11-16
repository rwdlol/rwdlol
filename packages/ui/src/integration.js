// @rwdlol/ui/integration
// After `astro build`, gives every page ONE stylesheet that contains only the
// @rwdlol/ui styles that page uses (components, variants, sizes).
// Dev mode is never changed: it always has every style.
import { createHash } from 'node:crypto';
import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';

const PACKAGE_DIR = path.dirname(fileURLToPath(import.meta.url));
const CLASS_IN_SELECTOR = /\.(-?[_a-zA-Z][\w-]*)/g;

/** All files below `dir` (recursive). */
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    }),
  );
  return files.flat();
}

/** Classes defined in the component CSS files of this package, e.g. btn, btn--lg, card__title. */
async function collectOwnedClasses() {
  const files = (await walk(path.join(PACKAGE_DIR, 'components'))).filter((f) => f.endsWith('.css'));
  const owned = new Set();
  for (const file of files) {
    const css = await readFile(file, 'utf8');
    for (const [, name] of css.matchAll(CLASS_IN_SELECTOR)) owned.add(name);
  }
  return owned;
}

/** "btn--lg" → "btn", "card__title" → "card", "skill-list__item" → "skill-list" */
const blockOf = (className) => className.split(/__|--/)[0];

/** Classes used in class="…" attributes of an HTML document. */
export function classesInHtml(html) {
  const used = new Set();
  for (const [, doubleQuoted, singleQuoted] of html.matchAll(/\sclass=(?:"([^"]*)"|'([^']*)')/g)) {
    for (const name of (doubleQuoted ?? singleQuoted).split(/\s+/)) if (name) used.add(name);
  }
  return used;
}

/**
 * Component functions bundled into browser JavaScript (from '@rwdlol/ui/html')
 * build class names at runtime, e.g. `alert--${type}`. If a block's code is in the JS,
 * keep every class of that block.
 */
export function classesInJs(js, owned) {
  const used = new Set();
  const blocks = new Set([...owned].map(blockOf));
  for (const block of blocks) {
    if (js.includes(`${block}--`) || js.includes(`${block}__`)) {
      for (const name of owned) if (blockOf(name) === block) used.add(name);
    }
  }
  return used;
}

/** Remove selectors that need an owned class which is not used. */
export function purge(css, owned, used) {
  const root = postcss.parse(css);
  root.walkRules((rule) => {
    if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
    const kept = rule.selectors.filter((selector) => {
      // Classes inside :not(...) don't have to be present.
      const required = selector.replace(/:not\([^)]*\)/g, '');
      for (const [, name] of required.matchAll(CLASS_IN_SELECTOR)) {
        if (owned.has(name) && !used.has(name)) return false;
      }
      return true;
    });
    if (kept.length === 0) rule.remove();
    else if (kept.length !== rule.selectors.length) rule.selectors = kept;
  });
  root.walkAtRules((atRule) => {
    if (atRule.nodes && atRule.nodes.length === 0) atRule.remove();
  });
  return root.toString();
}

/** <link rel="stylesheet" href="/…"> tags of a page (local files only). */
export function stylesheetLinks(html) {
  return [...html.matchAll(/<link\b[^>]*>/g)]
    .map((m) => m[0])
    .filter((tag) => /\brel=["']?stylesheet/.test(tag))
    .map((tag) => ({ tag, href: tag.match(/\bhref=["']?([^"'\s>]+)/)?.[1] }))
    .filter((link) => link.href && link.href.startsWith('/') && !link.href.startsWith('//'));
}

/** Local script files of a page: <script src> and <link rel="modulepreload">. */
export function scriptSources(html) {
  const sources = new Set();
  for (const [, src] of html.matchAll(/<script\b[^>]*\bsrc=["']?([^"'\s>]+)/g)) sources.add(src);
  for (const [tag] of html.matchAll(/<link\b[^>]*rel=["']?modulepreload[^>]*>/g)) {
    const href = tag.match(/\bhref=["']?([^"'\s>]+)/)?.[1];
    if (href) sources.add(href);
  }
  return [...sources].filter((src) => src.startsWith('/') && !src.startsWith('//'));
}

/** Relative imports inside a JS chunk, e.g. import{a}from"./x.js" or import("./y.js"). */
export function jsImports(js) {
  const found = new Set();
  for (const [, spec] of js.matchAll(/(?:\bfrom|\bimport)\s*\(?\s*["'](\.{1,2}\/[^"']+)["']/g)) found.add(spec);
  return [...found];
}

/**
 * Astro integration: every page gets one stylesheet with only the @rwdlol/ui styles it uses.
 *
 * @example
 * // astro.config.mjs
 * import rwdlolUi from '@rwdlol/ui/integration';
 * export default defineConfig({ integrations: [rwdlolUi()] });
 *
 * @param {{ safelist?: string[] }} [options]
 *   safelist: classes to always keep, e.g. ['btn--lg'] for classes you add yourself with JavaScript.
 * @returns {import('astro').AstroIntegration}
 */
export default function rwdlolUi(options = {}) {
  const safelist = options.safelist ?? [];
  let base = '/';

  return {
    name: '@rwdlol/ui',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = config.base.endsWith('/') ? config.base : `${config.base}/`;
      },

      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        /** "/base/_astro/x.css" → absolute file path in the output folder */
        const toFile = (url) => path.join(outDir, decodeURIComponent(url.split(/[?#]/)[0]).slice(base.length));
        /** absolute file path → "/base/_astro/x.css" */
        const toUrl = (file) => base + path.relative(outDir, file).split(path.sep).join('/');

        const owned = await collectOwnedClasses();
        const htmlFiles = (await walk(outDir)).filter((f) => f.endsWith('.html'));
        const fileCache = new Map();
        const read = async (file) => {
          if (!fileCache.has(file)) fileCache.set(file, await readFile(file, 'utf8').catch(() => ''));
          return fileCache.get(file);
        };

        /** All JS a page runs: inline scripts + script files + everything they import. */
        async function pageJs(html) {
          let js = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
          const queue = scriptSources(html).map(toFile);
          const seen = new Set();
          while (queue.length) {
            const file = queue.shift();
            if (seen.has(file)) continue;
            seen.add(file);
            const code = await read(file);
            js += `\n${code}`;
            for (const spec of jsImports(code)) queue.push(path.resolve(path.dirname(file), spec));
          }
          return js;
        }

        const originalCss = new Set();
        const written = new Map(); // content hash → file
        let before = 0;
        let after = 0;

        for (const htmlFile of htmlFiles) {
          let html = await read(htmlFile);
          const used = new Set([
            ...safelist,
            ...classesInHtml(html),
            ...classesInJs(await pageJs(html), owned),
          ]);

          // 1) <style> tags (if you inline stylesheets): purge in place.
          html = html.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/g, (_, open, css, close) => {
            const purged = purge(css, owned, used);
            before += css.length;
            after += purged.length;
            return open + purged + close;
          });

          // 2) Stylesheet files: merge into one file per page, then purge.
          const links = stylesheetLinks(html);
          if (links.length > 0) {
            const parts = [];
            for (const link of links) {
              const file = toFile(link.href);
              originalCss.add(file);
              parts.push(await read(file));
            }
            const merged = parts.join('\n');
            const purged = purge(merged, owned, used);
            before += merged.length;
            after += purged.length;

            const hash = createHash('sha256').update(purged).digest('base64url').slice(0, 10);
            const cssFile = path.join(path.dirname(toFile(links[0].href)), `page.${hash}.css`);
            if (!written.has(hash)) {
              await writeFile(cssFile, purged);
              written.set(hash, cssFile);
            }

            // Keep the first <link> (now pointing to the page file), remove the others.
            html = html.replace(links[0].tag, links[0].tag.replace(links[0].href, toUrl(cssFile)));
            for (const link of links.slice(1)) html = html.replace(link.tag, '');
          }

          await writeFile(htmlFile, html);
        }

        // 3) Delete the original stylesheets that nothing links to anymore
        //    (kept if any JavaScript file still mentions them).
        const allJs = (await walk(outDir)).filter((f) => /\.m?js$/.test(f));
        const jsText = (await Promise.all(allJs.map(read))).join('\n');
        for (const file of originalCss) {
          const stillUsed = [...written.values()].includes(file) || jsText.includes(path.basename(file));
          if (!stillUsed) await rm(file, { force: true });
        }

        const pages = Math.max(htmlFiles.length, 1);
        logger.info(
          `${htmlFiles.length} page(s) → ${written.size ? `${written.size} stylesheet(s)` : 'styles inlined'}. ` +
          `CSS per page: ${(before / 1024 / pages).toFixed(1)} kB → ${(after / 1024 / pages).toFixed(1)} kB on average.`,
        );
      },
    },
  };
}