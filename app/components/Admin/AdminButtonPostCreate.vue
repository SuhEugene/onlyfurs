<script lang="ts" setup>
import { useModal } from 'vue-final-modal';
import AdminModalPostCreate from './AdminModalPostCreate.vue';

const props = defineProps<{
  handle: string;
}>();

const { open, close } = useModal({
  component: AdminModalPostCreate,
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
    class="text-[13px] leading-none font-semibold rounded-sm bg-primary hover:bg-primary-hover cursor-pointer transition-colors duration-100 px-3 py-2 pl-2 flex items-center justify-center gap-1"
    @click="open"
  >
    <Icon name="mingcute:add-line" :size="16" />
    <span>Новый пост</span>
  </button>
</template>
