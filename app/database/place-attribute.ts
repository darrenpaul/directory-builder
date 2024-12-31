import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseTable } from '~~/constants/database-table'

export async function createPlaceAttributeBatch(
	supabaseClient: SupabaseClient,
	payload: {
		placeId: string
		attributes: Record<string, string | boolean>[]
	},
) {
	const now = new Date()

	const attributes = payload.attributes.map((attribute) => {
		return {
			place_id: payload.placeId,
			created_at: now,
			label: attribute.label,
			key: attribute.key,
			value: attribute.value,
		}
	})

	return supabaseClient.from(DatabaseTable.PLACE_ATTRIBUTE).insert(attributes)
}
