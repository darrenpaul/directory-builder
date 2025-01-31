import crypto from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import {
	serverSupabaseClient,
	serverSupabaseServiceRole,
} from '#supabase/server'
import { createPlace } from '~~/database/place'
import { createPlaceAddress } from '~~/database/place-address'
import { createPlaceAttributeBatch } from '~~/database/place-attribute'
import { createPlaceImage } from '~~/database/place-image'
import { createPlaceOperatingPeriodBatch } from '~~/database/place-operating-period'
import { createPlaceRating } from '~~/database/place-rating'
import { getAuthenticatedUser } from '~~/database/user'
import {
	askQuestionsAboutPlace,
	genearateDescriptionAndMetaInformation,
	getUrls,
} from '~~/server/utils/ai'
import { scrapWebsite } from '~~/server/utils/webscrap'

async function writeText(text: string, filename = 'output2.txt') {
	try {
		await writeFile(filename, text, 'utf8')
		return true
	}
	catch (error) {
		console.error('Error:', error)
		return false
	}
}

async function readText(filename = 'output.txt') {
	try {
		const text = await readFile(filename, 'utf8')
		return text
	}
	catch (error) {
		console.error('Error:', error)
		return null
	}
}

export default defineEventHandler(async (event) => {
	const supabaseAdmin = serverSupabaseServiceRole(event)
	const supabase = await serverSupabaseClient(event)

	const user = await getAuthenticatedUser(supabase)

	if (!user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		})
	}

	if (!user.app_metadata.claims_admin) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		})
	}

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
		operatingPeriods,
	} = body

	let textContent = (await readText()) || (await scrapWebsite(website))

	const hashedLines: string[] = []
	const savedLines = []

	for (const line of textContent?.split('\n')) {
		const hashedLine = crypto.createHash('sha256').update(line).digest('hex')
		if (!hashedLines.includes(hashedLine)) {
			if (line.length > 100) {
				hashedLines.push(hashedLine)
				savedLines.push(line)
			}
		}
	}

	textContent = savedLines.join('\n')
	writeText(textContent)

	const questions = await askQuestionsAboutPlace(textContent)

	const { menu, facebook, instagram, twitter, phone, specials }
    = await getUrls(textContent)

	const { metaTitle, metaDescription, description }
    = await genearateDescriptionAndMetaInformation(textContent)

	const { data, error } = await createPlace(supabaseAdmin, {
		googlePlaceId,
		displayName,
		postalCode,
		website,
		price,
		metaTitle,
		metaDescription,
		description,
		menu,
		facebook,
		instagram,
		twitter,
		phone,
		specials,
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

	try {
		await Promise.all([
			...images.map((imageUrl: string, index: number) =>
				createPlaceImage(supabaseAdmin, {
					placeId: data.id,
					imageUrl,
					sortOrder: (index + 1) * 10,
				}),
			),
			createPlaceAddress(supabaseAdmin, {
				placeId: data.id,
				coordinates,
				streetAddress,
				city,
				state,
				country,
				postalCode,
			}),
			createPlaceRating(supabaseAdmin, {
				placeId: data.id,
				score: rating,
				count: userRatingCount,
			}),
			createPlaceAttributeBatch(supabaseAdmin, {
				placeId: data.id,
				attributes: [...attributes, ...questions],
			}),
			createPlaceOperatingPeriodBatch(supabaseAdmin, {
				placeId: data.id,
				operatingPeriods,
			}),
		])
	}
	catch (e) {
		console.error(e)
	}

	return { data, error }
})
