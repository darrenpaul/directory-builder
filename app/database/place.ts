import type { SupabaseClient } from '@supabase/supabase-js'
import type { PlaceResponse } from '~~/types/place'
import { kebabCase } from 'lodash-es'
import { DatabaseTable } from '~~/constants/database-table'

function generateSlug({
	displayName,
	postalCode,
}: {
	displayName: string
	postalCode: string
}) {
	return `${kebabCase(displayName)}-${postalCode}`
}

export async function createPlace(
	supabaseClient: SupabaseClient,
	payload: {
		googlePlaceId: string
		displayName: string
		postalCode: string
		price: string
		website: string | undefined | null
	},
) {
	const now = new Date()

	const slug = generateSlug(payload)

	const { data, error } = await supabaseClient
		.from(DatabaseTable.PLACE)
		.upsert(
			{
				slug,
				created_at: now,
				updated_at: now,
				google_place_id: payload.googlePlaceId,
				name: payload.displayName,
				website: payload.website,
				price: payload.price,
			},
			{ onConflict: 'google_place_id' },
		)
		.select('id,googlePlaceId:google_place_id')
		.single<{ id: string, googlePlaceId: string }>()

	if (error) {
		return { data, error }
	}

	return await supabaseClient
		.from(DatabaseTable.PLACE)
		.update({
			slug,
			updated_at: now,
			name: payload.displayName,
			website: payload.website,
			price: payload.price,
		})
		.eq('google_place_id', data.googlePlaceId)
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
		'website:website',
		'price',
		`address:place_address!inner(${placeAddressSelectString})`,
		`images:place_image!inner(${placeImagesSelectString})`,
		`rating:place_rating!inner(${placeRatingSelectString})`,
		`attributes:place_attribute!inner(${placeAttributesSelectString})`,
	].join(',')

	const sbQuery = supabaseClient.from(DatabaseTable.PLACE).select(selectString)

	if (queryParams.businessName) {
		sbQuery.ilike('name', `%${queryParams.businessName.toLowerCase()}%`)
	}

	if (queryParams.country) {
		sbQuery.ilike(
			'place_address.country',
			`%${queryParams.country.toLowerCase()}%`,
		)
	}

	if (queryParams.state) {
		sbQuery.ilike('place_address.state', `%${queryParams.state.toLowerCase()}%`)
	}

	if (queryParams.city) {
		sbQuery.ilike('place_address.city', `%${queryParams.city.toLowerCase()}%`)
	}

	if (queryParams.postalCode) {
		sbQuery.ilike('place_address.postal_code', `%${queryParams.postalCode.toLowerCase()}%`)
	}

	if (queryParams.limit) {
		sbQuery.limit(Number.parseInt(queryParams.limit))
	}

	const { data, error } = await sbQuery
		.order('created_at', { ascending: false })
		.returns<PlaceResponse[]>()

	return { data, error }
}
