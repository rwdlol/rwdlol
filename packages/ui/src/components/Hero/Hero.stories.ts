import type { Meta, StoryObj } from "@storybook/html-vite";
import { Hero, type HeroProps } from "./Hero";
import { expect } from "storybook/test";

const meta = {
  title: "Layout/Hero",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  render: (args) => Hero(args),
  args: {
    title: "Online services for residents",
    text: "Apply for permits, book appointments and contact the administration, all in one place.",
    primaryLabel: "View services",
    primaryHref: "/#services",
    secondaryLabel: "Contact us",
    secondaryHref: "/contact",
  },
} satisfies Meta<HeroProps>;

export default meta;
type Story = StoryObj<HeroProps>;

export const Default: Story = {};

export const OneAction: Story = {
  args: { secondaryLabel: "", secondaryHref: "" },
};

export const TextOnly: Story = {
  args: { primaryLabel: "", secondaryLabel: "" },
};

export const HasOneMainHeading: Story = {
  play: async ({ canvas, args }) => {
    await expect(canvas.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(
      args.title,
    );
  },
};

export const ShowsBothActions: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("link", { name: "View services" }),
    ).toHaveAttribute("href", "/#services");
    await expect(
      canvas.getByRole("link", { name: "Contact us" }),
    ).toHaveAttribute("href", "/contact");
  },
};

export const NoActionsWithoutLabels: Story = {
  args: { primaryLabel: "", secondaryLabel: "" },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.queryAllByRole("link")).toHaveLength(0);
    await expect(canvasElement.querySelector(".hero__actions")).toBeNull();
  },
};
