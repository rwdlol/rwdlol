import { expect } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/html-vite";
import { Header } from "../../components/Header/Header";
import { Hero } from "../../components/Hero/Hero";
import { Card } from "../../components/Card/Card";
import { SkillList } from "../../components/SkillList/SkillList";
import { Footer } from "../../components/Footer/Footer";
import { mainSite } from "../../data/site";
import { profile, awards, skills } from "../../data/profile";

// Preview of www.rwd.lol (src/pages/index.astro), built from the same components and data.
const meta = {
  title: "Pages/Home",
  parameters: { layout: "fullscreen" },
  render: () => `
    ${Header({ siteName: mainSite.name, brandHref: mainSite.brandHref, links: mainSite.nav, currentPath: "/" })}
    <main>
      ${Hero({
        title: profile.name,
        text: profile.intro,
        primaryLabel: "View demo website",
        primaryHref: "/demo",
        secondaryLabel: "Open Storybook",
        secondaryHref: "/storybook/",
      })}
      <section class="container" style="margin-top: var(--space-12)">
        <h2>Awards</h2>
        <div style="max-width: 720px">${awards.map((award) => Card(award)).join("")}</div>
      </section>
      <section class="container" style="margin-top: var(--space-12)">
        <h2>Skills</h2>
        <div style="display:grid; gap: var(--space-8); grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))">
          ${skills.map((group) => SkillList(group)).join("")}
        </div>
      </section>
    </main>
    ${Footer({ links: mainSite.footerNav, copyright: mainSite.copyright })}
  `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

// ---------- Page tests ----------
export const PageStructure: Story = {
  play: async ({ canvas, step }) => {
    await step("Landmarks", async () => {
      await expect(canvas.getByRole("banner")).toBeInTheDocument();
      await expect(canvas.getByRole("main")).toBeInTheDocument();
      await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();
    });

    await step("Exactly one h1 with the name", async () => {
      await expect(canvas.getAllByRole("heading", { level: 1 })).toHaveLength(
        1,
      );
      await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(
        profile.name,
      );
    });

    await step("Links to demo and Storybook", async () => {
      await expect(
        canvas.getByRole("link", { name: "View demo website" }),
      ).toHaveAttribute("href", "/demo");
      await expect(
        canvas.getByRole("link", { name: "Open Storybook" }),
      ).toHaveAttribute("href", "/storybook/");
    });

    await step("One list per skill group", async () => {
      await expect(canvas.getAllByRole("list")).toHaveLength(skills.length + 2); // + header nav + footer nav
    });
  },
};
