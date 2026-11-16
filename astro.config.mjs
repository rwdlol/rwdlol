// @ts-check
import { defineConfig } from "astro/config";
import rwdlolUi from "@rwdlol/ui/integration";

export default defineConfig({
  site: "https://www.rwd.lol",
  base: "/",
  trailingSlash: "always",
  build: {
    inlineStylesheets: "always",
  },
  integrations: [rwdlolUi()],
});
