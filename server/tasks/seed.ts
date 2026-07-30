import { fakerRU, faker } from '@faker-js/faker';
import { SnowflakeGenerator } from '@toolkit-f/snowflake-id';

const generator = new SnowflakeGenerator({ machineId: 99 });

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task',
  },
  async run() {
    console.log('Running DB seed task...');
    const db = useDrizzle();
    console.log('> Removing all users...');
    await db.delete(tables.users);
    console.log('> Creating 10 users...');
    for (let i = 0; i < 10; i++) {
      console.log(`>> Creating user #${i}`);
      const result = await db
        .insert(tables.users)
        .values({
          id: generator.nextId(),
          handle: faker.internet.username().toLowerCase(),
          username: fakerRU.internet.displayName(),
          description: fakerRU.lorem.paragraph(),
          avatarURL: fakerRU.image.avatar(),
          bannerURL: fakerRU.image.avatarGitHub(),
          followers: faker.number.int({ min: 0, max: 100 }),
        })
        .returning({ id: tables.users.id });

      const userId = result[0]!.id;
      console.log(`>>> Created user with id ${userId}`);

      const subscriptionsCount = faker.number.int({ min: 0, max: 3 });
      for (let i = 0; i < subscriptionsCount; i++) {
        await db.insert(tables.subscriptions).values({
          id: generator.nextId(),
          userId,
          title: fakerRU.commerce.productName(),
          description: fakerRU.commerce.productDescription(),
          price: Number(fakerRU.commerce.price({ min: 10, max: 2000, dec: 0 })),
        });
      }
      console.log(`>>> Added ${subscriptionsCount} subscriptions`);

      const postsCount = faker.number.int({ min: 0, max: 8 });
      for (let i = 0; i < postsCount; i++) {
        await db.insert(tables.posts).values({
          id: generator.nextId(),
          userId,
          content: fakerRU.lorem.paragraphs({ min: 1, max: 3 }),
          imageURL: i % 2 ? '/placeholder-horny.png' : '/placeholder-blurred.jpg',
          isImageCropped: i % 2 !== 0,
          createdAt: faker.date.recent({ days: 10 }),
          likes: faker.number.int({ min: 0, max: 100 }),
          comments: faker.number.int({ min: 0, max: 100 }),
          reposts: faker.number.int({ min: 0, max: 100 }),
        });
      }
      console.log(`>>> Added ${postsCount} posts`);
    }

    return { result: 'success' };
  },
});
