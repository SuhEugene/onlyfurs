import type { FeedPost } from "~~/shared/types";

export default defineEventHandler(async (event) => {
  const rawHandle = getRouterParam(event, 'handle');
  if (!rawHandle) throw createError({ status: 400 });

  const handle = rawHandle.toLowerCase();
  if (!handle.match(/^[a-z0-9]+$/)) throw createError({ status: 400 });

  const username = randomParagraph().split(' ')[0];

  const queryParams = getQuery(event);
  const posts: FeedPost[] = [];

  for (let i = 0; i < 5; i++) {
    posts.push({
      id: String(i + (parseInt(queryParams.offset as string) || 0)),
      likes: Math.round(Math.random() * 100),
      comments: Math.round(Math.random() * 100),
      reposts: Math.round(Math.random() * 100),
      content: randomParagraph() + (Math.random() > 0.5 ? '\n' + randomParagraph() : ''),
      createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 5).toISOString(),
      user: {
        username: username,
        handle,
        avatarURL: '/placeholder-profile-icon.jpg',
      },
      imageURL: i % 2 ? '/placeholder-horny.png' : '/placeholder-blurred.jpg',
      isImageCropped: i % 2 !== 0,
    });
  }

  return posts;
});
