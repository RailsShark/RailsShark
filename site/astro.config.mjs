// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site.ts';

// BASE_PATH is "/RailsShark" for GitHub Pages and unset ("/") for Cloudflare Pages.
export default defineConfig({
  site: site.url,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
