import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseTable } from '~~/constants/database-table'
import { Status } from '~~/constants/status'

export async function createPlaceRequest(
	supabaseClient: SupabaseClient,
	payload: {
		companyName: string
		country: string
		city: string
		userEmailAddress: string
		userIpAddress: string
	},
) {
	const now = new Date()

	return supabaseClient.from(DatabaseTable.PLACE_REQUEST).insert({
		company_name: payload.companyName,
		country: payload.country,
		city: payload.city,
		user_email_address: payload.userEmailAddress,
		ip_address: payload.userIpAddress,
		status: Status.PENDING,
		created_at: now,
		updated_at: now,
	})
}
