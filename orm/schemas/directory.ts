import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const directory = pgTable(
  'directory',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    key: varchar('key').notNull(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
