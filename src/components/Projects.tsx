import { PackageOpen } from "lucide-react";
import Centipede4 from "../assets/images/centipede4.png";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  sourceCode?: string;
  liveDemo: string;
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio website built with React and Tailwind CSS to showcase my projects and skills.",
      technologies: ["React", "Tailwind CSS", "Vite"],
      sourceCode: "https://github.com/rwdlol/portfolio",
      liveDemo: "https://rwdlol.github.io/portfolio",
    },
    {
      title: "Portfolio Website 2",
      description:
        "A personal portfolio website built with React and Tailwind CSS to showcase my projects and skills.",
      technologies: ["React", "Tailwind CSS", "Vite"],
      sourceCode: "https://github.com/rwdlol/portfolio",
      liveDemo: "https://rwdlol.github.io/portfolio",
    },
    {
      title: "Portfolio Website 3",
      description:
        "A personal portfolio website built with React and Tailwind CSS to showcase my projects and skills.",
      technologies: ["React", "Tailwind CSS", "Vite"],
      liveDemo: "https://rwdlol.github.io/portfolio",
    },
    {
      title: "Portfolio Website 4",
      description:
        "A personal portfolio website built with React and Tailwind CSS to showcase my projects and skills.",
      technologies: ["React", "Tailwind CSS", "Vite"],
      sourceCode: "https://github.com/rwdlol/portfolio",
      liveDemo: "https://rwdlol.github.io/portfolio",
    },
  ];

  return (
    <section className="relative z-0">
      <div className="relative z-10 mx-auto flex h-fit min-h-dvh w-full max-w-5xl flex-col justify-center gap-6 p-5 py-44">
        <h2 className="flex items-center gap-2 text-3xl font-bold text-white">
          <PackageOpen size={44} color="white" className="rwd-box-shadow" />{" "}
          <span className="rwd-text-shadow">Projects</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="relative flex flex-col gap-4 rounded-xl border border-zinc-900 bg-zinc-950 p-6 transition-all duration-300 ease-out"
            >
              <h3 className="text-lg font-bold text-zinc-200">
                {project.title}
              </h3>
              <p>{project.description}</p>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full bg-zinc-900 px-3 py-1 text-sm text-zinc-300"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
              {project.sourceCode ? (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-2 text-center transition-all duration-300 ease-out hover:bg-zinc-800"
                  >
                    Source Code
                  </a>
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-2 text-center transition-all duration-300 ease-out hover:bg-zinc-800"
                  >
                    Live Demo
                  </a>
                </div>
              ) : (
                <div className="mt-2 grid grid-cols-1">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-2 text-center transition-all duration-300 ease-out hover:bg-zinc-800"
                  >
                    Live Demo
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-10 h-auto w-full max-w-96 overflow-hidden opacity-20 blur-xs 2xl:max-w-xl">
        <img
          src={Centipede4}
          alt="© Centipede"
          fetchPriority="high"
          className="centipede-animation h-auto w-full max-w-96 2xl:max-w-xl"
        />
      </div>
    </section>
  );
}
