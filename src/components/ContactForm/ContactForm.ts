import { Input, Button } from "@rwdlol/ui/html";
import { contactFields } from "../../data/contactForm";

export function ContactForm(): string {
  let fields = "";
  for (const field of contactFields) {
    fields += `<div class="contact-form__field" data-field="${field.id}">${Input(field)}</div>`;
  }

  return `
    <div class="contact-form">
      <div class="contact-form__status" data-status tabindex="-1"></div>
      <form class="contact-form__form" novalidate data-contact-form>
        ${fields}
        ${Button({ label: "Send message", type: "submit" })}
      </form>
    </div>`;
}
