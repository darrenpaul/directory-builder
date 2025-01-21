import {
	serverSupabaseClient,
	serverSupabaseServiceRole,
} from '#supabase/server'
import { createPlaceAttributeBatch } from '~~/database/place-attribute'
import { getAuthenticatedUser } from '~~/database/user'

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
	const { placeId, label, key, value } = body

	try {
		await createPlaceAttributeBatch(supabaseAdmin, {
			placeId,
			attributes: [
				{
					place_id: placeId,
					label,
					key,
					value,
				},
			],
		})
	}
	catch (e) {
		console.error(e)
	}

	return { message: 'success' }
})
