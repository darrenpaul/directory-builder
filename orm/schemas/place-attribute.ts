import { pgTable, timestamp, uuid, varchar, boolean } from 'drizzle-orm/pg-core';
import { place } from './place';

export const placeAttribute = pgTable(
  'place_attribute',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    placeId: uuid('place_id')
      .notNull()
      .references(() => place.id, { onDelete: 'cascade' }),
    slug: varchar('slug').notNull().unique(),
    label: varchar('label').notNull(),
    key: varchar('key').notNull(),
    value: boolean('value').notNull().default(false),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
