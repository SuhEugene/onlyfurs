import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, smallint, text, timestamp } from "drizzle-orm/pg-core";

export const baseColumns = {
  id: serial('id').primaryKey(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
};

export const users = pgTable('users', {
  ...baseColumns,

  username: text('username').notNull(),
  handle: text('handle').notNull().unique(),
  description: text('description'),
  avatarURL: text('avatar_url'),
  bannerURL: text('banner_url'),
  followers: smallint('followers').notNull().default(0),
});

export const posts = pgTable('posts', {
  ...baseColumns,

  likes: smallint('likes').notNull().default(0),
  comments: smallint('comments').notNull().default(0),
  reposts: smallint('reposts').notNull().default(0),
  content: text('content').notNull(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  imageURL: text('image_url'),
  isImageCropped: boolean('image_cropped').notNull().default(false),
});

export const subscriptions = pgTable('subscriptions', {
  ...baseColumns,

  title: text('title').notNull(),
  description: text('description').notNull(),
  price: smallint('price').notNull(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
});


export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  subscriptions: many(subscriptions),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));
