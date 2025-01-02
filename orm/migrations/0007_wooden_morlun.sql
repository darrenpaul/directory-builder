ALTER TABLE "place_attribute" ADD COLUMN "slug" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "place_attribute" ADD CONSTRAINT "place_attribute_slug_unique" UNIQUE("slug");