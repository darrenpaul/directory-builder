import { sql } from 'drizzle-orm';
import { pgTable, uuid, pgPolicy, pgRole, timestamp, integer, varchar } from 'drizzle-orm/pg-core';
import { user } from './user';
import { place } from './place';

const authenticatedRole = pgRole('authenticated');

export const rating = pgTable(
  'rating',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => user.id, { onDelete: 'cascade' }),
    placeId: uuid('place_id').references(() => place.id, { onDelete: 'cascade' }),
    slug: varchar('slug').notNull().unique(),
    rating: integer('rating').notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [
    pgPolicy(`Enable INSERT for authenticated users`, {
      for: 'insert',
      to: authenticatedRole,
      withCheck: sql`true`,
    }),
    pgPolicy(`Enable SELECT for users based on id (user_id)`, {
      for: 'select',
      using: sql`(true)`,
    }),
    pgPolicy(`Enable UPDATE for users based on id (user_id)`, {
      for: 'update',
      to: authenticatedRole,
      using: sql`(SELECT auth.uid() AS uid) = user_id`,
    }),
    // pgPolicy(`Enable DELETE for users based on id (user_id)`, {
    //   for: 'delete',
    //   to: authenticatedRole,
    //   using: sql`(SELECT auth.uid() AS uid) = id`,
    // }),
  ],
).enableRLS();
