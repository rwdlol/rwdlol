import type { Meta, StoryObj } from "@storybook/html-vite";
import { Card, type CardProps } from "./Card";
import { expect } from "storybook/test";

const meta = {
  title: "Components/Card",
  tags: ["autodocs"],
  render: (args) => `<div style="max-width: 360px">${Card(args)}</div>`,
  args: {
    title: "Apply for a parking permit",
    text: "Residents can apply online. You need your ID card and vehicle registration.",
    href: "",
    linkLabel: "Read more",
    headingLevel: 3,
  },
  argTypes: {
    headingLevel: { control: "inline-radio", options: [2, 3, 4] },
  },
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<CardProps>;

export const Default: Story = {};

export const WithLink: Story = {
  args: { href: "/services/parking", linkLabel: "Apply now" },
};

export const UsesChosenHeadingLevel: Story = {
  args: { title: "Parking permit", headingLevel: 2 },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 2, name: "Parking permit" }),
    ).toBeInTheDocument();
  },
};

export const LinkOnlyWhenHrefIsSet: Story = {
  args: { href: "" },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("link")).not.toBeInTheDocument();
  },
};

export const LinkPointsToHref: Story = {
  args: { href: "/services/parking", linkLabel: "Apply now" },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("link", { name: "Apply now" }),
    ).toHaveAttribute("href", "/services/parking");
  },
};
