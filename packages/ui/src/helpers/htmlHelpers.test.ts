import { describe, it, expect } from "vitest";
import { escapeHtml, joinClassNames, makeAttributes } from "./htmlHelpers.ts";

describe("escapeHtml", () => {
  it("escapes HTML special characters", () => {
    expect(escapeHtml("<script>\"x\" & 'y'</script>")).toBe(
      "&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;",
    );
  });

  it("returns an empty string for null and undefined", () => {
    expect(escapeHtml(undefined)).toBe("");
    expect(escapeHtml(null)).toBe("");
  });

  it("converts numbers to strings", () => {
    expect(escapeHtml(42)).toBe("42");
  });
});

describe("joinClassNames", () => {
  it("joins truthy class names", () => {
    expect(joinClassNames("btn", false, "btn--primary", undefined, null, "")).toBe(
      "btn btn--primary",
    );
  });
});

describe("makeAttributes", () => {
  it("renders strings, booleans and skips empty values", () => {
    expect(
      makeAttributes({ id: "name", required: true, disabled: false, title: undefined }),
    ).toBe(' id="name" required');
  });

  it("escapes attribute values", () => {
    expect(makeAttributes({ title: 'say "hi"' })).toBe(' title="say &quot;hi&quot;"');
  });
});
