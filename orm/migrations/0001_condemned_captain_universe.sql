CREATE TABLE IF NOT EXISTS "newsletter" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email_address" varchar NOT NULL,
	"ip_address" varchar,
	"created_at" timestamp (6) with time zone NOT NULL,
	CONSTRAINT "newsletter_email_address_unique" UNIQUE("email_address")
);
--> statement-breakpoint
ALTER TABLE "newsletter" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "page_meta" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"image" varchar NOT NULL,
	"updated_at" timestamp (6) with time zone NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL,
	CONSTRAINT "page_meta_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "page_meta" ENABLE ROW LEVEL SECURITY;