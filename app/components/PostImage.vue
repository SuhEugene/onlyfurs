<script setup lang="ts">
defineProps<{ class?: string }>();
</script>

<template>
  <button :class="cn('relative cursor-pointer group/post-image rounded-t-xl overflow-hidden', $props.class)">
    <div class="absolute inset-0 opacity-0 group-hover/post-image:opacity-100 bg-background/40 transition-all flex flex-row items-center justify-center gap-2 z-[2]">
      <Icon name="mingcute:eye-line" :size="24" />
      <span>Показать изображение</span>
    </div>
    <div class="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-background to-transparent z-[1]" />
    <img src="~/assets/images/post-image.jpg" alt="Post image" class="w-full h-auto object-cover blur-lg">
  </button>
</template>
