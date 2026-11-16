import { expect } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/html-vite";
import { SkillList, type SkillListProps } from "./SkillList";

const meta = {
  title: "Components/SkillList",
  render: (args) => SkillList(args),
  args: {
    title: "frontend",
    items: [
      "JS/TS",
      "React",
      "Next.js",
      "HTML/CSS",
      "SASS/SCSS",
      "Framer Motion",
    ],
    headingLevel: 3,
  },
  argTypes: {
    headingLevel: { control: "inline-radio", options: [2, 3, 4] },
  },
} satisfies Meta<SkillListProps>;

export default meta;
type Story = StoryObj<SkillListProps>;

export const Default: Story = {};

export const Short: Story = {
  args: { title: "cms", items: ["WordPress", "Drupal", "Blogger.com"] },
};

export const RendersEveryItem: Story = {
  play: async ({ canvas, args }) => {
    await expect(
      canvas.getByRole("heading", { level: 3, name: args.title }),
    ).toBeInTheDocument();
    await expect(canvas.getAllByRole("listitem")).toHaveLength(
      args.items.length,
    );
  },
};
