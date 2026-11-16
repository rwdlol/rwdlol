import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/html-vite";
import { Accordion, type AccordionProps } from "./Accordion";
import { initAccordion } from "./Accordion.client";

const meta = {
  title: "Components/Accordion",
  // Same as Accordion.astro: render the HTML, then add the behaviour.
  render: (args) => {
    const wrapper = document.createElement("div");
    wrapper.style.maxWidth = "720px";
    wrapper.innerHTML = Accordion(args);
    initAccordion(wrapper);
    return wrapper;
  },
  args: {
    id: "faq",
    headingLevel: 3,
    allowMultiple: false,
    items: [
      {
        title: "How long does processing take?",
        content: "Most applications are processed within 10 working days.",
        open: true,
      },
      {
        title: "Which documents do I need?",
        content: "Your ID card and proof of address.\n\nFor a parking permit, also bring your vehicle registration.",
      },
      {
        title: "Can I apply for someone else?",
        content: "Yes, with a signed power of attorney.",
      },
    ],
  },
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

// ---------- Interaction tests ----------
export const StartsWithOpenItemsOnly: Story = {
  play: async ({ canvas }) => {
    const [first, second] = canvas.getAllByRole("button");
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(second).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.getByText(/10 working days/)).toBeVisible();
    await expect(canvas.queryByText(/proof of address/)).not.toBeVisible();
  },
};

export const ButtonControlsItsPanel: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Which documents do I need?" });
    const panelId = button.getAttribute("aria-controls")!;
    const panel = canvas.getByRole("region", { name: "How long does processing take?" });
    await expect(panelId).toBe("faq-panel-1");
    // Panels are named by their button
    await expect(panel).toHaveAttribute("aria-labelledby", "faq-trigger-0");
  },
};

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

export const KeyboardNavigation: Story = {
  play: async ({ canvas, userEvent }) => {
    const [first, second, third] = canvas.getAllByRole("button");
    first.focus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(second).toHaveFocus();
    await userEvent.keyboard("{End}");
    await expect(third).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}"); // wraps around
    await expect(first).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    await expect(third).toHaveFocus();
    await userEvent.keyboard("{Home}");
    await expect(first).toHaveFocus();
    await userEvent.keyboard("{Enter}"); // native button: Enter toggles
    await expect(first).toHaveAttribute("aria-expanded", "false");
  },
};

export const UsesChosenHeadingLevel: Story = {
  args: { headingLevel: 2 },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("heading", { level: 2 })).toHaveLength(3);
  },
};

export const WorksWithoutJavaScript: Story = {
  // Only the HTML, no initAccordion(): like a visitor with JavaScript turned off.
  render: (args) => Accordion(args),
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