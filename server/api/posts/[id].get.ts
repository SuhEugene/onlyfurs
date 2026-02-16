import type { FeedPost } from '~~/shared/types';

export default defineEventHandler(async (event) => {
  const rawId = getRouterParam(event, 'id');
  if (!rawId) throw createError({ status: 400 });

  const id = parseInt(rawId, 10);
  if (isNaN(id)) throw createError({ status: 400 });

  const { getOnePost } = useDBQueries();
  const [post] = await getOnePost.execute({ id });

  return { ...post, createdAt: String(post.createdAt) } satisfies FeedPost;
});
