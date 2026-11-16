function isLocalUrl(url) {
  return url.startsWith('/') && !url.startsWith('//');
}

function hrefOf(tag) {
  return tag.match(/\bhref=["']?([^"'\s>]+)/)?.[1];
}

export function stylesheetLinks(html) {
  const links = [];
  for (const [tag] of html.matchAll(/<link\b[^>]*>/g)) {
    if (!/\brel=["']?stylesheet/.test(tag)) continue;
    const href = hrefOf(tag);
    if (href && isLocalUrl(href)) links.push({ tag, href });
  }
  return links;
}

export function scriptSources(html) {
  const sources = new Set();
  for (const [, src] of html.matchAll(/<script\b[^>]*\bsrc=["']?([^"'\s>]+)/g)) {
    sources.add(src);
  }
  for (const [tag] of html.matchAll(/<link\b[^>]*rel=["']?modulepreload[^>]*>/g)) {
    const href = hrefOf(tag);
    if (href) sources.add(href);
  }
  return [...sources].filter(isLocalUrl);
}

export function jsImports(js) {
  const found = new Set();
  for (const [, spec] of js.matchAll(/(?:\bfrom|\bimport)\s*\(?\s*["'](\.{1,2}\/[^"']+)["']/g)) {
    found.add(spec);
  }
  return [...found];
}

export function inlineScripts(html) {
  let js = '';
  for (const [, code] of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) js += `\n${code}`;
  return js;
}
