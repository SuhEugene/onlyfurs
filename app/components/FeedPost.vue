<script lang="ts" setup>
import type { FeedPost } from '~~/shared/types';

const props = defineProps<{
  post: FeedPost;
}>();

const router = useRouter();

function openPostPage(event: MouseEvent) {
  if (event.target instanceof HTMLAnchorElement) return;
  event.preventDefault();
  router.push(`/${props.post.user.handle}/${props.post.id}`);
}

const paragraphs = computed(() => props.post.content.split('\n'));
const userPage = computed(() => `/${props.post.user.handle}`);

const timeFormat = new Intl.DateTimeFormat('ru', { dateStyle: 'short', timeStyle: 'short' });
const relativeTimeFormat = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });

const createdTimeFull = computed(() => timeFormat.format(new Date(props.post.createdAt)));

const day = 1000 * 60 * 60 * 24;
const createdTimeRelative = computed(() => {
  const now = Date.now();
  const created = new Date(props.post.createdAt).getTime();
  return relativeTimeFormat.format(Math.floor((created - now) / day), 'day');
});

const { trackedOpen } = useRegistration();
</script>

<template>
  <button
    class="flex flex-row pr-8 pl-6 pt-4 pb-2 border-b border-border hover:bg-muted/30 transition-colors cursor-pointer text-left text-inherit font-[inherit]"
    @click="openPostPage"
  >
    <div class="pr-2 flex-shrink-0">
      <NuxtLink :to="userPage">
        <img
          :src="post.user.avatarURL"
          alt="Profile Icon"
          class="size-10 rounded-full border border-border"
        />
      </NuxtLink>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-row flex-wrap gap-1 items-center text-[15px] leading-none">
        <NuxtLink :to="userPage" class="text-white font-semibold text-base hover:underline">{{
          post.user.username
        }}</NuxtLink>
        <NuxtLink :to="userPage" class="text-muted-foreground">@{{ post.user.handle }}</NuxtLink>
        <span class="text-muted-foreground text-xs">{{ '\u2022' }}</span>
        <span class="text-muted-foreground" :title="createdTimeFull">{{
          createdTimeRelative
        }}</span>
      </div>
      <div class="flex flex-col text-[15px]">
        <p v-for="(paragraph, index) in paragraphs" :key="index">
          {{ paragraph }}
        </p>
      </div>
      <PostImage class="mt-2" :src="post.imageURL" :cropped="post.isImageCropped" />
      <PostButtons
        :likes="post.likes"
        :comments="post.comments"
        :reposts="post.reposts"
        class="mt-2"
        @interact="() => trackedOpen('post-buttons')"
      />
    </div>
  </button>
</template>
