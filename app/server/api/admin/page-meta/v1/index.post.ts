import {
	serverSupabaseClient,
	serverSupabaseServiceRole,
} from '#supabase/server'
import { createPageMeta } from '~~/database/page-meta'
import { getAuthenticatedUser } from '~~/database/user'
import { generatePageMetadata } from '~~/server/utils/ai'

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

	// if (!user.app_metadata.claims_site_admin) {
	// 	throw createError({
	// 		statusCode: 401,
	// 		statusMessage: 'Unauthorized',
	// 	})
	// }

	const body = await readBody(event)

	const {
		slug,
		image,
		company,
		focus,
		keywordResearch,
		location,
		targetAudience,
	} = body

	const { metaTitle, metaDescription } = await generatePageMetadata({
		company,
		focus,
		keywordResearch,
		location,
		targetAudience,
	})

	const { error } = await createPageMeta(supabaseAdmin, {
		title: metaTitle,
		description: metaDescription,
		slug,
		image,
	})

	if (error) {
		throw createError({
			statusCode: 401,
			statusMessage: error.message,
		})
	}
})
