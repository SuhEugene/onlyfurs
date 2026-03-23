<script lang="ts" setup>
const props = defineProps<{ text: string; paragraphClass?: string }>();

const USER_REGEX = /@([a-zA-Z0-9_.-]+)\b/;
const HASHTAG_REGEX = /#([a-zA-Z0-9_]+)\b/;

interface ItemBase {
  type: string;
  text: string;
}
interface TextItem extends ItemBase {
  type: 'text';
}
interface UserItem extends ItemBase {
  type: 'user';
}
interface HashtagItem extends ItemBase {
  type: 'hashtag';
}

type Item = UserItem | HashtagItem | TextItem;

function getMatch(regex: RegExp, text: string) {
  const match = text.match(regex);
  if (!match || !match[1] || match.index === undefined) return null;
  return {
    match: match[1],
    prefix: text.slice(0, match.index),
    suffix: text.slice(match.index + match[1].length + 1),
  };
}

const paragraphs = computed<Item[][]>(() =>
  props.text.split('\n').map((line) => {
    const out: Item[] = [];
    let leftovers = line;
    while (leftovers) {
      const user = getMatch(USER_REGEX, leftovers);
      if (user) {
        out.push({ type: 'text', text: user.prefix });
        out.push({ type: 'user', text: user.match });
        leftovers = user.suffix;
        continue;
      }
      const hashtag = getMatch(HASHTAG_REGEX, leftovers);
      if (hashtag) {
        out.push({ type: 'text', text: hashtag.prefix });
        out.push({ type: 'hashtag', text: hashtag.match });
        leftovers = hashtag.suffix;
        continue;
      }
      out.push({ type: 'text', text: leftovers });
      leftovers = '';
    }
    return out;
  }),
);

const { trackedOpen } = useRegistration();
</script>

<template>
  <p :class="cn($props.paragraphClass)" v-for="(paragraph, index) in paragraphs" :key="index">
    <template v-for="(item, number) in paragraph" :key="number">
      <span v-if="item.type === 'text'">{{ item.text }}</span>
      <NuxtLink
        v-else-if="item.type === 'user'"
        :to="`/${item.text.toLowerCase()}`"
        class="text-primary hover:underline"
      >
        @{{ item.text }}
      </NuxtLink>
      <a
        :href="`/#${item.text}`"
        v-else-if="item.type === 'hashtag'"
        class="text-primary hover:underline"
        @click.prevent.stop="trackedOpen('post-hashtag')"
      >
        #{{ item.text }}
      </a>
    </template>
  </p>
</template>

<style></style>
