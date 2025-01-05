import { sql } from 'drizzle-orm';
import { pgTable, varchar, uuid, pgPolicy, pgRole, pgSchema, timestamp } from 'drizzle-orm/pg-core';

const authenticatedRole = pgRole('authenticated');

const authSchema = pgSchema('auth');

const users = authSchema.table('users', {
  id: uuid('id').primaryKey(),
});

export const user = pgTable(
  'user',
  {
    id: uuid('id')
      .primaryKey()
      .references(() => users.id, { onDelete: 'cascade' }),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull(),
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
      to: authenticatedRole,
      using: sql`(SELECT auth.uid() AS uid) = id`,
    }),
    pgPolicy(`Enable UPDATE for users based on id (user_id)`, {
      for: 'update',
      to: authenticatedRole,
      using: sql`(SELECT auth.uid() AS uid) = id`,
    }),
    // pgPolicy(`Enable DELETE for users based on id (user_id)`, {
    //   for: 'delete',
    //   to: authenticatedRole,
    //   using: sql`(SELECT auth.uid() AS uid) = id`,
    // }),
  ],
).enableRLS();
