// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves this repo under /Portfolio; CI sets BASE_PATH. Locally it runs at /.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://mubashir1255.github.io',
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !page.includes('/styleguide') })],
  server: { host: true },
  vite: { plugins: [tailwindcss()] },
});
