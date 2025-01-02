import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseTable } from '~~/constants/database-table'
import { Status } from '~~/constants/status'

export async function createContact(
	supabaseClient: SupabaseClient,
	payload: {
		name: string
		message: string
		userEmailAddress: string
		userIpAddress: string
	},
) {
	const now = new Date()

	return supabaseClient.from(DatabaseTable.CONTACT).insert({
		name: payload.name,
		message: payload.message,
		user_email_address: payload.userEmailAddress,
		ip_address: payload.userIpAddress,
		status: Status.PENDING,
		created_at: now,
		updated_at: now,
	})
}
