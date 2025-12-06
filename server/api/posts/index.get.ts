import type { FeedPost } from "~~/shared/types";

export default defineEventHandler(async (event) => {
  const queryParams = getQuery(event);

  const offset = parseInt(queryParams.offset as string) || 0;
  if (offset < 0) throw createError({ status: 400 });

  const { getFeedPosts } = useDBQueries();
  const posts = await getFeedPosts.execute({ offset });

  return posts.map(post => ({ ...post, createdAt: String(post.createdAt) })) satisfies FeedPost[];
});
