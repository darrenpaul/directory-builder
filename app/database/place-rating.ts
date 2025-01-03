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

	const { error } = await supabaseClient
		.from(DatabaseTable.PLACE_RATING)
		.upsert(
			{
				place_id: payload.placeId,
				score: payload.score,
				count: payload.count,
				created_at: now,
			},
			{ onConflict: 'place_id' },
		)

	if (error) {
		return { data, error }
	}

	return supabaseClient
		.from(DatabaseTable.PLACE_RATING)
		.update({
			place_id: payload.placeId,
			score: payload.score,
			count: payload.count,
			created_at: now,
		})
		.eq('place_id', payload.placeId)
}
