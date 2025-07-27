<script lang="ts" setup>
const router = useRouter();

function openPostPage(event: MouseEvent) {
  if (event.target instanceof HTMLAnchorElement) return;
  event.preventDefault();
  router.push('/username/postId');
}
</script>

<template>
  <button class="flex flex-row pr-8 pl-6 pt-4 pb-2 border-b border-border hover:bg-muted/30 transition-colors cursor-pointer text-left text-inherit font-[inherit]" @click="openPostPage">
    <div class="pr-2 flex-shrink-0">
      <NuxtLink to="/username">
        <img src="~/assets/images/profile-icon-placeholder.jpg" alt="Profile Icon" class="size-10 rounded-full border border-border">
      </NuxtLink>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-row flex-wrap gap-1 items-center text-[15px] leading-none">
        <NuxtLink to="/username" class="text-white font-semibold text-base hover:underline">SuhEugene</NuxtLink>
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
      <PostImage class="mt-2" cropped />
      <PostButtons class="mt-2" />
    </div>
  </button>
</template>
