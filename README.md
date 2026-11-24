# Mubashir — Portfolio

Personal portfolio built with **Astro**, **Tailwind CSS v4** and **anime.js v4**. It's a fully static site with no framework runtime; all motion lives in `src/scripts/motion.ts`.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # type-checks, then builds to ./dist
pnpm preview
```

## Structure

- `src/pages/index.astro`: the page
- `src/components/`: one `.astro` file per section
- `src/scripts/motion.ts`: anime.js hero (dot-grid ripples + spring name), scroll reveals, counters, skill filter
- `src/data/site.ts`: email, socials, nav links
- `public/`: resume PDF, project images, favicon

Motion is skipped automatically for visitors who prefer reduced motion.

## Deploy

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which builds with
`BASE_PATH=/Portfolio` and publishes to https://mubashir1255.github.io/Portfolio.

The contact form posts to Web3Forms. Set `PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` to override the default key.
