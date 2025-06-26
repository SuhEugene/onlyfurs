import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon'],
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
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
});
