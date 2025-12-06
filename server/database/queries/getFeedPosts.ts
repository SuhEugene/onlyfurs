export const getFeedPosts = (drizzle: PostgresDB) => drizzle
  .select({
    id: tables.posts.id,
    likes: tables.posts.likes,
    comments: tables.posts.comments,
    reposts: tables.posts.reposts,
    content: tables.posts.content,
    createdAt: tables.posts.createdAt,
    imageURL: tables.posts.imageURL,
    isImageCropped: tables.posts.isImageCropped,
    user: {
      username: tables.users.username,
      handle: tables.users.handle,
      avatarURL: tables.users.avatarURL,
    }
  })
  .from(tables.posts)
  .innerJoin(tables.users, eq(tables.posts.userId, tables.users.id))
  .orderBy(desc(tables.posts.createdAt))
  .offset(sql.placeholder('offset'))
  .limit(10)
  .prepare('getFeedPosts');
