<script setup lang="ts">
defineProps<{
  class?: string
  likes: number
  comments: number
  reposts: number
}>();

defineEmits<{
  interact: []
}>();
</script>

<template>
  <div :class="cn('flex flex-row items-center justify-between gap-4 text-muted-foreground text-sm', $props.class)">
    <a role="button" href="javascript:void(0)" class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer" @click.stop="$emit('interact')">
      <Icon name="mingcute:heart-line" :size="18" />
      <span>{{ likes }}</span>
    </a>
    <a role="button" href="javascript:void(0)" class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer" @click.stop="$emit('interact')">
      <Icon name="mingcute:chat-1-line" :size="18" />
      <span>{{ comments }}</span>
    </a>
    <a role="button" href="javascript:void(0)" class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer" @click.stop="$emit('interact')">
      <Icon name="mingcute:refresh-4-line" :size="18" />
      <span>{{ reposts }}</span>
    </a>
    <a role="button" href="javascript:void(0)" class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer" @click.stop="$emit('interact')">
      <Icon name="mingcute:more-1-fill" :size="18" />
    </a>
  </div>
</template>
