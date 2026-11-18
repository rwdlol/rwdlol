import { fileURLToPath } from "node:url";
import { removeUnusedCss } from "./removeUnusedCss/removeUnusedCss.js";

function addSlashAtEnd(base) {
  if (base.endsWith("/")) {
    return base;
  }
  return `${base}/`;
}

export default function rwdlolUi(options = {}) {
  const safelist = options.safelist ?? [];
  let base = "/";

  return {
    name: "@rwdlol/ui",
    hooks: {
      "astro:config:done": ({ config }) => {
        base = addSlashAtEnd(config.base);
      },
      "astro:build:done": async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        await removeUnusedCss({ outDir, base, safelist, logger });
      },
    },
  };
}
