import { SnowflakeGenerator } from '@toolkit-f/snowflake-id';

let generator: SnowflakeGenerator | null = null;

export const useSnowflake = () => {
  if (generator) return generator;

  const { machineId } = useRuntimeConfig();
  if (machineId === -1) throw new Error('Missing machineId runtime configuration');

  generator = new SnowflakeGenerator({ machineId });

  return generator;
};

export const stringifyId = <T>(item: T & { id: unknown }): T & { id: string } => ({
  ...item,
  id: String(item.id),
});

export const stringToFlake = (rawString: string): bigint | null => {
  rawString = rawString.trim();
  if (!rawString) return null;
  if (!/[\d]+/.test(rawString)) return null;

  try {
    return BigInt(rawString);
  } catch {
    return null;
  }
};
