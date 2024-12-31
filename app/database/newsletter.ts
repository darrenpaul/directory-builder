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
		created_at: now,
	})
}
