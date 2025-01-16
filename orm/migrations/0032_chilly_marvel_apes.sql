DROP VIEW "public"."attribute_options_view";--> statement-breakpoint
CREATE VIEW "public"."attribute_options_view" AS (select "place_attribute"."key", "place_attribute"."label" from "place_attribute" left join "place" on "place_attribute"."place_id" = "place"."id" group by "place_attribute"."key", "place_attribute"."label");