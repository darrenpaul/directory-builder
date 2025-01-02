import type { SupabaseClient } from '@supabase/supabase-js'
import { kebabCase } from 'lodash-es'
import { DatabaseTable } from '~~/constants/database-table'

function generateSlug({ place_id, key }: { place_id: string, key: string }) {
	return `${kebabCase(place_id)}-${key}`
}

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
			slug: generateSlug({ place_id: payload.placeId, key: attribute.key as string }),
			label: attribute.label,
			key: attribute.key,
			value: attribute.value,
		}
	})

	return supabaseClient.from(DatabaseTable.PLACE_ATTRIBUTE).upsert(attributes, { onConflict: 'slug' })
}
