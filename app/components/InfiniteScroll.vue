<script setup lang="ts">
const emit = defineEmits(['scrolled']);
const scrollEl = useTemplateRef('scrollEl');

let observer: IntersectionObserver;
onMounted(() => {
  if (!scrollEl.value || !import.meta.browser) return;

  observer = new IntersectionObserver((entities) =>
    entities.forEach(({ isIntersecting }) => isIntersecting && emit('scrolled')),
  );

  observer.observe(scrollEl.value);
});

onUnmounted(() => observer.disconnect());
</script>

<template>
  <span ref="scrollEl" />
</template>
