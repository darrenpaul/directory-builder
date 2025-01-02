import { pgTable, timestamp, uuid, varchar, integer } from 'drizzle-orm/pg-core';
import { place } from './place';

export const placeImage = pgTable(
  'place_image',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    placeId: uuid('place_id')
      .notNull()
      .references(() => place.id, { onDelete: 'cascade' }),
    imageUrl: varchar('image_url').notNull().unique(),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
