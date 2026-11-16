import { describe, it, expect } from "vitest";
import { purge, classesInHtml, classesInJs, stylesheetLinks, scriptSources, jsImports } from './integration.js';

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

describe('stylesheetLinks', () => {
  it('finds local stylesheets only', () => {
    const html = `
      <link rel="stylesheet" href="/_astro/a.css">
      <link href="/_astro/b.css" rel="stylesheet">
      <link rel="icon" href="/logo.svg">
      <link rel="stylesheet" href="https://cdn.example.com/x.css">`;
    expect(stylesheetLinks(html).map((l) => l.href)).toEqual(['/_astro/a.css', '/_astro/b.css']);
  });
});

describe('scriptSources', () => {
  it('finds script files and module preloads', () => {
    const html = `
      <script type="module" src="/_astro/Header.js"></script>
      <link rel="modulepreload" href="/_astro/chunk.js">
      <script type="module">console.log(1)</script>
      <script src="https://cdn.example.com/x.js"></script>`;
    expect(scriptSources(html)).toEqual(['/_astro/Header.js', '/_astro/chunk.js']);
  });
});

describe('jsImports', () => {
  it('finds static and dynamic relative imports', () => {
    const js = `import{a as b}from"./chunk.Ab12.js";import"./side.js";const c=()=>import("../lazy.js");import x from"astro";`;
    expect(jsImports(js)).toEqual(['./chunk.Ab12.js', './side.js', '../lazy.js']);
  });
});
