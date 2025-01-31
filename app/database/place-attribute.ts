import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseTable } from '~~/constants/database-table'
import generateSlug from '~~/lib/generate-slug'

export async function createPlaceAttributeBatch(
	supabaseClient: SupabaseClient,
	payload: {
		placeId: string
		attributes: Record<string, string | boolean>[]
	},
) {
	const now = new Date()

	const duplicatesRemoved = Array.from(
		new Map(payload.attributes.map(item => [item.key, item])).values(),
	)

	const attributes = duplicatesRemoved.map((attribute) => {
		return {
			place_id: payload.placeId,
			created_at: now,
			slug: generateSlug([payload.placeId, attribute.key as string]),
			label: attribute.label,
			key: attribute.key,
			value: attribute.value,
		}
	})

	const { data, error } = await supabaseClient
		.from(DatabaseTable.PLACE_ATTRIBUTE)
		.upsert(attributes, { onConflict: 'slug' })

	if (error) {
		console.error(error.message)
	}

	return { data, error }
}
