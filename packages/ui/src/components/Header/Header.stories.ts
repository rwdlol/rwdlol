import { expect } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/html-vite";
import { Header, type HeaderProps } from "./Header";
import { initHeader } from "./Header.client";

const meta = {
  title: "Layout/Header",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  // Same as Header.astro: render the HTML, then add the mobile menu behaviour.
  render: (args) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = Header(args);
    initHeader(wrapper);
    return wrapper;
  },
  args: {
    siteName: "City Services",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/#services" },
      { label: "Contact", href: "/contact" },
    ],
    currentPath: "/",
  },
  argTypes: {
    currentPath: {
      control: "select",
      options: ["/", "/#services", "/contact"],
    },
  },
} satisfies Meta<HeaderProps>;

export default meta;
type Story = StoryObj<HeaderProps>;

export const Default: Story = {};

export const ContactActive: Story = {
  args: { currentPath: "/contact" },
};

// ---------- Interaction tests ----------
export const MarksCurrentPage: Story = {
  args: { currentPath: "/contact" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(
      canvas.getByRole("link", { name: "Home" }),
    ).not.toHaveAttribute("aria-current");
  },
};

export const HasLabelledNavigation: Story = {
  play: async ({ canvas, args }) => {
    const nav = canvas.getByRole("navigation", { name: "Main navigation" });
    // One link per nav item (the brand link is outside <nav>)
    await expect(nav.querySelectorAll("a")).toHaveLength(args.links.length);
  },
};

export const BrandLinksHome: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("link", { name: "City Services" }),
    ).toHaveAttribute("href", "/");
  },
};

export const IgnoresTrailingSlash: Story = {
  args: {
    links: [
      { label: "Home", href: "/" },
      { label: "Demo", href: "/demo/" },
    ],
    currentPath: "/demo",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Demo" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(
      canvas.getByRole("link", { name: "Home" }),
    ).not.toHaveAttribute("aria-current");
  },
};

// ---------- Mobile menu ----------
const mobile = { viewport: { value: "mobile", isRotated: false } };

export const Mobile: Story = {
  globals: mobile,
};

export const MobileMenuOpen: Story = {
  globals: mobile,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Menu" }));
  },
};

export const MenuButtonTogglesMenu: Story = {
  globals: mobile,
  play: async ({ canvas, canvasElement, userEvent, step }) => {
    const button = canvas.getByRole("button", { name: "Menu" });
    const nav = canvasElement.querySelector("#header-menu");

    await step("Button controls the navigation", async () => {
      await expect(button).toHaveAttribute("aria-controls", "header-menu");
      await expect(button).toHaveAttribute("aria-expanded", "false");
    });

    await step("Menu is collapsed on mobile", async () => {
      await expect(
        canvas.queryByRole("link", { name: "Contact" }),
      ).not.toBeInTheDocument();
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

export const EscapeClosesMenu: Story = {
  globals: mobile,
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Menu" });
    await userEvent.click(button);
    await userEvent.tab(); // move focus into the menu
    await userEvent.keyboard("{Escape}");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toHaveFocus(); // focus returns to the button
  },
};

export const WorksWithoutJavaScript: Story = {
  globals: mobile,
  // Only the HTML, no initHeader(): like a visitor with JavaScript turned off.
  render: (args) => Header(args),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvasElement.querySelector(".header")).not.toHaveClass(
      "header--js",
    );
    await expect(
      canvas.queryByRole("button", { name: "Menu" }),
    ).not.toBeInTheDocument(); // hidden
    await expect(canvas.getByRole("link", { name: "Contact" })).toBeVisible();
  },
};

export const CustomMenuLabel: Story = {
  globals: mobile,
  args: { menuLabel: "Menü" },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Menü" }),
    ).toBeInTheDocument();
  },
};

export const DesktopHasNoMenuButton: Story = {
  play: async ({ canvas }) => {
    // Desktop: links visible, button hidden
    await expect(canvas.getByRole("link", { name: "Contact" })).toBeVisible();
    await expect(
      canvas.queryByRole("button", { name: "Menu" }),
    ).not.toBeInTheDocument();
  },
};
