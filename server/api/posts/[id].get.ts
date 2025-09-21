import type { FeedPost } from "~~/shared/types";
import { faker, fakerRU } from '@faker-js/faker';

export default defineEventHandler(async (event) => {
  const rawId = getRouterParam(event, 'id');
  if (!rawId) throw createError({ status: 400 });

  const id = parseInt(rawId, 10);
  if (isNaN(id)) throw createError({ status: 400 });

  faker.seed(id);
  const handle = faker.internet.username().toLowerCase();
  fakerRU.seed(Array.from(handle).reduce((acc, char) => acc + char.charCodeAt(0), 0));
  const username = fakerRU.internet.displayName();
  const _description = fakerRU.lorem.paragraph();
  const avatarURL = fakerRU.image.avatar();

  fakerRU.seed(id);

  return {
    id: String(id),
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
    imageURL: id % 2 ? '/placeholder-horny.png' : '/placeholder-blurred.jpg',
    isImageCropped: id % 2 !== 0,
  } satisfies FeedPost;
});
