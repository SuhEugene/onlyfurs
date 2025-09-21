import { fakerRU } from "@faker-js/faker";
import type { FeedPost } from "~~/shared/types";

export default defineEventHandler(async (event) => {
  const rawHandle = getRouterParam(event, 'handle');
  if (!rawHandle) throw createError({ status: 400 });

  const handle = rawHandle.toLowerCase();
  if (!handle.match(/^[a-z0-9_.-]+$/)) throw createError({ status: 400 });

  const queryParams = getQuery(event);
  const posts: FeedPost[] = [];

  fakerRU.seed(Array.from(handle).reduce((acc, char) => acc + char.charCodeAt(0), 0));
  const username = fakerRU.internet.displayName();
  const _description = fakerRU.lorem.paragraph();
  const avatarURL = fakerRU.image.avatar();

  for (let i = 0; i < 5; i++) {
    fakerRU.seed(i);
    posts.push({
      id: String(i + (parseInt(queryParams.offset as string) || 0)),
      likes: Math.round(Math.random() * 100),
      comments: Math.round(Math.random() * 100),
      reposts: Math.round(Math.random() * 100),
      content: fakerRU.lorem.paragraphs({ min: 1, max: 3 }),
      createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 5).toISOString(),
      user: {
        username,
        handle,
        avatarURL,
      },
      imageURL: i % 2 ? '/placeholder-horny.png' : '/placeholder-blurred.jpg',
      isImageCropped: i % 2 !== 0,
    });
  }

  return posts;
});
