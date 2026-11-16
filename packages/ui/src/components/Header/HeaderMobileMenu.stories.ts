import { expect } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/html-vite";
import { Header, type HeaderProps } from "./Header";
import { exampleHeaderArgs, renderHeaderLikeAstroDoes } from "./Header.example";

const meta = {
  title: "Layout/Header mobile menu",
  parameters: { layout: "fullscreen" },
  globals: { viewport: { value: "mobile", isRotated: false } },
  render: renderHeaderLikeAstroDoes,
  args: exampleHeaderArgs,
} satisfies Meta<HeaderProps>;

export default meta;
type Story = StoryObj<HeaderProps>;

export const Closed: Story = {};

export const Open: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Menu" }));
  },
};

export const MenuButtonTogglesMenu: Story = {
  play: async ({ canvas, canvasElement, userEvent, step }) => {
    const button = canvas.getByRole("button", { name: "Menu" });
    const nav = canvasElement.querySelector("#header-menu");

    await step("Button controls the navigation", async () => {
      await expect(button).toHaveAttribute("aria-controls", "header-menu");
      await expect(button).toHaveAttribute("aria-expanded", "false");
    });

    await step("Menu is collapsed on mobile", async () => {
      await expect(canvas.queryByRole("link", { name: "Contact" })).not.toBeInTheDocument();
    });

    await step("Click opens the menu", async () => {
      await userEvent.click(button);
      await expect(button).toHaveAttribute("aria-expanded", "true");
      await expect(nav).toHaveClass("header__nav--open");
      await expect(canvas.getByRole("link", { name: "Contact" })).toBeVisible();
    });

    await step("Click again closes it", async () => {
      await userEvent.click(button);
      await expect(button).toHaveAttribute("aria-expanded", "false");
      await expect(nav).not.toHaveClass("header__nav--open");
    });
  },
};

export const EscapeClosesMenuAndFocusesButton: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Menu" });
    await userEvent.click(button);
    await userEvent.tab();
    await userEvent.keyboard("{Escape}");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toHaveFocus();
  },
};

export const WithoutJavaScriptShowsAllLinks: Story = {
  render: (args) => Header(args),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvasElement.querySelector(".header")).not.toHaveClass("header--js");
    await expect(canvas.queryByRole("button", { name: "Menu" })).not.toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "Contact" })).toBeVisible();
  },
};

export const CustomMenuLabel: Story = {
  args: { menuLabel: "Menü" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Menü" })).toBeInTheDocument();
  },
};
