import { pgView } from 'drizzle-orm/pg-core';
import { placeAddress } from './place-address';
import { place } from './place';
import { eq } from 'drizzle-orm/expressions';

export const cityView = pgView('city_view').as((qb) => {
  return qb
    .select({
      id: placeAddress.city,
      country: placeAddress.country,
      state: placeAddress.state,
      project_id: place.projectId,
    })
    .from(placeAddress)
    .leftJoin(place, eq(placeAddress.placeId, place.id))
    .groupBy(placeAddress.country, placeAddress.state, placeAddress.city, place.projectId);
});
