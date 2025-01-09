import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseTable } from '~~/constants/database-table'
import { Status } from '~~/constants/status'

export async function createPlaceVerified(
	supabaseClient: SupabaseClient,
	payload: {
		placeId: string
	},
) {
	const now = new Date()

	return await supabaseClient.from(DatabaseTable.PLACE_VERIFIED).insert({
		place_id: payload.placeId,
		status: Status.APPROVED,
		updated_at: now,
		created_at: now,
	})
}
