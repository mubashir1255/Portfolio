// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves this repo under /Portfolio; CI sets BASE_PATH. Locally and on Vercel it runs at /.
// On Vercel, the site URL (canonical, OG image, sitemap) is the project's production domain.
const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = process.env.SITE_URL ?? (vercelDomain ? `https://${vercelDomain}` : 'https://mubashir1255.github.io');

export default defineConfig({
  site,
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !page.includes('/styleguide') })],
  server: { host: true },
  vite: { plugins: [tailwindcss()] },
});
