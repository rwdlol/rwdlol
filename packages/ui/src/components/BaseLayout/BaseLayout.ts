export interface BaseLayoutProps {
  title: string;
  description: string;
  lang?: string;
  skipLinkLabel?: string;
}

export function canonicalUrl(pathname: string, site: URL | undefined): string | undefined {
  if (!site) return undefined;
  return new URL(pathname, site).href;
}
