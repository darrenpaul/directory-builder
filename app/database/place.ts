import type { SupabaseClient } from '@supabase/supabase-js'
import type { Place } from '~~/types/place'
import { kebabCase, startCase } from 'lodash-es'
import { DatabaseTable } from '~~/constants/database-table'

function generateSlug({ displayName }: { displayName: string }) {
	return kebabCase(displayName)
}

function getPlaceAttributeKeys(queryParams: Record<string, string>) {
	const attributes = Object.entries(queryParams)

	const attributeBooleanKeys = attributes.filter(
		([_, value]) => value === 'true',
	)

	return attributeBooleanKeys.map(([key]) => key)
}

export async function createPlace(
	supabaseClient: SupabaseClient,
	payload: {
		googlePlaceId: string
		displayName: string
		postalCode: string
		price: string
		website: string | undefined | null
		metaTitle: string | undefined | null
		metaDescription: string | undefined | null
		description: string | undefined | null
		menu: string | undefined | null
		facebook: string | undefined | null
		instagram: string | undefined | null
		twitter: string | undefined | null
		phone: string | undefined | null
		specials: string | undefined | null
		ownerId?: string | undefined | null
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
				meta_title: payload.metaTitle,
				meta_description: payload.metaDescription,
				description: payload.description,
				menu: payload.menu,
				facebook: payload.facebook,
				instagram: payload.instagram,
				twitter: payload.twitter,
				phone: payload.phone,
				specials: payload.specials,
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
			meta_title: payload.metaTitle,
			meta_description: payload.metaDescription,
			description: payload.description,
			menu: payload.menu,
			facebook: payload.facebook,
			instagram: payload.instagram,
			twitter: payload.twitter,
			phone: payload.phone,
			specials: payload.specials,
		})
		.eq('google_place_id', data.googlePlaceId)
		.select('id,googlePlaceId:google_place_id')
		.single<{ id: string, googlePlaceId: string }>()
}

export async function updatePlace(
	supabaseClient: SupabaseClient,
	payload: {
		id: string
		userId: string
		name: string | undefined | null
		website: string | undefined | null
		price: string | undefined | null
		description: string | undefined | null
		metaTitle: string | undefined | null
		metaDescription: string | undefined | null
		menu: string | undefined | null
		facebook: string | undefined | null
		instagram: string | undefined | null
		twitter: string | undefined | null
		phone: string | undefined | null
		specials: string | undefined | null
	},
) {
	const now = new Date()

	return supabaseClient
		.from(DatabaseTable.PLACE)
		.update({
			name: payload.name,
			website: payload.website,
			price: payload.price,
			description: payload.description,
			meta_title: payload.metaTitle,
			meta_description: payload.metaDescription,
			menu: payload.menu,
			facebook: payload.facebook,
			instagram: payload.instagram,
			twitter: payload.twitter,
			phone: payload.phone,
			specials: payload.specials,
			updated_at: now,
		})
		.eq('id', payload.id)
		.eq('owner_id', payload.userId)
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
		'coordinates',
	].join(',')

	const placeRatingSelectString = ['id', 'score:score', 'count:count'].join(
		',',
	)

	const selectString = [
		'id',
		'slug',
		'name:name',
		'price',
		`address:place_address!inner(${placeAddressSelectString})`,
		`images:place_image!inner(${placeImagesSelectString})`,
		`rating:place_rating!inner(${placeRatingSelectString})`,
		`attributes:place_attribute!inner(${placeAttributesSelectString})`,
	].join(',')

	const sbQuery = supabaseClient
		.from(DatabaseTable.PLACE)
		.select(selectString, { count: 'exact', head: false })

	if (queryParams.businessName) {
		sbQuery.ilike('name', `%${queryParams.businessName.toLowerCase()}%`)
	}

	if (queryParams.country) {
		sbQuery.ilike(
			'place_address.country',
			`%${startCase(queryParams.country).toLowerCase()}%`,
		)
	}

	if (queryParams.state) {
		sbQuery.ilike(
			'place_address.state',
			`%${startCase(queryParams.state).toLowerCase()}%`,
		)
	}

	if (queryParams.city) {
		sbQuery.ilike(
			'place_address.city',
			`%${startCase(queryParams.city).toLowerCase()}%`,
		)
	}

	if (queryParams.postalCode) {
		sbQuery.ilike(
			'place_address.postal_code',
			`%${queryParams.postalCode.toLowerCase()}%`,
		)
	}

	if (queryParams.limit) {
		sbQuery.limit(Number.parseInt(queryParams.limit))
	}

	if (Object.values(queryParams).includes('true')) {
		sbQuery.in('place_attribute.key', getPlaceAttributeKeys(queryParams))
		sbQuery.eq('place_attribute.value', true)
	}

	return await sbQuery
		.order('created_at', { ascending: false })
		.order('sort_order', { referencedTable: 'place_image', ascending: true })
		.limit(1, { foreignTable: 'place_image' })
		.returns<Place[]>()
}

export async function getPlaceBySlug(
	supabaseClient: SupabaseClient,
	slug: string,
) {
	const placeVerifiedSelectString = ['id', 'status'].join(',')

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
		'coordinates',
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
		'description:description',
		'metaTitle:meta_title',
		'metaDescription:meta_description',
		'menu',
		'facebook',
		'instagram',
		'twitter',
		'phone',
		'specials',
		`address:place_address!inner(${placeAddressSelectString})`,
		`images:place_image!inner(${placeImagesSelectString})`,
		`rating:place_rating!inner(${placeRatingSelectString})`,
		`attributes:place_attribute!inner(${placeAttributesSelectString})`,
		`verified:place_verified(${placeVerifiedSelectString})`,
	].join(',')

	return await supabaseClient
		.from(DatabaseTable.PLACE)
		.select(selectString)
		.eq('slug', slug)
		.maybeSingle<Place>()
}

export async function getPlaceByIdAndOwnerId(
	supabaseClient: SupabaseClient,
	{ id, ownerId }: { id: string, ownerId: string },
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
		'coordinates',
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
		'description:description',
		'metaTitle:meta_title',
		'metaDescription:meta_description',
		'menu',
		'facebook',
		'instagram',
		'twitter',
		'phone',
		'specials',
		'ownerId:owner_id',
		`address:place_address!inner(${placeAddressSelectString})`,
		`images:place_image!inner(${placeImagesSelectString})`,
		`rating:place_rating!inner(${placeRatingSelectString})`,
		`attributes:place_attribute!inner(${placeAttributesSelectString})`,
	].join(',')

	return supabaseClient
		.from(DatabaseTable.PLACE)
		.select(selectString)
		.eq('id', id)
		.eq('owner_id', ownerId)
		.maybeSingle<Place>()
}
