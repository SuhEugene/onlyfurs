<script setup lang="ts">
import type { Subscription } from '~~/shared/types';

defineProps<{ class: string }>();

const authorSubscriptsions = useState<Subscription[]>('author:currentSubscriptions', () => []);

const { trackedOpen } = useRegistration();
</script>

<template>
  <div :class="cn('flex flex-col py-5 pl-7 w-72 xl:w-82 fixed', $props.class)">
    <InfoBarJoin v-if="authorSubscriptsions.length === 0" />
    <div v-else class="flex flex-col gap-2">
      <InfoBarSubscription
        v-for="subscription in authorSubscriptsions"
        :key="subscription.id"
        :subscription="subscription"
        @action="() => trackedOpen('subscription')"
      />
    </div>
    <div class="w-full border-t border-border my-4" />
    <div class="flex flex-row justify-center flex-wrap gap-2">
      <InfoBarLink label="Privacy Policy" to="/privacy-policy" />
      <InfoBarLink label="Terms of Service" to="/terms-of-service" />
      <InfoBarLink label="Cookie Notice" to="/cookie-notice" />
    </div>
  </div>
</template>
