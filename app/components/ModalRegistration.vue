<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal';

const EIGHTEEN_YEARS = 18 * 365 * 24 * 60 * 60 * 1000;

const emit = defineEmits<{
  confirm: []
}>();

const email = ref('');
const password = ref('');
const username = ref('');
const birthDate = ref('');

const emailError = ref('');
const passwordError = ref('');
const usernameError = ref('');
const birthDateError = ref('');

function validateFields() {
  emailError.value = '';
  passwordError.value = '';
  usernameError.value = '';
  birthDateError.value = '';

  if (email.value && !email.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
    emailError.value = 'Неверный формат электронной почты';
  }

  if (password.value && password.value.length < 8) {
    passwordError.value = 'Пароль должен содержать не менее 8 символов';
  }
  if (password.value && password.value.length > 100) {
    passwordError.value = 'Пароль должен содержать не более 100 символов';
  }
  if (password.value && !password.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*_?&-])[A-Za-z\d@$!%#_*?&-]{8,}$/)) {
    passwordError.value = 'Пароль должен содержать хотя бы одну цифру, одну букву и один специальный символ';
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
  if (username.value) {
    username.value = username.value.toLowerCase();
  }
}

const fieldsValid = computed(() => email.value && password.value && birthDate.value && username.value && !emailError.value && !passwordError.value && !birthDateError.value && !usernameError.value);
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl w-full mx-4 p-4 bg-background border border-border rounded-lg space-y-4"
    :reserve-scroll-bar-gap="false"
  >
    <h1 class="text-2xl font-extrabold">
      Регистрация
    </h1>
    <InputField
      id="email"
      v-model="email"
      icon="mingcute:mail-line"
      label="Электронная почта"
      placeholder="Адрес электронной почты"
      type="text"
      autocomplete="email"
      :error-text="emailError"
      @blur="validateFields"
    />
    <InputField
      id="password"
      v-model="password"
      icon="mingcute:lock-line"
      label="Пароль"
      placeholder="Укажите пароль"
      type="password"
      autocomplete="new-password"
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
      :error-text="birthDateError"
      @blur="validateFields"
    />
    <InputField
      id="username"
      v-model="username"
      icon="mingcute:at-line"
      label="Имя пользователя"
      placeholder="username"
      type="text"
      autocomplete="off"
      :error-text="usernameError"
      @blur="validateFields"
    />
    <button :class="cn('px-4 py-2 mt-2 flex flex-row items-center justify-center rounded-md transition-colors duration-100', fieldsValid ? 'bg-primary hover:bg-primary-hover cursor-pointer' : 'bg-muted text-muted-foreground/60 pointer-events-none')" @click="emit('confirm')">
      Зарегистрироваться
    </button>
  </VueFinalModal>
</template>
