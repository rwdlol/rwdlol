import type { InputProps } from "@rwdlol/ui";

export const contactFields: InputProps[] = [
  { id: "name", label: "Full name", autocomplete: "name", required: true },
  {
    id: "email",
    label: "Email address",
    type: "email",
    autocomplete: "email",
    required: true,
    hint: "We only use your email address to reply to your message.",
  },
  { id: "subject", label: "Subject", required: true },
  {
    id: "message",
    label: "Your message",
    multiline: true,
    required: true,
    hint: "At least 10 characters.",
  },
];

export type ContactValues = Record<string, string>;
export type ContactErrors = Record<string, string>;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name?.trim()) {
    errors.name = "Enter your full name";
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email ?? "")) {
    errors.email =
      "Enter an email address in the correct format, like name@example.com";
  }
  if (!values.subject?.trim()) {
    errors.subject = "Enter a subject";
  }
  if ((values.message ?? "").trim().length < 10) {
    errors.message = "Your message must be at least 10 characters";
  }

  return errors;
}
