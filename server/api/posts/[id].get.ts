import type { FeedPost } from '~~/shared/types';

export default defineEventHandler(async (event) => {
  const rawId = getRouterParam(event, 'id');
  if (!rawId) throw createError({ status: 400 });

  const id = stringToFlake(rawId);
  if (id === null) throw createError({ status: 400 });

  const { getOnePost } = useDBQueries();
  const [post] = await getOnePost.execute({ id });

  if (!post) throw createError({ status: 404 });

  return {
    ...post,
    id: String(post.id),
    createdAt: String(post.createdAt),
  } satisfies FeedPost;
});
