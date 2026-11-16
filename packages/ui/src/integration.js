import { fileURLToPath } from "node:url";
import { shipOnlyUsedCss } from "@rwdlol/ui/integration/shipOnlyUsedCss.js";

export { classesInHtml, classesInJs } from "@rwdlol/ui/integration/classes.js";
export { purge } from "@rwdlol/ui/integration/purge.js";
export { stylesheetLinks, scriptSources, jsImports } from "@rwdlol/ui/integration/pageAssets.js";

function withTrailingSlash(base) {
  if (base.endsWith('/')) return base;
  return `${base}/`;
}

export default function rwdlolUi(options = {}) {
  const safelist = options.safelist ?? [];
  let base = '/';

  return {
    name: '@rwdlol/ui',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = withTrailingSlash(config.base);
      },
      'astro:build:done': async ({ dir, logger }) => {
        await shipOnlyUsedCss({ outDir: fileURLToPath(dir), base, safelist, logger });
      },
    },
  };
}
