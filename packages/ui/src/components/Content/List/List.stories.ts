import type { Meta, StoryObj } from "@storybook/html-vite";
import { expect } from "storybook/test";

/**
 * List is not a component. It is the class `rwd-c-list` that you put on a normal
 * `<ul>` or `<ol>`. The element and its attributes (`start`, `reversed`, `type`)
 * decide the markers.
 */

type ListElement = "ul" | "ol";
type OlType = "1" | "a" | "A" | "i" | "I";

interface ListArgs {
  element: ListElement;
  items: string[];
  start?: number;
  reversed?: boolean;
  type?: OlType;
}

function listHtml({ element, items, start, reversed, type }: ListArgs): string {
  let attributes = ' class="rwd-c-list"';
  if (element === "ol") {
    if (start !== undefined && start !== 1) attributes += ` start="${start}"`;
    if (reversed) attributes += " reversed";
    if (type && type !== "1") attributes += ` type="${type}"`;
  }
  const lis = items.map((item) => `<li>${item}</li>`).join("");
  return `<${element}${attributes}>${lis}</${element}>`;
}

const meta = {
  title: "Components/Content/List",
  tags: ["autodocs"],
  render: (args) => listHtml(args),
  args: {
    element: "ul",
    items: ["ID card or passport", "Proof of address", "Vehicle registration"],
  },
  argTypes: {
    element: { control: "inline-radio", options: ["ul", "ol"] },
    items: { control: "object" },
    start: { control: "number", if: { arg: "element", eq: "ol" } },
    reversed: { control: "boolean", if: { arg: "element", eq: "ol" } },
    type: {
      control: "select",
      options: ["1", "a", "A", "i", "I"],
      if: { arg: "element", eq: "ol" },
    },
  },
} satisfies Meta<ListArgs>;

export default meta;
type Story = StoryObj<ListArgs>;

export const Unordered: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("list")).toBeInTheDocument();
    const items = canvas.getAllByRole("listitem");
    await expect(items).toHaveLength(3);
    await expect(getComputedStyle(items[0]).listStyleType).toBe("disc");
  },
};

export const Ordered: Story = {
  args: {
    element: "ol",
    items: [
      "Book an appointment",
      "Bring your documents",
      "Get your certificate",
    ],
  },
  play: async ({ canvas }) => {
    const [first] = canvas.getAllByRole("listitem");
    await expect(getComputedStyle(first).listStyleType).toBe("decimal");
  },
};

export const StartAt: Story = {
  args: { ...Ordered.args, start: 4 },
};

export const Reversed: Story = {
  args: { ...Ordered.args, reversed: true },
};

export const UpperRoman: Story = {
  args: { ...Ordered.args, type: "I" },
  play: async ({ canvas }) => {
    const [first] = canvas.getAllByRole("listitem");
    await expect(getComputedStyle(first).listStyleType).toBe("upper-roman");
  },
};

export const Letters: Story = {
  args: { ...Ordered.args, type: "a" },
  play: async ({ canvas }) => {
    const [first] = canvas.getAllByRole("listitem");
    await expect(getComputedStyle(first).listStyleType).toBe("lower-alpha");
  },
};

export const Nested: Story = {
  render: () => `
    <ul class="rwd-c-list">
      <li>Documents
        <ul class="rwd-c-list">
          <li>ID card</li>
          <li>Proof of address</li>
        </ul>
      </li>
      <li>Appointment
        <ol class="rwd-c-list">
          <li>Choose a date</li>
          <li>Confirm by email</li>
        </ol>
      </li>
    </ul>`,
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("list")).toHaveLength(3);
  },
};
