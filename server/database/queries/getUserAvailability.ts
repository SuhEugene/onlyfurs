export const getUserAvailability = (drizzle: PostgresDB) =>
  drizzle
    .select({ id: sql.raw('1') })
    .from(tables.users)
    .where(eq(tables.users.handle, sql.placeholder('userHandle')))
    .limit(1)
    .prepare('getUserAvailability');
