<script lang="ts" setup>
definePageMeta({
  layout: 'nothing',
});
useSeoMeta({ title: 'Регистрация' });

const PAGE_LOADING_TIMEOUT = 3000;
const PAGE_SPINNER_TIMEOUT = 3000;

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
onMounted(() =>
  setTimeout(() => {
    spinnerTimePassed.value = true;
    umTrackEvent('ricky.captcha');
  }, PAGE_SPINNER_TIMEOUT),
);

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
watch(videoRef, (videoEl, oldEl, onCleanup) => {
  if (!videoEl) return;
  const updateProgress = () => {
    videoTime.value = videoEl.currentTime;
    videoProgress.value = videoEl.currentTime / videoEl.duration;
    isVideoEnded.value = videoEl.ended;
  };
  const interval = setInterval(updateProgress, 50);
  onCleanup(() => clearInterval(interval));
});

const showCaptcha = computed(() => isVideoReady.value && spinnerTimePassed.value);
const isVideoShown = ref(false);

function showVideo() {
  umTrackEvent('ricky.start');
  isVideoShown.value = true;
  setVideoPlaying(true);
}

function recordLeave() {
  umTrackEvent('ricky.leave', { watched: Math.round(videoTime.value * 10) / 10 });
}

function replayVideo() {
  if (!videoRef.value) return;
  umTrackEvent('ricky.replay');
  videoRef.value.currentTime = 0;
  setVideoPlaying(true);
}

function toggleVideo() {
  setVideoPlaying(!isVideoPlaying.value);
}

function onEnd() {
  umTrackEvent('ricky.end');
}

const playbackRate = ref(1);
watch(playbackRate, (newValue) => {
  if (!videoRef.value) return;
  videoRef.value.playbackRate = Math.min(newValue, 12);
});

let speedupTimeout: NodeJS.Timeout | undefined;
let nextSpeedupTimeout: NodeJS.Timeout | undefined;
let nextSpeedupInterval: NodeJS.Timeout | undefined;
function startSpeedup() {
  if (speedupTimeout) clearTimeout(speedupTimeout);
  if (nextSpeedupTimeout) clearTimeout(nextSpeedupTimeout);
  if (nextSpeedupInterval) clearTimeout(nextSpeedupInterval);

  speedupTimeout = setTimeout(() => {
    if (!videoRef.value) return;
    playbackRate.value = 2;
    speedupTimeout = undefined;

    nextSpeedupTimeout = setTimeout(() => {
      nextSpeedupInterval = setInterval(() => {
        if (!videoRef.value) return;
        playbackRate.value = Math.min(playbackRate.value + 0.1, 12);
      }, 500);
      nextSpeedupTimeout = undefined;
    }, 2000);
  }, 1000);
}

function stopSpeedup() {
  if (speedupTimeout) {
    setVideoPlaying(false);
    clearTimeout(speedupTimeout);
  }
  if (nextSpeedupTimeout) clearTimeout(nextSpeedupTimeout);
  if (nextSpeedupInterval) clearTimeout(nextSpeedupInterval);

  if (!videoRef.value) return;
  playbackRate.value = 1;
  speedupTimeout = undefined;
}

onMounted(() => window.addEventListener('pointerup', stopSpeedup));
onUnmounted(() => window.removeEventListener('pointerup', stopSpeedup));

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

onMounted(() => umTrackEvent('ricky.loading'));
onUnmounted(() => {
  if (isVideoShown.value) recordLeave();
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
      @ended="onEnd"
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
      <div
        v-if="!isVideoEnded && isVideoPlaying"
        class="absolute h-full inset-y-0 right-0 w-1/5"
        @pointerdown="startSpeedup"
        @click.prevent.stop="stopSpeedup"
      ></div>
      <div
        v-if="playbackRate > 1"
        class="absolute top-1/8 px-6 pl-4 py-2 bg-black/50 backdrop-blur-xl rounded-lg flex flex-row items-center"
      >
        <Icon
          name="mingcute:right-line"
          :size="24"
          class="text-white animate-pulse duration-100"
          style="animation-duration: 1s"
        />
        <Icon
          name="mingcute:right-line"
          :size="24"
          class="text-white animate-pulse duration-100 -ml-4 mr-0.5"
          style="animation-delay: 0.25s; animation-duration: 1s"
        />
        <span>x{{ Math.round(playbackRate * 10) / 10 }}</span>
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
