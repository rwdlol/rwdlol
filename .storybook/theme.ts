import { create } from "storybook/theming";

export default create({
  base: "light",

  // Branding
  brandTitle: "rwd.lol Design System",
  brandUrl: "/",
  brandImage: "/logo.svg",
  brandTarget: "_self",

  // Colors
  colorPrimary: "#0b5cad",
  colorSecondary: "#0b5cad",

  // UI
  appBg: "#f4f5f7",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#c7cbd1",
  appBorderRadius: 4,

  // Text
  fontBase: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  fontCode: "ui-monospace, Menlo, monospace",
  textColor: "#1b1b1b",
  textInverseColor: "#ffffff",
  textMutedColor: "#545454",

  // Toolbar
  barTextColor: "#545454",
  barSelectedColor: "#0b5cad",
  barHoverColor: "#0b5cad",
  barBg: "#ffffff",

  // Form controls
  inputBg: "#ffffff",
  inputBorder: "#c7cbd1",
  inputTextColor: "#1b1b1b",
  inputBorderRadius: 4,
});
