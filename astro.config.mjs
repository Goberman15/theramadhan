// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { getPermalinks } from '@portaljs/remark-wiki-link';
import { defineConfig } from 'astro/config';
import remarkToc from 'remark-toc';
import wikiLinkPlugin from 'remark-wiki-link';

import icon from 'astro-icon';

const permalinks = getPermalinks("./src/content", [/\.ts$/, /\.js$/]);

// https://astro.build/config
export default defineConfig({
  site: 'https://theramadhan.dev',
  integrations: [
    tailwind(),
    sitemap({
      customPages: [
        'https://theramadhan.dev/blog',
        'https://theramadhan.dev/wiki',
      ],
      serialize(item) {
        // Higher priority for main pages
        if (item.url.endsWith('/blog') || item.url.endsWith('/wiki')) {
          item.priority = 0.9;
        }
        // Lower priority for tag pages
        if (item.url.includes('/tags/')) {
          item.priority = 0.3;
        }
        return item;
      }
    }),
    icon()
  ],
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets'
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  markdown: {
    remarkPlugins: [
      [wikiLinkPlugin, {
        permalinks,
        aliasDivider: '|',
        /**
         * @param {string} pageName
         * @returns {string[]}
         */
        pageResolver: (pageName) => {
          const permalink = permalinks.find(p => p === pageName || p.endsWith(pageName)) || ""
          return [permalink]
        },
        /**
         * @param {string} permalink
         * @returns {string}
         */
        hrefTemplate: (permalink) => {
          return "/" + permalink.replace(/^index|src\/content\/|\/index$/, '')
        }
      }],
      [remarkToc, {
        maxDepth: 3,
        tight: true,
        skip: 'Table of Contents'
      }]
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks for better caching
            'vendor-ui': ['@astrojs/tailwind'],
            'vendor-icons': ['astro-icon', '@iconify-json/mdi'],
          }
        }
      }
    }
  }
});