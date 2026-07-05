import { Bug } from "lucide-react";
import Centipede2 from "../assets/images/centipede2.png";

type SkillCategories = Record<string, readonly string[]>;

const skills: SkillCategories = {
  frontend: [
    "JS/TS",
    "React",
    "Next.js",
    "HTML/CSS",
    "SASS/SCSS",
    "Framer Motion",
  ],
  backend: ["Laravel", "Node.js", "Express.js", "Bun", "PHP", "Rest API"],
  "cloud / devops": [
    "AWS",
    "Azure",
    "Google Cloud",
    "Cloudflare",
    "Vercel",
    "DigitalOcean",
  ],
  tools: ["Git", "Docker", "Figma", "Postman", "VS Code", "Sublime Text"],
  database: ["PostgreSQL", "MariaDB/MySQL", "SQLite"],
  cms: ["WordPress", "Drupal", "Blogger.com"],
  server: ["Linux", "Nginx/Apache", "PM2", "cPanel"],
  languages: ["Kurdish", "English", "Arabic", "German"],
} as const;

export default function Skills() {
  const skillGroups = Object.entries(skills) as Array<
    [keyof typeof skills, readonly string[]]
  >;

  return (
    <section className="relative">
      <div className="relative mx-auto flex h-fit min-h-dvh w-full max-w-5xl flex-col justify-center gap-6 p-5 py-44">
        <h2 className="flex items-center gap-2 text-3xl font-bold text-white">
          <Bug size={44} color="white" className="rwd-box-shadow" />{" "}
          <span className="rwd-text-shadow">Skills</span>
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {skillGroups.map(([category, items]) => (
            <div key={category} className="flex flex-col gap-2">
              <h3 className="text-zinc-200 uppercase">{category}</h3>
              <ul className="flex flex-col gap-1">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="-mx-2 block rounded-md p-0.5 px-2 transition-all duration-300 ease-out hover:bg-white/10"
                  >
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 bottom-0 z-10 h-auto w-full max-w-96 overflow-hidden opacity-20 blur-xs 2xl:max-w-xl">
        <img
          src={Centipede2}
          alt="© Centipede"
          fetchPriority="high"
          className="centipede-animation h-auto w-full max-w-96 2xl:max-w-xl"
        />
      </div>
    </section>
  );
}
