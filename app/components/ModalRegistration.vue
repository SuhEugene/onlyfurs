<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal';

const EIGHTEEN_YEARS = 18 * 365 * 24 * 60 * 60 * 1000;

const emit = defineEmits<{
  confirm: [];
  close: [];
}>();

const email = ref('');
const password = ref('');
const username = ref('');
const birthDate = ref('');

const emailError = ref('');
const passwordError = ref('');
const usernameError = ref('');
const birthDateError = ref('');

const SYSTEM_USERNAMES = [
  'admin',
  'moderator',
  'onlyfurs',
  'wetskrell',
  'registration',
  'register',
  'login',
  'logout',
  'log_in',
  'log_out',
  'terms_of_service',
  'privacy_policy',
  'cookie_notice',
  'suheugene',
];

function validateFields() {
  emailError.value = '';
  passwordError.value = '';
  usernameError.value = '';
  birthDateError.value = '';

  if (email.value && !email.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
    emailError.value = 'Неверный формат электронной почты';
  }

  if (
    password.value &&
    (!/[a-zA-ZА-Яа-яЁё]/.test(password.value) ||
      !/\d/.test(password.value) ||
      !/[@$!%#*_?&-]/.test(password.value))
  ) {
    passwordError.value =
      'Пароль должен содержать хотя бы одну цифру, одну букву и один специальный символ';
  }
  if (password.value && password.value.length > 32) {
    passwordError.value = 'Пароль должен содержать не более 32 символов';
  }
  if (password.value && password.value.length < 8) {
    passwordError.value = 'Пароль должен содержать не менее 8 символов';
  }

  if (birthDate.value && !birthDate.value.match(/^\d{4}-\d{2}-\d{2}$/)) {
    birthDateError.value = 'Неверный формат даты рождения';
  }
  if (birthDate.value && Date.now() - new Date(birthDate.value).getTime() < EIGHTEEN_YEARS) {
    birthDateError.value = 'Возраст должен быть более 18 лет';
  }

  if (username.value && !username.value.match(/^[a-zA-Z0-9_]+$/)) {
    usernameError.value = 'Имя пользователя может содержать только буквы, цифры и символ "_"';
  }
  if (username.value && username.value.length > 20) {
    usernameError.value = 'Имя пользователя не должно быть более 20 символов';
  }
  if (username.value && username.value.trim().length < 3) {
    usernameError.value = 'Имя пользователя должно быть не менее 3 символов';
  }
  if (username.value && SYSTEM_USERNAMES.includes(username.value)) {
    usernameError.value = 'Имя пользователя зарезервировано системой';
  }
  if (username.value) {
    username.value = username.value.toLowerCase();
  }
}

const debouncedUsername = ref('');
let timeout: NodeJS.Timeout | undefined;
watch(username, (newValue) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    debouncedUsername.value = newValue;
  }, 1000);
});

const {
  data: usernameAvailable,
  pending: usernamePending,
  error: usernameExistanceError,
} = await useAsyncData<string | false>(
  () => `registration:username:available:${debouncedUsername.value}`,
  async () => {
    if (
      !username.value ||
      !username.value.match(/^[a-zA-Z0-9_]+$/) ||
      username.value.trim().length < 3 ||
      username.value.length > 20 ||
      SYSTEM_USERNAMES.includes(username.value)
    )
      return '';
    return $fetch(`/api/users/${debouncedUsername.value.trim().toLowerCase()}/available`);
  },
  {
    watch: [debouncedUsername],
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
  },
);

const fieldsValid = computed(
  () =>
    email.value &&
    password.value &&
    birthDate.value &&
    username.value &&
    !emailError.value &&
    !passwordError.value &&
    !birthDateError.value &&
    !usernameError.value &&
    debouncedUsername.value === username.value &&
    !usernamePending.value &&
    !usernameAvailable.value &&
    !usernameExistanceError.value,
);

const usernameTextError = computed(() => {
  if (usernameError.value) return usernameError.value;
  if (usernameExistanceError.value) return 'Неправильный формат имени пользователя';
  if (usernameAvailable.value && usernameAvailable.value === username.value)
    return 'Имя пользователя занято';
  return undefined;
});

const isLoading = ref(false);
function submitForm() {
  isLoading.value = true;
  setTimeout(() => emit('confirm'), 1000);
}

const todayDate = new Date().toISOString().split('T')[0];
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-end sm:items-center"
    content-class="flex flex-col sm:max-w-md w-full p-4 bg-background border border-border border-b-0 sm:border-b rounded-t-lg sm:rounded-lg space-y-4 relative"
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
    <h1 class="text-2xl font-extrabold">Регистрация</h1>
    <form
      class="flex flex-col space-y-4"
      @submit.prevent="fieldsValid && !isLoading && submitForm()"
    >
      <InputField
        id="email"
        v-model="email"
        icon="mingcute:mail-line"
        label="Электронная почта"
        placeholder="Адрес электронной почты"
        type="text"
        autocomplete="email"
        :maxlength="32"
        :error-text="emailError"
        @blur="validateFields"
      />
      <InputField
        id="password"
        v-model="password"
        icon="mingcute:lock-line"
        label="Пароль"
        placeholder="Сложный пароль"
        type="password"
        autocomplete="new-password"
        :maxlength="32"
        :error-text="passwordError"
        @blur="validateFields"
      />
      <InputField
        id="birth-date"
        v-model="birthDate"
        icon="mingcute:calendar-line"
        label="Дата рождения"
        type="date"
        autocomplete="bday"
        :max="todayDate"
        :error-text="birthDateError"
        @blur="validateFields"
      />
      <InputField
        id="username"
        v-model="username"
        icon="mingcute:at-line"
        label="Имя пользователя"
        placeholder="никнейм"
        type="text"
        autocomplete="off"
        :maxlength="20"
        :error-text="usernameTextError"
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
        <span v-else> Зарегистрироваться </span>
      </button>
    </form>
  </VueFinalModal>
</template>
