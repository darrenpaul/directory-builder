import { pgView } from 'drizzle-orm/pg-core';
import { placeAddress } from './place-address';

export const cityView = pgView('city_view').as((qb) => {
  return qb
    .select({
      id: placeAddress.city,
      country: placeAddress.country,
      state: placeAddress.state,
    })
    .from(placeAddress)
    .groupBy(placeAddress.country, placeAddress.state, placeAddress.city);
});
