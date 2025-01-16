ALTER TABLE "rating" ADD COLUMN "place_id" uuid;--> statement-breakpoint
ALTER TABLE "rating" ADD COLUMN "slug" varchar NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rating" ADD CONSTRAINT "rating_place_id_place_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."place"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_slug_unique" UNIQUE("slug");