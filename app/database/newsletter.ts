import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseTable } from '~~/constants/database-table'

export async function createNewsletter(
	supabaseClient: SupabaseClient,
	payload: {
		emailAddress: string
		ipAddress: string
	},
) {
	const now = new Date()

	return supabaseClient.from(DatabaseTable.NEWSLETTER).insert({
		email_address: payload.emailAddress,
		ip_address: payload.ipAddress,
		directory_id: process.env.DIRECTORY_ID,
		created_at: now,
	})
}
