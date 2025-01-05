CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"updated_at" timestamp (6) with time zone NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE POLICY "Enable INSERT for authenticated users" ON "user" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "Enable SELECT for users based on id (user_id)" ON "user" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((SELECT auth.uid() AS uid) = id);--> statement-breakpoint
CREATE POLICY "Enable UPDATE for users based on id (user_id)" ON "user" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((SELECT auth.uid() AS uid) = id);