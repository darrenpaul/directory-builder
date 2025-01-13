ALTER TABLE "contact" ADD COLUMN "directory_id" uuid;--> statement-breakpoint
ALTER TABLE "newsletter" ADD COLUMN "directory_id" uuid;--> statement-breakpoint
ALTER TABLE "page_meta" ADD COLUMN "directory_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact" ADD CONSTRAINT "contact_directory_id_directory_id_fk" FOREIGN KEY ("directory_id") REFERENCES "public"."directory"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "newsletter" ADD CONSTRAINT "newsletter_directory_id_directory_id_fk" FOREIGN KEY ("directory_id") REFERENCES "public"."directory"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "page_meta" ADD CONSTRAINT "page_meta_directory_id_directory_id_fk" FOREIGN KEY ("directory_id") REFERENCES "public"."directory"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
