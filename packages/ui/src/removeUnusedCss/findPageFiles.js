function isLocalUrl(url) {
  return url.startsWith("/") && !url.startsWith("//");
}

function findHref(tag) {
  const match = tag.match(/\bhref=["']?([^"'\s>]+)/);
  if (!match) return undefined;
  return match[1];
}

export function findStylesheetLinks(html) {
  const links = [];
  for (const [tag] of html.matchAll(/<link\b[^>]*>/g)) {
    if (!/\brel=["']?stylesheet/.test(tag)) continue;
    const href = findHref(tag);
    if (href && isLocalUrl(href)) links.push({ tag, href });
  }
  return links;
}

export function findScriptUrls(html) {
  const urls = new Set();
  for (const [, src] of html.matchAll(/<script\b[^>]*\bsrc=["']?([^"'\s>]+)/g)) {
    urls.add(src);
  }
  for (const [tag] of html.matchAll(/<link\b[^>]*rel=["']?modulepreload[^>]*>/g)) {
    const href = findHref(tag);
    if (href) urls.add(href);
  }

  const localUrls = [];
  for (const url of urls) {
    if (isLocalUrl(url)) localUrls.push(url);
  }
  return localUrls;
}

export function findJsImports(js) {
  const found = new Set();
  for (const [, importPath] of js.matchAll(/(?:\bfrom|\bimport)\s*\(?\s*["'](\.{1,2}\/[^"']+)["']/g)) {
    found.add(importPath);
  }
  return [...found];
}

export function findInlineScripts(html) {
  let js = "";
  for (const [, code] of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
    js += `\n${code}`;
  }
  return js;
}
