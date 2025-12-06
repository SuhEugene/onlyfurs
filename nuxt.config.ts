import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon'],
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css', 'vue-final-modal/style.css'],
  runtimeConfig: {
    databaseUrl: 'database-url',
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-06-27',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  fonts: {
    families: [{ name: 'Inter', provider: 'google', display: 'swap' }],
    defaults: {
      weights: ['400', '600', '800'],
      subsets: ['cyrillic', 'latin'],
      styles: ['normal', 'italic'],
    },
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
});
