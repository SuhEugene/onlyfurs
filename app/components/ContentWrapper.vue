<script setup lang="ts">
defineProps<{
  contentClass: string;
  borderClass: string;
}>();
</script>
<template>
  <div class="flex flex-col items-center h-full w-full">
    <div
      :class="cn('border-x border-border h-full fixed pointer-events-none', $props.borderClass)"
    />
    <div :class="cn('h-full', $props.contentClass)">
      <slot />
    </div>
  </div>
</template>
