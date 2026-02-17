<script lang="ts" setup>
defineProps<{
  id: string;
  icon: string;
  label: string;
  yesLabel?: string;
  noLabel?: string;
}>();

const emit = defineEmits<{
  blur: [];
}>();

const model = defineModel<number | boolean>();
</script>

<template>
  <div>
    <label :for="id">
      <div class="text-sm text-muted-foreground font-semibold ml-1 mb-1 block">
        {{ label }}
      </div>
      <div
        class="flex flex-row items-center relative group/input hover:text-foreground transition-colors cursor-pointer text-muted-foreground"
      >
        <div class="flex flex-row items-center pl-3 text-sm absolute top-0 left-0 h-11.5">
          <Icon :name="icon" :size="18" />
        </div>
        <input
          :id
          v-model.number="model"
          type="checkbox"
          class="fixed bottom-0 left-0 w-0 h-0 opacity-0 pointer-events-none appearance-none peer"
          @blur="emit('blur')"
        />
        <div
          class="w-full px-4 pl-10 py-1.25 peer-focus:outline-none peer-focus-visible:border-primary border-2 peer-focus-visible:hover:border-primary transition-colors rounded-md border-border group-hover/input:border-muted-hover"
        >
          <div class="grid grid-cols-2 relative">
            <div :class="cn('py-1 text-center z-20', modelValue && 'text-white')">
              {{ yesLabel || 'Да' }}
            </div>
            <div :class="cn('py-1 text-center z-20', !modelValue && 'text-white')">
              {{ noLabel || 'Нет' }}
            </div>
            <div
              :class="
                cn(
                  'absolute inset-y-0 left-0 w-1/2 rounded-sm transition-all',
                  modelValue ? 'bg-primary' : 'bg-muted translate-x-full',
                )
              "
            ></div>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>
