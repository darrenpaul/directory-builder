import { serverSupabaseServiceRole } from '#supabase/server'
import { findBlogBySlug } from '~~/database/blog'

export default defineEventHandler(async (event) => {
	const supabaseAdmin = serverSupabaseServiceRole(event)

	const { slug } = event?.context?.params

	const { data: blogData, error: blogError } = await findBlogBySlug(
		supabaseAdmin,
		slug as string,
	)

	if (blogError) {
		throw createError({
			statusCode: 500,
			statusMessage: blogError.message,
		})
	}

	if (!blogData) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Not Found',
		})
	}

	return blogData
})
