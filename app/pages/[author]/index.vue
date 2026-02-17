<script setup lang="ts">
import type { Subscription, FeedPost } from '~~/shared/types';

const route = useRoute();

const {
  data: user,
  pending: userPending,
  status: userStatus,
  error: userError,
  execute: refetchUser,
} = await useLazyFetch(() => `/api/users/${route.params.author}`, {
  default: () => null,
  key: `author:${route.params.author}`,
});

const postsOffset = useState<number>(`author:${route.params.author}:posts:offset`, () => 0);

const {
  data: rawPosts,
  pending: postsPending,
  error: postsError,
  execute: refetchPosts,
} = await useLazyFetch(() => `/api/users/${route.params.author}/posts`, {
  query: { offset: postsOffset },
  default: () => [],
  key: `author:${route.params.author}:posts`,
});

const posts = useState<FeedPost[]>(`author:${route.params.author}:posts:data`, () => []);
watch(
  rawPosts,
  (newData) => {
    if (!newData) return;

    const newPosts = newData.filter((post) => !posts.value.some((p) => p.id === post.id));
    if (newPosts.length < 0) return;

    posts.value.push(...newPosts);
    triggerRef(posts);
  },
  { immediate: true },
);

function loadMorePosts() {
  if (postsPending.value) return;
  postsOffset.value = posts.value.length;
}

const authorSubscriptsions = useState<Subscription[]>('author:currentSubscriptions', () => []);
watch(user, (newUser) => {
  if (!newUser) return;
  authorSubscriptsions.value = newUser.subscriptions;
});
onMounted(() => {
  if (!user.value) return;
  authorSubscriptsions.value = user.value.subscriptions;
});
onUnmounted(() => {
  authorSubscriptsions.value = [];
});

const { trackedOpen } = useRegistration();
const { public: { s3Url } } = useRuntimeConfig();
</script>

<template>
  <div>
    <div v-if="userPending" class="flex flex-col justify-center items-center min-h-dvh gap-2 p-4">
      <Icon
        name="mingcute:loading-line"
        :size="28"
        class="text-muted-foreground spin-pulse-animation"
      />
    </div>
    <div
      v-else-if="userError"
      class="flex flex-col justify-center items-center min-h-dvh gap-2 p-4 pb-2"
    >
      <template v-if="userError.statusCode == 404">
        <Icon name="mingcute:ufo-2-line" :size="48" class="text-muted-foreground" />
        <p class="text-sm text-muted-foreground mb-2">Пользователь не найден</p>
      </template>
      <template v-else>
        <Icon name="mingcute:warning-line" :size="48" class="text-muted-foreground" />
        <p class="text-sm text-muted-foreground mb-2">Ошибка получения пользователя</p>
      </template>
      <button
        class="text-[13px] leading-none rounded-sm bg-muted hover:bg-muted-hover cursor-pointer transition-colors duration-100 px-3 py-2 flex items-center justify-center gap-1"
        tabindex="-1"
        @click="() => refetchUser()"
      >
        <span>Попробовать ещё раз</span>
      </button>
    </div>
    <div v-else-if="user" class="border-b border-border relative">
      <img
        v-if="user.bannerURL"
        :src="`${s3Url}/${user.bannerURL}`"
        alt="Profile Banner"
        class="w-full h-40 object-cover"
      />
      <div v-else class="w-full h-40 bg-primary/20"></div>
      <div class="flex justify-end items-center gap-2 py-3 px-4">
        <button
          class="text-[13px] leading-none font-semibold rounded-sm bg-primary hover:bg-primary-hover cursor-pointer transition-colors duration-100 px-3 py-2 pl-2 flex items-center justify-center gap-1"
          @click="() => trackedOpen('author-follow')"
        >
          <Icon name="mingcute:add-line" :size="16" />
          <span>Отслеживать</span>
        </button>
        <button
          class="bg-muted hover:bg-muted-hover transition-colors duration-100 cursor-pointer rounded-sm p-2 flex items-center justify-center gap-1"
          @click="() => trackedOpen('author-more')"
        >
          <Icon name="mingcute:more-1-fill" :size="16" />
        </button>
      </div>
      <div class="flex flex-col w-full gap-2 px-4 pb-4">
        <div>
          <h1 class="text-3xl font-extrabold leading-none not-sm:text-2xl">
            {{ user.username }}
          </h1>
          <div class="text-muted-foreground text-[15px]">@{{ user.handle }}</div>
        </div>
        <div class="flex flex-row items-center gap-2 text-[15px]">
          <div class="text-muted-foreground">
            <span class="text-white font-semibold">{{ user.followers }}</span>
            <span> подписчиков</span>
          </div>
          <div class="text-muted-foreground">
            <span class="text-white font-semibold">{{ user.posts !== -1 ? user.posts : '–' }}</span>
            <span> постов</span>
          </div>
        </div>
        <div v-if="user.description">
          <p v-for="line in user.description.split('\n')" :key="line">
            {{ line }}
          </p>
        </div>
      </div>
      <img
        :src="`${s3Url}/${user.avatarURL!}`"
        alt="Profile Icon"
        class="size-24 object-cover rounded-full border border-border/70 outline-2 outline-background absolute top-28 left-2 bg-background"
      />
    </div>
    <div v-if="userStatus === 'success'">
      <div class="overflow-x-auto w-screen md:w-full lg:hidden border-b border-border flex snap-x snap-mandatory">
        <InfoBarSubscription
          v-for="subscription in authorSubscriptsions"
          :key="subscription.id"
          :subscription="subscription"
          class="min-w-screen sm:min-w-90 rounded-none border-l-0 border-y-0 last:border-r-0 mx-auto snap-center snap-normal"
          @action="() => trackedOpen('subscription')"
        />
      </div>
      <div class="flex flex-col relative">
        <FeedPost v-for="post in posts" :key="post.id" :post />
        <InfiniteScroll class="absolute bottom-[50vh]" @scrolled="loadMorePosts" />
      </div>
      <PostLoadingState
        :pending="postsPending"
        :error="Boolean(postsError)"
        :all-loaded="posts.length === postsOffset"
        @load-more="loadMorePosts"
        @retry="refetchPosts"
      />
    </div>
  </div>
</template>
