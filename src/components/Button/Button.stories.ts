import type { Meta, StoryObj } from "@storybook/html-vite";
import { Button, type ButtonProps } from "./Button";
import { expect } from "storybook/test";

const meta = {
  title: "Components/Button",
  tags: ["autodocs"],
  render: (args) => Button(args),
  args: {
    label: "Continue",
    variant: "primary",
    size: "md",
    type: "button",
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["primary", "secondary", "danger"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    type: { control: "select", options: ["button", "submit", "reset"] },
    href: { control: "text", description: "If set, renders a link" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", label: "Cancel" },
};

export const Danger: Story = {
  args: { variant: "danger", label: "Delete application" },
};

export const Large: Story = {
  args: { size: "lg", label: "Start application" },
};

export const AsLink: Story = {
  args: { href: "/contact", label: "Go to contact form" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

// ---------- Interaction tests ----------
export const DisabledIsNotClickable: Story = {
  args: { disabled: true, label: "Send" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Send" });
    await expect(button).toBeDisabled();
  },
};

export const LinkRendersAnchor: Story = {
  args: { href: "/contact", label: "Contact" },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "Contact" });
    await expect(link).toHaveAttribute("href", "/contact");
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
  },
};

export const EscapesLabel: Story = {
  args: { label: "<img src=x onerror=alert(1)>" },
  play: async ({ canvas, canvasElement }) => {
    // The label must appear as text, never as real HTML
    await expect(canvas.getByRole("button")).toHaveTextContent(
      "<img src=x onerror=alert(1)>",
    );
    await expect(canvasElement.querySelector("img")).toBeNull();
  },
};
