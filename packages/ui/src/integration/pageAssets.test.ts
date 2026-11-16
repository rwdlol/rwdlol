import { describe, it, expect } from "vitest";
import { stylesheetLinks, scriptSources, jsImports } from "./pageAssets.js";

describe("stylesheetLinks", () => {
  it("finds local stylesheets only", () => {
    const html = `
      <link rel="stylesheet" href="/_astro/a.css">
      <link href="/_astro/b.css" rel="stylesheet">
      <link rel="icon" href="/logo.svg">
      <link rel="stylesheet" href="https://cdn.example.com/x.css">`;
    expect(stylesheetLinks(html).map((l) => l.href)).toEqual(["/_astro/a.css", "/_astro/b.css"]);
  });
});

describe("scriptSources", () => {
  it("finds script files and module preloads", () => {
    const html = `
      <script type="module" src="/_astro/Header.js"></script>
      <link rel="modulepreload" href="/_astro/chunk.js">
      <script type="module">console.log(1)</script>
      <script src="https://cdn.example.com/x.js"></script>`;
    expect(scriptSources(html)).toEqual(["/_astro/Header.js", "/_astro/chunk.js"]);
  });
});

describe("jsImports", () => {
  it("finds static and dynamic relative imports", () => {
    const js = `import{a as b}from"./chunk.Ab12.js";import"./side.js";const c=()=>import("../lazy.js");import x from"astro";`;
    expect(jsImports(js)).toEqual(["./chunk.Ab12.js", "./side.js", "../lazy.js"]);
  });
});
