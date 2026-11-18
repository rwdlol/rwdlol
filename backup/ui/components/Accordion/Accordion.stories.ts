import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/html-vite";
import { makeAccordionHtml, type AccordionProps } from "./Accordion.html.ts";
import { exampleAccordionArgs, renderAccordionLikeAstroDoes } from "./Accordion.example.ts";

const meta = {
  title: "Components/Accordion",
  render: renderAccordionLikeAstroDoes,
  args: exampleAccordionArgs,
  argTypes: {
    headingLevel: { control: "inline-radio", options: [2, 3, 4, 5, 6] },
    allowMultiple: { control: "boolean" },
  },
} satisfies Meta<AccordionProps>;

export default meta;
type Story = StoryObj<AccordionProps>;

export const Default: Story = {};

export const AllowMultiple: Story = {
  args: { allowMultiple: true },
};

export const AllClosed: Story = {
  args: {
    items: [
      { title: "First question", content: "First answer." },
      { title: "Second question", content: "Second answer." },
    ],
  },
};

export const StartsWithOpenItemsOnly: Story = {
  play: async ({ canvas }) => {
    const [first, second] = canvas.getAllByRole("button");
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(second).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.getByText(/10 working days/)).toBeVisible();
    await expect(canvas.queryByText(/proof of address/)).not.toBeVisible();
  },
};

export const PanelIsNamedByItsButton: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Which documents do I need?" });
    const panel = canvas.getByRole("region", { name: "How long does processing take?" });
    await expect(button.getAttribute("aria-controls")).toBe("faq-panel-1");
    await expect(panel).toHaveAttribute("aria-labelledby", "faq-trigger-0");
  },
};

export const UsesChosenHeadingLevel: Story = {
  args: { headingLevel: 2 },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("heading", { level: 2 })).toHaveLength(3);
  },
};

export const WithoutJavaScriptShowsAllContent: Story = {
  render: (args) => makeAccordionHtml(args),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/10 working days/)).toBeVisible();
    await expect(canvas.getByText(/proof of address/)).toBeVisible();
    await expect(canvas.getByText(/power of attorney/)).toBeVisible();
  },
};

export const EscapesContent: Story = {
  args: { items: [{ title: "<b>Title</b>", content: "<img src=x onerror=alert(1)>", open: true }] },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole("button", { name: "<b>Title</b>" })).toBeInTheDocument();
    await expect(canvasElement.querySelector("img, b")).toBeNull();
  },
};
