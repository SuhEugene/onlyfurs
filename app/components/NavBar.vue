<script lang="ts" setup>
const route = useRoute();
const isMainPage = computed(() => route.path === '/');
</script>

<template>
  <div class="flex flex-col py-2.5 px-5 w-60 fixed navbar">
    <NavBarProfile />
    <NavBarItem
      label="Главная"
      active-icon="mingcute:home-4-fill"
      inactive-icon="mingcute:home-4-line"
      :is-active="isMainPage"
      @click="$router.push('/')"
    />
    <NavBarItem
      label="Поиск"
      active-icon="mingcute:search-fill"
      inactive-icon="mingcute:search-line"
    />
    <NavBarItem
      label="Больше"
      active-icon="mingcute:more-3-fill"
      inactive-icon="mingcute:more-3-line"
    />
  </div>
</template>

<style scoped>
.navbar {
  transform: translateX(-300px) translateX(-50%);
}
</style>
