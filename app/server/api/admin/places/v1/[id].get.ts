import {
	serverSupabaseClient,
	serverSupabaseServiceRole,
} from '#supabase/server'
import { getPlaceByIdAndOwnerId } from '~~/database/place'
import { getAuthenticatedUser } from '~~/database/user'

export default defineEventHandler(async (event) => {
	const supabaseAdmin = serverSupabaseServiceRole(event)
	const supabase = await serverSupabaseClient(event)

	const { id } = event?.context?.params

	const user = await getAuthenticatedUser(supabase)

	if (!user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		})
	}

	const { data: placeData, error: placeError } = await getPlaceByIdAndOwnerId(
		supabaseAdmin,
		{
			id,
			ownerId: user.id,
		},
	)

	if (placeError) {
		throw createError({
			statusCode: 500,
			statusMessage: placeError.message,
		})
	}

	if (!placeData) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Not Found',
		})
	}

	return placeData
})
