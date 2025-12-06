import { count } from "drizzle-orm";

export const getUserPostsCount = (drizzle: PostgresDB) => drizzle
  .select({
    posts: count(tables.posts.id),
  })
  .from(tables.posts)
  .innerJoin(tables.users, eq(tables.posts.userId, tables.users.id))
  .where(eq(tables.users.handle, sql.placeholder('userHandle')))
  .prepare('getUserPostsCount');
