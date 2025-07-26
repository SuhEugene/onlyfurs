<script setup lang="ts">
defineProps<{ class?: string }>();
</script>

<template>
  <div :class="cn('flex flex-row items-center justify-between gap-4 text-muted-foreground text-sm', $props.class)">
    <button class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
      <Icon name="mingcute:heart-line" :size="18" />
      <span>12</span>
    </button>
    <button class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
      <Icon name="mingcute:chat-1-line" :size="18" />
      <span>12</span>
    </button>
    <button class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
      <Icon name="mingcute:refresh-4-line" :size="18" />
      <span>12</span>
    </button>
    <button class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
      <Icon name="mingcute:more-1-fill" :size="18" />
    </button>
  </div>
</template>
