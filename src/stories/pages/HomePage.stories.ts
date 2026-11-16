import type { Meta, StoryObj } from "@storybook/html-vite";
import { Header } from "../../components/Header/Header";
import { Hero } from "../../components/Hero/Hero";
import { Card } from "../../components/Card/Card";
import { Alert } from "../../components/Alert/Alert";
import { Footer } from "../../components/Footer/Footer";
import {
  SITE_NAME,
  mainNav,
  footerNav,
  copyright,
  services,
} from "../../data/site";
import { expect } from "storybook/test";

// A preview of the home page assembled from the same components and data as src/pages/index.astro.
interface HomePageArgs {
  showMaintenanceAlert: boolean;
}

const meta = {
  title: "Pages/Home",
  parameters: { layout: "fullscreen" },
  args: { showMaintenanceAlert: true },
  render: ({ showMaintenanceAlert }) => `
    ${Header({ siteName: SITE_NAME, links: mainNav, currentPath: "/" })}
    <main>
      ${Hero({
        title: "Online services for residents",
        text: "Apply for permits, book appointments and contact the administration, all in one place.",
        primaryLabel: "View services",
        primaryHref: "#services",
        secondaryLabel: "Contact us",
        secondaryHref: "/contact",
      })}
      ${
        showMaintenanceAlert
          ? `<div class="container" style="margin-top: var(--space-8)">
               ${Alert({ type: "warning", title: "Planned maintenance", message: "The portal will be unavailable on Saturday from 8:00 to 12:00." })}
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
    ${Footer({ links: footerNav, copyright })}
  `,
} satisfies Meta<HomePageArgs>;

export default meta;
type Story = StoryObj<HomePageArgs>;

export const Default: Story = {};

export const WithoutAlert: Story = {
  args: { showMaintenanceAlert: false },
};

// ---------- Page tests ----------
export const PageStructure: Story = {
  play: async ({ canvas, step }) => {
    await step("Landmarks", async () => {
      await expect(canvas.getByRole("banner")).toBeInTheDocument(); // <header>
      await expect(canvas.getByRole("main")).toBeInTheDocument();
      await expect(canvas.getByRole("contentinfo")).toBeInTheDocument(); // <footer>
    });

    await step("Exactly one h1", async () => {
      await expect(canvas.getAllByRole("heading", { level: 1 })).toHaveLength(
        1,
      );
    });

    await step("Home is the current page", async () => {
      await expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    await step("One card per service", async () => {
      await expect(canvas.getAllByRole("article")).toHaveLength(
        services.length,
      );
    });
  },
};

export const AlertCanBeHidden: Story = {
  args: { showMaintenanceAlert: false },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();
  },
};
