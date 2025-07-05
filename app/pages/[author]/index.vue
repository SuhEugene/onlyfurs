<script setup lang="ts">
const user = {
  username: 'SuhEugene',
  handle: 'username.handle',
  description: 'I\'m a software engineer, I love to code, and I\'m passionate about building beautiful and functional products.',
  avatar: (await import('~/assets/images/profile-icon-placeholder.jpg')).default,
  banner: (await import('~/assets/images/profile-banner-placeholder.jpg')).default,
  followersCount: 123,
  postsCount: 4,
};
</script>

<template>
  <div>
    <div class="border-b border-border relative">
      <img src="~/assets/images/profile-banner-placeholder.jpg" alt="Profile Banner" class="w-full h-40 object-cover">
      <div class="flex justify-end items-center gap-2 py-3 px-4">
        <button class="text-[13px] leading-none font-semibold rounded-sm bg-primary hover:bg-primary-hover cursor-pointer transition-colors duration-100 px-3 py-2 pl-2 flex items-center justify-center gap-1">
          <Icon name="mingcute:add-line" :size="16" />
          <span>Подписаться</span>
        </button>
        <button class="bg-muted hover:bg-muted-hover transition-colors duration-100 cursor-pointer rounded-sm p-2 flex items-center justify-center gap-1">
          <Icon name="mingcute:more-1-fill" :size="16" />
        </button>
      </div>
      <div class="flex flex-col w-full gap-2 px-4 pb-4">
        <div>
          <h1 class="text-3xl font-extrabold leading-none">
            {{ user.username }}
          </h1>
          <div class="text-muted-foreground text-[15px]">
            @{{ user.handle }}
          </div>
        </div>
        <div class="flex flex-row items-center gap-2 text-[15px]">
          <div class="text-muted-foreground">
            <span class="text-white font-semibold">{{ user.followersCount }}</span>
            <span> подписчиков</span>
          </div>
          <div class="text-muted-foreground">
            <span class="text-white font-semibold">{{ user.postsCount }}</span>
            <span> постов</span>
          </div>
        </div>
        <div v-if="user.description">
          {{ user.description }}
        </div>
      </div>
      <img src="~/assets/images/profile-icon-placeholder.jpg" alt="Profile Icon" class="size-24 object-cover rounded-full border border-border/70 outline-2 outline-background absolute top-28 left-2">
    </div>
  </div>
</template>
