import type { Meta, StoryObj } from "@storybook/html-vite";
import { Footer, type FooterProps } from "./Footer";
import { expect } from "storybook/test";

const meta = {
  title: "Layout/Footer",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  render: (args) => Footer(args),
  args: {
    links: [
      { label: "Legal notice", href: "/legal-notice" },
      { label: "Privacy", href: "/privacy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
    copyright: "© 2026 City Services",
  },
} satisfies Meta<FooterProps>;

export default meta;
type Story = StoryObj<FooterProps>;

export const Default: Story = {};

// ---------- Interaction tests ----------
export const HasLegalLinks: Story = {
  play: async ({ canvas }) => {
    const nav = canvas.getByRole("navigation", { name: "Footer navigation" });
    await expect(nav).toBeInTheDocument();
    // Required pages for most public websites
    await expect(canvas.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
    await expect(
      canvas.getByRole("link", { name: "Legal notice" }),
    ).toHaveAttribute("href", "/legal-notice");
    await expect(
      canvas.getByRole("link", { name: "Accessibility" }),
    ).toBeInTheDocument();
  },
};

export const ShowsCopyright: Story = {
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.copyright)).toBeInTheDocument();
  },
};
