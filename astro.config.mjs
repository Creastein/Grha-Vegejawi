import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.grhavegejawi.com',
  output: 'server',
  adapter: vercel({
    isr: {
      expiration: 600,
      exclude: ['/api/pricing.json']
    }
  }),
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [tailwind({
    applyBaseStyles: false
  })],
});


