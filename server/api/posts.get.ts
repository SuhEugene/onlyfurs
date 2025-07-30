import type { FeedPost } from "~~/shared/types";

export default defineEventHandler(async (event) => {
  const queryParams = getQuery(event);
  const posts: FeedPost[] = [];

  for (let i = 0; i < 5; i++) {
    posts.push({
      id: String(i + (parseInt(queryParams.offset as string) || 0)),
      likes: Math.round(Math.random() * 100),
      comments: Math.round(Math.random() * 100),
      reposts: Math.round(Math.random() * 100),
      content: randomParagraph() + (Math.random() > 0.5 ? '\n' + randomParagraph() : ''),
      createdAt: new Date().toISOString(),
      user: {
        username: randomParagraph().split(' ')[0],
        handle: randomParagraph().split(' ')[3],
        avatarURL: '/profile-icon-placeholder.jpg',
      },
      imageURL: '/horny-placeholder.png',
    });
  }

  return posts;
})
