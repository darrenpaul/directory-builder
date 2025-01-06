import { serverSupabaseServiceRole } from '#supabase/server'
import { getPlaceBySlug } from '~~/database/place'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const { slug } = event?.context?.params

	const { data } = await getPlaceBySlug(supabase, slug)

	return data
})
