import { useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

export default function GlowCursor() {
  const [position, setPosition] = useState<Position>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = (): void => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return isVisible ? (
    <div
      className="pointer-events-none fixed top-0 left-0 h-8 w-8 rounded-full bg-white blur-lg transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
    />
  ) : null;
}
