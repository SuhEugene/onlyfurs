<script setup lang="ts">
defineProps<{ class?: string }>();
</script>

<template>
  <div
    :class="
      cn('px-5 py-2 min-h-14 w-full font-extrabold text-lg border-b border-border', $props.class)
    "
  >
    <slot />
  </div>
</template>
