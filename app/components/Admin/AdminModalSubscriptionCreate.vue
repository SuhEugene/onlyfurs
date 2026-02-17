<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal';

const props = defineProps<{
  handle: string;
}>();

const emit = defineEmits<{
  confirm: [];
  close: [];
}>();

const title = ref('');
const description = ref('');
const price = ref();

const titleError = ref('');
const descriptionError = ref('');
const priceError = ref('');

function validateFields() {
  titleError.value = '';
  descriptionError.value = '';
  priceError.value = '';

  if (title.value && title.value.length > 32) {
    titleError.value = 'Заголовок не должен быть более 32 символов';
  }
  if (title.value && title.value.trim().length < 3) {
    titleError.value = 'Заголовок должен быть не менее 3 символов';
  }

  if (description.value && description.value.length > 128) {
    descriptionError.value = 'Описание не должно быть более 128 символов';
  }

  if (price.value && price.value < 0) {
    priceError.value = 'Подписчиков должно быть не менее 0';
  }
}

const fieldsValid = computed(
  () =>
    !titleError.value &&
    !descriptionError.value &&
    !priceError.value &&
    title.value
);

const { adminToken } = useAdmin();

const isLoading = ref(false);
async function submitForm() {
  isLoading.value = true;

  const result = await $fetch(`/api/users/${props.handle}/subscriptions`, {
    method: 'POST',
    body: {
      title: title.value,
      description: description.value,
      price: price.value,
    },
    headers: {
      Authorization: `Bearer ${adminToken.value}`,
    }
  }).catch((error) => {
    console.error(error);
    return false;
  });
  isLoading.value = false;
  if (!result) return;
  emit('confirm');
  window.location.reload();
}
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-end sm:items-center"
    content-class="flex flex-col sm:max-w-md w-full p-4 bg-background border border-border border-b-0 sm:border-b rounded-t-lg sm:rounded-lg space-y-4 relative max-h-screen overflow-y-auto"
    :reserve-scroll-bar-gap="false"
    content-transition="fade-ghost"
    overlay-transition="vfm-fade"
  >
    <div class="absolute right-5 top-5 size-4">
      <Icon
        name="mingcute:close-line"
        :size="16"
        class="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        @click="emit('close')"
      />
    </div>
    <h1 class="text-2xl font-extrabold">Создание подписки</h1>
    <p class="text-xs text-muted-foreground -mt-3">Пользователь: {{ handle }}</p>
    <form
      class="flex flex-col space-y-4"
      @submit.prevent="fieldsValid && !isLoading && submitForm()"
    >
      <InputField
        id="title"
        v-model="title"
        icon="mingcute:bookmark-line"
        label="Заголовок"
        placeholder="Текст заголовка"
        type="text"
        autocomplete="off"
        :maxlength="32"
        :error-text="titleError"
        @blur="validateFields"
      />

      <TextAreaField
        id="description"
        v-model="description"
        icon="mingcute:pencil-line"
        label="Описание"
        placeholder="Текст описания"
        type="text"
        autocomplete="off"
        :maxlength="128"
        :error-text="descriptionError"
        @blur="validateFields"
      />

      <InputField
        id="price"
        v-model.number="price"
        icon="mingcute:currency-rubel-2-line"
        label="Стоимость"
        placeholder="Миллионы"
        type="number"
        autocomplete="off"
        :error-text="priceError"
        @blur="validateFields"
      />
      <button
        :class="
          cn(
            'px-4 py-2 mt-2 flex flex-row items-center justify-center rounded-md transition-colors duration-100',
            fieldsValid && !isLoading
              ? 'bg-primary hover:bg-primary-hover cursor-pointer'
              : 'bg-muted text-muted-foreground/60 pointer-events-none',
          )
        "
        :tabindex="fieldsValid && !isLoading ? 0 : -1"
      >
        <span v-if="isLoading" class="leading-0">
          <Icon
            name="mingcute:loading-line"
            :size="24"
            class="text-muted-foreground spin-pulse-animation"
          />
        </span>
        <span v-else>Создать</span>
      </button>
    </form>
  </VueFinalModal>
</template>
