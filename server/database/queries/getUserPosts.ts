export const getUserPosts = (drizzle: PostgresDB) => drizzle
  .select()
  .from(tables.posts)
  .prepare('getUserPosts');
