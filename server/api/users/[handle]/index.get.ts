import type { User } from "~~/shared/types";

export default defineEventHandler(async (event) => {
  const rawHandle = getRouterParam(event, 'handle');
  if (!rawHandle) throw createError({ status: 400 });

  const handle = rawHandle.toLowerCase();
  if (!handle.match(/^[a-z0-9]+$/)) throw createError({ status: 400 });

  return {
    handle,
    username: randomParagraph().split(' ')[0],
    description: randomParagraph(),
    avatarURL: '/placeholder-profile-icon.jpg',
    bannerURL: '/placeholder-profile-banner.jpg',
    followers: Math.round(Math.random() * 100),
    posts: Math.round(Math.random() * 100),
  } satisfies User;
});
