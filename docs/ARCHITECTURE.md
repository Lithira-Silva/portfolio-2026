# Architecture

## Folder structure

```
portfolio/
├── docs/                      Project documentation (you are here)
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── media/
│       ├── prints/            Public-domain koi woodblock prints (see CREDITS.md)
│       └── work/              Project cover images — replace with real screenshots
├── src/
│   ├── main.tsx               Entry: fonts, global CSS, router mount
│   ├── App.tsx                Layout shell: nav, smooth scroll, page transition, footer
│   ├── app/
│   │   └── routes.tsx         Route table (lazy-loaded pages)
│   ├── pages/                 One file per route; composes sections
│   ├── sections/              Page-level blocks: Hero, About, Projects, Skills, Certificates, Contact
│   ├── components/
│   │   ├── layout/            Navbar, Footer, PageTitle, ScrollToTop, PageTransition
│   │   ├── ui/                Button, ArrowLink, Reveal
│   │   └── three/             KoiPond (scene), koi.ts (geometry + shader), pond helpers
│   ├── hooks/                 useLenis, useReveal, useReducedMotion
│   ├── lib/                   gsap.ts (plugin registration), math helpers
│   ├── data/                  ALL editable content: site, projects, skills, certificates, experience
│   ├── styles/                tokens.css, base.css, sections.css
│   └── types/                 Shared content types
├── index.html
├── vite.config.ts
└── tsconfig.json
```

## Data flow

```
src/data/*.ts  ──►  sections/*.tsx  ──►  pages/*.tsx  ──►  app/routes.tsx
     (typed)          (props: limit,        (compose)
                       variant)
```

Sections take an optional `limit` so the home page can show a short take (three projects, six
certificates) while the dedicated route shows everything. Content is typed in `src/types/content.ts`;
a missing field is a compile error, not a blank space.

## Motion

- `src/lib/gsap.ts` registers `ScrollTrigger`, `SplitText` and `useGSAP` once.
- `src/hooks/useLenis.ts` creates one Lenis instance, drives it from `gsap.ticker`, and calls
  `ScrollTrigger.update` on every Lenis scroll event.
- Every component animates inside `useGSAP(() => …, { scope })` so ScrollTriggers are reverted on
  route change.
- `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)` swaps travel for plain opacity.
- Content is visible by default in CSS; GSAP sets the "from" state, so nothing stays hidden if a
  script fails.

## The 3D pond

`src/components/three/KoiPond.tsx` owns one `WebGLRenderer`. It:

1. Builds a pond floor plane with a procedural caustics shader.
2. Spawns koi from `koi.ts`: one `BufferGeometry` per fish (body, pectoral fins, dorsal, tail) with a
   `aSpine` attribute (0 at the nose, 1 at the tail tip). The vertex shader bends every vertex
   sideways by a travelling sine wave scaled by `aSpine`, so the whole fish swims as one piece.
   The fragment shader paints the variety (kohaku, showa, tancho, ogon, shusui) from per-fish noise.
3. Steers each fish with a small boid model: wander + separation + soft walls + attraction to food.
4. Floats lily pads and drifting petals on the surface.
5. On pointer down, raycasts to the surface, drops a pellet and a ripple ring; the nearest koi turn to it.
6. Exposes a `depth` value (0–1) that the hero's ScrollTrigger scrubs, so scrolling dives the camera
   into the pond.
7. Pauses rendering when offscreen (IntersectionObserver) and caps pixel ratio at 2.

If WebGL is unavailable, the hero falls back to the Hokkei print as a still image.
