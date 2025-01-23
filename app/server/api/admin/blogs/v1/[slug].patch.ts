import {
	serverSupabaseClient,
	serverSupabaseServiceRole,
} from '#supabase/server'
import { updateBlogBySlug } from '~~/database/blog'
import { getAuthenticatedUser } from '~~/database/user'

export default defineEventHandler(async (event) => {
	const supabaseAdmin = serverSupabaseServiceRole(event)
	const supabase = await serverSupabaseClient(event)

	const { slug } = event?.context?.params

	const body = await readBody(event)

	const { title, content, description } = body

	if (!slug || !title || !content || !description) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required fields',
		})
	}

	const user = await getAuthenticatedUser(supabase)

	if (!user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		})
	}

	const { data: blogData, error: blogError } = await updateBlogBySlug(
		supabaseAdmin,
		{ ...body, slug },
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
