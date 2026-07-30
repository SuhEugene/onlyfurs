import type { User } from '~~/shared/types';

export default defineEventHandler(async (event) => {
  const rawHandle = getRouterParam(event, 'handle');
  if (!rawHandle) throw createError({ status: 400 });

  const handle = rawHandle.toLowerCase();
  if (!handle.match(/^[a-z0-9_.-]+$/)) throw createError({ status: 400 });

  const { getUser, getUserSubscriptions, getUserPostsCount } = useDBQueries();
  const [user] = await getUser.execute({ userHandle: handle });
  if (!user) throw createError({ status: 404 });

  const subscriptions = await getUserSubscriptions.execute({ userHandle: handle });
  const [counter] = await getUserPostsCount.execute({ userHandle: handle });

  return {
    ...stringifyId(user),
    subscriptions: subscriptions.map(stringifyId),
    posts: counter?.posts ?? -1,
  } satisfies User;
});
