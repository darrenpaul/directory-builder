import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { directory } from './directory';

export const newsletter = pgTable(
  'newsletter',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    emailAddress: varchar('email_address').notNull().unique(),
    ipAddress: varchar('ip_address'),
    directoryId: uuid('directory_id')
      .references(() => directory.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
