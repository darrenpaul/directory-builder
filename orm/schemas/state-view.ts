import { pgView } from 'drizzle-orm/pg-core';
import { placeAddress } from './place-address';
import { place } from './place';
import { eq } from 'drizzle-orm/expressions';

export const stateView = pgView('state_view').as((qb) => {
  return qb
    .select({
      id: placeAddress.state,
      country: placeAddress.country,
      project_id: place.projectId,
    })
    .from(placeAddress)
    .leftJoin(place, eq(placeAddress.placeId, place.id))
    .groupBy(placeAddress.country, placeAddress.state, place.projectId);
});
