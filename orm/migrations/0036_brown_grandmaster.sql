CREATE TABLE IF NOT EXISTS "rating" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"rating" integer NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "rating" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rating" ADD CONSTRAINT "rating_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE POLICY "Enable INSERT for authenticated users" ON "rating" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "Enable SELECT for users based on id (user_id)" ON "rating" AS PERMISSIVE FOR SELECT TO public USING ((true));--> statement-breakpoint
CREATE POLICY "Enable UPDATE for users based on id (user_id)" ON "rating" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((SELECT auth.uid() AS uid) = user_id);