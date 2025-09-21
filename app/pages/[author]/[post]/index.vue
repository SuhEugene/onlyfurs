<script setup lang="ts">
const { open } = useRegistration();
const route = useRoute();

const { data, pending, error, execute } = await useLazyFetch(() => `/api/posts/${route.params.post}`, {
  default: () => null,
  key: `author:post:${route.params.post}`,
});

const paragraphs = computed(() => data.value?.content.split('\n'));
const userPage = computed(() => `/${data.value?.user.handle}`);

const timeFormat = new Intl.DateTimeFormat('ru', { dateStyle: 'short', timeStyle: 'short' });
const fullTimeFormat = new Intl.DateTimeFormat('ru', { dateStyle: 'long', timeStyle: 'short' });

const createdTimeFull = computed(() => data.value
  ? timeFormat.format(new Date(data.value?.createdAt))
  : undefined,
);

const createTimeRelative = computed(() => data.value
  ? fullTimeFormat.format(new Date(data.value?.createdAt))
  : undefined,
);
</script>

<template>
  <div>
    <PageHeader class="flex justify-start items-center gap-2">
      <NuxtLink :to="userPage">
        <button class="flex items-center justify-center rounded-md hover:bg-muted transition-colors cursor-pointer p-2">
          <Icon name="mingcute:arrow-left-line" :size="18" />
        </button>
      </NuxtLink>
      <span>Пост</span>
    </PageHeader>
    <div v-if="pending" class="flex flex-col justify-center items-center min-h-48 gap-2 p-4">
      <Icon name="mingcute:loading-line" :size="28" class="text-muted-foreground spin-pulse-animation" />
    </div>
    <div v-else-if="error" class="flex flex-col justify-center items-center min-h-48 gap-2 p-4 pb-2">
      <template v-if="error.statusCode == 404">
        <Icon name="mingcute:ufo-2-line" :size="48" class="text-muted-foreground" />
        <p class="text-sm text-muted-foreground mb-2">
          Пост не найден
        </p>
      </template>
      <template v-else>
        <Icon name="mingcute:warning-line" :size="48" class="text-muted-foreground" />
        <p class="text-sm text-muted-foreground mb-2">
          Ошибка получения поста
        </p>
      </template>
      <button class="text-[13px] leading-none rounded-sm bg-muted hover:bg-muted-hover cursor-pointer transition-colors duration-100 px-3 py-2 flex items-center justify-center gap-1" tabindex="-1" @click="() => execute()">
        <span>Попробовать ещё раз</span>
      </button>
    </div>
    <div v-else-if="data" class="flex flex-col p-4 pb-2">
      <div class="flex flex-row items-center gap-3">
        <NuxtLink :to="userPage">
          <img src="/placeholder-profile-icon.jpg" alt="Profile Icon" class="size-10 rounded-full border border-border">
        </NuxtLink>
        <div class="flex flex-col leading-none h-full gap-0.5">
          <NuxtLink :to="userPage" class="text-white font-semibold">SuhEugene</NuxtLink>
          <NuxtLink :to="userPage" class="text-muted-foreground text-sm">@suheugene.ru</NuxtLink>
        </div>
        <div class="grow" />
        <button class="text-[13px] leading-none font-semibold rounded-sm bg-primary hover:bg-primary-hover cursor-pointer transition-colors duration-100 px-3 py-2 pl-2 flex items-center justify-center gap-1 mb-1" @click="open">
          <Icon name="mingcute:add-line" :size="16" />
          <span>Подписаться</span>
        </button>
      </div>
      <div class="text-lg mt-2">
        <p v-for="(paragraph, i) in paragraphs" :key="i">
          {{ paragraph }}
        </p>
      </div>
      <PostImage class="mt-2" :src="data.imageURL" :cropped="data.isImageCropped" />
      <p class="mt-3 text-muted-foreground text-xs" :title="createdTimeFull">
        {{ createTimeRelative }}
      </p>
      <div class="border-b border-border mt-3" />
      <PostButtons class="mt-2" :likes="data.likes" :comments="data.comments" :reposts="data.reposts" @interact="open" />
    </div>
    <div class="border-b border-border mt-0" />
  </div>
</template>
