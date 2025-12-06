export const getUserSubscriptions = (drizzle: PostgresDB) => drizzle
  .select({
    id: tables.subscriptions.id,
    title: tables.subscriptions.title,
    description: tables.subscriptions.description,
    price: tables.subscriptions.price,
  })
  .from(tables.subscriptions)
  .innerJoin(tables.users, eq(tables.subscriptions.userId, tables.users.id))
  .orderBy(asc(tables.subscriptions.price))
  .where(eq(tables.users.handle, sql.placeholder('userHandle')))
  .prepare('getUserSubscriptions');
