import type { Meta, StoryObj } from "@storybook/html-vite";
import { expect } from "storybook/test";
import {
  makeHeaderMinimalHtml,
  type HeaderMinimalProps,
} from "./HeaderMinimal.html.ts";
import {
  exampleHeaderArgs,
  renderHeaderLikeAstroDoes,
} from "./HeaderMinimal.exmaple.ts";

const meta = {
  title: "Layout/Header/HeaderMinimal",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  render: renderHeaderLikeAstroDoes,
  args: exampleHeaderArgs,
  argTypes: {
    currentPath: {
      control: "select",
      options: ["/", "/#services", "/contact"],
    },
  },
} satisfies Meta<HeaderMinimalProps>;

export default meta;
type Story = StoryObj<HeaderMinimalProps>;

export const Default: Story = {};

export const ContactActive: Story = {
  args: { currentPath: "/contact" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(
      canvas.getByRole("link", { name: "Services" }),
    ).not.toHaveAttribute("aria-current");
  },
};

export const DesktopShowsLinksWithoutMenuButton: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Contact" })).toBeVisible();
    await expect(
      canvas.queryByRole("button", { name: "Menu" }),
    ).not.toBeInTheDocument();
  },
};

export const MobileMenuOpensAndCloses: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
  play: async ({ canvas, userEvent, step }) => {
    const menuButton = canvas.getByRole("button", { name: "Menu" });

    await step("Menu starts closed", async () => {
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(
        canvas.queryByRole("link", { name: "Contact" }),
      ).not.toBeInTheDocument();
    });

    await step("Click opens the menu", async () => {
      await userEvent.click(menuButton);
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
      await expect(canvas.getByRole("link", { name: "Contact" })).toBeVisible();
    });

    await step("Escape closes the menu", async () => {
      await userEvent.keyboard("{Escape}");
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(menuButton).toHaveFocus();
    });
  },
};

export const MobileWithoutJavaScriptShowsLinks: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
  render: (args) => makeHeaderMinimalHtml(args),
  play: async ({ canvas }) => {
    await expect(
      canvas.queryByRole("button", { name: "Menu" }),
    ).not.toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "Contact" })).toBeVisible();
  },
};
