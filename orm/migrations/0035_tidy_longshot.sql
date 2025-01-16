CREATE TABLE IF NOT EXISTS "page_meta" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"image" varchar NOT NULL,
	"project_id" uuid NOT NULL,
	"updated_at" timestamp (6) with time zone NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL,
	CONSTRAINT "page_meta_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "page_meta" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "page_meta" ADD CONSTRAINT "page_meta_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
