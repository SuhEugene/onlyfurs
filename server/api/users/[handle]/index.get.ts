import type { User } from "~~/shared/types";

export default defineEventHandler(async (event) => {
  const rawHandle = getRouterParam(event, 'handle');
  if (!rawHandle) throw createError({ status: 400 });

  const handle = rawHandle.toLowerCase();
  if (!handle.match(/^[a-z0-9_.-]+$/)) throw createError({ status: 400 });

  const { getUser, getUserSubscriptions, getUserPostsCount } = useDBQueries();
  const [user] = await getUser.execute({ userHandle: handle });
  const subscriptions = await getUserSubscriptions.execute({ userHandle: handle });
  const [{ posts }] = await getUserPostsCount.execute({ userHandle: handle });

  return {
    ...user,
    subscriptions,
    posts
  } satisfies User;
});
