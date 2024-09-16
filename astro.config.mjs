// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkToc from 'remark-toc'
import wikiLinkPlugin from 'remark-wiki-link';
import { getPermalinks } from '@portaljs/remark-wiki-link'

import icon from 'astro-icon';

const permalinks = getPermalinks("./src/content", [/\.ts$/, /\.js$/]);

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), icon()],
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
        maxDepth: 3
      }]
    ],
  }
});