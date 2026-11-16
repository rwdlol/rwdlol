import { describe, it, expect } from "vitest";
import { validateContact } from "./contactForm";

const valid = {
  name: "Rawand",
  email: "hello@rwd.lol",
  subject: "Hello",
  message: "This is long enough.",
};

describe("validateContact", () => {
  it("accepts valid values", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires every field", () => {
    expect(Object.keys(validateContact({}))).toEqual([
      "name",
      "email",
      "subject",
      "message",
    ]);
  });

  it.each(["rawand", "rawand@", "@rwd.lol", "raw and@rwd.lol"])(
    'rejects invalid email "%s"',
    (email) => {
      expect(validateContact({ ...valid, email }).email).toBeDefined();
    },
  );

  it("rejects messages shorter than 10 characters", () => {
    expect(
      validateContact({ ...valid, message: "Too short" }).message,
    ).toBeDefined();
  });

  it("ignores whitespace-only names", () => {
    expect(validateContact({ ...valid, name: "   " }).name).toBeDefined();
  });
});
