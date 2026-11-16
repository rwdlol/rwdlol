import { cx } from "@rwdlol/ui/lib/html.ts";
import type { NavLink } from "@rwdlol/ui/components/Header/Header.ts";

export interface SiteConfig {
  name: string;
  brandHref: string;
  nav: NavLink[];
  footerNav: NavLink[];
  copyright: string;
  icon?: string;
}

export interface BaseLayoutProps {
  title: string;
  description: string;
  site?: SiteConfig;
  lang?: string;
  skipLinkLabel?: string;
}

export function canonicalUrl(pathname: string, site: URL | undefined): string | undefined {
  if (!site) return undefined;
  return new URL(pathname, site).href;
}

export function contentClassName(hasAside: boolean): string {
  return cx("base-layout__content", hasAside && "base-layout__content--with-aside");
}
