<script setup lang="ts">
const props = defineProps<{
  activeIcon: string;
  inactiveIcon: string;
  label: string;
  isActive?: boolean;
}>();
</script>

<template>
  <button class="flex items-center gap-2 p-3 cursor-pointer rounded-md hover:bg-muted">
    <Icon :name="props.isActive ? props.activeIcon : props.inactiveIcon" :size="24" />
    <span :class="cn('text-lg max-xl:hidden', isActive && 'font-extrabold')">{{ props.label }}</span>
  </button>
</template>
