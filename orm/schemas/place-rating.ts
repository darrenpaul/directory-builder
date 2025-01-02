import { pgTable, timestamp, uuid, integer, numeric } from 'drizzle-orm/pg-core';
import { place } from './place';

export const placeRating = pgTable(
  'place_rating',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    placeId: uuid('place_id')
      .notNull()
      .references(() => place.id, { onDelete: 'cascade' })
      .unique(),
    score: numeric('score').notNull().default('0'),
    count: integer('count').notNull().default(0),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
