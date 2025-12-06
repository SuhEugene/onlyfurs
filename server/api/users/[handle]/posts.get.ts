import type { FeedPost } from "~~/shared/types";

export default defineEventHandler(async (event) => {
  const rawHandle = getRouterParam(event, 'handle');
  if (!rawHandle) throw createError({ status: 400 });

  const handle = rawHandle.toLowerCase();
  if (!handle.match(/^[a-z0-9_.-]+$/)) throw createError({ status: 400 });

  const queryParams = getQuery(event);
  const offset = parseInt(queryParams.offset as string) || 0;
  if (offset < 0) throw createError({ status: 400 });

  const { getUserPosts } = useDBQueries();
  const posts = await getUserPosts.execute({ userHandle: handle, offset: 0 });

  return posts.map(post => ({ ...post, createdAt: String(post.createdAt) })) satisfies FeedPost[];
});
