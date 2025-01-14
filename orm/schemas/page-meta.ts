import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { project } from './project';

export const pageMeta = pgTable(
  'page_meta',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: varchar('slug').notNull().unique(),
    title: varchar('title').notNull(),
    description: varchar('description').notNull(),
    image: varchar('image').notNull(),
    projectId: uuid('project_id')
      .references(() => project.id, { onDelete: 'cascade' })
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
