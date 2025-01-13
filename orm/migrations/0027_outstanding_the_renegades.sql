CREATE TABLE IF NOT EXISTS "place_operating_period" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"place_id" uuid NOT NULL,
	"day_index" integer NOT NULL,
	"day" varchar NOT NULL,
	"opens_at" varchar NOT NULL,
	"closes_at" varchar NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL,
	CONSTRAINT "place_operating_period_place_id_unique" UNIQUE("place_id")
);
--> statement-breakpoint
ALTER TABLE "place_operating_period" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "place_operating_period" ADD CONSTRAINT "place_operating_period_place_id_place_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."place"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
