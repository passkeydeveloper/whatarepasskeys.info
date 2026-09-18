// @ts-check
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Every `<code>.json` in src/i18n becomes an active locale automatically,
// so adding a new translation file is enough to enable that locale — no
// config change needed here.
const i18nDir = fileURLToPath(new URL('./src/i18n', import.meta.url));
const locales = readdirSync(i18nDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => file.replace(/\.json$/, ''))
  .sort();

export default defineConfig({
  output: 'static',
  site: 'https://whatarepasskeys.info',
  i18n: {
    defaultLocale: 'en',
    locales,
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
