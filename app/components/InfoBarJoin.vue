<script lang="ts" setup>
const { open } = useRegistration();
</script>

<template>
  <h2 class="text-xl font-extrabold mb-4">
    Присоединиться к сообществу
  </h2>
  <button
    class="px-4 py-2 flex flex-row items-center justify-center rounded-md bg-primary hover:bg-primary-hover cursor-pointer transition-colors duration-100"
    @click="open"
  >
    Зарегистрироваться
  </button>
</template>
