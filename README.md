# Mubashir Fayyaz — Portfolio

https://mubashir1255.github.io/Portfolio/  click here to open my Portfolio

My personal portfolio, styled as a manga volume: comic panels, halftone screentone and numbered chapters
(Experience, Projects, Skills, Journey, Contact). It's quiet by default. The opt-in **Play mode** in the nav adds
anime-style effects to buttons, tabs and toasts, using [sakuga-vfx](https://github.com/finktheartist/sakuga-vfx) (MIT).

Built with **Astro** and **Tailwind CSS v4**. Fully static and usable without JavaScript.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000  (styleguide: /styleguide)
pnpm build      # type-checks, then builds to ./dist
pnpm preview
```

To test under the GitHub Pages path: `BASE_PATH=/Portfolio pnpm build && BASE_PATH=/Portfolio pnpm preview`.

## Editing content

All text lives in typed data files. Components never need touching for content changes.

| File | What's in it |
|---|---|
| `src/data/site.ts` | name, role, pitch, degree, email, socials, nav, resume path |
| `src/data/now.ts` | the hero "Now" panel |
| `src/data/projects.ts` | every project: featured "story arcs" (with Problem → Build → Result, demo video, diagram) and the rest |
| `src/data/experience.ts` | Chapter 01 |
| `src/data/skills.ts` | Chapter 03; each skill's tooltip says where it was used |
| `src/data/journey.ts` | Chapter 04 episodes |

The hero stats (projects, live products, coding since) are computed from `projects.ts`, and so are the filter tabs
(a category shows only once 2+ projects carry it). Find everything still missing with `grep -rn "TODO:" src`.

Images: put screenshots in `src/assets/projects/` and import them in `projects.ts`; Astro converts them to WebP.
Demo videos: set `caseStudy.video` to a YouTube or Loom URL; it loads only when clicked.

## Structure

- `src/styles/manga.css`: design tokens (paper, ink, electric-blue accent) and every component style
- `src/components/ui/`: Panel, ChapterHeader, SpeechBubble, Button, Chip (tooltip), Stat, ImageSlot, GlitchName
- `src/components/`: Nav, Hero, Footer, `chapters/` and `projects/`
- `src/scripts/play.ts`: Play mode (saved in localStorage); lazy-loads `public/sakuga-vfx/` and themes it
- `src/pages/styleguide.astro`: every design-system piece on one page (noindex, not in the sitemap)

Effects only run in Play mode and never with `prefers-reduced-motion`. Mark a native button or link with
`data-sakuga="impact"` (or `"done"` for a check after the click) to give it the effect.

## Deploy

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which builds with `BASE_PATH=/Portfolio` and publishes
to GitHub Pages. For a custom domain later, add `public/CNAME` and set `SITE_URL`/`BASE_PATH=/` in the workflow.

The contact form posts to Web3Forms. Set `PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` to override the default key.

## Credits

UI effects: [sakuga-vfx](https://github.com/finktheartist/sakuga-vfx) by finktheartist, MIT (`public/sakuga-vfx/LICENSE`).
Fonts: Anton, Inter, Noto Sans JP (SIL Open Font License).
