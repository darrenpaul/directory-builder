import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const placeRequest = pgTable(
  'place_request',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    companyName: varchar('company_name').notNull(),
    country: varchar('country').notNull(),
    city: varchar('city').notNull(),
    userEmailAddress: varchar('user_email_address').notNull(),
    status: varchar('status').notNull().default('PENDING'),
    ipAddress: varchar('ip_address'),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
