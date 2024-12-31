import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseTable } from '~~/constants/database-table'

export async function createPlaceRating(
	supabaseClient: SupabaseClient,
	payload: {
		placeId: string
		score: number
		count: number
	},
) {
	const now = new Date()

	return supabaseClient.from(DatabaseTable.PLACE_RATING).insert({
		place_id: payload.placeId,
		score: payload.score,
		count: payload.count,
		created_at: now,
	})
}
