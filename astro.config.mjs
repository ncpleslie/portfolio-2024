import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import preload from "astro-preload";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://dev.nickleslie.dev",
  integrations: [tailwind(), sitemap(), robotsTxt(), preload(), compress()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
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
