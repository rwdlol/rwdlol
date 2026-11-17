import type { Meta, StoryObj } from "@storybook/html-vite";
import { expect } from "storybook/test";

interface LinkArgs {
  label: string;
  href: string;
  state: "default" | "newTab" | "download" | "inactive" | "disabled";
}

const NEW_TAB_HINT = '<span class="sr-only"> (opens in a new tab)</span>';

function linkHtml({ label, href, state }: LinkArgs): string {
  switch (state) {
    case "newTab":
      return `<a class="rwd-c-link" href="${href}" target="_blank" rel="noopener">${label}${NEW_TAB_HINT}</a>`;
    case "download":
      return `<a class="rwd-c-link" href="${href}" download>${label}</a>`;
    case "inactive":
      return `<a class="rwd-c-link" href="${href}" aria-current="page">${label}</a>`;
    case "disabled":
      return `<a class="rwd-c-link">${label}</a>`;
    default:
      return `<a class="rwd-c-link" href="${href}">${label}</a>`;
  }
}

const meta = {
  title: "Components/Content/Link",
  tags: ["autodocs"],
  render: (args) => `<p>Read our ${linkHtml(args)} for details.</p>`,
  args: {
    label: "privacy policy",
    href: "/privacy/",
    state: "default",
  },
  argTypes: {
    label: { control: "text" },
    href: { control: "text" },
    state: {
      control: "select",
      options: ["default", "newTab", "download", "inactive", "disabled"],
      description: "Set through HTML attributes, not extra classes",
    },
  },
} satisfies Meta<LinkArgs>;

export default meta;
type Story = StoryObj<LinkArgs>;

export const Default: Story = {};

export const NewTab: Story = {
  args: {
    state: "newTab",
    label: "Storybook",
    href: "https://storybook.js.org/",
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: /opens in a new tab/ });
    await expect(link).toHaveAttribute("target", "_blank");
  },
};

export const Download: Story = {
  args: {
    state: "download",
    label: "application form (PDF)",
    href: "/form.pdf",
  },
};

export const Inactive: Story = {
  args: { state: "inactive", label: "this page" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link")).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};

export const Disabled: Story = {
  args: { state: "disabled" },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("link")).not.toBeInTheDocument();
  },
};

export const AllStates: Story = {
  render: () => `
    <ul style="display:grid; gap: 12px">
      <li>${linkHtml({ label: "Default", href: "#", state: "default" })}</li>
      <li>${linkHtml({ label: "New tab", href: "https://example.com/", state: "newTab" })}</li>
      <li>${linkHtml({ label: "Download", href: "#", state: "download" })}</li>
      <li>${linkHtml({ label: "Inactive (current page)", href: "#", state: "inactive" })}</li>
      <li>${linkHtml({ label: "Disabled", href: "#", state: "disabled" })}</li>
    </ul>`,
};
