import { serverSupabaseServiceRole } from '#supabase/server'
import { getPlaces } from '~~/database/place'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const queryParams: Record<string, string> = getQuery(event)

	const { data, error, count } = await getPlaces(supabase, queryParams)

	if (error) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message,
		})
	}

	return { data, count }
})
