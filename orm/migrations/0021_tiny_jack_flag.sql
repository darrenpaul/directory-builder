CREATE VIEW "public"."attribute_options_view" AS (select "key", "label" from "place_attribute" group by "place_attribute"."key", "place_attribute"."label");