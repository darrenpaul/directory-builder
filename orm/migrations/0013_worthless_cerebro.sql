DROP VIEW "public"."city_view";--> statement-breakpoint
DROP VIEW "public"."state_view";--> statement-breakpoint
CREATE VIEW "public"."city_view" AS (select "city", "country", "state" from "place_address" group by "place_address"."country", "place_address"."state", "place_address"."city");--> statement-breakpoint
CREATE VIEW "public"."state_view" AS (select "state", "country" from "place_address" group by "place_address"."country", "place_address"."state");