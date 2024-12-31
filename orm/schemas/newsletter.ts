import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const newsletter = pgTable(
  'newsletter',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    emailAddress: varchar('email_address').notNull().unique(),
    ipAddress: varchar('ip_address'),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
