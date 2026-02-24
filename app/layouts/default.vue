<template>
  <div class="flex flex-col items-center min-h-screen w-full">
    <NavBar
      class="max-md:hidden translate-x-[calc(-300px-50%)] lg:translate-x-[calc(-300px-50%-100px)] xl:translate-x-[calc(-300px-50%)]"
    />
    <InfoBar
      class="max-lg:hidden lg:translate-x-[calc(300px+50%-100px)] xl:translate-x-[calc(300px+50%)]"
    />
    <ContentWrapper
      contentClass="max-md:w-full md:w-[600px] translate-x-0 lg:translate-x-[-100px] xl:translate-x-0"
      borderClass="max-md:hidden w-[602px] translate-x-0 lg:translate-x-[-100px] xl:translate-x-0"
    >
      <slot />
    </ContentWrapper>
    <NavBarMobile />
  </div>
</template>
