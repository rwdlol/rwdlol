import type { AstroIntegration } from 'astro';

export interface RwdlolUiOptions {
  /** Classes to always keep, e.g. ['btn--lg'] for classes you add yourself with JavaScript. */
  safelist?: string[];
}

/** Ships only the @rwdlol/ui CSS your built pages actually use. */
export default function rwdlolUi(options?: RwdlolUiOptions): AstroIntegration;

// Helpers, exported for tests.
export function classesInHtml(html: string): Set<string>;
export function classesInJs(js: string, owned: Set<string>): Set<string>;
export function purge(css: string, owned: Set<string>, used: Set<string>): string;
export function stylesheetLinks(html: string): { tag: string; href: string }[];
export function scriptSources(html: string): string[];
export function jsImports(js: string): string[];