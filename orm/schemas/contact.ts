import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { project } from './project';

export const contact = pgTable(
  'contact',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    message: varchar('message').notNull(),
    userEmailAddress: varchar('user_email_address').notNull(),
    status: varchar('status').notNull().default('PENDING'),
    ipAddress: varchar('ip_address'),
    projectId: uuid('project_id')
      .references(() => project.id, { onDelete: 'cascade' })
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
