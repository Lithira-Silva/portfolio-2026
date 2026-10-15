# Lithira — Portfolio

A personal portfolio built around one idea: **koi-no-takinobori**, the carp that climbs the waterfall.
In Japanese legend a koi that swims up the falls becomes a dragon. Here the scroll is the climb: the
landing page opens on a live 3D koi pond, and every section after it is one step further up the falls.

> Tap the pond to drop food. The koi notice.

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Build | [Vite](https://vitejs.dev) + TypeScript | Instant dev server, typed content. |
| UI | React 18 + React Router 6 | Six routes, shared sections. |
| Motion | [GSAP 3](https://gsap.com) — ScrollTrigger, SplitText, `@gsap/react` | Pinned story, scrubbed camera dive, staggered entrances. |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering) | Driven by the GSAP ticker so ScrollTrigger stays in sync. |
| 3D | [three.js](https://threejs.org) (vanilla, no wrapper) | Procedural koi with a swimming vertex shader, caustics, lily pads, petals. |
| Type | Barlow Condensed / Barlow | Road-sign condensed display face; the name is set as architecture. |

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

Requires Node 18+.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — pond hero, the climb, then a short take on every section |
| `/about` | About — facts, story, experience and education |
| `/projects` | Projects — every project, loose scatter |
| `/skills` | Skills — the full skills table |
| `/certificates` | Certificates — scrollable strip of credentials |
| `/contact` | Contact — display rows, one email button |

## Make it yours

All content lives in [`src/data/`](src/data). You never need to touch a component to change words.
See [docs/CONTENT.md](docs/CONTENT.md) for every field.

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — folders, data flow, how the 3D scene and GSAP fit together
- [docs/DESIGN.md](docs/DESIGN.md) — the design system: idea, type, colour, layout, motion rules
- [docs/CONTENT.md](docs/CONTENT.md) — editing your name, projects, skills, certificates
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — Vercel, Netlify, GitHub Pages
- [docs/CREDITS.md](docs/CREDITS.md) — every image used and its licence
- [CHANGELOG.md](CHANGELOG.md)
