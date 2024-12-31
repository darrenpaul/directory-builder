import { serverSupabaseServiceRole } from '#supabase/server'
import { getPageMeta } from '~~/database/page-meta'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const { slug } = getQuery(event)

	const { data } = await getPageMeta(supabase, slug as string)

	return data
})
