import { pgTable, timestamp, uuid, varchar, integer } from 'drizzle-orm/pg-core';
import { place } from './place';

export const placeOperatingPeriod = pgTable(
  'place_operating_period',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    placeId: uuid('place_id')
      .notNull()
      .references(() => place.id, { onDelete: 'cascade' }),
    slug: varchar('slug').notNull().unique(),
    dayIndex: integer('day_index').notNull(),
    day: varchar('day').notNull(),
    opensAt: varchar('opens_at').notNull(),
    closesAt: varchar('closes_at').notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
