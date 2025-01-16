import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseTable } from '~~/constants/database-table'
import generateSlug from '~~/lib/generate-slug'

export async function createRating(
	supabaseClient: SupabaseClient,
	payload: {
		userId: string
		placeId: string
		rating: string
	},
) {
	const now = new Date()

	const slug = generateSlug([payload.userId, payload.placeId])

	return supabaseClient.from(DatabaseTable.RATING).upsert(
		{
			user_id: payload.userId,
			rating: payload.rating,
			place_id: payload.placeId,
			slug,
			created_at: now,
		},
		{ onConflict: 'slug' },
	)
}
