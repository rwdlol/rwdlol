import { describe, it, expect } from "vitest";
import { purge } from "./purge.js";


const owned = new Set([
  "btn",
  "btn--sm",
  "btn--lg",
  "btn--primary",
  "card",
  "card__title",
]);

const css = `
.btn{display:inline-flex}
.btn--sm{padding:4px}
.btn--lg{padding:12px}
.btn--primary:hover:not(:disabled){color:red}
.card,.card__title{margin:0}
.my-own-class{color:blue}
body{margin:0}
@media (max-width:600px){.btn--lg{padding:8px}}
`;

describe("purge", () => {
  const result = purge(css, owned, new Set(["btn", "btn--sm", "btn--primary"]));

  it("keeps used classes", () => {
    expect(result).toContain(".btn{");
    expect(result).toContain(".btn--sm");
    expect(result).toContain(".btn--primary:hover:not(:disabled)");
  });

  it("removes unused variants and components", () => {
    expect(result).not.toContain("btn--lg");
    expect(result).not.toContain(".card");
  });

  it("removes media queries that become empty", () => {
    expect(result).not.toContain("@media");
  });

  it("never touches classes that are not from @rwdlol/ui", () => {
    expect(result).toContain(".my-own-class");
    expect(result).toContain("body{");
  });

  it("keeps the used part of a selector list", () => {
    const partly = purge(
      ".card,.card__title{margin:0}",
      owned,
      new Set(["card"]),
    );
    expect(partly).toBe(".card{margin:0}");
  });

  it("ignores classes inside :not()", () => {
    const notCss = ".btn:not(.btn--lg){color:red}";
    expect(purge(notCss, owned, new Set(["btn"]))).toBe(notCss);
  });
});
