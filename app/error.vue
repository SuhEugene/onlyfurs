<script setup lang="ts">
import type { NuxtError } from '#app';

useHead({
  htmlAttrs: { lang: 'ru', class: 'dark' },
  link: [{ rel: 'canonical', href: 'https://onlyfurs.ru' }],
});

useSeoMeta({
  charset: 'utf-8',

  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
  },
  title: 'Страница не найдена • OnlyFurs',
  ogTitle: 'Страница не найдена',

  themeColor: '#ea580c',
  colorScheme: 'dark',

  twitterCard: 'summary',
  twitterCreator: 'SuhEugene',
  creator: 'SuhEugene',

  ogLocale: 'ru_RU',
  ogImage: '/icon-128.png',
  ogType: 'website',
  ogUrl: 'https://onlyfurs.ru',
});

const props = defineProps({
  error: Object as () => NuxtError,
});

const resetError = () => clearError({ redirect: '/' });
const refreshPage = () => window.location.reload();

const errors: Record<number, string> = {
  401: 'Необходима авторизация',
  403: 'Доступ запрещен',
  404: 'Страница не найдена',
  500: 'Внутренняя ошибка сервера',
};

const knownError = computed(() => (props.error?.status && errors[props.error.status]) || undefined);
</script>

<template>
  <div class="flex flex-col justify-center items-center text-center min-h-screen w-full">
    <h1 class="text-8xl font-bold mb-4">{{ error?.status }}</h1>
    <p class="text-white/60">{{ knownError || error?.statusText }}</p>

    <div class="mt-8 flex gap-4">
      <button
        class="text-[13px] leading-none font-semibold rounded-sm bg-primary hover:bg-primary-hover cursor-pointer transition-colors duration-100 px-3 py-2 pl-2 flex items-center justify-center gap-1"
        @click="resetError"
      >
        <Icon name="mingcute:home-4-line" :size="16" />
        <span>На главную</span>
      </button>
      <button
        class="bg-muted hover:bg-muted-hover transition-colors duration-100 cursor-pointer rounded-sm p-2 flex items-center justify-center gap-1"
        @click="refreshPage"
      >
        <Icon name="mingcute:refresh-2-line" :size="16" />
      </button>
    </div>
  </div>
</template>
