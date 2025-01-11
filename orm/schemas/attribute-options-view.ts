import { pgView } from 'drizzle-orm/pg-core';
import { placeAttribute } from './place-attribute';

export const attributeOptionsView = pgView('attribute_options_view').as((qb) => {
  return qb
    .select({
      id: placeAttribute.key,
      label: placeAttribute.label,
    })
    .from(placeAttribute)
    .groupBy(placeAttribute.key, placeAttribute.label);
});
