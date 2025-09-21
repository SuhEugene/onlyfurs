import { fakerRU } from "@faker-js/faker";
import type { Subscription, User } from "~~/shared/types";

export default defineEventHandler(async (event) => {
  const rawHandle = getRouterParam(event, 'handle');
  if (!rawHandle) throw createError({ status: 400 });

  const handle = rawHandle.toLowerCase();
  if (!handle.match(/^[a-z0-9_.-]+$/)) throw createError({ status: 400 });

  fakerRU.seed(Array.from(handle).reduce((acc, char) => acc + char.charCodeAt(0), 0));

  return {
    id: handle,
    handle,
    username: fakerRU.internet.displayName(),
    description: fakerRU.lorem.paragraph(),
    avatarURL: fakerRU.image.avatar(),
    bannerURL: fakerRU.image.avatarGitHub(),
    followers: Math.round(Math.random() * 100),
    posts: Math.round(Math.random() * 100),
    subscriptions: Array(Math.round(Math.random() * 3)).fill(null).map(getRandomSubscription).toSorted((a, b) => a.price - b.price),
  } satisfies User;
});

function getRandomSubscription(): Subscription {
  return {
    id: String(Math.random()),
    title: fakerRU.commerce.productName(),
    description: fakerRU.commerce.productDescription(),
    price: Number(fakerRU.commerce.price({ min: 10, max: 2000, dec: 0 })),
  };
}
