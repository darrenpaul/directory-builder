import {
	serverSupabaseClient,
	serverSupabaseServiceRole,
} from '#supabase/server'
import { DatabaseTable } from '~~/constants/database-table'
import { createSeoMetadata } from '~~/database/seo-metadata'
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

	const { id } = body

	const { data, error } = await createSeoMetadata(
		supabaseAdmin,
		{ blogId: id },
		DatabaseTable.BLOG_METADATA,
	)

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
