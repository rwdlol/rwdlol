import { ReactLenis, useLenis } from "lenis/react";

import Awards from "./components/Awards";
import Footer from "./components/Footer";
import GlowCursor from "./components/GlowCursor";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

export default function App() {
  useLenis();

  return (
    <ReactLenis
      root
      options={{ lerp: 0.06, wheelMultiplier: 0.7, touchMultiplier: 0.7 }}
    >
      <Hero />
      <Awards />
      <Skills />
      <Projects />
      <Footer />
      <GlowCursor />
    </ReactLenis>
  );
}
