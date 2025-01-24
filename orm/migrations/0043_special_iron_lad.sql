ALTER TABLE "blog" ADD COLUMN "title" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "blog" DROP COLUMN IF EXISTS "name";