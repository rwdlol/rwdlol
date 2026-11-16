// Content of the home page (www.rwd.lol). Edit your CV here.
import type { CardProps } from "../components/Card/Card";
import type { SkillListProps } from "../components/SkillList/SkillList";

export const profile = {
  name: "Rawand Khalid",
  intro:
    "I am a full-stack web developer with experience in building, deploying, and maintaining modern web applications. My work covers frontend development, backend systems, databases, cloud platforms, DevOps workflows, CMS platforms, and server management.",
};

export const awards: CardProps[] = [
  {
    title: "Skill 17 WorldSkills Germany",
    text: "Won the Silver Medal at WorldSkills Germany 2025 (Skill 17), qualifying for the Albert Einstein Cup 2026. There, I represented Germany against 11 nations and secured 5th place. Today, I am a member of the National Team for Skill 17, contributing as a trainer and jury member.",
    headingLevel: 3,
  },
];

export const skills: SkillListProps[] = [
  {
    title: "frontend",
    items: [
      "JS/TS",
      "React",
      "Next.js",
      "HTML/CSS",
      "SASS/SCSS",
      "Framer Motion",
    ],
  },
  {
    title: "backend",
    items: ["Laravel", "Node.js", "Express.js", "Bun", "PHP", "Rust"],
  },
  {
    title: "cloud / devops",
    items: ["Google Cloud", "Cloudflare", "Vercel", "DigitalOcean"],
  },
  {
    title: "tools",
    items: ["Git", "Docker", "Figma", "Postman", "VS Code", "Sublime Text"],
  },
  { title: "database", items: ["SQLite", "MySQL", "MariaDB", "PostgreSQL"] },
  { title: "cms", items: ["WordPress", "Drupal", "Blogger.com"] },
  {
    title: "server",
    items: ["Linux Ubuntu/Debian", "Nginx/Apache", "PM2", "cPanel"],
  },
  { title: "languages", items: ["Kurdish", "English", "Arabic", "German"] },
];
