import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const theme = create({
  base: "dark",
  brandTitle: "@rwdlol/ui",
  brandUrl: "/storybook/",
});

addons.setConfig({
  theme: theme,
  panelPosition: "right",
  showToolbar: true,
  sidebar: {
    showRoots: true,
  },
});
