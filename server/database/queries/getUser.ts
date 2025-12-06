export const getUser = (drizzle: PostgresDB) => drizzle
  .select()
  .from(tables.posts)
  .prepare('getUser');
