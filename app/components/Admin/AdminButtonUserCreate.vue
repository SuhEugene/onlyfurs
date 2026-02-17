<script lang="ts" setup>
import { useModal } from 'vue-final-modal';
import AdminModalUserCreate from './AdminModalUserCreate.vue';

const props = defineProps<{ isMobile?: boolean }>();

const { open, close } = useModal({
  component: AdminModalUserCreate,
  attrs: {
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
  <NavBarMobileItem
    v-if="isMobile"
    active-icon="mingcute:user-add-2-fill"
    inactive-icon="mingcute:user-add-2-line"
    @click="open"
  />
  <NavBarItem
    v-else
    label="Создать"
    active-icon="mingcute:user-add-2-fill"
    inactive-icon="mingcute:user-add-2-line"
    @click="open"
  />
</template>

<style></style>
