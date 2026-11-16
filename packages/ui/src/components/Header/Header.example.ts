import { Header, type HeaderProps } from "@rwdlol/ui/components/Header/Header.ts";
import { initHeader } from "@rwdlol/ui/components/Header/Header.client.ts";

export const exampleHeaderArgs: HeaderProps = {
  siteName: "City Services",
  links: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/contact" },
  ],
  currentPath: "/",
};

export function renderHeaderLikeAstroDoes(args: HeaderProps): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = Header(args);
  initHeader(wrapper);
  return wrapper;
}
