import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseTable } from '~~/constants/database-table'

export async function createPlaceImage(
	supabaseClient: SupabaseClient,
	payload: {
		placeId: string
		imageUrl: string
		sortOrder?: number
	},
) {
	const now = new Date()

	return supabaseClient.from(DatabaseTable.PLACE_IMAGE).insert({
		place_id: payload.placeId,
		image_url: payload.imageUrl,
		sort_order: payload?.sortOrder,
		created_at: now,
	})
}
