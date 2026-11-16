import { Input, Button, Alert } from "@rwdlol/ui/html";
import {
  contactFields,
  validateContact,
  type ContactValues,
} from "../../data/contactForm";

/** Server-safe HTML for the form (used by Astro and Storybook). */
export function ContactForm(): string {
  const fields = contactFields
    .map(
      (field) =>
        `<div class="contact-form__field" data-field="${field.id}">${Input(field)}</div>`,
    )
    .join("");

  return `
    <div class="contact-form">
      <div class="contact-form__status" data-status tabindex="-1"></div>
      <form class="contact-form__form" novalidate data-contact-form>
        ${fields}
        ${Button({ label: "Send message", type: "submit" })}
      </form>
    </div>`;
}

/**
 * Adds browser behaviour (validation, messages) to a rendered ContactForm.
 * `onSubmit` is called with the values when the form is valid.
 */
export function initContactForm(
  root: ParentNode,
  onSubmit?: (values: ContactValues) => void,
): void {
  const form = root.querySelector<HTMLFormElement>("[data-contact-form]");
  const status = root.querySelector<HTMLElement>("[data-status]");
   if (!form || !status || form.dataset.ready) return; 
  form.dataset.ready = 'true';

  const renderFields = (
    values: ContactValues = {},
    errors: ContactValues = {},
  ) => {
    for (const field of contactFields) {
      const wrapper = form.querySelector<HTMLElement>(
        `[data-field="${field.id}"]`,
      );
      if (wrapper)
        wrapper.innerHTML = Input({
          ...field,
          value: values[field.id],
          error: errors[field.id],
        });
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const values: ContactValues = Object.fromEntries(
      [...new FormData(form).entries()].map(([key, value]) => [
        key,
        String(value),
      ]),
    );
    const errors = validateContact(values);
    const errorCount = Object.keys(errors).length;

    if (errorCount > 0) {
      renderFields(values, errors);
      status.innerHTML = Alert({
        type: "error",
        title: "There is a problem",
        message: `Please correct ${errorCount} ${errorCount === 1 ? "field" : "fields"} below.`,
      });
      status.focus();
      return;
    }

    onSubmit?.(values);
    renderFields();
    status.innerHTML = Alert({
      type: "success",
      title: "Message sent",
      message: `Thank you, ${values.name}. We will reply to ${values.email}.`,
    });
    status.focus();
  });
}
