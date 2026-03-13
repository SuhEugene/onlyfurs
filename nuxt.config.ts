import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/fonts', '@nuxt/icon', 'nuxt-umami'],
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css', 'vue-final-modal/style.css'],
  runtimeConfig: {
    adminToken: 'placeholder',
    databaseUrl: 'placeholder',
    s3: {
      accessKeyId: 'placeholder',
      secretAccessKey: 'placeholder',
      endpoint: 'placeholder',
      region: 'placeholder',
    },
    public: {
      s3Url: 'http://localhost:9000',
    },
  },
  compatibilityDate: '2025-07-15',
  nitro: { experimental: { tasks: true } },
  vite: {
    plugins: [tailwindcss()],
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
  umami: {
    id: '33e454b8-55c5-44d2-ae59-cba250ccf2ba',
    host: 'http://localhost:8080',
    autoTrack: true,
  },
});
