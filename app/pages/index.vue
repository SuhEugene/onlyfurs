<script lang="ts" setup>
import type { FeedPost } from '~~/shared/types';

const offset = useState<number>('index:posts:offset', () => 0);

const { data, pending, error, execute } = await useLazyFetch('/api/posts', {
  query: { offset },
  default: () => [],
});

const posts = useState<FeedPost[]>('index:posts:data', () => []);
watch(data, (newData) => {
  if (!newData) return;

  const newPosts = newData.filter(post => !posts.value.some(p => p.id === post.id));
  if (newPosts.length < 0) return;

  posts.value.push(...newPosts);
  triggerRef(posts);
}, { immediate: true });

function loadMore() {
  if (pending.value) return;
  offset.value = posts.value.length;
}
</script>

<template>
  <div class="flex flex-col">
    <PageHeader class="flex items-center justify-center">
      <img src="~/assets/images/only-furs.svg" class="size-12">
    </PageHeader>
    <div class="flex flex-col relative">
      <FeedPost v-for="post in posts" :key="post.id" :post />
      <InfiniteScroll class="absolute bottom-[50vh]" @scrolled="loadMore" />
    </div>
    <div class="flex flex-col gap-2 justify-center items-center h-30">
      <Icon v-if="pending" name="mingcute:loading-line" :size="28" class="text-muted-foreground spin-pulse-animation" />
      <template v-else-if="error">
        <p class="text-sm">
          Ошибка получения постов
        </p>
        <button class="text-[13px] leading-none rounded-sm bg-muted hover:bg-muted-hover cursor-pointer transition-colors duration-100 px-3 py-2 flex items-center justify-center gap-1" tabindex="-1" @click="() => execute()">
          <span>Попробовать ещё раз</span>
        </button>
      </template>
      <button v-else class="text-[13px] leading-none rounded-sm bg-muted hover:bg-muted-hover cursor-pointer transition-colors duration-100 px-3 py-2 flex items-center justify-center gap-1" tabindex="-1" @click="loadMore">
        <span>Загрузить ещё</span>
      </button>
    </div>
    <div class="h-[30vh]" />
  </div>
</template>

<style scoped>
@keyframes spin-pulse {
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: rotate(1turn);
    opacity: 0.5;
  }
  100% {
    transform: rotate(2turn);
    opacity: 1;
  }
}

.spin-pulse-animation {
  animation: spin-pulse 2s infinite linear;
}
</style>
