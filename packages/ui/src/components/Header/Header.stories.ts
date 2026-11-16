import { expect } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { HeaderProps } from "@rwdlol/ui/components/Header/Header.ts";
import { exampleHeaderArgs, renderHeaderLikeAstroDoes } from "@rwdlol/ui/components/Header/Header.example.ts";

const meta = {
  title: "Layout/Header",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  render: renderHeaderLikeAstroDoes,
  args: exampleHeaderArgs,
  argTypes: {
    currentPath: { control: "select", options: ["/", "/#services", "/contact"] },
  },
} satisfies Meta<HeaderProps>;

export default meta;
type Story = StoryObj<HeaderProps>;

export const Default: Story = {};

export const ContactActive: Story = {
  args: { currentPath: "/contact" },
};

export const MarksCurrentPage: Story = {
  args: { currentPath: "/contact" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Contact" })).toHaveAttribute("aria-current", "page");
    await expect(canvas.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  },
};

export const HasOneNavLinkPerItem: Story = {
  play: async ({ canvas, args }) => {
    const nav = canvas.getByRole("navigation", { name: "Main navigation" });
    await expect(nav.querySelectorAll("a")).toHaveLength(args.links.length);
  },
};

export const BrandLinksHome: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "City Services" })).toHaveAttribute("href", "/");
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
    await expect(canvas.getByRole("link", { name: "Demo" })).toHaveAttribute("aria-current", "page");
    await expect(canvas.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  },
};

export const DesktopShowsLinksWithoutMenuButton: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Contact" })).toBeVisible();
    await expect(canvas.queryByRole("button", { name: "Menu" })).not.toBeInTheDocument();
  },
};
