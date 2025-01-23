import {
	serverSupabaseClient,
	serverSupabaseServiceRole,
} from '#supabase/server'
import { createBlog } from '~~/database/blog'
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

	const { title, slug } = body

	const { data, error } = await createBlog(supabaseAdmin, {
		title,
		slug,
		ownerId: user.id,
	})

	if (error) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message,
		})
	}

	if (!data) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Unknown error',
		})
	}

	return { data, error }
})
