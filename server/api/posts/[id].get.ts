import type { FeedPost } from '~~/shared/types';

export default defineEventHandler(async (event) => {
  const rawId = getRouterParam(event, 'id');
  if (!rawId) throw createError({ status: 400 });

  const id = fromPostString(rawId);
  if (isNaN(id)) throw createError({ status: 400 });

  const { getOnePost } = useDBQueries();
  const [post] = await getOnePost.execute({ id });

  if (!post) throw createError({ status: 404 });

  return {
    ...post,
    id: toPostString(post.id),
    createdAt: String(post.createdAt),
  } satisfies FeedPost;
});
