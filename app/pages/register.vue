<script lang="ts" setup>
definePageMeta({
  layout: 'nothing',
});
const PAGE_LOADING_TIMEOUT = 3000;
const PAGE_SPINNER_TIMEOUT = 7000;

const videoRef = useTemplateRef('nggyu');

const isVideoReady = ref(false);
watch(videoRef, (videoEl, oldEl, onCleanup) => {
  if (!videoEl) return;

  isVideoReady.value = videoEl.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
  if (isVideoReady.value) return;

  const setReady = () => (isVideoReady.value = true);
  videoEl.addEventListener('loadeddata', setReady, { once: true });
  onCleanup(() => videoEl.removeEventListener('loadeddata', setReady));
});

const spinnerTimePassed = ref<boolean>(false);
onMounted(() => setTimeout(() => (spinnerTimePassed.value = true), PAGE_SPINNER_TIMEOUT));

const isVideoPlaying = ref(false);
function setVideoPlaying(isPlaying: boolean) {
  if (!videoRef.value) return;
  videoRef.value.volume = 0.5;
  videoRef.value.focus();

  if (isPlaying) videoRef.value?.play();
  else videoRef.value?.pause();

  isVideoPlaying.value = isPlaying;
}

const videoTime = ref(0);
const videoProgress = ref(0);
const isVideoEnded = ref(false);
watch(videoRef, (videoEl) => {
  if (!videoEl) return;
  const updateProgress = () => {
    videoTime.value = videoEl.currentTime;
    videoProgress.value = videoEl.currentTime / videoEl.duration;
    isVideoEnded.value = videoEl.ended;
  };
  const interval = setInterval(updateProgress, 50);
  onUnmounted(() => clearInterval(interval));
});

const showCaptcha = computed(() => isVideoReady.value && spinnerTimePassed.value);
const isVideoShown = ref(false);

function showVideo() {
  isVideoShown.value = true;
  setVideoPlaying(true);
}

function replayVideo() {
  if (!videoRef.value) return;
  videoRef.value.currentTime = 0;
  setVideoPlaying(true);
}

function toggleVideo() {
  setVideoPlaying(!isVideoPlaying.value);
}

const sources = [
  // { file: (await import('~/assets/videos/NGGYU_2160p.webm')).default, minWidth: 1600 }, // 4K
  // { file: (await import('~/assets/videos/NGGYU_1440p.webm')).default, minWidth: 1200 }, // 2K
  { file: (await import('~/assets/videos/NGGYU_1080p.webm')).default, minWidth: 900 }, // 1080p
  { file: (await import('~/assets/videos/NGGYU_720p.webm')).default, minWidth: 480 }, // 720p
  { file: (await import('~/assets/videos/NGGYU_480p.webm')).default, minWidth: 0 }, // 480p fallback
];

const videoSource = ref<string | undefined>(undefined);
function chooseSource() {
  const dpr = window.devicePixelRatio || 1;
  const screenWidth =
    Math.max(window.innerWidth || 0, document.documentElement.clientWidth || 0) * dpr;

  for (const source of sources) {
    if (screenWidth >= source.minWidth) return source.file;
  }

  return sources[sources.length - 1]!.file;
}

onMounted(async () => {
  const newSource = chooseSource();
  if (newSource === videoSource.value) return;
  videoSource.value = newSource;
});

await new Promise((resolve) => setTimeout(resolve, PAGE_LOADING_TIMEOUT));
</script>

<template>
  <div>
    <video
      ref="nggyu"
      :src="videoSource"
      playsinline
      :class="
        cn(
          'absolute w-full h-full inset-0 object-cover duration-500 transition-opacity z-10 pointer-events-none',
          !isVideoShown && 'opacity-0',
        )
      "
    />

    <div
      class="absolute inset-0 w-full h-full z-0 flex justify-center items-center min-h-dvh gap-2 p-4"
    >
      <div v-if="showCaptcha">
        <div class="max-w-md text-center mb-8 text-lg text-balance">
          Для продолжения, подтвердите что вы не робот:
        </div>
        <FakeCaptcha class="w-max mx-auto" @submit="showVideo" />
      </div>
      <div v-else>
        <Icon
          name="mingcute:loading-line"
          :size="64"
          class="text-muted-foreground spin-pulse-animation"
        />
      </div>
    </div>

    <div
      v-if="isVideoShown"
      class="absolute inset-0 w-full h-full z-20 flex justify-center items-center min-h-dvh gap-2 p-4"
      @click="toggleVideo"
    >
      <div
        v-if="isVideoEnded"
        class="p-4 transition-colors bg-white/10 hover:bg-white/20 cursor-pointer rounded-2xl leading-0"
        @click.prevent.stop="replayVideo"
      >
        <Icon name="mingcute:repeat-line" :size="64" class="text-white" />
      </div>
      <div
        v-else-if="!isVideoPlaying"
        class="p-4 transition-colors bg-black/20 hover:bg-black/30 cursor-pointer rounded-2xl leading-0"
      >
        <Icon name="mingcute:play-line" :size="64" class="text-white" />
      </div>
      <div class="absolute inset-x-0 bottom-0 h-32 bg-linear-0 from-black/70 to-black/0" />
      <div class="absolute inset-x-4 bottom-4">
        <div class="max-w-lg mx-auto">
          <div class="mb-4">
            <NuxtLink
              v-if="videoTime > 5"
              to="/"
              class="text-[13px] leading-none rounded-sm bg-muted hover:bg-muted-hover cursor-pointer transition-colors duration-100 px-3 py-2 flex items-center justify-center gap-1 mt-2"
              @click.stop
            >
              <span>Вернуться на главную</span>
            </NuxtLink>
          </div>
          <div class="h-1 rounded bg-muted">
            <div class="h-full rounded bg-primary" :style="{ width: `${videoProgress * 100}%` }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
