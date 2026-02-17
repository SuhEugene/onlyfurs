export default defineTask({
  meta: {
    name: 'db:clean',
    description: 'Run database clean task',
  },
  async run() {
    console.log('Running DB clean task...');
    const db = useDrizzle();
    console.log('> Cleaning users table...');
    await db.delete(tables.users);
    console.log('> Cleaning subscriptions table...');
    await db.delete(tables.subscriptions);
    console.log('> Cleaning posts table...');
    await db.delete(tables.posts);

    return { result: 'success' };
  },
});
