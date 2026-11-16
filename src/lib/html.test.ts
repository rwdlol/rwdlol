import { describe, it, expect } from "vitest";
import { esc, cx, attrs } from "./html";

describe("esc", () => {
  it("escapes HTML special characters", () => {
    expect(esc("<script>\"x\" & 'y'</script>")).toBe(
      "&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;",
    );
  });

  it("returns an empty string for null and undefined", () => {
    expect(esc(undefined)).toBe("");
    expect(esc(null)).toBe("");
  });

  it("converts numbers to strings", () => {
    expect(esc(42)).toBe("42");
  });
});

describe("cx", () => {
  it("joins truthy class names", () => {
    expect(cx("btn", false, "btn--primary", undefined, null, "")).toBe(
      "btn btn--primary",
    );
  });
});

describe("attrs", () => {
  it("renders strings, booleans and skips empty values", () => {
    expect(
      attrs({ id: "name", required: true, disabled: false, title: undefined }),
    ).toBe(' id="name" required');
  });

  it("escapes attribute values", () => {
    expect(attrs({ title: 'say "hi"' })).toBe(' title="say &quot;hi&quot;"');
  });
});
