import type { Meta, StoryObj } from "@storybook/html-vite";
import { expect, fn } from "storybook/test";
import { ContactForm, initContactForm } from "./ContactForm";
import type { ContactValues } from "../../data/contactForm";

interface ContactFormArgs {
  onSubmit: (values: ContactValues) => void;
}

const meta = {
  title: "Forms/ContactForm",
  args: {
    onSubmit: fn(),
  },
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

export const Default: Story = {};

export const ShowsErrorsWhenEmpty: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Send message" }));

    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "Please correct 4 fields below.",
    );

    await expect(canvas.getByLabelText(/Full name/)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(canvas.getByLabelText(/Email address/)).toHaveAttribute(
      "aria-invalid",
      "true",
    );

    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const ShowsEmailError: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.type(canvas.getByLabelText(/Full name/), "Rawand");
    await userEvent.type(canvas.getByLabelText(/Email address/), "rawand@");
    await userEvent.type(canvas.getByLabelText(/Subject/), "Hello");
    await userEvent.type(
      canvas.getByLabelText(/Your message/),
      "This is a test message.",
    );
    await userEvent.click(canvas.getByRole("button", { name: "Send message" }));

    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "Please correct 1 field below.",
    );
    await expect(canvas.getByText(/correct format/)).toBeVisible();
    await expect(canvas.getByLabelText(/Email address/)).toHaveValue("rawand@");
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const SubmitsValidForm: Story = {
  play: async ({ canvas, userEvent, args, step }) => {
    await step("Fill in the form", async () => {
      await userEvent.type(canvas.getByLabelText(/Full name/), "Rawand");
      await userEvent.type(
        canvas.getByLabelText(/Email address/),
        "hello@rwd.lol",
      );
      await userEvent.type(canvas.getByLabelText(/Subject/), "Project request");
      await userEvent.type(
        canvas.getByLabelText(/Your message/),
        "I would like to talk about a project.",
      );
    });

    await step("Submit", async () => {
      await userEvent.click(
        canvas.getByRole("button", { name: "Send message" }),
      );
    });

    await expect(canvas.getByRole("status")).toHaveTextContent("Message sent");
    await expect(args.onSubmit).toHaveBeenCalledOnce();
    await expect(args.onSubmit).toHaveBeenCalledWith({
      name: "Rawand",
      email: "hello@rwd.lol",
      subject: "Project request",
      message: "I would like to talk about a project.",
    });
    await expect(canvas.getByLabelText(/Full name/)).toHaveValue("");
  },
};
