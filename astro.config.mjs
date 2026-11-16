// @ts-check
import { defineConfig } from "astro/config";
import rwdlolUi from '@rwdlol/ui/integration';

// https://astro.build/config
export default defineConfig({
  site: "https://www.rwd.lol",
  base: "/",
  trailingSlash: "always",
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    build: {
      cssCodeSplit: false,
      cssMinify: true,
      assetsInlineLimit: 0,
    },
  },
  integrations: [rwdlolUi()],
});