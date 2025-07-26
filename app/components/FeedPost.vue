<script lang="ts" setup>
</script>

<template>
  <div class="flex flex-row pr-8 pl-6 pt-4 pb-2 border-b border-border">
    <NuxtLink class="pr-2 flex-shrink-0" to="/username">
      <img src="~/assets/images/profile-icon-placeholder.jpg" alt="Profile Icon" class="size-10 rounded-full border border-border">
    </NuxtLink>
    <div class="flex flex-col">
      <div class="flex flex-row flex-wrap gap-1 items-center text-[15px] leading-none">
        <NuxtLink to="/username" class="text-white font-semibold text-base">SuhEugene</NuxtLink>
        <NuxtLink to="/username" class="text-muted-foreground">@suheugene.ru</NuxtLink>
        <span class="text-muted-foreground text-xs">{{ '\u2022' }}</span>
        <span class="text-muted-foreground">2д назад</span>
      </div>
      <div class="flex flex-col text-[15px]">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nisi libero non explicabo obcaecati esse omnis quam alias dignissimos, debitis distinctio dolore ea nemo, perferendis, sunt dolorum temporibus similique veritatis?</p>
        <p>Rem quas maxime maiores cumque tenetur consequatur perferendis ea distinctio! Ipsum, distinctio. Dolor eos excepturi magni tempore ad quasi quae aspernatur laudantium veniam distinctio ratione, hic doloremque aperiam vitae debitis!</p>
        <p>Suscipit, nesciunt. Accusamus nisi sapiente eius amet tempore quis voluptatum magnam iusto facilis veniam laudantium iure corporis nulla natus, mollitia alias hic temporibus quisquam, rem tempora debitis error cupiditate praesentium!</p>
        <p>Harum neque ipsam amet quos eveniet velit nostrum quis maiores delectus illum quisquam necessitatibus, nihil facere deleniti accusamus facilis ex ab, hic officiis eaque quae dignissimos omnis expedita! Quae, commodi!</p>
      </div>
      <button class="mt-2 relative cursor-pointer group/post-image rounded-t-xl border border-border overflow-hidden">
        <div class="absolute inset-0 opacity-0 group-hover/post-image:opacity-100 bg-background/40 transition-all flex flex-row items-center justify-center gap-2 z-[2]">
          <Icon name="mingcute:eye-line" :size="24" />
          <span>Открыть изображение</span>
        </div>
        <div class="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-background to-transparent z-[1]" />
        <img src="~/assets/images/post-image.jpg" alt="Post image" class="w-full h-auto object-cover blur-lg">
      </button>
      <div class="flex flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
        <button class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
          <Icon name="mingcute:heart-line" :size="18" />
          <span>12</span>
        </button>
        <button class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
          <Icon name="mingcute:chat-1-line" :size="18" />
          <span>12</span>
        </button>
        <button class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
          <Icon name="mingcute:refresh-4-line" :size="18" />
          <span>12</span>
        </button>
        <button class="flex flex-row gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
          <Icon name="mingcute:more-1-fill" :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>
