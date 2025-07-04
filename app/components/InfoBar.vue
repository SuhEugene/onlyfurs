<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col py-5 pl-7 w-[328px] fixed infobar">
    <div class="w-full h-20 rounded-md bg-muted" />
    <div class="w-full border-t border-muted my-4" />
    <div class="flex flex-row justify-center  flex-wrap gap-2">
      <InfoBarLink label="Privacy Policy" to="/privacy-policy" />
      <InfoBarLink label="Terms of Service" to="/terms-of-service" />
      <InfoBarLink label="Cookie Notice" to="/cookie-notice" />
    </div>
  </div>
</template>

<style scoped>
.infobar {
  transform: translateX(300px) translateX(50%);
}
</style>
