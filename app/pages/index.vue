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
    <PostLoadingState
      :pending="pending"
      :error="Boolean(error)"
      :all-loaded="posts.length === offset"
      @load-more="loadMore"
      @retry="execute"
    />
  </div>
</template>
