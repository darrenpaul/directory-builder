import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { blog } from './blog';

export const blogMetadata = pgTable(
  'blog_metadata',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    blogId: uuid('blog_id')
      .references(() => blog.id, { onDelete: 'cascade' })
      .notNull()
      .unique(),
    title: varchar('title'),
    description: varchar('description'),
    image: varchar('image'),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
