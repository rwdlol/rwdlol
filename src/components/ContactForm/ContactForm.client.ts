import { Input, Alert } from "@rwdlol/ui/html";
import { contactFields, validateContact, type ContactValues, type ContactErrors } from "../../data/contactForm";

function redrawFields(form: HTMLFormElement, values: ContactValues = {}, errors: ContactErrors = {}): void {
  for (const field of contactFields) {
    const wrapper = form.querySelector<HTMLElement>(`[data-field="${field.id}"]`);
    if (!wrapper) continue;
    wrapper.innerHTML = Input({ ...field, value: values[field.id], error: errors[field.id] });
  }
}

function readValues(form: HTMLFormElement): ContactValues {
  const values: ContactValues = {};
  for (const [key, value] of new FormData(form).entries()) values[key] = String(value);
  return values;
}

function showErrorSummary(status: HTMLElement, errorCount: number): void {
  const fieldWord = errorCount === 1 ? "field" : "fields";
  status.innerHTML = Alert({
    type: "error",
    title: "There is a problem",
    message: `Please correct ${errorCount} ${fieldWord} below.`,
  });
  status.focus();
}

function showThankYou(status: HTMLElement, values: ContactValues): void {
  status.innerHTML = Alert({
    type: "success",
    title: "Message sent",
    message: `Thank you, ${values.name}. We will reply to ${values.email}.`,
  });
  status.focus();
}

export function initContactForm(root: ParentNode, onSubmit?: (values: ContactValues) => void): void {
  const form = root.querySelector<HTMLFormElement>("[data-contact-form]");
  const status = root.querySelector<HTMLElement>("[data-status]");
  if (!form || !status || form.dataset.ready) return;
  form.dataset.ready = "true";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = readValues(form);
    const errors = validateContact(values);
    const errorCount = Object.keys(errors).length;

    if (errorCount > 0) {
      redrawFields(form, values, errors);
      showErrorSummary(status, errorCount);
      return;
    }

    onSubmit?.(values);
    redrawFields(form);
    showThankYou(status, values);
  });
}
