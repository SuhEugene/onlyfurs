<script lang="ts" setup>
const { trackedOpen } = useRegistration();
</script>
<template>
  <button
    class="my-3 xl:pl-4 flex items-center justify-center md:justify-start"
    @click="trackedOpen('navbar-avatar')"
  >
    <div
      class="size-8 md:size-12 flex justify-center items-center rounded-full bg-gray-600 text-white cursor-pointer transition-all border-2 border-transparent hover:border-primary/70 hover:outline-8 hover:outline-primary/40"
    >
      <Icon name="mingcute:user-3-line" class="text-[20px] md:text-[28px]" />
    </div>
  </button>
</template>
