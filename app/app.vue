<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal';

useHead({
  title: 'Nuxt 3 Minimal Starter',
  htmlAttrs: {
    lang: 'ru',
    class: 'dark',
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
  ],
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
html, body {
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
