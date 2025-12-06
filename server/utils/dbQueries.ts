import * as unpreparedQueries from '../database/queries';
import { useDrizzle } from './drizzle';

type DBUnpreparedQueries = typeof unpreparedQueries;
type DBQueries = {
  [Query in keyof DBUnpreparedQueries]: ReturnType<DBUnpreparedQueries[Query]>;
};

const preparedQueries: Partial<DBQueries> = {};

export const useDBQueries = () => {
  const drizzle = useDrizzle();

  if (Object.keys(preparedQueries).length > 0)
    return preparedQueries as DBQueries;

  for (const queryName in unpreparedQueries) {
    // @ts-expect-error Очень бедово присоединять так по ключу, TS не любит такое
    preparedQueries[queryName] = unpreparedQueries[queryName](drizzle);
  }

  return preparedQueries as DBQueries;
};
