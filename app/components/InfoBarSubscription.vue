<script lang="ts" setup>
import type { Subscription } from '~~/shared/types';

defineProps<{
  subscription: Subscription;
}>();

defineEmits<{
  action: [];
}>();
</script>

<template>
  <div class="border border-border rounded-md p-4 flex flex-col gap-2">
    <div class="text-sm font-semibold">
      {{ subscription.title }}
    </div>
    <div class="text-sm">{{ subscription.price }} руб / месяц</div>
    <div class="text-muted-foreground text-[13px] mb-auto">
      {{ subscription.description }}
    </div>
    <button
      class="text-[13px] leading-none rounded-sm bg-primary hover:bg-primary-hover cursor-pointer transition-colors duration-100 px-3 py-2 flex items-center justify-center gap-1 mt-2"
      @click="$emit('action')"
    >
      <span>Подписаться</span>
    </button>
  </div>
</template>
