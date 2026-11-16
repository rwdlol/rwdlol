import type { Meta, StoryObj } from "@storybook/html-vite";
import { Header, Hero, Card, Alert, Footer, initHeader } from "@rwdlol/ui/html";
import { demoSite } from "@data/site";
import { services } from "@data/demoContent";

interface DemoPageArgs {
  showAlert: boolean;
}

function demoAlert(showAlert: boolean): string {
  if (!showAlert) return "";
  const alert = Alert({
    type: "info",
    title: "This is a demo",
    message: "City Services is a fictional website built with the components from rwd.lol.",
  });
  return `<div class="container" style="margin-top: var(--space-8)">${alert}</div>`;
}

function servicesSection(): string {
  let cards = "";
  for (const service of services) cards += Card(service);
  return `
    <section class="container" style="margin-top: var(--space-8)">
      <h2>Popular services</h2>
      <div style="display:grid; gap: var(--space-6); grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))">
        ${cards}
      </div>
    </section>`;
}

function renderDemoPageLikeAstroDoes({ showAlert }: DemoPageArgs): HTMLElement {
  const page = document.createElement("div");
  page.innerHTML = `
    ${Header({ siteName: demoSite.name, brandHref: demoSite.brandHref, links: demoSite.nav, currentPath: "/demo/" })}
    <main>
      ${Hero({
        title: "Online services for residents",
        text: "Apply for permits, book appointments and contact the administration, all in one place.",
        primaryLabel: "View services",
        primaryHref: "#services",
        secondaryLabel: "Contact us",
        secondaryHref: "/demo/contact/",
      })}
      ${demoAlert(showAlert)}
      ${servicesSection()}
    </main>
    ${Footer({ links: demoSite.footerNav, copyright: demoSite.copyright })}`;
  initHeader(page);
  return page;
}

const meta = {
  title: "Pages/Demo",
  parameters: { layout: "fullscreen" },
  args: { showAlert: true },
  render: renderDemoPageLikeAstroDoes,
} satisfies Meta<DemoPageArgs>;

export default meta;
type Story = StoryObj<DemoPageArgs>;

export const Default: Story = {};

export const WithoutAlert: Story = {
  args: { showAlert: false },
};

export const OnAPhone: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
