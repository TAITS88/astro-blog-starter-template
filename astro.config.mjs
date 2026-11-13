// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://www.whichwood.co.za",
  output: "server",
  integrations: [
    mdx(),
    sitemap({
      customPages: ["https://www.whichwood.co.za/"]
    })
  ],
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  })
});
