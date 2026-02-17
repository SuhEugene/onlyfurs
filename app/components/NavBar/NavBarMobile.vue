<script lang="ts" setup>
const route = useRoute();
const isMainPage = computed(() => route.path === '/');
const { isAdmin } = useAdmin();
</script>
<template>
  <div
    class="grid grid-cols-4 fixed bottom-0 inset-x-0 bg-background border-t border-border md:hidden"
  >
    <NavBarMobileItem
      active-icon="mingcute:home-4-fill"
      inactive-icon="mingcute:home-4-line"
      :is-active="isMainPage"
      @click="$router.push('/')"
    />
    <NavBarMobileItem active-icon="mingcute:search-fill" inactive-icon="mingcute:search-line" />
    <NavBarMobileItem v-if="!isAdmin" active-icon="mingcute:more-3-fill" inactive-icon="mingcute:more-3-line" />
    <LazyAdminButtonUserCreate isMobile v-else />
    <NavBarProfile />
  </div>
</template>
