ALTER TABLE "place" ADD COLUMN "directory_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "place" ADD CONSTRAINT "place_directory_id_directory_id_fk" FOREIGN KEY ("directory_id") REFERENCES "public"."directory"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
