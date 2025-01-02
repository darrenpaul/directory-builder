CREATE TABLE IF NOT EXISTS "contact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"message" varchar NOT NULL,
	"user_email_address" varchar NOT NULL,
	"status" varchar DEFAULT 'PENDING' NOT NULL,
	"ip_address" varchar,
	"updated_at" timestamp (6) with time zone NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contact" ENABLE ROW LEVEL SECURITY;