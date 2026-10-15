# Deployment

The site builds to static files in `dist/`. Because it uses client-side routing, the host must serve
`index.html` for unknown paths.

## Vercel

1. Import the repository.
2. Framework preset: **Vite**. Build `npm run build`, output `dist`.
3. `vercel.json` in the repo already rewrites all paths to `/index.html`.

## Netlify

1. Build `npm run build`, publish `dist`.
2. `public/_redirects` already contains `/* /index.html 200`.

## GitHub Pages

1. In `vite.config.ts` set `base: "/<repo-name>/"`.
2. Build, then publish `dist/` (for example with the `peaceiris/actions-gh-pages` action).
3. Copy `dist/index.html` to `dist/404.html` so deep links work.

## Checklist before going live

- [ ] Replace sample content in `src/data/` (see CONTENT.md)
- [ ] Replace `public/media/work/*` with real project screenshots
- [ ] Add `public/resume.pdf`
- [ ] Set `siteUrl` in `src/data/site.ts` and the `og:` tags in `index.html`
- [ ] Run `npm run build` with no errors
- [ ] Check the site on a phone
