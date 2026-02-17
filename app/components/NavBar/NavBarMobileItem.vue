<script setup lang="ts">
const props = defineProps<{
  activeIcon: string;
  inactiveIcon: string;
  isActive?: boolean;
}>();
</script>

<template>
  <button class="flex w-full justify-center items-center px-3 cursor-pointer rounded-md">
    <Icon :name="props.isActive ? props.activeIcon : props.inactiveIcon" :size="24" />
  </button>
</template>
