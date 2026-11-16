import { describe, it, expect } from "vitest";
import { canonicalUrl, contentClassName } from "@rwdlol/ui/components/BaseLayout/BaseLayout.ts";

describe("contentClassName", () => {
  it("adds the aside class only when there is an aside", () => {
    expect(contentClassName(false)).toBe("base-layout__content");
    expect(contentClassName(true)).toBe("base-layout__content base-layout__content--with-aside");
  });
});

describe("canonicalUrl", () => {
  it("joins the page path with the site address", () => {
    expect(canonicalUrl("/demo/", new URL("https://www.rwd.lol"))).toBe("https://www.rwd.lol/demo/");
  });

  it("returns nothing when the Astro config has no site", () => {
    expect(canonicalUrl("/demo/", undefined)).toBeUndefined();
  });
});
