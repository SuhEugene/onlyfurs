export default defineEventHandler(async (event) => {
  const rawHandle = getRouterParam(event, 'handle');
  if (!rawHandle) throw createError({ status: 400 });

  const handle = rawHandle.trim().toLowerCase();
  if (handle.length < 3 || !handle.match(/^[a-z0-9_.-]+$/)) throw createError({ status: 400 });

  const { getUserAvailability } = useDBQueries();
  const [user] = await getUserAvailability.execute({ userHandle: handle });

  return user ? handle : false;
});
