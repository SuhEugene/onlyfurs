import type { EventHandler } from 'h3';

export const checkToken: EventHandler = (event) => {
  const { adminToken } = useRuntimeConfig();
  if (!adminToken || adminToken === 'placeholder')
    throw createError({ status: 401, message: 'Missing adminToken runtime configuration' });

  const token = getHeader(event, 'Authorization');
  if (!token) throw createError({ status: 401, message: 'Nope' });
  if (token.replace('Bearer ', '') !== adminToken)
    throw createError({ status: 401, message: 'No' });
};
