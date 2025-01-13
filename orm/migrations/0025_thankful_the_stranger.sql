ALTER TABLE "contact" ALTER COLUMN "directory_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "directory_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "page_meta" ALTER COLUMN "directory_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "place" ALTER COLUMN "directory_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "directory" ADD COLUMN "key" varchar DEFAULT 'nearby-coffee' NOT NULL;