import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { place } from './place';

export const placeVerified = pgTable(
  'place_verified',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    placeId: uuid('place_id')
      .notNull()
      .references(() => place.id, { onDelete: 'cascade' })
      .unique(),
    status: varchar('status'),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
