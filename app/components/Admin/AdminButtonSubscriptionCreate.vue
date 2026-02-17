<script lang="ts" setup>
import { useModal } from 'vue-final-modal';
import AdminModalSubscriptionCreate from './AdminModalSubscriptionCreate.vue';

const props = defineProps<{
  handle: string;
}>();

const { open, close } = useModal({
  component: AdminModalSubscriptionCreate,
  attrs: {
    handle: props.handle,
    onConfirm() {
      close();
    },
    onClose() {
      close();
    },
  },
});
</script>

<template>
  <button
    class="bg-muted hover:bg-muted-hover transition-colors duration-100 cursor-pointer rounded-sm p-2 flex items-center justify-center gap-1"
    @click="open"
  >
    <Icon name="mingcute:bookmark-add-line" :size="16" />
  </button>
</template>
