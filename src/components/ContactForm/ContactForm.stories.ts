import type { Meta, StoryObj } from "@storybook/html-vite";
import { expect, fn } from "storybook/test";
import { ContactForm } from "@components/ContactForm/ContactForm";
import { initContactForm } from "@components/ContactForm/ContactForm.client";
import type { ContactValues } from "@data/contactForm";
import "@components/ContactForm/ContactForm.css";

interface ContactFormArgs {
  onSubmit: (values: ContactValues) => void;
}

const meta = {
  title: "Forms/ContactForm",
  args: { onSubmit: fn() },
  render: (args) => {
    const wrapper = document.createElement("div");
    wrapper.style.maxWidth = "640px";
    wrapper.innerHTML = ContactForm();
    initContactForm(wrapper, args.onSubmit);
    return wrapper;
  },
} satisfies Meta<ContactFormArgs>;

export default meta;
type Story = StoryObj<ContactFormArgs>;
type PlayContext = Parameters<NonNullable<Story["play"]>>[0];

async function fillInAndSend({ canvas, userEvent }: PlayContext, values: ContactValues): Promise<void> {
  await userEvent.type(canvas.getByLabelText(/Full name/), values.name);
  await userEvent.type(canvas.getByLabelText(/Email address/), values.email);
  await userEvent.type(canvas.getByLabelText(/Subject/), values.subject);
  await userEvent.type(canvas.getByLabelText(/Your message/), values.message);
  await userEvent.click(canvas.getByRole("button", { name: "Send message" }));
}

export const Default: Story = {};

export const ShowsErrorsWhenEmpty: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Send message" }));
    await expect(canvas.getByRole("alert")).toHaveTextContent("Please correct 4 fields below.");
    await expect(canvas.getByLabelText(/Full name/)).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByLabelText(/Email address/)).toHaveAttribute("aria-invalid", "true");
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const ShowsEmailError: Story = {
  play: async (context) => {
    const { canvas, args } = context;
    await fillInAndSend(context, {
      name: "Rawand",
      email: "rawand@",
      subject: "Hello",
      message: "This is a test message.",
    });
    await expect(canvas.getByRole("alert")).toHaveTextContent("Please correct 1 field below.");
    await expect(canvas.getByText(/correct format/)).toBeVisible();
    await expect(canvas.getByLabelText(/Email address/)).toHaveValue("rawand@");
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const SubmitsValidForm: Story = {
  play: async (context) => {
    const { canvas, args } = context;
    const values = {
      name: "Rawand",
      email: "hello@rwd.lol",
      subject: "Project request",
      message: "I would like to talk about a project.",
    };
    await fillInAndSend(context, values);
    await expect(canvas.getByRole("status")).toHaveTextContent("Message sent");
    await expect(args.onSubmit).toHaveBeenCalledOnce();
    await expect(args.onSubmit).toHaveBeenCalledWith(values);
    await expect(canvas.getByLabelText(/Full name/)).toHaveValue("");
  },
};
