export const getOnePost = (drizzle: PostgresDB) => drizzle
  .select()
  .from(tables.posts)
  .prepare('getOnePost');
