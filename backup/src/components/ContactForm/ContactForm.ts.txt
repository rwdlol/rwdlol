import { Input, Button, Alert, type InputProps } from "@rwdlol/ui/html";

export type ContactValues = Record<string, string>;

// 1. The fields of the form
const fields: InputProps[] = [
  { id: "name", label: "Full name", autocomplete: "name", required: true },
  { id: "email", label: "Email address", type: "email", autocomplete: "email", required: true, hint: "We only use your email address to reply to your message." },
  { id: "subject", label: "Subject", required: true },
  { id: "message", label: "Your message", multiline: true, required: true, hint: "At least 10 characters." },
];

// 2. Check the values. Returns an error message per invalid field.
function validate(values: ContactValues): ContactValues {
  const errors: ContactValues = {};
  if (!values.name.trim()) errors.name = "Enter your full name";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter an email address in the correct format, like name@example.com";
  if (!values.subject.trim()) errors.subject = "Enter a subject";
  if (values.message.trim().length < 10) errors.message = "Your message must be at least 10 characters";
  return errors;
}

// 3. The HTML inside the <form>
function formContent(values: ContactValues = {}, errors: ContactValues = {}): string {
  const inputs = fields.map((field) => Input({ ...field, value: values[field.id], error: errors[field.id] }));
  return inputs.join("") + Button({ label: "Send message", type: "submit" });
}

// 4. The whole component (server / Storybook)
export function ContactForm(): string {
  return `
    <div class="contact-form">
      <div class="contact-form__status" tabindex="-1"></div>
      <form class="contact-form__form" novalidate>${formContent()}</form>
    </div>`;
}

// 5. Browser behaviour: validate on submit, show errors or a thank-you message
export function initContactForm(root: ParentNode, onSubmit: (values: ContactValues) => void): void {
  const form = root.querySelector<HTMLFormElement>(".contact-form__form");
  const status = root.querySelector<HTMLElement>(".contact-form__status");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form)) as ContactValues;
    const errors = validate(values);
    const count = Object.keys(errors).length;

    if (count > 0) {
      form.innerHTML = formContent(values, errors);
      status.innerHTML = Alert({ type: "error", title: "There is a problem", message: `Please correct ${count} ${count === 1 ? "field" : "fields"} below.` });
    } else {
      onSubmit(values);
      form.innerHTML = formContent();
      status.innerHTML = Alert({ type: "success", title: "Message sent", message: `Thank you, ${values.name}. We will reply to ${values.email}.` });
    }
    status.focus();
  });
}
