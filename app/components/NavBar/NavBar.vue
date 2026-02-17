<script lang="ts" setup>
defineProps<{ class: string }>();
const route = useRoute();
const isMainPage = computed(() => route.path === '/');
const { isAdmin } = useAdmin();
const { trackedOpen } = useRegistration();
</script>
<template>
  <div :class="cn('flex flex-col py-2.5 px-5 w-22 xl:w-60 fixed', $props.class)">
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
      @click="() => trackedOpen('navbar')"
    />
    <NavBarItem
      v-if="!isAdmin"
      label="Больше"
      active-icon="mingcute:more-3-fill"
      inactive-icon="mingcute:more-3-line"
      @click="() => trackedOpen('navbar')"
    />
    <LazyAdminButtonUserCreate v-if="isAdmin" />
  </div>
</template>
