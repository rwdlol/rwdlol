import type { AstroIntegration } from "astro";

export interface RwdlolUiOptions {
  safelist?: string[];
}

export default function rwdlolUi(options?: RwdlolUiOptions): AstroIntegration;
