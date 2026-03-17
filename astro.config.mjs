// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://agentsorg.ai',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [],
      serialize(item) {
        // Homepage gets highest priority
        if (item.url === 'https://agentsorg.ai/') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        // Key landing pages
        if (['https://agentsorg.ai/advisors/', 'https://agentsorg.ai/blog/'].includes(item.url)) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        // Blog posts
        if (item.url.includes('/blog/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        return item;
      },
    }),
  ]
});