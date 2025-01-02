import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseTable } from '~~/constants/database-table'

export async function createPlaceAddress(
	supabaseClient: SupabaseClient,
	payload: {
		placeId: string
		coordinates: string
		streetAddress: string
		city: string
		state: string
		country: string
		postalCode: string
	},
) {
	const now = new Date()

	const { data, error } = await supabaseClient.from(DatabaseTable.PLACE_ADDRESS).upsert({
		place_id: payload.placeId,
		coordinates: payload.coordinates,
		street_address: payload.streetAddress,
		city: payload.city,
		state: payload.state,
		country: payload.country,
		postal_code: payload.postalCode,
		created_at: now,
	}, { onConflict: 'place_id' })

	if (error) {
		return { data, error }
	}

	return await supabaseClient.from(DatabaseTable.PLACE_ADDRESS).update({
		place_id: payload.placeId,
		coordinates: payload.coordinates,
		street_address: payload.streetAddress,
		city: payload.city,
		state: payload.state,
		country: payload.country,
		postal_code: payload.postalCode,
	}).eq('place_id', payload.placeId)
}
