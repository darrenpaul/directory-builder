import { pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core';
import { user } from './user';
import { place } from './place';

export const userSubscription = pgTable(
  'user_subscription',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => user.id, { onDelete: 'cascade' }),
    placeId: uuid('place_id').references(() => place.id, { onDelete: 'cascade' }),
    stripeSessionId: varchar('stripe_session_id'),
    stripeSubscriptionId: varchar('stripe_subscription_id'),
    paymentStatus: varchar('payment_status'),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull(),
  },
  () => [],
).enableRLS();
