import KenKaneki from "../assets/images/ken-kaneki.png";
import Centipede1 from "../assets/images/centipede1.png";
import Centipede4 from "../assets/images/centipede4.png";

export default function Hero() {
  return (
    <section className="relative flex h-fit min-h-dvh w-full flex-col items-center justify-center p-5 py-44">
      <Image src={KenKaneki} alt="© Ken Kaneki" />
      <h1 className="rwd-text-shadow mt-4 text-4xl font-bold text-white md:text-5xl">
        Rawand Khalid
      </h1>
      <p className="text-xl md:text-2xl">Full-Stack Web Developer</p>
      <div className="absolute top-0 left-0 z-10 h-auto w-full max-w-96 overflow-hidden opacity-20 blur-xs 2xl:max-w-xl">
        <img
          src={Centipede1}
          alt="© Centipede"
          fetchPriority="high"
          className="centipede-animation h-auto w-full max-w-96 2xl:max-w-xl"
        />
      </div>
      <div className="absolute right-0 bottom-0 z-10 h-auto w-full max-w-96 overflow-hidden opacity-20 blur-xs 2xl:max-w-xl">
        <img
          src={Centipede4}
          alt="© Centipede"
          fetchPriority="high"
          className="centipede-animation-slow h-auto w-full max-w-96 2xl:max-w-xl"
        />
      </div>
    </section>
  );
}

function Image({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative mb-4 h-fit w-fit scale-110 -rotate-3 transition-all duration-500 ease-out select-none lg:scale-100 lg:rotate-0 lg:hover:scale-110 lg:hover:-rotate-3">
      <img
        src={src}
        alt={alt}
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 z-0 h-56 w-56 rounded-2xl blur-3xl brightness-100 grayscale-0 saturate-150 filter transition-all duration-500 ease-out lg:blur-xl lg:brightness-75 lg:grayscale lg:group-hover:blur-3xl lg:group-hover:brightness-100 lg:group-hover:grayscale-0 lg:group-hover:saturate-150"
      />
      <img
        src={src}
        alt={alt}
        fetchPriority="high"
        className="relative z-10 h-56 w-56 rounded-2xl border-2 border-zinc-950 object-cover brightness-100 grayscale-0 saturate-150 filter transition-all duration-500 ease-out lg:brightness-75 lg:grayscale lg:group-hover:brightness-100 lg:group-hover:grayscale-0 lg:group-hover:saturate-150"
      />
      <p className="absolute bottom-1/2 -left-20 h-fit w-fit -rotate-90 rounded-md bg-white/10 p-1 px-3 text-white transition-all duration-400 ease-out lg:left-0 lg:group-hover:-left-20">
        {alt}
      </p>
    </div>
  );
}
