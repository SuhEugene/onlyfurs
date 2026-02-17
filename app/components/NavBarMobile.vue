<script lang="ts" setup>
const route = useRoute();
const isMainPage = computed(() => route.path === '/');
</script>
<template>
  <div class="grid grid-cols-4 fixed bottom-0 inset-x-0 bg-background border-t border-border md:hidden">
    <button class="flex w-full justify-center items-center px-3 cursor-pointer rounded-md" @click="$router.push('/')">
      <Icon :name="isMainPage ? 'mingcute:home-4-fill' : 'mingcute:home-4-line'" :size="24" />
    </button>
    <button class="flex w-full justify-center items-center px-3 cursor-pointer rounded-md">
      <Icon name="mingcute:search-line" :size="24" />
    </button>
    <button class="flex w-full justify-center items-center px-3 cursor-pointer rounded-md">
      <Icon name="mingcute:more-3-line" :size="24" />
    </button>
    <NavBarProfile />
  </div>
</template>
