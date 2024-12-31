import type { Place } from '~~/types/place'
import { serverSupabaseServiceRole } from '#supabase/server'
import { getPlaces } from '~~/database/place'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const queryParams: Record<string, string> = getQuery(event)

	const { data } = await getPlaces(supabase, queryParams)

	if (!data) {
		return [] as Place[]
	}

	return data.map((place) => {
		return {
			...place,
			address: place.address[0],
			rating: place.rating[0],
		} as Place
	})
})
