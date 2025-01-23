import { serverSupabaseServiceRole } from '#supabase/server'
import { getBlogs } from '~~/database/blog'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const { data, error, count } = await getBlogs(supabase)

	if (error) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message,
		})
	}

	return { data, count }
})
