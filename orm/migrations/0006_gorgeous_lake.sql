ALTER TABLE "place_address" ADD CONSTRAINT "place_address_place_id_unique" UNIQUE("place_id");--> statement-breakpoint
ALTER TABLE "place_image" ADD CONSTRAINT "place_image_image_url_unique" UNIQUE("image_url");--> statement-breakpoint
ALTER TABLE "place_rating" ADD CONSTRAINT "place_rating_place_id_unique" UNIQUE("place_id");