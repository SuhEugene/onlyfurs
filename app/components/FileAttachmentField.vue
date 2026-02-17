<script lang="ts" setup>
import type { InputHTMLAttributes, InputTypeHTMLAttribute } from 'vue';

defineProps<{
  id: string;
  icon: string;
  label: string;
  placeholder?: string;
  type: InputTypeHTMLAttribute;
  accept?: InputHTMLAttributes['accept'];
  errorText?: string;
  imagePreview?: boolean | string;
}>();

const emit = defineEmits<{
  blur: [];
}>();

const model = defineModel<File | null>();
const imageSrc = ref<null | string>(null);

const inputRef = useTemplateRef('fileInput');
function acceptFile() {
  const file = inputRef.value?.files?.[0];
  if (!file) return;

  imageSrc.value = URL.createObjectURL(file);
  model.value = file;
}
</script>

<template>
  <div>
    <label :for="id">
      <div class="text-sm text-muted-foreground font-semibold ml-1 mb-1 block">
        {{ label }} <span class="font-normal opacity-50">{{ placeholder }}</span>
      </div>
      <div
        :class="
          cn(
            'flex flex-row items-center relative group/input focus-within:text-primary! hover:text-foreground transition-colors cursor-pointer',
            !errorText
              ? 'text-muted-foreground hover:text-foreground'
              : 'text-red-800 hover:text-red-700',
          )
        "
      >
        <div class="flex flex-row items-center pl-3 text-sm absolute top-0 left-0 h-11.5">
          <Icon :name="icon" :size="18" />
        </div>
        <input
          ref="fileInput"
          :id
          type="file"
          :accept
          class="fixed bottom-0 left-0 w-0 h-0 opacity-0 pointer-events-none appearance-none peer"
          @blur="emit('blur')"
          @change="acceptFile"
        />
        <div
          :class="
            cn(
              'w-full px-4 pl-10 py-2.25 peer-focus:outline-none peer-focus:border-primary border-2 peer-focus:hover:border-primary transition-colors rounded-md',
              !errorText
                ? 'border-border group-hover/input:border-muted-hover'
                : 'border-red-900 group-hover/input:border-red-700',
            )
          "
        >
          <div v-if="!model" class="text-muted-foreground/70">Выберите файл</div>
          <div
            v-else
            class="flex flex-row items-center justify-between gap-2 text-foreground break-all"
          >
            <span>{{ model.name }}</span>
          </div>
        </div>
      </div>
    </label>
    <img
      v-if="imagePreview && imageSrc"
      :src="imageSrc"
      :class="
        cn(
          'w-auto h-28 mt-2 rounded-sm object-cover border-2 border-border',
          typeof imagePreview === 'string' && imagePreview,
        )
      "
    />
    <div v-if="errorText" class="text-red-600 ml-1 mt-1 text-xs">
      {{ errorText }}
    </div>
  </div>
</template>
