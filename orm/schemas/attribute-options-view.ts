import { pgView } from 'drizzle-orm/pg-core';
import { placeAttribute } from './place-attribute';
import { place } from './place';
import { eq } from 'drizzle-orm/expressions';

export const attributeOptionsView = pgView('attribute_options_view').as((qb) => {
  return qb
    .select({
      id: placeAttribute.key,
      label: placeAttribute.label,
      project_id: place.projectId,
    })
    .from(placeAttribute)
    .leftJoin(place, eq(placeAttribute.placeId, place.id))
    .groupBy(placeAttribute.key, placeAttribute.label, place.projectId);
});
