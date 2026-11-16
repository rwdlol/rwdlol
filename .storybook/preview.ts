import type { Preview } from "@storybook/html-vite";
import "../src/styles/tokens.css";
import "../src/styles/base.css";

const preview: Preview = {
  parameters: {
    layout: "padded",

    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          "Components",
          "Forms",
          "Layout",
          "Pages",
        ],
      },
    },

    backgrounds: {
      options: {
        white: { name: "White", value: "#ffffff" },
        surface: { name: "Surface", value: "#f4f5f7" },
        primary: { name: "Primary", value: "#0b5cad" },
      },
    },

    viewport: {
      options: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "667px" } },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1280px", height: "800px" },
        },
      },
    },

    a11y: {
      test: "error",
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
        },
      },
    },
  },

  initialGlobals: {
    backgrounds: { value: "white" },
    contrast: "normal",
  },

  globalTypes: {
    contrast: {
      description: "Contrast mode",
      toolbar: {
        title: "Contrast",
        icon: "contrast",
        items: [
          { value: "normal", title: "Normal contrast" },
          { value: "high", title: "High contrast" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (story, context) => {
      document.documentElement.dataset.contrast = context.globals.contrast;
      return story();
    },
  ],

  tags: ["autodocs"],
};

export default preview;
