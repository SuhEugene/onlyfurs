export const getFeedPosts = (drizzle: PostgresDB) => drizzle
  .select()
  .from(tables.posts)
  .prepare('getFeedPosts');
