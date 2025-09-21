import { faker, fakerRU } from "@faker-js/faker";
import type { FeedPost } from "~~/shared/types";

export default defineEventHandler(async (event) => {
  const queryParams = getQuery(event);
  const posts: FeedPost[] = [];

  for (let i = 0; i < 5; i++) {
    const id = i + (parseInt(queryParams.offset as string) || 0);
    faker.seed(id);
    const handle = faker.internet.username().toLowerCase();
    fakerRU.seed(Array.from(handle).reduce((acc, char) => acc + char.charCodeAt(0), 0));
    const username = fakerRU.internet.displayName();
    const _description = fakerRU.lorem.paragraph();
    const avatarURL = fakerRU.image.avatar();
    fakerRU.seed(id);
    posts.push({
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
      imageURL: i % 2 ? '/placeholder-horny.png' : '/placeholder-blurred.jpg',
      isImageCropped: i % 2 !== 0,
    });
  }

  return posts;
});
