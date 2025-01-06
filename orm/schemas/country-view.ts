import { pgView } from 'drizzle-orm/pg-core';
import { placeAddress } from './place-address';

export const countryView = pgView('country_view').as((qb) => {
  return qb
    .select({
      country: placeAddress.country,
    })
    .from(placeAddress)
    .groupBy(placeAddress.country);
});
