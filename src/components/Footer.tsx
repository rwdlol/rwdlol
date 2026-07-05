import { Bug } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative h-fit w-full border-t border-zinc-900 bg-zinc-950 p-5 py-8">
      <div className="mx-auto flex h-fit w-full max-w-5xl flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <p className="text-center">
          © 2026 All rights reserved.{" "}
          <span className="font-bold text-white">rwd.lol</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <SocialLink />
        </div>
      </div>
    </footer>
  );
}

function SocialLink() {
  return (
    <a
      href="https://github.com/rwdlol"
      target="_blank"
      rel="noreferrer"
      className="flex h-8 w-8 flex-col items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-center transition-all duration-300 ease-out hover:bg-zinc-800"
      aria-label="GitHub Profile"
    >
      <Bug size={24} color="white" />
    </a>
  );
}
