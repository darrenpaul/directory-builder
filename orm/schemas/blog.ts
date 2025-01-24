import { pgTable, timestamp, uuid, varchar, boolean } from 'drizzle-orm/pg-core';
import { user } from './user';
import { project } from './project';

export const blog = pgTable(
  'blog',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title').notNull(),
    slug: varchar('slug').notNull().unique(),
    ownerId: uuid('owner_id').references(() => user.id, { onDelete: 'cascade' }),
    projectId: uuid('project_id')
      .references(() => project.id, { onDelete: 'cascade' })
      .notNull(),
    content: varchar('content'),
    description: varchar('description'),
    thumbnailUri: varchar('thumbnail_uri'),
    published: boolean('published').default(false).notNull(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
