import { Medal } from "lucide-react";
import Centipede2 from "../assets/images/centipede3.png";
import SilverMedalWSG2025 from "../assets/images/sliver_medal_wsg_2025.png";

export default function Awards() {
  return (
    <section className="relative">
      <div className="relative mx-auto flex h-fit min-h-dvh w-full max-w-5xl flex-col justify-center gap-6 p-5 py-44">
        <h2 className="flex items-center gap-2 text-3xl font-bold text-white">
          <Medal size={44} color="white" className="rwd-box-shadow" />{" "}
          <span className="rwd-text-shadow">Awards</span>
        </h2>

        <div className="flex flex-col-reverse gap-4 overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950 md:flex-row">
          <div className="flex flex-col gap-2 p-6">
            <h3 className="text-xl text-zinc-200">
              Skill 17 WorldSkills Germany
            </h3>
            <p className="leading-relaxed">
              Won the <strong className="text-zinc-200">Silver Medal</strong> at
              WorldSkills Germany 2025 (Skill 17), qualifying for the{" "}
              <strong className="text-zinc-200">
                Albert Einstein Cup 2026
              </strong>
              . There, I represented Germany against 11 nations and secured{" "}
              <strong className="text-zinc-200">5th place</strong>. Today, I am
              a member of the{" "}
              <strong className="text-zinc-200">
                National Team for Skill 17
              </strong>
              , contributing as a trainer and jury member.
            </p>
          </div>
          <div className="flex h-fit w-full p-4 pt-0">
            <img
              src={SilverMedalWSG2025}
              alt="Silver Medal WSG 2025"
              className="mx-auto h-auto w-full max-w-60 min-w-60"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-10 h-auto w-full max-w-96 overflow-hidden opacity-20 blur-xs 2xl:max-w-xl">
        <img
          src={Centipede2}
          alt="© Centipede"
          className="centipede-animation"
        />
      </div>
    </section>
  );
}
