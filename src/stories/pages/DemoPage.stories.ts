import type { Meta, StoryObj } from "@storybook/html-vite";
import { Header, Hero, Card, Alert, Footer } from "@rwdlol/ui/html";
import { demoSite, services } from "../../data/site";

interface DemoPageArgs {
  showAlert: boolean;
}

const meta = {
  title: "Pages/Demo",
  parameters: { layout: "fullscreen" },
  args: { showAlert: true },
  render: ({ showAlert }) => `
    ${Header({ siteName: demoSite.name, brandHref: demoSite.brandHref, links: demoSite.nav, currentPath: "/demo" })}
    <main>
      ${Hero({
        title: "Online services for residents",
        text: "Apply for permits, book appointments and contact the administration, all in one place.",
        primaryLabel: "View services",
        primaryHref: "#services",
        secondaryLabel: "Contact us",
        secondaryHref: "/demo/contact",
      })}
      ${
        showAlert
          ? `<div class="container" style="margin-top: var(--space-8)">
               ${Alert({ type: "info", title: "This is a demo", message: "City Services is a fictional website built with the components from rwd.lol." })}
             </div>`
          : ""
      }
      <section class="container" style="margin-top: var(--space-8)">
        <h2>Popular services</h2>
        <div style="display:grid; gap: var(--space-6); grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))">
          ${services.map((service) => Card(service)).join("")}
        </div>
      </section>
    </main>
    ${Footer({ links: demoSite.footerNav, copyright: demoSite.copyright })}
  `,
} satisfies Meta<DemoPageArgs>;

export default meta;
type Story = StoryObj<DemoPageArgs>;

export const Default: Story = {};

export const WithoutAlert: Story = {
  args: { showAlert: false },
};
