<script setup lang="ts">
defineProps<{ class?: string }>();

const { open } = useRegistration();
</script>

<template>
  <div :class="cn('flex flex-row items-center justify-between gap-4 text-muted-foreground text-sm', $props.class)">
    <a role="button" href="javascript:void(0)" class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer" @click.stop="open">
      <Icon name="mingcute:heart-line" :size="18" />
      <span>12</span>
    </a>
    <a role="button" href="javascript:void(0)" class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer" @click.stop="open">
      <Icon name="mingcute:chat-1-line" :size="18" />
      <span>12</span>
    </a>
    <a role="button" href="javascript:void(0)" class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer" @click.stop="open">
      <Icon name="mingcute:refresh-4-line" :size="18" />
      <span>12</span>
    </a>
    <a role="button" href="javascript:void(0)" class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer" @click.stop="open">
      <Icon name="mingcute:more-1-fill" :size="18" />
    </a>
  </div>
</template>
