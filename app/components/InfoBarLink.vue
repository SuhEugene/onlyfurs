<script setup lang="ts">
const props = defineProps<{
  label: string;
  to: string;
}>();
</script>

<template>
  <NuxtLink
    class="infobar-links text-sm px-2 text-muted-foreground hover:underline after:text-muted-foreground"
    :to="props.to"
  >
    {{ props.label }}
  </NuxtLink>
</template>

<style scoped>
.infobar-links {
  position: relative;
}

.infobar-links::after {
  content: '\2022';
  position: absolute;
  right: -8px;

  display: inline-flex;
  align-items: center;
  pointer-events: none;
}

.infobar-links:last-of-type::after {
  display: none;
}
</style>
