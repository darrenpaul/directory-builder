import { serverSupabaseServiceRole } from '#supabase/server'
import { createPlace } from '~~/database/place'
import { createPlaceAddress } from '~~/database/place-address'
import { createPlaceAttributeBatch } from '~~/database/place-attribute'
import { createPlaceImage } from '~~/database/place-image'
import { createPlaceRating } from '~~/database/place-rating'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const body = await readBody(event)
	const {
		googlePlaceId,
		displayName,
		coordinates,
		streetAddress,
		city,
		state,
		country,
		postalCode,
		images,
		rating,
		userRatingCount,
		attributes,
		website,
		price,
	} = body

	const { data, error } = await createPlace(supabase, {
		googlePlaceId,
		displayName,
		postalCode,
		website,
		price,
	})

	if (error) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message,
		})
	}

	if (!data) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Unknown error',
		})
	}

	await Promise.all([
		...images.map((imageUrl: string, index: number) =>
			createPlaceImage(supabase, {
				placeId: data.id,
				imageUrl,
				sortOrder: (index + 1) * 10,
			}),
		),
		createPlaceAddress(supabase, {
			placeId: data.id,
			coordinates,
			streetAddress,
			city,
			state,
			country,
			postalCode,
		}),
		createPlaceRating(supabase, {
			placeId: data.id,
			score: rating,
			count: userRatingCount,
		}),
		createPlaceAttributeBatch(supabase, {
			placeId: data.id,
			attributes,
		}),
	])

	return { data, error }
})
