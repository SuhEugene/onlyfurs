<script setup lang="ts">
defineProps<{
  pending: boolean;
  error: boolean;
  allLoaded: boolean;
}>();
defineEmits<{
  loadMore: [];
  retry: [];
}>();
</script>

<template>
  <div class="flex flex-col gap-2 justify-center items-center h-30">
    <Icon
      v-if="pending"
      name="mingcute:loading-line"
      :size="28"
      class="text-muted-foreground spin-pulse-animation"
    />
    <template v-else-if="error">
      <p class="text-sm">Ошибка получения постов</p>
      <button
        class="text-[13px] leading-none rounded-sm bg-muted hover:bg-muted-hover cursor-pointer transition-colors duration-100 px-3 py-2 flex items-center justify-center gap-1"
        tabindex="-1"
        @click="() => $emit('retry')"
      >
        <span>Попробовать ещё раз</span>
      </button>
    </template>
    <p v-else-if="allLoaded" class="text-sm text-center text-muted-foreground">
      Больше постов нет<br />Вы долистали ленту до конца
    </p>
    <button
      v-else
      class="text-[13px] leading-none rounded-sm bg-muted hover:bg-muted-hover cursor-pointer transition-colors duration-100 px-3 py-2 flex items-center justify-center gap-1"
      tabindex="-1"
      @click="() => $emit('loadMore')"
    >
      <span>Загрузить ещё</span>
    </button>
  </div>
  <div class="h-[30vh]" />
</template>
