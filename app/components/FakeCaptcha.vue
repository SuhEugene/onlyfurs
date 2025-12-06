<script lang="ts" setup>
const emit = defineEmits<{ submit: [] }>();

const isSolved = ref(false);
const isLoading = ref(false);

async function solve() {
  if (isSolved.value) return;
  if (isLoading.value) return;
  isLoading.value = true;

  await new Promise(resolve => setTimeout(resolve, 1500));
  isLoading.value = false;
  isSolved.value = true;

  await new Promise(resolve => setTimeout(resolve, 800));
  emit('submit');
}
</script>

<template>
  <div class="flex items-center gap-12 border p-6 pr-8 rounded-sm">
    <button
      :class="cn('border-2 size-8 hover:border-muted-hover transition-all duration-100 rounded-md outline-none ring-primary/50 focus-visible:ring-4', isLoading && 'border-transparent rounded-full', !isLoading && !isSolved ? 'cursor-pointer' : 'pointer-events-none')"
      @click="solve"
    >
      <Icon v-if="isLoading" name="mingcute:loading-3-line" :size="36" class="text-muted-foreground -mt-1 -ml-1 fast-spin-animation" />
      <Icon v-else-if="isSolved" name="mingcute:check-2-line" :size="36" class="text-muted-foreground -mt-1 -ml-1 spin-in-aniamtion" />
    </button>
    <div>Я не робот</div>
  </div>
</template>

<style scoped>
@keyframes spin-in {
  from {
    transform: rotate(-90deg);
    color: var(--color-muted-foreground);
  }
  to {
    transform: rotate(0deg);
    color: var(--color-green-700);
  }
}
.spin-in-aniamtion {
  animation: spin-in 0.5s cubic-bezier(0.06, 0.94, 0.57, 1.32) forwards;
}
</style>
