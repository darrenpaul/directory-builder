import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { project } from './project';

export const newsletter = pgTable(
  'newsletter',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    emailAddress: varchar('email_address').notNull().unique(),
    ipAddress: varchar('ip_address'),
    projectId: uuid('project_id')
      .references(() => project.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
