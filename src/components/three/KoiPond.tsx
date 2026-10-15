import { useEffect, useRef, useState } from "react";
import { createPond } from "./pond";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface KoiPondProps {
  count?: number;
  interactive?: boolean;
  /** Read every frame: 0 = surface, 1 = dived in. */
  depth?: () => number;
  className?: string;
  label?: string;
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function KoiPond({ count, interactive = true, depth, className, label }: KoiPondProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const depthRef = useRef(depth);
  depthRef.current = depth;
  const reduced = useReducedMotion();
  const [supported] = useState(hasWebGL);

  useEffect(() => {
    if (!supported || !canvasRef.current) return;
    const n = count ?? (window.innerWidth < 700 ? 6 : 10);
    const pond = createPond(canvasRef.current, {
      count: n,
      interactive,
      reducedMotion: reduced,
      depth: () => depthRef.current?.() ?? 0,
    });
    return () => pond.dispose();
  }, [supported, count, interactive, reduced]);

  if (!supported) {
    return (
      <img
        className={className}
        src="/media/prints/hokkei-giant-carp.jpg"
        alt="Woodblock print of a giant carp in swirling water, by Totoya Hokkei"
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label={label ?? "A koi pond. Click or tap the water to feed the fish."}
      style={{ touchAction: "pan-y", cursor: interactive ? "pointer" : "default" }}
    />
  );
}
