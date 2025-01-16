import { serverSupabaseClient } from '#supabase/server'
import { createRating } from '~~/database/rating'
import { getAuthenticatedUser } from '~~/database/user'

export default defineEventHandler(async (event) => {
	const supabase = await serverSupabaseClient(event)

	const body = await readBody(event)

	const user = await getAuthenticatedUser(supabase)

	if (!user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		})
	}

	const { rating, placeId } = body

	return await createRating(supabase, {
		userId: user.id,
		placeId,
		rating,
	})
})
