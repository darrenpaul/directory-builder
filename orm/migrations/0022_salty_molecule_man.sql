CREATE TABLE IF NOT EXISTS "directory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"updated_at" timestamp (6) with time zone NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "directory" ENABLE ROW LEVEL SECURITY;