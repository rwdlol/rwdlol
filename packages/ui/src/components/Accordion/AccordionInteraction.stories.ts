import { expect } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/html-vite";
import type { AccordionProps } from "./Accordion";
import { exampleAccordionArgs, renderAccordionLikeAstroDoes } from "./Accordion.example";

const meta = {
  title: "Components/Accordion interaction",
  render: renderAccordionLikeAstroDoes,
  args: exampleAccordionArgs,
} satisfies Meta<AccordionProps>;

export default meta;
type Story = StoryObj<AccordionProps>;

export const ClickTogglesItem: Story = {
  play: async ({ canvas, userEvent, step }) => {
    const button = canvas.getByRole("button", { name: "Which documents do I need?" });

    await step("Open", async () => {
      await userEvent.click(button);
      await expect(button).toHaveAttribute("aria-expanded", "true");
      await expect(canvas.getByText(/proof of address/)).toBeVisible();
    });

    await step("Close again", async () => {
      await userEvent.click(button);
      await expect(button).toHaveAttribute("aria-expanded", "false");
      await expect(canvas.queryByText(/proof of address/)).not.toBeVisible();
    });
  },
};

export const OpeningOneClosesTheOthers: Story = {
  play: async ({ canvas, userEvent }) => {
    const [first, second] = canvas.getAllByRole("button");
    await userEvent.click(second);
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "false");
  },
};

export const AllowMultipleKeepsOthersOpen: Story = {
  args: { allowMultiple: true },
  play: async ({ canvas, userEvent }) => {
    const [first, second] = canvas.getAllByRole("button");
    await userEvent.click(second);
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "true");
  },
};

export const ArrowKeysWrapAroundAndEnterToggles: Story = {
  play: async ({ canvas, userEvent }) => {
    const [first, second, third] = canvas.getAllByRole("button");
    first.focus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(second).toHaveFocus();
    await userEvent.keyboard("{End}");
    await expect(third).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(first).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    await expect(third).toHaveFocus();
    await userEvent.keyboard("{Home}");
    await expect(first).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(first).toHaveAttribute("aria-expanded", "false");
  },
};
