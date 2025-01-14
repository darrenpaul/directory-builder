ALTER TABLE "directory" RENAME TO "project";--> statement-breakpoint
ALTER TABLE "contact" RENAME COLUMN "directory_id" TO "project_id";--> statement-breakpoint
ALTER TABLE "newsletter" RENAME COLUMN "directory_id" TO "project_id";--> statement-breakpoint
ALTER TABLE "page_meta" RENAME COLUMN "directory_id" TO "project_id";--> statement-breakpoint
ALTER TABLE "place" RENAME COLUMN "directory_id" TO "project_id";--> statement-breakpoint
ALTER TABLE "contact" DROP CONSTRAINT "contact_directory_id_directory_id_fk";
--> statement-breakpoint
ALTER TABLE "newsletter" DROP CONSTRAINT "newsletter_directory_id_directory_id_fk";
--> statement-breakpoint
ALTER TABLE "page_meta" DROP CONSTRAINT "page_meta_directory_id_directory_id_fk";
--> statement-breakpoint
ALTER TABLE "place" DROP CONSTRAINT "place_directory_id_directory_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact" ADD CONSTRAINT "contact_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "newsletter" ADD CONSTRAINT "newsletter_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "page_meta" ADD CONSTRAINT "page_meta_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "place" ADD CONSTRAINT "place_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
