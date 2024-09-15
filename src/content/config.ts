import { defineCollection, z } from "astro:content";

const bits = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
  }),
});

export const collections = { bits };
