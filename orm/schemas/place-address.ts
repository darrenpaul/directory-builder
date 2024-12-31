import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { place } from './place';

export const placeAddress = pgTable(
  'place_address',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    placeId: uuid('place_id')
      .notNull()
      .references(() => place.id, { onDelete: 'cascade' }),
    coordinates: varchar('coordinates').notNull(),
    streetAddress: varchar('street_address').notNull(),
    city: varchar('city').notNull(),
    state: varchar('state').notNull(),
    country: varchar('country').notNull(),
    postalCode: varchar('postal_code').notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
