import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { user } from './user';
import { directory } from './directory';

export const place = pgTable(
  'place',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    googlePlaceId: varchar('google_place_id').notNull().unique(),
    name: varchar('name').notNull(),
    slug: varchar('slug').notNull().unique(),
    website: varchar('website'),
    price: varchar('price'),
    description: varchar('description'),
    metaTitle: varchar('meta_title'),
    metaDescription: varchar('meta_description'),
    facebook: varchar('facebook'),
    instagram: varchar('instagram'),
    twitter: varchar('twitter'),
    phone: varchar('phone'),
    menu: varchar('menu'),
    specials: varchar('specials'),
    ownerId: uuid('owner_id').references(() => user.id, { onDelete: 'cascade' }),
    directoryId: uuid('directory_id')
      .references(() => directory.id, { onDelete: 'cascade' })
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
