# Mubashir — Portfolio

Personal portfolio, presented as a book you page through. Built with **Astro**, **Tailwind CSS v4** and **anime.js v4**; fully static, about 56 KB of JS.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # type-checks, then builds to ./dist
pnpm preview
```

## Structure

- `src/pages/index.astro`: the page; lists every book page in reading order
- `src/components/book/`: one component per page (cover, contents, intro, about, skills, projects, journey, contact)
- `src/data/content.ts`: all portfolio text (skills, projects, timeline, chapters); `src/data/site.ts`: email, socials, nav
- `src/scripts/book.ts`: the book engine (spreads, page-curl turns, drag/swipe, keys, wheel, #chapter links)
- `src/scripts/motion.ts`: anime.js extras (dot-grid ripples, cover title, ink reveals, counters)
- `src/styles/global.css`: palette, paper and book styles

Turn pages by clicking, dragging, swiping, arrow keys or the mouse wheel. Links like `#projects` open that chapter.
Without JavaScript the pages stack vertically, and reduced-motion visitors get instant page changes.

To add a page, create a component in `src/components/book/`, wrap it in `<Page>`, and place it in `index.astro`.
Keep the page count after the cover even so desktop spreads pair up.

## Deploy

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which builds with
`BASE_PATH=/Portfolio` and publishes to https://mubashir1255.github.io/Portfolio.

The contact form posts to Web3Forms. Set `PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` to override the default key.
