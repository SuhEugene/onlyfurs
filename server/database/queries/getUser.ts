import { count } from 'drizzle-orm';

export const getUser = (drizzle: PostgresDB) =>
  drizzle
    .select({
      id: tables.users.id,
      handle: tables.users.handle,
      username: tables.users.username,
      description: tables.users.description,
      avatarURL: tables.users.avatarURL,
      bannerURL: tables.users.bannerURL,
      followers: tables.users.followers,
    })
    .from(tables.users)
    .where(eq(tables.users.handle, sql.placeholder('userHandle')))
    .limit(1)
    .prepare('getUser');
