<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal';

useHead({
  htmlAttrs: {
    lang: 'ru',
    class: 'dark',
  },
  link: [{ rel: 'canonical', href: 'https://onlyfurs.ru' }],
});

const description = //
  'OnlyFurs — социальная платформа, где фурри‑сообщество демонстрирует \
  свои самые смелые желания. Художники, косплееры и креаторы всех видов \
  и пород выкладывают игривый контент, монетизируют свои фантазии и заводят \
  общаются с поклонниками — всё в атмосфере доверия и взаимного уважения.'.replaceAll(/ +/g, ' ');

useSeoMeta({
  charset: 'utf-8',

  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
  },
  titleTemplate: (title) => `${title} • OnlyFurs`,
  title: 'Главная',

  description,
  themeColor: '#ea580c',
  colorScheme: 'dark',

  creator: 'SuhEugene',
  twitterCard: 'summary',
  twitterCreator: 'SuhEugene',

  ogLocale: "ru_RU",
  ogImage: '/icon-128.png',
  ogType: 'website',
  ogTitle: 'OnlyFurs — твой пушистый уголок',
  ogDescription: description,
  ogUrl: 'https://onlyfurs.ru',
});

const { setAdmin } = useAdmin();
onMounted(() => {
  // @ts-expect-error Для меня это валидно
  window.revealAdmin = setAdmin;
});

const router = useRouter();
onMounted(() => {
  const queryParams = new URLSearchParams(window.location.search);
  const queryFrom = queryParams.get('from');
  const querySource = queryParams.get('source');
  if (queryFrom || querySource) {
    localStorage.setItem('anal.from', queryFrom || '');
    localStorage.setItem('anal.source', querySource || '');
    queryParams.delete('from');
    queryParams.delete('source');
    router.replace(`?${queryParams.toString()}`);
  }

  const from = localStorage.getItem('anal.from') || undefined;
  const source = localStorage.getItem('anal.source') || undefined;
  if (from || source) umIdentify({ from, source });
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <ModalsContainer />
  </ClientOnly>
</template>

<style>
html,
body {
  scrollbar-gutter: stable;
}

body {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  font-family: Inter;
}

#__nuxt {
  display: flex;
  flex: 1 0 auto;
  min-height: 100%;
  width: 100%;
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--border) var(--color-background);
}

::selection {
  background-color: var(--primary);
  color: var(--color-background);
}
</style>
