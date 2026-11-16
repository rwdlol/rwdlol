import type { Meta, StoryObj } from "@storybook/html-vite";
import { Header, type HeaderProps } from "./Header";
import { expect } from "storybook/test";

const meta = {
  title: "Layout/Header",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  render: (args) => Header(args),
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
