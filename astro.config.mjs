import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://dev.nickleslie.dev",
  integrations: [tailwind(), sitemap(), robotsTxt(), compress()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
    imageService: true,
    imagesConfig: {
      sizes: [320, 640, 1280],
      domains: [
        "https://firebasestorage.googleapis.com/v0/b/nick-leslie-dev.appspot.com/",
      ],
    },
    devImageService: "sharp",
    functionPerRoute: true,
  }),
  image: {
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
});
