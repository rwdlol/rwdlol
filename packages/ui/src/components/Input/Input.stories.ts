import type { Meta, StoryObj } from "@storybook/html-vite";
import { Input, type InputProps } from "./Input";
import { expect } from "storybook/test";

const meta = {
  title: "Forms/Input",
  tags: ["autodocs"],
  render: (args) => Input(args),
  args: {
    id: "email",
    label: "Email address",
    type: "email",
    value: "",
    placeholder: "",
    hint: "",
    error: "",
    required: false,
    disabled: false,
    multiline: false,
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "tel", "password", "number", "date"],
    },
    hint: { control: "text" },
    error: { control: "text" },
  },
} satisfies Meta<InputProps>;

export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const WithHint: Story = {
  args: { hint: "We only use your email to reply to your request." },
};

export const WithError: Story = {
  args: {
    value: "max@",
    error:
      "Enter an email address in the correct format, like name@example.com",
  },
};

export const Disabled: Story = {
  args: { disabled: true, value: "max@example.com" },
};

export const Multiline: Story = {
  args: { id: "message", label: "Your message", type: "text", multiline: true },
};

export const LabelIsConnected: Story = {
  args: { label: "Email address", required: true },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText(/Email address/);
    await userEvent.type(input, "hello@rwd.lol");
    await expect(input).toHaveValue("hello@rwd.lol");
    await expect(input).toBeRequired();
  },
};

export const ErrorIsAnnounced: Story = {
  args: { error: "Enter a valid email address" },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText(/Email address/);
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(
      "Enter a valid email address",
    );
  },
};
