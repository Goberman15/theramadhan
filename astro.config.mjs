// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkToc from 'remark-toc'
import wikiLinkPlugin from 'remark-wiki-link';
import { getPermalinks } from '@portaljs/remark-wiki-link'

const permalinks = getPermalinks("./src/content", [/\.ts$/, /\.js$/]);

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],
  markdown: {
    remarkPlugins: [
      [wikiLinkPlugin, {
        permalinks,
        aliasDivider: '|',
        pageResolver: (pageName) => {
          const permalink = permalinks.find(p => p === pageName || p.endsWith(pageName))
          return [permalink]
        },
        hrefTemplate: (permalink) => {
          return "/" + permalink.replace(/^index|src\/content\/|\/index$/, '')
        }
      }],
      [remarkToc, {
        maxDepth: 3
      }]
    ],
  }
});