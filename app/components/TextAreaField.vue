<script lang="ts" setup>
import type { InputHTMLAttributes, InputTypeHTMLAttribute } from 'vue';

defineProps<{
  id: string;
  icon: string;
  label: string;
  placeholder?: string;
  type: InputTypeHTMLAttribute;
  autocomplete?: InputHTMLAttributes['autocomplete'];
  errorText?: string;
  maxlength?: number;
  max?: string | number;
}>();

const emit = defineEmits<{
  blur: [];
}>();

const model = defineModel<string>();
</script>

<template>
  <div>
    <label :for="id" class="text-sm text-muted-foreground font-semibold ml-1 mb-1 block">{{
      label
    }}</label>
    <div class="flex flex-row items-center group/input relative">
      <div
        :class="
          cn(
            'flex flex-row items-center group-focus-within/input:text-primary! transition-colors pl-3 text-sm absolute top-0 left-0 h-11.5',
            !errorText
              ? 'text-muted-foreground group-hover/input:text-foreground'
              : 'text-red-800 group-hover/input:text-red-700',
          )
        "
      >
        <Icon :name="icon" :size="18" />
      </div>
      <textarea
        :id
        v-model="model"
        :type
        :placeholder
        :autocomplete
        :maxlength
        :max
        :class="
          cn(
            'w-full px-4 pl-10 py-2 pb-2.5 peer focus:outline-none focus:border-primary border-2 focus:hover:border-primary transition-colors rounded-md placeholder:text-muted-foreground/70',
            !errorText
              ? 'border-border group-hover/input:border-muted-hover'
              : 'border-red-900 group-hover/input:border-red-700',
          )
        "
        @blur="emit('blur')"
      />
    </div>
    <div v-if="errorText" class="text-red-600 ml-1 mt-1 text-xs">
      {{ errorText }}
    </div>
  </div>
</template>
