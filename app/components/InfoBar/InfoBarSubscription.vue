<script lang="ts" setup>
import type { Subscription } from '~~/shared/types';

const MAX_LINES = 4;

const props = defineProps<{
  subscription: Subscription;
}>();

defineEmits<{
  action: [];
}>();

const isCollapsed = ref(true);
const lines = computed(() => props.subscription.description.split('\n'));
const isTooLong = computed(() => lines.value.length > MAX_LINES);
const shownLines = computed(() =>
  isTooLong.value && isCollapsed.value ? lines.value.slice(0, MAX_LINES) : lines.value,
);
</script>

<template>
  <div class="border border-border rounded-md p-4 flex flex-col gap-2">
    <div class="text-sm font-semibold">
      {{ subscription.title }}
    </div>
    <div class="text-sm">{{ subscription.price }} руб / месяц</div>
    <div class="text-muted-foreground text-[13px] mb-auto">
      <p v-for="line in shownLines" :key="line" class="min-h-3">
        {{ line }}
      </p>
      <button
        v-if="isTooLong"
        class="flex items-center justify-start gap-1 text-primary cursor-pointer hover:text-primary-hover mt-1 text-xs w-full"
        @click="isCollapsed = !isCollapsed"
      >
        <Icon name="mingcute:down-line" :size="14" :class="cn('text-current', !isCollapsed && 'rotate-180')" />
        <span>{{ isCollapsed ? 'Показать больше' : 'Свернуть' }}</span>
      </button>
    </div>
    <button
      class="text-[13px] leading-none rounded-sm bg-primary hover:bg-primary-hover cursor-pointer transition-colors duration-100 px-3 py-2 flex items-center justify-center gap-1 mt-2"
      @click="$emit('action')"
    >
      <span>Подписаться</span>
    </button>
  </div>
</template>
