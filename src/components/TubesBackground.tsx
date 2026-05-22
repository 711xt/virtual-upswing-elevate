import { useEffect, useRef } from "react";

declare global {
  interface Window {
    tubesCursor?: (canvas: HTMLCanvasElement, opts: { colors: number[] }) => {
      setColors: (colors: number[]) => void;
      dispose?: () => void;
    };
  }
}

// Deep teal + muted lime palette
const PALETTES: number[][] = [
  [0x00827a, 0x5ead6e],
  [0x00827a, 0x1a1a1a],
  [0x5ead6e, 0x00827a],
  [0x004d47, 0x5ead6e],
  [0x00827a, 0x3d8b50],
];

export default function TubesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<ReturnType<NonNullable<Window["tubesCursor"]>> | null>(null);

  useEffect(() => {
    let cancelled = false;
    const SRC = "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

    const init = () => {
      if (cancelled || !canvasRef.current || !window.tubesCursor) return;
      appRef.current = window.tubesCursor(canvasRef.current, {
        colors: PALETTES[0],
      });
    };

    if (window.tubesCursor) {
      init();
    } else {
      const existing = document.querySelector(`script[src="${SRC}"]`) as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener("load", init);
      } else {
        const s = document.createElement("script");
        s.src = SRC;
        s.async = true;
        s.onload = init;
        document.head.appendChild(s);
      }
    }

    const handleClick = () => {
      if (!appRef.current) return;
      const next = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      appRef.current.setColors(next);
    };
    window.addEventListener("click", handleClick);

    return () => {
      cancelled = true;
      window.removeEventListener("click", handleClick);
      appRef.current?.dispose?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
