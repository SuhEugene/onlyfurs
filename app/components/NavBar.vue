<script lang="ts" setup>
</script>

<template>
  <div class="flex flex-col py-2.5 px-5 w-60 fixed navbar">
    <NavBarProfile />
    <NavBarItem label="Главная" active-icon="mingcute:home-4-fill" inactive-icon="mingcute:home-4-line" is-active />
    <NavBarItem label="Explore" active-icon="mingcute:search-fill" inactive-icon="mingcute:search-line" />
    <NavBarItem label="Уведомления" active-icon="mingcute:notification-fill" inactive-icon="mingcute:notification-line" />
  </div>
</template>

<style scoped>
.navbar {
  transform: translateX(-300px) translateX(-50%);
}
</style>
