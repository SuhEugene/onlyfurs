import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from '../database/schema';

export { sql, eq, and, or, gt, lt, asc, desc } from 'drizzle-orm';

export type PostgresDB = NodePgDatabase<typeof schema>;

let databaseClient: PostgresDB;
export const useDrizzle = () => {
  if (databaseClient) return databaseClient;

  const { databaseUrl } = useRuntimeConfig();

  if (!databaseUrl || databaseUrl === 'placeholder')
    throw new Error('Missing databaseUrl runtime configuration');

  if (!databaseClient) databaseClient = drizzle(databaseUrl, { schema });

  return databaseClient;
};

export const tables = schema;

export type DBUser = typeof schema.users.$inferSelect;
export type DBSubscription = typeof schema.subscriptions.$inferSelect;
export type DBPost = typeof schema.posts.$inferSelect;
