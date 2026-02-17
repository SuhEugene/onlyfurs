<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal';

const props = defineProps<{
  handle: string;
}>();

const emit = defineEmits<{
  confirm: [];
  close: [];
}>();

const content = ref('');
const image = ref<File | null>(null);
const imageCropped = ref(0);
const likes = ref();
const comments = ref();
const reposts = ref();
const createdAgo = ref();

const contentError = ref('');
const imageError = ref('');
const likesError = ref('');
const commentsError = ref('');
const repostsError = ref('');
const createdAgoError = ref('');

function validateFields() {
  contentError.value = '';
  imageError.value = '';
  likesError.value = '';
  commentsError.value = '';
  repostsError.value = '';

  if (content.value && content.value.length > 1024) {
    contentError.value = 'Описание не должно быть более 1024 символов';
  }

  if (image.value && image.value.size > 1024 * 1024 * 5) {
    imageError.value = 'Картинка не должна быть более 5 Мб';
  }
  if (likes.value && likes.value < 0) {
    likesError.value = 'Лайков должно быть не менее 0';
  }
  if (comments.value && comments.value < 0) {
    commentsError.value = 'Комментариев должно быть не менее 0';
  }
  if (reposts.value && reposts.value < 0) {
    repostsError.value = 'Репостов должно быть не менее 0';
  }
}

const fieldsValid = computed(
  () =>
    !contentError.value &&
    !imageError.value &&
    !likesError.value &&
    !commentsError.value &&
    !repostsError.value &&
    content.value,
);

const router = useRouter();

const isLoading = ref(false);
async function submitForm() {
  const body = new FormData();
  body.append('content', content.value);
  body.append('likes', likes.value || '0');
  body.append('comments', comments.value || '0');
  body.append('reposts', reposts.value || '0');
  body.append('createdAgo', createdAgo.value || '1');
  body.append('imageCropped', String(Number(imageCropped.value)));
  if (image.value) body.append('image', image.value);
  
  isLoading.value = true;

  const result = await $fetch(`/api/users/${props.handle}/posts`, {
    method: 'POST',
    body,
  }).catch((error) => {
    console.error(error);
    return false;
  });

  isLoading.value = false;

  if (!result) return;
  emit('confirm');

  router.push(`/${props.handle}/${result}`);
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
    <h1 class="text-2xl font-extrabold">Создание поста</h1>
    <p class="text-xs text-muted-foreground -mt-3">Пользователь: {{ handle }}</p>
    <form
      class="flex flex-col space-y-4"
      @submit.prevent="fieldsValid && !isLoading && submitForm()"
    >
      <TextAreaField
        id="content"
        v-model="content"
        icon="mingcute:pencil-line"
        label="Пост"
        placeholder="Текст поста"
        type="text"
        autocomplete="off"
        :maxlength="128"
        :error-text="contentError"
        @blur="validateFields"
      />

      <FileAttachmentField
        id="image"
        v-model="image"
        icon="mingcute:pic-2-line"
        label="Картинка"
        placeholder="- 900x600"
        type="file"
        autocomplete="off"
        accept="image/*"
        image-preview="aspect-video"
        :error-text="imageError"
        @blur="validateFields"
      />

      <CheckboxField
        id="imageCropped"
        v-model.number="imageCropped"
        icon="mingcute:scissors-3-line"
        label="Обрезка картинки"
        yes-label="Обрезана"
        no-label="Заблюрена"
      />

      <InputField
        id="createdAgo"
        v-model.number="createdAgo"
        icon="mingcute:calendar-line"
        label="Давность поста"
        placeholder="Н дней назад"
        type="number"
        autocomplete="off"
        :error-text="createdAgoError"
        @blur="validateFields"
      />

      <InputField
        id="likes"
        v-model.number="likes"
        icon="mingcute:heart-line"
        label="Лайки"
        placeholder="Миллионы"
        type="number"
        autocomplete="off"
        :error-text="likesError"
        @blur="validateFields"
      />

      <InputField
        id="comments"
        v-model.number="comments"
        icon="mingcute:chat-1-line"
        label="Комментарии"
        placeholder="Миллионы"
        type="number"
        autocomplete="off"
        :error-text="commentsError"
        @blur="validateFields"
      />

      <InputField
        id="reposts"
        v-model.number="reposts"
        icon="mingcute:refresh-4-line"
        label="Репосты"
        placeholder="Миллионы"
        type="number"
        autocomplete="off"
        :error-text="repostsError"
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
