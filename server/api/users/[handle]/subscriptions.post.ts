export default defineEventHandler(async (event) => {
  checkToken(event);

  const rawHandle = getRouterParam(event, 'handle');
  if (!rawHandle) throw createError({ status: 400 });

  const body = await readBody(event);

  if (!body.title) throw createError({ status: 400 });
  if (!body.description) throw createError({ status: 400 });
  if (!body.price) throw createError({ status: 400 });

  const db = useDrizzle();
  const error = await db
    .transaction(
      async (tx) => {
        const [user] = await tx
          .select({ id: tables.users.id })
          .from(tables.users)
          .where(eq(tables.users.handle, rawHandle.toLowerCase()))
          .limit(1);

        if (!user) return tx.rollback();

        const [subscription] = await tx
          .insert(tables.subscriptions)
          .values({
            title: body.title,
            description: body.description,
            price: body.price,
            userId: user.id,
          })
          .returning({ id: tables.users.id });

        if (!subscription) return tx.rollback();
      },
      { accessMode: 'read write' },
    )
    .catch((error) => {
      console.error(error);
      return error;
    });

  if (error) throw createError({ status: 500 });

  return rawHandle.toLowerCase();
});
