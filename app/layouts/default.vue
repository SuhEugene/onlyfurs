<template>
  <div class="flex flex-col items-center min-h-screen w-full">
    <NavBar />
    <InfoBar />
    <ContentWrapper>
      <slot />
    </ContentWrapper>
  </div>
</template>
