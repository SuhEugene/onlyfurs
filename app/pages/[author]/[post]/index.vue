<template>
  <div>
    <PageHeader class="flex justify-start items-center gap-2">
      <NuxtLink to="/username">
        <button class="flex items-center justify-center rounded-md hover:bg-muted transition-colors cursor-pointer p-2">
          <Icon name="mingcute:arrow-left-line" :size="18" />
        </button>
      </NuxtLink>
      <span>Пост</span>
    </PageHeader>
    <div class="flex flex-col p-4">
      <div class="flex flex-row items-center gap-3">
        <NuxtLink to="/username">
          <img src="/placeholder-profile-icon.jpg" alt="Profile Icon" class="size-10 rounded-full border border-border">
        </NuxtLink>
        <div class="flex flex-col leading-none h-full gap-0.5">
          <NuxtLink to="/username" class="text-white font-semibold">SuhEugene</NuxtLink>
          <NuxtLink to="/username" class="text-muted-foreground text-sm">@suheugene.ru</NuxtLink>
        </div>
        <div class="grow" />
        <button class="text-[13px] leading-none font-semibold rounded-sm bg-primary hover:bg-primary-hover cursor-pointer transition-colors duration-100 px-3 py-2 pl-2 flex items-center justify-center gap-1 mb-1">
          <Icon name="mingcute:add-line" :size="16" />
          <span>Подписаться</span>
        </button>
      </div>
      <div class="text-lg mt-2">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi, aliquid nostrum cupiditate ipsa aperiam officiis labore deserunt quod vitae nemo voluptates illo atque dicta impedit ex repellat iure illum unde.</p>
        <p>Doloremque porro, optio sint nulla ab molestias vitae, laboriosam ad accusantium vel eum iure necessitatibus error labore nihil rem asperiores perspiciatis architecto odio consectetur? Ipsum odio voluptas neque corporis cumque!</p>
        <p>Non nemo eum veniam corporis aliquid quos deserunt amet molestiae officia est placeat et quod, nisi aperiam sit nihil voluptatem odio eius labore nobis magni assumenda ad reiciendis! Quasi, quam.</p>
        <p>Culpa vero aut dicta optio omnis sapiente dolor exercitationem ipsam quis velit, consectetur atque recusandae ex voluptatibus quaerat, fuga aliquid minus doloremque deserunt. Beatae dignissimos tenetur nisi accusamus culpa porro!</p>
      </div>
      <PostImage class="mt-2" cropped />
      <div class="border-b border-border mt-4" />
      <PostButtons class="mt-2" />
    </div>
  </div>
</template>
