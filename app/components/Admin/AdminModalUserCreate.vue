<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal';

const emit = defineEmits<{
  confirm: [];
  close: [];
}>();

const handle = ref('');
const username = ref('');
const description = ref('');
const followers = ref();
const avatar = ref<File | null>(null);
const banner = ref<File | null>(null);

const handleError = ref('');
const usernameError = ref('');
const descriptionError = ref('');
const followersError = ref('');
const avatarError = ref('');
const bannerError = ref('');

function validateFields() {
  handleError.value = '';
  usernameError.value = '';
  descriptionError.value = '';
  followersError.value = '';
  avatarError.value = '';
  bannerError.value = '';

  if (handle.value && !handle.value.match(/^[a-zA-Z0-9_]+$/)) {
    handleError.value = 'Имя пользователя может содержать только буквы, цифры и символ "_"';
  }
  if (handle.value && handle.value.length > 20) {
    handleError.value = 'Имя пользователя не должно быть более 20 символов';
  }
  if (handle.value && handle.value.trim().length < 3) {
    handleError.value = 'Имя пользователя должно быть не менее 3 символов';
  }
  if (handle.value) {
    handle.value = handle.value.toLowerCase();
  }

  if (username.value && username.value.length > 32) {
    usernameError.value = 'Имя пользователя не должно быть более 32 символов';
  }
  if (username.value && username.value.trim().length < 3) {
    usernameError.value = 'Имя пользователя должно быть не менее 3 символов';
  }

  if (description.value && description.value.length > 256) {
    descriptionError.value = 'Описание не должно быть более 256 символов';
  }

  if (followers.value && followers.value < 0) {
    followersError.value = 'Подписчиков должно быть не менее 0';
  }
  if (followers.value && followers.value > 1000) {
    followersError.value = 'Подписчиков не должно быть более 1000';
  }
  if (avatar.value && avatar.value.size > 1024 * 1024 * 3) {
    avatarError.value = 'Аватарка не должна быть более 3 Мб';
  }
  if (banner.value && banner.value.size > 1024 * 1024 * 3) {
    bannerError.value = 'Баннер не должен быть более 3 Мб';
  }
}

const debouncedHandle = ref('');
let timeout: NodeJS.Timeout | undefined;
watch(handle, (newValue) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    debouncedHandle.value = newValue;
  }, 1000);
});

const {
  data: handleAvailable,
  pending: usernamePending,
  error: handleExistanceError,
} = await useAsyncData<string | false>(
  () => `registration:username:available:${debouncedHandle.value}`,
  async () => {
    if (
      !handle.value ||
      !handle.value.match(/^[a-zA-Z0-9_]+$/) ||
      handle.value.trim().length < 3 ||
      handle.value.length > 20
    )
      return '';
    return $fetch(`/api/users/${debouncedHandle.value.trim().toLowerCase()}/available`);
  },
  {
    watch: [debouncedHandle],
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
  },
);

const fieldsValid = computed(
  () =>
    handle.value &&
    !handleError.value &&
    !usernameError.value &&
    !descriptionError.value &&
    !followersError.value &&
    // !avatarError.value &&
    // !bannerError.value &&
    username.value &&
    avatar.value &&
    banner.value &&
    debouncedHandle.value === handle.value &&
    !usernamePending.value &&
    !handleAvailable.value &&
    !handleExistanceError.value,
);

const handleTextError = computed(() => {
  if (handleError.value) return handleError.value;
  if (handleExistanceError.value) return 'Неправильный формат имени пользователя';
  if (handleAvailable.value && handleAvailable.value === handle.value)
    return 'Имя пользователя занято';
  return undefined;
});

const router = useRouter();
const { adminToken } = useAdmin();

const isLoading = ref(false);
async function submitForm() {
  if (!avatar.value) return;
  if (!banner.value) return;

  isLoading.value = true;

  const body = new FormData();
  body.append('handle', handle.value);
  body.append('username', username.value);
  body.append('description', description.value);
  body.append('followers', followers.value);
  body.append('avatar', avatar.value);
  body.append('banner', banner.value);
  const result = await $fetch('/api/users', {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${adminToken.value}`,
    },
  }).catch((error) => {
    console.error(error);
    return false;
  });
  isLoading.value = false;
  if (!result) return;
  router.push(`/${result}`);
  emit('confirm');
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
    <h1 class="text-2xl font-extrabold">Создание пользователя</h1>
    <form
      class="flex flex-col space-y-4"
      @submit.prevent="fieldsValid && !isLoading && submitForm()"
    >
      <InputField
        id="handle"
        v-model="handle"
        icon="mingcute:at-line"
        label="Хендл"
        placeholder="handle"
        type="text"
        autocomplete="off"
        :maxlength="20"
        :error-text="handleTextError"
        @blur="validateFields"
      />

      <InputField
        id="username"
        v-model="username"
        icon="mingcute:user-3-line"
        label="Никнейм"
        placeholder="Никнейм"
        type="text"
        autocomplete="off"
        :maxlength="32"
        :error-text="usernameError"
        @blur="validateFields"
      />

      <TextAreaField
        id="description"
        v-model="description"
        icon="mingcute:pencil-line"
        label="Описание"
        placeholder="Текст под аватаркой"
        type="text"
        autocomplete="off"
        :maxlength="128"
        :error-text="descriptionError"
        @blur="validateFields"
      />

      <InputField
        id="followers"
        v-model.number="followers"
        icon="mingcute:group-3-line"
        label="Подписчики"
        placeholder="Миллионы"
        type="number"
        autocomplete="off"
        :max="1000"
        :error-text="followersError"
        @blur="validateFields"
      />

      <FileAttachmentField
        id="avatar"
        v-model="avatar"
        icon="mingcute:user-4-line"
        label="Аватарка"
        placeholder="- 192x192"
        type="file"
        autocomplete="off"
        accept="image/*"
        image-preview="aspect-square rounded-full"
        :error-text="avatarError"
        @blur="validateFields"
      />

      <FileAttachmentField
        id="banner"
        v-model="banner"
        icon="mingcute:pic-2-line"
        label="Баннер"
        placeholder="- 1200x320"
        type="file"
        autocomplete="off"
        accept="image/*"
        image-preview="aspect-video"
        :error-text="bannerError"
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
