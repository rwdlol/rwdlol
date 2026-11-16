import type { Meta, StoryObj } from "@storybook/html-vite";
import { Alert, type AlertProps } from "@rwdlol/ui/components/Alert/Alert.ts";
import { expect } from "storybook/test";

const meta = {
  title: "Components/Alert",
  tags: ["autodocs"],
  render: (args) => Alert(args),
  args: {
    type: "info",
    title: "Please note",
    message: "Processing your application takes about 2 weeks.",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
    title: { control: "text" },
    message: { control: "text" },
  },
} satisfies Meta<AlertProps>;

export default meta;
type Story = StoryObj<AlertProps>;

export const Info: Story = {};

export const Success: Story = {
  args: {
    type: "success",
    title: "Sent",
    message: "Your message was sent successfully.",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    title: "Maintenance",
    message: "The portal will be unavailable on Saturday from 8:00 to 12:00.",
  },
};

export const ErrorAlert: Story = {
  args: {
    type: "error",
    title: "Error",
    message: "Please check your entries.",
  },
};

export const TitleOnly: Story = {
  args: { message: "" },
};

export const ErrorInterruptsScreenReader: Story = {
  args: {
    type: "error",
    title: "Error",
    message: "Please check your entries.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "Please check your entries.",
    );
  },
};

export const SuccessIsPolite: Story = {
  args: { type: "success", title: "Sent", message: "Your message was sent." },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("status")).toHaveTextContent("Sent");
    await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();
  },
};

export const IconIsHiddenFromScreenReaders: Story = {
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector(".alert__icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  },
};

export const NoEmptyMessage: Story = {
  args: { message: "" },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector(".alert__message")).toBeNull();
  },
};
