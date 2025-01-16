import { pgView } from 'drizzle-orm/pg-core';
import { placeAttribute } from './place-attribute';
import { place } from './place';
import { eq } from 'drizzle-orm/expressions';
import { sql } from 'drizzle-orm';

export const attributeOptionsView = pgView('attribute_options_view').as((qb) => {
  return qb
    .select({
      id: placeAttribute.key,
      label: placeAttribute.label,
      project_id: place.projectId,
      total_count: sql`count(CASE WHEN ${placeAttribute.value} = true THEN 1 END)`.as(
        'total_count',
      ),
    })
    .from(placeAttribute)
    .leftJoin(place, eq(placeAttribute.placeId, place.id))
    .groupBy(placeAttribute.key, placeAttribute.label, place.projectId);
});
