import {
	serverSupabaseClient,
	serverSupabaseServiceRole,
} from '#supabase/server'
import { updatePlace } from '~~/database/place'
import { updatePlaceAddress } from '~~/database/place-address'
import { getAuthenticatedUser } from '~~/database/user'

// export default defineEventHandler(async (event) => {
// 	const supabase = serverSupabaseServiceRole(event)

// 	const body = await readBody(event)
// 	const {
// 		googlePlaceId,
// 		displayName,
// 		coordinates,
// 		streetAddress,
// 		city,
// 		state,
// 		country,
// 		postalCode,
// 		images,
// 		rating,
// 		userRatingCount,
// 		attributes,
// 		website,
// 		price,
// 	} = body

// 	const { textContent, links } = await scrapWebsite(website)

// 	const questions = await askQuestionsAboutPlace(textContent)

// 	const { menu, facebook, instagram, twitter, phone, specials }
//     = await getUrls(links)

// 	const { metaTitle, metaDescription, description }
//     = await genearateDescriptionAndMetaInformation(textContent)

// 	const { data, error } = await createPlace(supabase, {
// 		googlePlaceId,
// 		displayName,
// 		postalCode,
// 		website,
// 		price,
// 		metaTitle,
// 		metaDescription,
// 		description,
// 		menu,
// 		facebook,
// 		instagram,
// 		twitter,
// 		phone,
// 		specials,
// 	})

// 	if (error) {
// 		throw createError({
// 			statusCode: 500,
// 			statusMessage: error.message,
// 		})
// 	}

// 	if (!data) {
// 		throw createError({
// 			statusCode: 500,
// 			statusMessage: 'Unknown error',
// 		})
// 	}

// 	try {
// 		await Promise.all([
// 			...images.map((imageUrl: string, index: number) =>
// 				createPlaceImage(supabase, {
// 					placeId: data.id,
// 					imageUrl,
// 					sortOrder: (index + 1) * 10,
// 				}),
// 			),
// 			createPlaceAddress(supabase, {
// 				placeId: data.id,
// 				coordinates,
// 				streetAddress,
// 				city,
// 				state,
// 				country,
// 				postalCode,
// 			}),
// 			createPlaceRating(supabase, {
// 				placeId: data.id,
// 				score: rating,
// 				count: userRatingCount,
// 			}),
// 			createPlaceAttributeBatch(supabase, {
// 				placeId: data.id,
// 				attributes: [...attributes, ...questions],
// 			}),
// 		])
// 	}
// 	catch {}

// 	return { data, error }
// })

export default defineEventHandler(async (event) => {
	const { id } = event.context.params

	const body = await readBody(event)

	const supabaseAdmin = serverSupabaseServiceRole(event)
	const supabase = await serverSupabaseClient(event)

	const user = await getAuthenticatedUser(supabase)

	if (!user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		})
	}

	const { data, error } = await updatePlace(supabaseAdmin, {
		id,
		userId: user.id,
		name: body.name,
		website: body.website,
		price: body.price,
		description: body.description,
		metaTitle: body.metaTitle,
		metaDescription: body.metaDescription,
		menu: body.menu,
		facebook: body.facebook,
		instagram: body.instagram,
		twitter: body.twitter,
		phone: body.phone,
		specials: body.specials,
	})

	if (error) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message,
		})
	}

	await updatePlaceAddress(supabaseAdmin, {
		placeId: id,
		coordinates: body.address.coordinates,
		streetAddress: body.address.streetAddress,
		city: body.address.city,
		state: body.address.state,
		country: body.address.country,
		postalCode: body.address.postalCode,
	})

	return { data, error }
})
