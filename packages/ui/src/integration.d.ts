import type { AstroIntegration } from "astro";

export interface RwdlolUiOptions {
  safelist?: string[];
}

export default function rwdlolUi(options?: RwdlolUiOptions): AstroIntegration;

export function classesInHtml(html: string): Set<string>;
export function classesInJs(js: string, owned: Set<string>): Set<string>;
export function purge(
  css: string,
  owned: Set<string>,
  used: Set<string>,
): string;
export function stylesheetLinks(html: string): { tag: string; href: string }[];
export function scriptSources(html: string): string[];
export function jsImports(js: string): string[];
