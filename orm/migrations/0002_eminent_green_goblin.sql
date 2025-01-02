CREATE TABLE IF NOT EXISTS "place_request" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_name" varchar NOT NULL,
	"country" varchar NOT NULL,
	"city" varchar NOT NULL,
	"user_email_address" varchar NOT NULL,
	"status" varchar DEFAULT 'PENDING' NOT NULL,
	"updated_at" timestamp (6) with time zone NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "place_request" ENABLE ROW LEVEL SECURITY;