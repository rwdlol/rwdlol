import { makeHeaderMinimalHtml, type HeaderMinimalProps } from "./HeaderMinimal.html.ts";
import { HeaderMinimal } from "./HeaderMinimal.browser.ts";

export const exampleHeaderArgs: HeaderMinimalProps = {
  siteName: "MyCity",
  links: [
    { label: "About us", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/contact" },
  ],
  currentPath: "/",
};

export function renderHeaderLikeAstroDoes(args: HeaderMinimalProps): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = makeHeaderMinimalHtml(args);
  new HeaderMinimal(wrapper.querySelector(".header-minimal")!);
  return wrapper;
}
