import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  optimizeDeps: {
    include: [
      "three",
      "three/examples/jsm/postprocessing/EffectComposer.js",
      "three/examples/jsm/postprocessing/RenderPass.js",
      "three/examples/jsm/postprocessing/UnrealBloomPass.js",
      "three/examples/jsm/postprocessing/OutputPass.js",
      "gsap",
      "gsap/ScrollTrigger",
      "gsap/SplitText",
      "@gsap/react",
      "lenis",
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: { three: ["three"], gsap: ["gsap", "@gsap/react"] },
      },
    },
  },
});
