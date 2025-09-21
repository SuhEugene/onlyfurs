import type { FeedPost } from "~~/shared/types";

export default defineEventHandler(async (event) => {
  const rawId = getRouterParam(event, 'id');
  if (!rawId) return createError({ status: 400 });

  const id = parseInt(rawId, 10);
  if (isNaN(id)) return createError({ status: 400 });

  return {
    id: String(id),
    likes: Math.round(Math.random() * 100),
    comments: Math.round(Math.random() * 100),
    reposts: Math.round(Math.random() * 100),
    content: randomParagraph() + (Math.random() > 0.5 ? '\n' + randomParagraph() : ''),
    createdAt: new Date().toISOString(),
    user: {
      username: randomParagraph().split(' ')[0],
      handle: randomParagraph().split(' ')[3],
      avatarURL: '/placeholder-profile-icon.jpg',
    },
    imageURL: id % 2 ? '/placeholder-horny.png' : '/placeholder-blurred.jpg',
    isImageCropped: id % 2 !== 0,
  }
});
