<script setup lang="ts">
import type { Subscription } from '~~/shared/types';

const authorSubscriptsions = useState<Subscription[]>('author:currentSubscriptions', () => []);

const { open } = useRegistration();
</script>

<template>
  <div class="flex flex-col py-5 pl-7 w-[328px] fixed infobar">
    <!-- <div class="w-full h-20 rounded-md bg-muted" /> -->
    <InfoBarJoin v-if="authorSubscriptsions.length === 0" />
    <div v-else class="flex flex-col gap-2">
      <InfoBarSubscription v-for="subscription in authorSubscriptsions" :key="subscription.id" :subscription="subscription" @action="open" />
    </div>
    <div class="w-full border-t border-border my-4" />
    <div class="flex flex-row justify-center flex-wrap gap-2">
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
