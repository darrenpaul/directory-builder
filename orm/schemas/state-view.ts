import { pgView } from 'drizzle-orm/pg-core';
import { placeAddress } from './place-address';

export const stateView = pgView('state_view').as((qb) => {
  return qb
    .select({
      id: placeAddress.state,
      country: placeAddress.country,
    })
    .from(placeAddress)
    .groupBy(placeAddress.country, placeAddress.state);
});
