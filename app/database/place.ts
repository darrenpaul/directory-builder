import type { SupabaseClient } from '@supabase/supabase-js'
import type { PlaceResponse } from '~~/types/place'
import { kebabCase } from 'lodash-es'
import { DatabaseTable } from '~~/constants/database-table'

function generateSlug({ displayName, postalCode }: { displayName: string, postalCode: string }) {
	return `${kebabCase(displayName)}-${postalCode}`
}

export async function createPlace(
	supabaseClient: SupabaseClient,
	payload: {
		googlePlaceId: string
		displayName: string
		postalCode: string
	},
) {
	const now = new Date()

	const slug = generateSlug(payload)

	return supabaseClient
		.from(DatabaseTable.PLACE)
		.upsert({
			slug,
			created_at: now,
			updated_at: now,
			google_place_id: payload.googlePlaceId,
			name: payload.displayName,
		}, { onConflict: 'google_place_id' })
		.select('id,googlePlaceId:google_place_id')
		.single<{ id: string, googlePlaceId: string }>()
}

export async function getPlaces(
	supabaseClient: SupabaseClient,
	queryParams: Record<string, string>,
) {
	const placeAttributesSelectString = ['id', 'label', 'key', 'value'].join(',')

	const placeImagesSelectString = [
		'id',
		'imageUrl:image_url',
		'sortOrder:sort_order',
	].join(',')

	const placeAddressSelectString = [
		'id',
		'streetAddress:street_address',
		'city:city',
		'state:state',
		'country:country',
		'postalCode:postal_code',
	].join(',')

	const placeRatingSelectString = ['id', 'score:score', 'count:count'].join(
		',',
	)

	const selectString = [
		'id',
		'slug',
		'name:name',
		`address:place_address!inner(${placeAddressSelectString})`,
		`images:place_image!inner(${placeImagesSelectString})`,
		`rating:place_rating!inner(${placeRatingSelectString})`,
		`attributes:place_attribute!inner(${placeAttributesSelectString})`,
	].join(',')

	const sbQuery = supabaseClient.from(DatabaseTable.PLACE).select(selectString)

	if (queryParams.businessName) {
		sbQuery.ilike('name', `%${queryParams.businessName.toLowerCase()}%`)
	}

	if (queryParams.countryName) {
		sbQuery.ilike(
			'place_address.country',
			`%${queryParams.countryName.toLowerCase()}%`,
		)
	}

	if (queryParams.cityName) {
		sbQuery.ilike(
			'place_address.city',
			`%${queryParams.cityName.toLowerCase()}%`,
		)
	}

	const { data, error } = await sbQuery.returns<PlaceResponse[]>()

	return { data, error }
}
