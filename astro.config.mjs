import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://nickleslie.dev",
  integrations: [tailwind(), sitemap(), robotsTxt(), compress()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: false,
    },
    imageService: true,
    imagesConfig: {
      sizes: [122, 552],
      domains: [],
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
