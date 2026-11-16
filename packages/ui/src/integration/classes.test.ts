import { describe, it, expect } from "vitest";
import { classesInHtml, classesInJs } from "./classes.js";

const owned = new Set([
  "btn",
  "btn--sm",
  "btn--lg",
  "btn--primary",
  "card",
  "card__title",
]);

describe("classesInHtml", () => {
  it("reads double- and single-quoted class attributes", () => {
    const used = classesInHtml(
      `<a class="btn btn--sm">x</a><p class='card'>y</p>`,
    );
    expect([...used].sort()).toEqual(["btn", "btn--sm", "card"]);
  });
});

describe("classesInJs", () => {
  it("keeps every class of a block whose code is in the bundle", () => {
    const used = classesInJs("const c=`btn btn--${size}`", owned);
    expect([...used].sort()).toEqual([
      "btn",
      "btn--lg",
      "btn--primary",
      "btn--sm",
    ]);
  });

  it("ignores blocks that are not in the bundle", () => {
    expect(classesInJs('console.log("hello")', owned).size).toBe(0);
  });
});
