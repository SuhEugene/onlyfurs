import type { Subscription, User } from "~~/shared/types";

export default defineEventHandler(async (event) => {
  const rawHandle = getRouterParam(event, 'handle');
  if (!rawHandle) throw createError({ status: 400 });

  const handle = rawHandle.toLowerCase();
  if (!handle.match(/^[a-z0-9]+$/)) throw createError({ status: 400 });

  return {
    id: handle,
    handle,
    username: randomParagraph().split(' ')[0],
    description: randomParagraph(),
    avatarURL: '/placeholder-profile-icon.jpg',
    bannerURL: '/placeholder-profile-banner.jpg',
    followers: Math.round(Math.random() * 100),
    posts: Math.round(Math.random() * 100),
    subscriptions: Array(Math.round(Math.random() * 3)).fill(null).map(getRandomSubscription).toSorted((a, b) => a.price - b.price),
  } satisfies User;
});

function getRandomSubscription(): Subscription {
  return {
    id: String(Math.random()),
    title: randomParagraph().split(' ').slice(0, 2 + Math.round(Math.random() * 5)).join(' '),
    description: randomParagraph().split(' ').slice(0, 3 + Math.round(Math.random() * 20)).join(' '),
    price: Math.round(Math.random() * 20)*5,
  };
}
