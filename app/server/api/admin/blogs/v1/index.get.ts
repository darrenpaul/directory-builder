import {
	serverSupabaseClient,
	serverSupabaseServiceRole,
} from '#supabase/server'
import { getBlogs } from '~~/database/blog'
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

	const { data: blogData, error: blogError } = await getBlogs(supabaseAdmin)

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
